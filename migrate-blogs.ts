import fs from 'fs';
import path from 'path';
import { ARTICLES_DATA } from './src/app/data/blogData';

async function migrateBlogs() {
  console.log('Starting migration...');

  // 1. Login to get token
  console.log('Logging in as admin...');
  const loginRes = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@digitory.com', password: 'password123' })
  });

  if (!loginRes.ok) {
    const err = await loginRes.text();
    console.error('Login failed:', err);
    process.exit(1);
  }

  const { data: { token } } = await loginRes.json();
  console.log('Login successful.');

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  // Ensure default categories exist or create one
  console.log('Fetching/creating category...');
  let categoryId;
  const catRes = await fetch('http://localhost:5000/api/categories', { headers });
  const catData = await catRes.json();
  
  let categories = [];
  if (Array.isArray(catData.data)) {
    categories = catData.data;
  } else if (catData.data && Array.isArray(catData.data.results)) {
    categories = catData.data.results;
  }

  const existingCat = categories.find((c: any) => c.slug === 'articles');
  
  if (existingCat) {
    categoryId = existingCat._id;
  } else {
    const newCatRes = await fetch('http://localhost:5000/api/categories', {
      method: 'POST',
      headers,
      body: JSON.stringify({ name: 'Articles', slug: 'articles', description: 'Blog articles' })
    });
    const newCatData = await newCatRes.json();
    if (!newCatRes.ok) {
      console.error('Failed to create category:', newCatData);
      process.exit(1);
    }
    categoryId = newCatData.data._id;
  }
  
  console.log('Using category:', categoryId);

  // 2. Map and POST articles
  for (const slug of Object.keys(ARTICLES_DATA)) {
    const article = ARTICLES_DATA[slug];
    
    // Convert structured content to HTML
    let htmlContent = `<div class="intro"><p>${article.introText}</p><p>${article.secondaryIntro}</p></div>`;
    
    if (article.mediaBlock) {
      if (article.mediaBlock.type === 'video') {
        htmlContent += `<video src="${article.mediaBlock.src}" controls class="w-full my-4"></video><p><em>${article.mediaBlock.caption}</em></p>`;
      } else {
        htmlContent += `<img src="${article.mediaBlock.src}" alt="${article.mediaBlock.caption}" class="w-full my-4" /><p><em>${article.mediaBlock.caption}</em></p>`;
      }
    }

    for (const section of article.sections) {
      htmlContent += `<h2 id="${section.id}">${section.heading}</h2>`;
      for (const p of section.paragraphs) {
        htmlContent += `<p>${p}</p>`;
      }
      if (section.bulletPoints && section.bulletPoints.length > 0) {
        htmlContent += `<ul>`;
        for (const b of section.bulletPoints) {
          htmlContent += `<li>${b}</li>`;
        }
        htmlContent += `</ul>`;
      }
    }

    const payload = {
      title: article.title,
      slug: article.slug,
      content: htmlContent,
      excerpt: article.introText,
      featuredImage: article.image,
      category: categoryId,
      status: 'Published',
      seo: {
        metaTitle: article.title,
        metaDescription: article.introText.substring(0, 160)
      }
    };

    console.log(`Migrating post: ${article.title}...`);
    const postRes = await fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });

    if (postRes.ok) {
      console.log(`✅ Success: ${article.slug}`);
    } else {
      const err = await postRes.text();
      // If duplicate, it's fine
      if (err.includes('duplicate')) {
        console.log(`⚠️ Skipped (already exists): ${article.slug}`);
      } else {
        console.error(`❌ Failed: ${article.slug} - ${err}`);
      }
    }
  }

  console.log('Migration complete!');
}

migrateBlogs().catch(console.error);
