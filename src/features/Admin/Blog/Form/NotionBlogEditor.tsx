"use client";

import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useBlogForm } from "./useBlogForm";
import DescriptionEditor from "../../DescriptionEditor";
import { api } from "@/lib/api";
import { categoriesService } from "@/services/categories.service";
import { usersService } from "@/services/users.service";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase/config";
import {
  User,
  Link2,
  Tag,
  FolderOpen,
  AlignLeft,
  Trash,
  ArrowLeft,
  Check,
  CloudUpload,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  Globe,
  Clock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotionBlogEditorProps {
  submitHandler: (data: any) => void;
  autoSaveHandler?: (data: any) => Promise<void>;
  defaultValues?: any;
  onDelete?: () => void;
}

const NotionBlogEditor: React.FC<NotionBlogEditorProps> = ({
  submitHandler,
  autoSaveHandler,
  defaultValues,
  onDelete,
}) => {
  const router = useRouter();
  const [categories, setCategories] = useState<{_id: string, name: string}[]>([]);
  const [authors, setAuthors] = useState<{_id: string, name: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const [activeTab, setActiveTab] = useState<"edit" | "seo" | "preview">("edit");
  const [seoGeneralOpen, setSeoGeneralOpen] = useState(true);
  const [seoPreviewOpen, setSeoPreviewOpen] = useState(true);

  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const [cats, authorList] = await Promise.all([
          categoriesService.getCategories(),
          usersService.getUsers(['Admin', 'Editor']),
        ]);
        setCategories(cats);
        setAuthors((Array.isArray(authorList) ? authorList : []) as any);
      } catch (err) {
        console.error('Failed to fetch metadata', err);
      }
    };
    fetchMeta();
  }, []);

  const { form, setDescription, handleSubmit } = useBlogForm(
    async (data) => {
      setLoading(true);
      try {
        await submitHandler(data);
      } finally {
        setLoading(false);
      }
    },
    defaultValues
  );

  const [savingStatus, setSavingStatus] = useState<"idle" | "saving" | "saved">("idle");
  const coverImageInputRef = useRef<HTMLInputElement>(null);

  const titleValue = form.watch("title");
  const slugValue = form.watch("slug");
  const excerptValue = form.watch("excerpt");
  const seoTitleValue = form.watch("seo_title");
  const metaDescriptionValue = form.watch("meta_description");
  
  const coverImageUrl = form.watch("featuredImage") as string | File | undefined;
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!coverImageUrl) {
      setCoverPreview(null);
      return;
    }
    if (typeof coverImageUrl === "string") {
      setCoverPreview(coverImageUrl);
    } else if (coverImageUrl instanceof File) {
      const url = URL.createObjectURL(coverImageUrl);
      setCoverPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [coverImageUrl]);

  useEffect(() => {
    if (!defaultValues && titleValue) {
      const generatedSlug = titleValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      form.setValue("slug", generatedSlug, { shouldDirty: true });
    }
  }, [titleValue, form, defaultValues]);

  const formValues = form.watch();
  useEffect(() => {
    if (!form.formState.isDirty) return;

    setSavingStatus("saving");
    const saveTimer = setTimeout(() => {
      form.handleSubmit(async (data) => {
        try {
          const submitData = await handleSubmit(data);
          // Use autoSaveHandler (silent, no redirect) if available; otherwise use submitHandler
          const saver = autoSaveHandler ?? submitHandler;
          await saver(submitData);
          form.reset(data, { keepValues: true });
          setSavingStatus("saved");
          setTimeout(() => setSavingStatus("idle"), 2500);
        } catch (err) {
          console.error("Autosave error:", err);
          setSavingStatus("idle");
        }
      })();
    }, 5000);

    return () => clearTimeout(saveTimer);
  }, [formValues, form, submitHandler, autoSaveHandler, handleSubmit]);

  const [isUploadingCover, setIsUploadingCover] = useState(false);

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setCoverPreview(localUrl);
    setIsUploadingCover(true);

    try {
      const uformData = new FormData();
      uformData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uformData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Upload failed");
      }

      const { url } = await res.json();

      form.setValue('featuredImage', url, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setCoverPreview(url);
    } catch (err: any) {
      console.error('Cover upload error:', err);
      alert(err.message || 'Failed to upload cover image. Please try again.');
      setCoverPreview(null);
      form.setValue('featuredImage', '', { shouldValidate: true });
    } finally {
      setIsUploadingCover(false);
      URL.revokeObjectURL(localUrl);
    }
  };

  const removeCover = () => {
    form.setValue("featuredImage", "", {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const tagsValue = form.watch("tags") || [];
  const [newTagInput, setNewTagInput] = useState("");
  const [isAddingTag, setIsAddingTag] = useState(false);

  const addTag = () => {
    if (newTagInput.trim()) {
      const updated = [...tagsValue, { tag: newTagInput.trim() }];
      form.setValue("tags", updated, { shouldDirty: true });
      setNewTagInput("");
    }
    setIsAddingTag(false);
  };

  const removeTag = (index: number) => {
    const updated = tagsValue.filter((_, i) => i !== index);
    form.setValue("tags", updated, { shouldDirty: true });
  };

  const currentCategoryValue = form.watch("category") || "";

  const handleRawChange = (text: string) => {
    const cleanText = text.trim();
    const words = cleanText ? cleanText.split(/\s+/).length : 0;
    const chars = cleanText.length;
    const time = Math.max(1, Math.ceil(words / 200));
    setWordCount(words);
    setCharCount(chars);
    setReadingTime(time);
  };

  const triggerSave = (status: 'Draft' | 'Published') => {
    form.setValue("status", status, { shouldDirty: true });
    form.handleSubmit(async (data) => {
      try {
        const submitData = await handleSubmit(data);
        await submitHandler(submitData);
      } catch (err) {
        console.error("Save error:", err);
      }
    }, (err) => {
      console.log("Validation errors:", err);
      alert(`Cannot save. Please complete required fields.`);
    })();
  };

  return (
    <div className="min-h-screen bg-[#191919] text-[#e3e3e3] font-sans antialiased overflow-y-auto">
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[#2c2c2c] bg-[#191919]/90 px-6 py-3 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/admin/dashboard?tab=blogs")}
            className="flex items-center gap-1 rounded px-2 py-1 text-sm text-[#8c8c8c] hover:bg-[#252525] hover:text-white transition-all cursor-pointer"
            type="button"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <span className="text-[#3a3a3a]">/</span>
          <span className="text-sm font-medium text-[#c0c0c0] truncate max-w-[200px]">
            {titleValue || "Untitled"}
          </span>

          <div className="flex items-center gap-1 bg-[#202020] border border-[#2d2d2d] rounded-md p-0.5 ml-6">
            <button
              onClick={() => setActiveTab("edit")}
              className={clsx(
                "px-3 py-1 rounded text-xs font-medium cursor-pointer transition-all",
                activeTab === "edit" ? "bg-[#2c2c2c] text-white" : "text-[#8c8c8c] hover:text-white"
              )}
              type="button"
            >
              Edit
            </button>
            <button
              onClick={() => setActiveTab("seo")}
              className={clsx(
                "px-3 py-1 rounded text-xs font-medium cursor-pointer transition-all",
                activeTab === "seo" ? "bg-[#2c2c2c] text-white" : "text-[#8c8c8c] hover:text-white"
              )}
              type="button"
            >
              SEO Panel
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={clsx(
                "px-3 py-1 rounded text-xs font-medium cursor-pointer transition-all",
                activeTab === "preview" ? "bg-[#2c2c2c] text-white" : "text-[#8c8c8c] hover:text-white"
              )}
              type="button"
            >
              Live Preview
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {savingStatus === "saving" && (
            <span className="text-xs text-[#8c8c8c] animate-pulse flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-yellow-500 animate-ping" />
              Saving...
            </span>
          )}
          {savingStatus === "saved" && (
            <span className="flex items-center gap-1 text-xs text-green-500">
              <Check size={12} /> Saved just now
            </span>
          )}

          {onDelete && (
            <button
              onClick={onDelete}
              className="rounded p-1.5 text-[#8c8c8c] hover:bg-red-950/40 hover:text-red-500 transition-all cursor-pointer"
              type="button"
              title="Delete post"
            >
              <Trash size={16} />
            </button>
          )}

          <button
            onClick={() => triggerSave('Draft')}
            disabled={loading}
            className="bg-[#252525] border border-[#2d2d2d] hover:bg-[#2c2c2c] text-[#c0c0c0] hover:text-white px-3 py-1.5 text-xs font-semibold rounded cursor-pointer transition-all"
            type="button"
          >
            Save Draft
          </button>
          <Button
            onClick={() => triggerSave('Published')}
            disabled={loading}
            className="bg-[#2eaadc] hover:bg-[#1a93c4] text-white px-4 py-1.5 text-xs font-semibold rounded cursor-pointer transition-all"
          >
            {defaultValues ? "Save Changes" : "Publish Post"}
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-8 py-6">
        <FormProvider {...form}>
          <form onSubmit={(e) => e.preventDefault()}>
            {Object.keys(form.formState.errors).length > 0 && (
              <div className="mb-6 p-4 rounded bg-red-950/30 border border-red-900/40 text-red-400 text-xs space-y-1">
                <p className="font-semibold mb-1">Please complete all required fields.</p>
              </div>
            )}

            {activeTab === "edit" && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="relative group w-full mb-8 rounded-lg overflow-hidden border border-[#2d2d2d] bg-[#202020] min-h-[140px] flex flex-col items-center justify-center">
                  {isUploadingCover ? (
                    <div className="flex flex-col items-center justify-center text-[#8c8c8c] py-8 w-full">
                      <div className="w-6 h-6 border-2 border-[#FF4F18] border-t-transparent rounded-full animate-spin mb-2" />
                      <span className="text-xs font-medium">Uploading cover image...</span>
                    </div>
                  ) : coverPreview ? (
                    <>
                      <img src={coverPreview} alt="Cover" className="w-full h-48 object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity">
                        <button
                          onClick={() => coverImageInputRef.current?.click()}
                          className="flex items-center gap-1.5 bg-[#2b2b2b] hover:bg-[#383838] border border-[#444] text-xs font-medium px-3 py-1.5 rounded transition-all cursor-pointer"
                          type="button"
                        >
                          <CloudUpload size={14} /> Change Cover
                        </button>
                        <button
                          onClick={removeCover}
                          className="flex items-center gap-1.5 bg-red-950/60 hover:bg-red-950 text-red-400 border border-red-900/50 text-xs font-medium px-3 py-1.5 rounded transition-all cursor-pointer"
                          type="button"
                        >
                          <Trash size={14} /> Remove
                        </button>
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={() => coverImageInputRef.current?.click()}
                      className="flex flex-col items-center justify-center text-[#8c8c8c] hover:text-white py-8 w-full h-full transition-all cursor-pointer"
                      type="button"
                    >
                      <ImageIcon size={32} className="mb-2 opacity-50" />
                      <span className="text-xs font-medium">Add cover image</span>
                    </button>
                  )}
                  <input
                    ref={coverImageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCoverUpload}
                    className="hidden"
                  />
                </div>

                <div className="mb-6">
                  <textarea
                    placeholder="Untitled"
                    value={titleValue}
                    onChange={(e) => {
                      form.setValue("title", e.target.value, { shouldValidate: true, shouldDirty: true });
                      e.target.style.height = "auto";
                      e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                    className="w-full bg-transparent text-white border-none outline-none font-bold text-4xl placeholder-[#333] p-0 resize-none focus:ring-0 leading-tight"
                    rows={1}
                  />
                </div>

                <div className="grid grid-cols-[160px_1fr] gap-x-4 gap-y-3 text-sm text-[#8c8c8c] border-b border-[#2d2d2d] pb-6 mb-8">
                  <div className="flex items-center gap-2 text-xs"><Sparkles size={14} className="opacity-60" /><span>Content Type</span></div>
                  <div>
                    <select
                      {...form.register("contentType")}
                      className="bg-transparent text-white border-none outline-none focus:ring-0 p-0 text-sm focus:outline-none dark:bg-zinc-950 font-semibold text-[#FF4F18]"
                    >
                      <option value="blog" className="bg-[#121214] text-white font-normal">Blog Article</option>
                      <option value="case-study" className="bg-[#121214] text-white font-normal">Case Study</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 text-xs"><Link2 size={14} className="opacity-60" /><span>Slug</span></div>
                  <div>
                    <input
                      type="text"
                      placeholder="empty-slug-url"
                      {...form.register("slug")}
                      className="w-full bg-transparent text-white border-none outline-none focus:ring-0 placeholder-[#3f3f3f] p-0 text-sm font-mono focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-xs"><FolderOpen size={14} className="opacity-60" /><span>Category</span></div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {categories && categories.length > 0 ? (
                      <select
                        {...form.register("category")}
                        className="bg-transparent text-white border-none outline-none focus:ring-0 p-0 text-sm focus:outline-none dark:bg-zinc-950"
                      >
                        <option value="" className="bg-[#121214] text-zinc-400">Select Category (Optional)</option>
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat._id} className="bg-[#121214] text-white">
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        placeholder="Optional"
                        {...form.register("category")}
                        className="bg-transparent text-white border-none outline-none focus:ring-0 placeholder-[#3f3f3f] p-0 text-sm focus:outline-none"
                      />
                    )}
                    {/* Inline Create Category */}
                    {isCreatingCategory ? (
                      <div className="flex items-center gap-1.5 ml-2">
                        <input
                          type="text"
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          onKeyDown={async (e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              if (!newCategoryName.trim()) return;
                              try {
                                const newCat = await categoriesService.createCategory({ name: newCategoryName.trim() });
                                setCategories(prev => [...prev, newCat]);
                                form.setValue('category', newCat._id, { shouldDirty: true });
                                setNewCategoryName('');
                                setIsCreatingCategory(false);
                              } catch (err: any) {
                                alert(err.message || 'Failed to create category');
                                console.error('Failed to create category', err);
                              }
                            }
                            if (e.key === 'Escape') { setIsCreatingCategory(false); setNewCategoryName(''); }
                          }}
                          placeholder="Category name..."
                          className="bg-[#202020] border border-[#2d2d2d] rounded px-1.5 py-0.5 text-xs text-white outline-none w-32"
                          autoFocus
                        />
                        <button type="button" onClick={async () => {
                          if (!newCategoryName.trim()) { setIsCreatingCategory(false); return; }
                          try {
                            const newCat = await categoriesService.createCategory({ name: newCategoryName.trim() });
                            setCategories(prev => [...prev, newCat]);
                            form.setValue('category', newCat._id, { shouldDirty: true });
                            setNewCategoryName('');
                            setIsCreatingCategory(false);
                          } catch (err: any) {
                            alert(err.message || 'Failed to create category');
                            console.error('Failed to create category', err);
                          }
                        }} className="text-xs text-green-400 hover:text-green-300 font-bold cursor-pointer">✓</button>
                        <button type="button" onClick={() => { setIsCreatingCategory(false); setNewCategoryName(''); }} className="text-xs text-red-400 hover:text-red-300 font-bold cursor-pointer">✕</button>
                      </div>
                    ) : (
                      <button type="button" onClick={() => setIsCreatingCategory(true)} className="text-xs text-[#2eaadc] hover:underline cursor-pointer ml-2">+ New</button>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs"><Clock size={14} className="opacity-60" /><span>Read Time</span></div>
                  <div className="text-sm text-[#c0c0c0] flex items-center gap-1.5">
                    <span>{readingTime || 1} min read</span>
                    <span className="opacity-20">•</span>
                    <span className="text-xs text-[#8c8c8c]">({wordCount} words, {charCount} chars)</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs"><User size={14} className="opacity-60" /><span>Author</span></div>
                  <div>
                    {authors.length > 0 ? (
                      <select
                        {...form.register("author")}
                        className="bg-transparent text-white border-none outline-none focus:ring-0 p-0 text-sm focus:outline-none dark:bg-zinc-950"
                      >
                        <option value="" className="bg-[#121214] text-zinc-400">Select Author</option>
                        {authors.map((a) => (
                          <option key={a._id} value={a._id} className="bg-[#121214] text-white">{a.name}</option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-sm text-[#8c8c8c]">Loading...</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs"><Tag size={14} className="opacity-60" /><span>Tags</span></div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {tagsValue.map((item, idx) => (
                      <span key={idx} className="flex items-center gap-1 bg-[#232323] border border-[#2d2d2d] rounded-full px-2.5 py-0.5 text-xs text-[#e3e3e3]">
                        {item.tag}
                        <button type="button" onClick={() => removeTag(idx)} className="opacity-50 hover:opacity-100 text-red-400 font-bold ml-0.5 cursor-pointer">×</button>
                      </span>
                    ))}
                    {isAddingTag ? (
                      <input type="text" value={newTagInput} onChange={(e) => setNewTagInput(e.target.value)} onBlur={addTag} onKeyDown={(e) => e.key === "Enter" && addTag()} className="bg-[#202020] border border-[#2d2d2d] rounded px-1.5 py-0.5 text-xs text-white outline-none" autoFocus />
                    ) : (
                      <button type="button" onClick={() => setIsAddingTag(true)} className="text-xs text-[#2eaadc] hover:underline cursor-pointer">+ Add Tag</button>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs"><AlignLeft size={14} className="opacity-60" /><span>Excerpt</span></div>
                  <div>
                    <input type="text" placeholder="Enter a short excerpt description..." {...form.register("excerpt")} className="w-full bg-transparent text-white border-none outline-none focus:ring-0 placeholder-[#3f3f3f] p-0 text-sm focus:outline-none" />
                  </div>
                </div>

                <div className="editor-canvas focus:outline-none mb-10 [&_.rich-editorjs]:max-w-none [&_.rich-editorjs]:w-full [&_.ProseMirror]:bg-[#191919] [&_.ProseMirror]:border-none [&_.ProseMirror]:text-[#e3e3e3] [&_.ProseMirror]:px-0 [&_.ProseMirror]:py-4 [&_.ProseMirror]:min-h-[450px]">
                  <DescriptionEditor label="" name="content" onValueChange={() => {}} control={form.control} notionMode={true} onRawValueChange={setDescription} />
                </div>
              </div>
            )}

            {activeTab === "seo" && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-200 space-y-6">
                <div className="border border-[#2d2d2d] rounded-lg bg-[#202020]/40 overflow-hidden">
                  <button type="button" onClick={() => setSeoGeneralOpen(!seoGeneralOpen)} className="w-full flex items-center justify-between px-5 py-4 bg-[#202020] text-sm font-semibold border-b border-[#2d2d2d] hover:bg-[#252525]">
                    <span className="flex items-center gap-2"><Globe size={16} className="text-[#2eaadc]" /> SEO Inputs</span>
                    {seoGeneralOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {seoGeneralOpen && (
                    <div className="p-5 space-y-4 text-sm">
                      <div className="flex flex-col gap-1.5"><label className="text-xs text-[#8c8c8c]">SEO Title Tag</label><input type="text" {...form.register("seo_title")} className="bg-[#191919] border border-[#2d2d2d] rounded-lg px-3 py-2 text-sm text-white" /></div>
                      <div className="flex flex-col gap-1.5"><label className="text-xs text-[#8c8c8c]">Meta Description</label><textarea rows={3} {...form.register("meta_description")} className="bg-[#191919] border border-[#2d2d2d] rounded-lg px-3 py-2 text-sm text-white" /></div>
                      <div className="flex flex-col gap-1.5"><label className="text-xs text-[#8c8c8c]">Focus Keyword</label><input type="text" {...form.register("focus_keyword")} className="bg-[#191919] border border-[#2d2d2d] rounded-lg px-3 py-2 text-sm text-white" /></div>
                      <div className="flex flex-col gap-1.5"><label className="text-xs text-[#8c8c8c]">Canonical URL</label><input type="text" {...form.register("canonical_url")} className="bg-[#191919] border border-[#2d2d2d] rounded-lg px-3 py-2 text-sm text-white font-mono" /></div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "preview" && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-200 bg-[#121212] border border-[#2d2d2d] rounded-xl p-8 shadow-inner select-none mb-10">
                <div className="flex justify-between items-center text-xs text-[#8c8c8c] border-b border-[#2d2d2d] pb-4 mb-8">
                  <div className="flex items-center gap-2"><span className="size-2 rounded-full bg-green-500" /><span>Live preview</span></div>
                </div>
                {coverPreview && <div className="w-full h-64 rounded-xl overflow-hidden mb-8 border border-[#2d2d2d]"><img src={coverPreview} alt="Preview" className="w-full h-full object-cover" /></div>}
                <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight leading-tight">{titleValue || "Untitled Post"}</h1>
                {excerptValue && <p className="text-[#8c8c8c] text-lg italic border-l-2 border-[#2d2d2d] pl-4 mb-8">{excerptValue}</p>}
                <div className="preview-canvas shadow-none focus:outline-none [&_.rich-editorjs]:max-w-none [&_.rich-editorjs]:w-full [&_.ProseMirror]:bg-transparent [&_.ProseMirror]:border-none [&_.ProseMirror]:text-[#e3e3e3] [&_.ProseMirror]:px-0 [&_.ProseMirror]:py-0 [&_.ProseMirror]:min-h-0">
                  <DescriptionEditor label="" name="content" onValueChange={() => {}} control={form.control} notionMode={true} editable={false} />
                </div>
              </div>
            )}
            
          </form>
        </FormProvider>
      </main>
    </div>
  );
};

export default NotionBlogEditor;
