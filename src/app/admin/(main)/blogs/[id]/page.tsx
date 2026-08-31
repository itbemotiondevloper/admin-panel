"use client";

import React, { useEffect, useState, use } from "react";
import NotionBlogEditor from "@/features/Admin/Blog/Form/NotionBlogEditor";
import { useRouter } from "next/navigation";
import { postsService } from "@/services/posts.service";

interface EditBlogProps {
  params: Promise<{ id: string }>;
}

export default function EditBlog({ params }: EditBlogProps) {
  const router = useRouter();
  const { id } = use(params);
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    postsService.getPostById(id)
      .then((data) => {
        if (data) {
          setPost(data);
        } else {
          alert("Post not found");
          router.push("/admin/dashboard?tab=blogs");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load post");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, router]);

  const submitHandler = async (data: any) => {
    try {
      await postsService.updatePost(id, data);
      router.push("/admin/dashboard?tab=blogs");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to update blog");
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await postsService.deletePost(id);
        router.push("/admin/dashboard?tab=blogs");
      } catch (err: any) {
        console.error(err);
        alert("Failed to delete post");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#191919] text-zinc-400 font-semibold animate-pulse">
        Loading editor...
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="absolute inset-0 z-50 bg-[#191919]">
      <NotionBlogEditor 
        submitHandler={submitHandler} 
        defaultValues={post} 
        onDelete={handleDelete}
      />
    </div>
  );
}
