"use client";

import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTable } from "@/components/ui/DataTable";
import ActionsCell from "./ActionCell";
import clsx from "clsx";
import { postsService } from "@/services/posts.service";

interface BlogListProps {
  className?: string;
}

export type PostRecord = {
  _id: string;
  title: string;
  slug: string;
  status: string;
  contentType?: 'blog' | 'case-study';
  author?: { name?: string };
  category?: { name?: string };
  createdAt: any;
  updatedAt: any;
};

const BlogList: React.FC<BlogListProps> = ({ className }) => {
  const [blogs, setBlogs] = useState<PostRecord[]>([]);
  const [typeFilter, setTypeFilter] = useState<'all' | 'blog' | 'case-study'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postsService.getPosts();
        setBlogs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredBlogs = blogs.filter((item) => {
    if (typeFilter === 'all') return true;
    if (typeFilter === 'case-study') return item.contentType === 'case-study';
    return !item.contentType || item.contentType === 'blog';
  });

  const columns: ColumnDef<PostRecord>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "contentType",
      header: "Type",
      cell: ({ row }) => {
        const isCaseStudy = row.original.contentType === 'case-study';
        return (
          <span className={clsx(
            "px-2.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider",
            isCaseStudy ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800' : 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
          )}>
            {isCaseStudy ? 'Case Study' : 'Blog'}
          </span>
        );
      },
    },
    {
      accessorKey: "author",
      header: "Author",
      cell: ({ row }) => row.original.author?.name || "Admin",
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => row.original.category?.name || "Uncategorized",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span className={clsx("px-2.5 py-1 rounded-full text-xs font-bold", row.original.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700')}>
          {row.original.status}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        const val = row.original.createdAt;
        const d = typeof val?.toDate === 'function' ? val.toDate() : new Date(val || Date.now());
        return <span>{format(d, "MMM d, yyyy")}</span>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const item = row.original;
        return <ActionsCell item={item} />;
      },
    },
  ];

  if (loading) return <div>Loading blogs...</div>;

  return (
    <div className={clsx("max-w-[80rem] space-y-4", className)}>
      <div className="flex items-center gap-2 pb-2">
        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Filter Type:</span>
        <div className="inline-flex rounded-lg p-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
          <button
            type="button"
            onClick={() => setTypeFilter('all')}
            className={clsx(
              "px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer",
              typeFilter === 'all' ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            )}
          >
            All ({blogs.length})
          </button>
          <button
            type="button"
            onClick={() => setTypeFilter('blog')}
            className={clsx(
              "px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer",
              typeFilter === 'blog' ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            )}
          >
            Blogs ({blogs.filter(b => !b.contentType || b.contentType === 'blog').length})
          </button>
          <button
            type="button"
            onClick={() => setTypeFilter('case-study')}
            className={clsx(
              "px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer",
              typeFilter === 'case-study' ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            )}
          >
            Case Studies ({blogs.filter(b => b.contentType === 'case-study').length})
          </button>
        </div>
      </div>
      <DataTable columns={columns} data={filteredBlogs} />
    </div>
  );
};

export default BlogList;