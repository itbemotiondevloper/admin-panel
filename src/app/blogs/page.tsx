'use client';

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogHero from "@/components/blog/BlogHero";
import LatestStories from "@/components/blog/LatestStories";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Blogs");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-white text-[#111111] transition-colors duration-300 flex flex-col justify-between font-sans">
      <div>
        <Header />
        <div className="pt-20 sm:pt-24">
          <BlogHero 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <LatestStories 
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}