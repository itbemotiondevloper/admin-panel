import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BlogListProps {
  blogs: any[];
}

function BlogList({ blogs }: BlogListProps) {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs?.map((blog) => (
          <Link
            href={`/blogs/${blog.slug}`}
            key={blog._id}
            className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
              {blog.featuredImage ? (
                <Image
                  src={blog.featuredImage}
                  alt={blog.title || "Blog cover"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
                  {typeof blog.category === 'object' && blog.category ? blog.category.name : (blog.category || "General")}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                {blog.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
                {blog.excerpt}
              </p>
              
              <div className="flex items-center text-blue-600 text-sm font-semibold mt-auto group-hover:translate-x-1 transition-transform">
                Read Article <ArrowRight size={16} className="ml-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {(!blogs || blogs.length === 0) && (
        <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          No blogs found.
        </div>
      )}
    </div>
  );
}

export default BlogList;
