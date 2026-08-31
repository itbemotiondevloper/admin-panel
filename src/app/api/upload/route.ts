import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json({ error: 'Cloudinary configuration is incomplete' }, { status: 500 });
    }

    const timestamp = Math.round(new Date().getTime() / 1000).toString();
    const folder = 'digitory';
    
    // Sort parameters alphabetically to construct the signature payload
    const signatureStr = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    
    // Generate SHA-1 hash using Web Crypto API
    const encoder = new TextEncoder();
    const data = encoder.encode(signatureStr);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('api_key', apiKey);
    uploadFormData.append('timestamp', timestamp);
    uploadFormData.append('folder', folder);
    uploadFormData.append('signature', signature);

    const resourceType = file.type.startsWith('video/') ? 'video' : 'image';

    const cloudinaryRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
      {
        method: 'POST',
        body: uploadFormData,
      }
    );

    if (!cloudinaryRes.ok) {
      const errText = await cloudinaryRes.text();
      console.error('Cloudinary API error response:', errText);
      return NextResponse.json({ error: 'Cloudinary upload failed: ' + errText }, { status: 500 });
    }

    const result = await cloudinaryRes.json();
    return NextResponse.json({ url: result.secure_url });
  } catch (error: any) {
    console.error('Upload handler error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
