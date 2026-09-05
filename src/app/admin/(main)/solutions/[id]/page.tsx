"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { solutionsService } from "@/services/solutions.service";
import { settingsService } from "@/services/settings.service";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "@/lib/firebase/config";
import { ArrowLeft, Plus, Trash2, Upload, Loader2, Save } from "lucide-react";

export default function SolutionEditorPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === "new";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [existingCategories, setExistingCategories] = useState<string[]>(["Run Operations", "Manage Inventory & Menu", "Grow & Understand", "Scale & Specialize"]);

  // Form State
  const [formData, setFormData] = useState<any>({
    title: "",
    slug: "",
    category: "Run Operations",
    shortLabel: "",
    badge: "",
    description: "",
    gridTitle: "",
    gridDesc: "",
    image: "",
    opsTitle: "",
    opsParagraph: "",
    opsHighlights: "",
    ctaText: "Request a Demo",
    trustText: "",
    icon: "pos",
    whyChooseTitle: "Why choose Digitory?",
    whyChoose: [],
    layerTitle: "",
    layerDesc: "",
    metricsTitle: "",
    metricsItems: [],
    featuresTitle: "Key Capabilities",
    features: [],
    businessTypesTitle: "Suitable for every dining format",
    businessTypesDesc: "",
    businessTypes: [],
    extraGrowth: { title: "", desc: "" },
    extraOwnersChoice: { title: "", desc: "" },
    supportItems: [],
    ctaBlock: { title: "Ready to upgrade?", desc: "Talk to us today" },
    faqs: [],
    order: 0,
  });

  useEffect(() => {
    const loadSolution = async () => {
      try {
        const allSols = await solutionsService.getSolutions({ useCache: false });
        const settings = await settingsService.getSettings(true);
        const cats = Array.from(new Set([
          ...allSols.map((s: any) => s.category).filter(Boolean),
          ...(settings.customCategories || [])
        ]));
        const defaultCats = ["Run Operations", "Manage Inventory & Menu", "Grow & Understand", "Scale & Specialize"];
        const mergedCats = Array.from(new Set([...defaultCats, ...cats]));
        setExistingCategories(mergedCats);

        if (!isNew) {
          const doc = await solutionsService.getSolutionById(id);
          if (doc) {
            if (doc.category && !defaultCats.includes(doc.category)) {
              setIsCustomCategory(true);
            }
            setFormData({
              ...formData,
              ...doc,
              whyChooseTitle: doc.whyChooseTitle || "Why choose Digitory?",
              whyChoose: doc.whyChoose || [],
              features: doc.features || [],
              businessTypes: doc.businessTypes || [],
              extraGrowth: doc.extraGrowth || { title: "", desc: "" },
              extraOwnersChoice: doc.extraOwnersChoice || { title: "", desc: "" },
              supportItems: doc.supportItems || [],
              ctaBlock: doc.ctaBlock || { title: "Ready to upgrade?", desc: "Talk to us today" },
              metricsItems: doc.metricsItems || [],
              faqs: doc.faqs || [],
            });
          } else {
            setError("Solution not found.");
          }
        }
      } catch (err: any) {
        console.error(err);
        if (!isNew) {
          setError("Failed to load solution data.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadSolution();
  }, [id, isNew]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (parent: string, field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  // Image Upload Handling
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
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

      setFormData((prev: any) => ({
        ...prev,
        image: url,
      }));
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev: any) => ({
      ...prev,
      image: "",
    }));
  };

  // Dynamic Lists helpers
  const addItem = (listField: string, defaultObj: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [listField]: [...prev[listField], defaultObj],
    }));
  };

  const removeItem = (listField: string, index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      [listField]: prev[listField].filter((_: any, idx: number) => idx !== index),
    }));
  };

  const updateListItem = (listField: string, index: number, key: string, value: any) => {
    setFormData((prev: any) => {
      const newList = [...prev[listField]];
      newList[index] = { ...newList[index], [key]: value };
      return { ...prev, [listField]: newList };
    });
  };

  const updateListStringItem = (listField: string, index: number, value: string) => {
    setFormData((prev: any) => {
      const newList = [...prev[listField]];
      newList[index] = value;
      return { ...prev, [listField]: newList };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.shortLabel) {
      alert("Title, Slug, and Short Label are required fields!");
      return;
    }

    setSaving(true);
    try {
      if (isNew) {
        await solutionsService.createSolution(formData);
      } else {
        await solutionsService.updateSolution(id, formData);
      }
      router.push("/admin/solutions");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to save solution.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center font-sans">
        <Loader2 className="w-10 h-10 animate-spin text-[#FF4F18] mb-4" />
        <p className="text-zinc-500 font-semibold uppercase tracking-wider text-xs">Loading Solution Details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center font-sans">
        <div className="bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 p-6 rounded-3xl border border-red-200 dark:border-red-900/50 max-w-sm text-center">
          <p className="font-bold mb-2">Error</p>
          <p className="text-sm mb-4">{error}</p>
          <Link href="/admin/solutions" className="text-xs font-black uppercase text-[#FF4F18] hover:underline">
            Back to Solutions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in font-sans p-6 max-w-6xl mx-auto text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
            <ArrowLeft className="w-5 h-5 text-zinc-650 dark:text-zinc-350" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
              {isNew ? "Create New Solution" : `Edit Solution: ${formData.shortLabel}`}
            </h1>
            <p className="text-xs text-zinc-500 mt-1">Configure layout options and module contents</p>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF4F18] hover:bg-[#E03F0D] text-white text-sm font-bold rounded-full transition-all shadow-md select-none disabled:opacity-60 cursor-pointer"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Solution
        </button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Sections */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section 1: Basic Info */}
          <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm space-y-6">
            <h3 className="text-sm font-black uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 mb-2">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ""}
                  onChange={handleChange}
                  placeholder="e.g. Website Development"
                  className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 focus:outline-none focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18]"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 mb-2">Slug *</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug || ""}
                  onChange={handleChange}
                  placeholder="e.g. website-development"
                  className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 focus:outline-none focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18]"
                  required
                  disabled={!isNew}
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 mb-2">Chapter Number (e.g. 01, 02)</label>
                <input
                  type="text"
                  name="number"
                  value={formData.number || ""}
                  onChange={handleChange}
                  placeholder="e.g. 01"
                  className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 focus:outline-none focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 mb-2">Short Label *</label>
                <input
                  type="text"
                  name="shortLabel"
                  value={formData.shortLabel || ""}
                  onChange={handleChange}
                  placeholder="e.g. Website Dev"
                  className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 focus:outline-none focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18]"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 mb-2">Category</label>
                <select
                  name="category"
                  value={isCustomCategory ? "custom" : formData.category}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "custom") {
                      setIsCustomCategory(true);
                      setFormData((prev: any) => ({ ...prev, category: "" }));
                    } else {
                      setIsCustomCategory(false);
                      setFormData((prev: any) => ({ ...prev, category: val }));
                    }
                  }}
                  className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 focus:outline-none focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18]"
                >
                  {existingCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                  {isCustomCategory && formData.category && !existingCategories.includes(formData.category) && (
                    <option value={formData.category}>{formData.category}</option>
                  )}
                  <option value="custom">Add Custom Category...</option>
                </select>
                {isCustomCategory && (
                  <div className="mt-3">
                    <label className="block text-[9px] font-extrabold uppercase tracking-wider text-zinc-400 mb-1">Custom Category Name</label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      placeholder="Enter custom category"
                      className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-200 bg-white dark:bg-zinc-950 focus:outline-none focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18]"
                      required
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 mb-2">Badge</label>
                <input
                  type="text"
                  name="badge"
                  value={formData.badge || ""}
                  onChange={handleChange}
                  placeholder="e.g. FOUNDATION & UX"
                  className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 focus:outline-none focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 mb-2">Accent Color Hex</label>
                <input
                  type="text"
                  name="accent"
                  value={formData.accent || ""}
                  onChange={handleChange}
                  placeholder="e.g. #A78BFA"
                  className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 focus:outline-none focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 mb-2">Display Order Priority</label>
                <input
                  type="number"
                  name="order"
                  value={formData.order ?? 0}
                  onChange={(e) => setFormData((prev: any) => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                  placeholder="0"
                  className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 focus:outline-none focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 mb-2">List Headline (Hero statement)</label>
              <input
                type="text"
                name="headline"
                value={formData.headline || ""}
                onChange={handleChange}
                placeholder="e.g. Build a digital foundation that works for your business."
                className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 focus:outline-none focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Description of the solution..."
                className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 focus:outline-none focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 mb-2">CTA Text</label>
                <input
                  type="text"
                  name="ctaText"
                  value={formData.ctaText}
                  onChange={handleChange}
                  placeholder="Request a Demo"
                  className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 focus:outline-none focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 mb-2">Trust Text</label>
                <input
                  type="text"
                  name="trustText"
                  value={formData.trustText}
                  onChange={handleChange}
                  placeholder="Trusted by restaurants..."
                  className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 focus:outline-none focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 mb-2">Icon SVG Name</label>
                <select
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 focus:outline-none focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18]"
                >
                  <option value="pos">Multi-Channel POS (pos)</option>
                  <option value="kds">Kitchen Display (kds)</option>
                  <option value="inventory">Inventory (inventory)</option>
                  <option value="controlSystem">Owner Dashboard (controlSystem)</option>
                  <option value="reports">Reports (reports)</option>
                  <option value="eventManagement">Event Management (eventManagement)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Why Choose */}
          <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <h3 className="text-sm font-black uppercase tracking-wider text-zinc-400">Why Choose Section</h3>
              <button
                type="button"
                onClick={() => addItem("whyChoose", { title: "", desc: "" })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 rounded-full text-zinc-650 dark:text-zinc-350 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#FF4F18]" />
                Add Point
              </button>
            </div>

            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 mb-2">Section Title</label>
              <input
                type="text"
                name="whyChooseTitle"
                value={formData.whyChooseTitle}
                onChange={handleChange}
                placeholder="e.g. Why choose Digitory?"
                className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 focus:outline-none focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18]"
              />
            </div>

            <div className="space-y-4">
              {formData.whyChoose.map((item: any, idx: number) => (
                <div key={idx} className="flex gap-4 items-start p-4 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-2xl border border-zinc-150 dark:border-zinc-800/50 relative group">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <label className="block text-[9px] font-extrabold uppercase tracking-wider text-zinc-400 mb-1">Point Title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateListItem("whyChoose", idx, "title", e.target.value)}
                        className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-200 bg-white dark:bg-zinc-950 dark:border-zinc-850 focus:outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[9px] font-extrabold uppercase tracking-wider text-zinc-400 mb-1">Description</label>
                      <input
                        type="text"
                        value={item.desc}
                        onChange={(e) => updateListItem("whyChoose", idx, "desc", e.target.value)}
                        className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-200 bg-white dark:bg-zinc-950 dark:border-zinc-850 focus:outline-none"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem("whyChoose", idx)}
                    className="p-2 rounded-xl text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all cursor-pointer shrink-0 mt-5"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {formData.whyChoose.length === 0 && (
                <p className="text-xs text-zinc-400 text-center py-4">No points defined. Click "Add Point" to create one.</p>
              )}
            </div>
          </div>

          {/* Section 2b: How Digitory's Layer Works */}
          <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm space-y-6">
            <h3 className="text-sm font-black uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">How Digitory's Layer Works</h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 mb-2">Layer Title</label>
                <input
                  type="text"
                  name="layerTitle"
                  value={formData.layerTitle || ""}
                  onChange={handleChange}
                  placeholder="e.g. One unified layer, *infinite control*"
                  className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 focus:outline-none focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 mb-2">Layer Description</label>
                <textarea
                  name="layerDesc"
                  value={formData.layerDesc || ""}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Description of the operating layer..."
                  className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 focus:outline-none focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Features / Simulator */}
          <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <h3 className="text-sm font-black uppercase tracking-wider text-zinc-400">Features / Simulation Modules</h3>
              <button
                type="button"
                onClick={() => addItem("features", { title: "", desc: "", speed: "", accuracy: "" })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 rounded-full text-zinc-650 dark:text-zinc-350 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#FF4F18]" />
                Add Feature
              </button>
            </div>

            <div className="space-y-4">
              {formData.features.map((item: any, idx: number) => (
                <div key={idx} className="p-4 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-2xl border border-zinc-150 dark:border-zinc-800/50 relative space-y-3">
                  <div className="flex justify-between items-center border-b border-zinc-200/50 dark:border-zinc-800 pb-2">
                    <span className="text-[10px] font-black text-zinc-400 uppercase">Feature #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeItem("features", idx)}
                      className="p-1.5 rounded-lg text-zinc-450 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-extrabold uppercase tracking-wider text-zinc-450 mb-1">Feature Title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateListItem("features", idx, "title", e.target.value)}
                        className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-200 bg-white dark:bg-zinc-950 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-extrabold uppercase tracking-wider text-zinc-450 mb-1">Description</label>
                      <input
                        type="text"
                        value={item.desc}
                        onChange={(e) => updateListItem("features", idx, "desc", e.target.value)}
                        className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-200 bg-white dark:bg-zinc-950 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-extrabold uppercase tracking-wider text-zinc-450 mb-1">Speed Stat</label>
                      <input
                        type="text"
                        value={item.speed || ""}
                        onChange={(e) => updateListItem("features", idx, "speed", e.target.value)}
                        placeholder="e.g. 5 seconds"
                        className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-200 bg-white dark:bg-zinc-950 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-extrabold uppercase tracking-wider text-zinc-450 mb-1">Accuracy Stat</label>
                      <input
                        type="text"
                        value={item.accuracy || ""}
                        onChange={(e) => updateListItem("features", idx, "accuracy", e.target.value)}
                        placeholder="e.g. 99.9%"
                        className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-200 bg-white dark:bg-zinc-950 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Section 4: Outcomes & Metrics */}
          <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <h3 className="text-sm font-black uppercase tracking-wider text-zinc-400">Outcomes & Metrics</h3>
              <button
                type="button"
                onClick={() => addItem("metricsItems", { value: "", label: "", desc: "" })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 rounded-full text-zinc-650 dark:text-zinc-350 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#FF4F18]" />
                Add Metric
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 mb-2">Metrics Section Title</label>
                <input
                  type="text"
                  name="metricsTitle"
                  value={formData.metricsTitle || ""}
                  onChange={handleChange}
                  placeholder="e.g. POS Performance Impact"
                  className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-zinc-200 bg-white dark:bg-zinc-950 focus:outline-none"
                />
              </div>

              <div className="space-y-4">
                {formData.metricsItems.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-4 items-start p-4 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-2xl border border-zinc-150 dark:border-zinc-800/50 relative group">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[9px] font-extrabold uppercase tracking-wider text-zinc-450 mb-1">Metric Value</label>
                        <input
                          type="text"
                          value={item.value}
                          onChange={(e) => updateListItem("metricsItems", idx, "value", e.target.value)}
                          placeholder="e.g. 25%"
                          className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-200 bg-white dark:bg-zinc-950 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-extrabold uppercase tracking-wider text-zinc-450 mb-1">Label</label>
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) => updateListItem("metricsItems", idx, "label", e.target.value)}
                          placeholder="e.g. Speed increase"
                          className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-200 bg-white dark:bg-zinc-950 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-extrabold uppercase tracking-wider text-zinc-455 mb-1">Short Description</label>
                        <input
                          type="text"
                          value={item.desc}
                          onChange={(e) => updateListItem("metricsItems", idx, "desc", e.target.value)}
                          placeholder="e.g. Shorter queues at counter"
                          className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-200 bg-white dark:bg-zinc-950 focus:outline-none"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem("metricsItems", idx)}
                      className="p-2 rounded-xl text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all cursor-pointer shrink-0 mt-5"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 5: FAQs */}
          <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <h3 className="text-sm font-black uppercase tracking-wider text-zinc-400">Frequently Asked Questions</h3>
              <button
                type="button"
                onClick={() => addItem("faqs", { question: "", answer: "" })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 rounded-full text-zinc-650 dark:text-zinc-350 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#FF4F18]" />
                Add FAQ
              </button>
            </div>

            <div className="space-y-4">
              {formData.faqs.map((item: any, idx: number) => (
                <div key={idx} className="p-4 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-2xl border border-zinc-150 dark:border-zinc-800/50 relative space-y-3">
                  <div className="flex justify-between items-center border-b border-zinc-200/50 dark:border-zinc-800 pb-1">
                    <span className="text-[10px] font-black text-zinc-400 uppercase">FAQ #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeItem("faqs", idx)}
                      className="p-1.5 rounded-lg text-zinc-450 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[9px] font-extrabold uppercase tracking-wider text-zinc-450 mb-1">Question</label>
                      <input
                        type="text"
                        value={item.question}
                        onChange={(e) => updateListItem("faqs", idx, "question", e.target.value)}
                        className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-200 bg-white dark:bg-zinc-950 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-extrabold uppercase tracking-wider text-zinc-450 mb-1">Answer</label>
                      <textarea
                        value={item.answer}
                        onChange={(e) => updateListItem("faqs", idx, "answer", e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-200 bg-white dark:bg-zinc-950 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Sidebar / Meta & Files */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Section: Image Upload & Preview */}
          <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm space-y-6">
            <h3 className="text-sm font-black uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">Solution Grid Image</h3>
            
            <div className="space-y-4">
              {formData.image ? (
                <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 aspect-video bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                  <img src={formData.image} alt="Preview" className="object-cover w-full h-full" />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 p-2 rounded-xl bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 text-center text-zinc-500 flex flex-col items-center justify-center aspect-video">
                  <Upload className="w-8 h-8 text-zinc-400 mb-2" />
                  <p className="text-[11px] font-bold">No Image Selected</p>
                </div>
              )}

              <div className="space-y-3">
                <label className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-850 text-xs font-bold text-zinc-650 dark:text-zinc-350 cursor-pointer select-none transition-all">
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin text-[#FF4F18]" /> : <Upload className="w-4 h-4 text-[#FF4F18]" />}
                  <span>{uploading ? "Uploading..." : "Upload Local Image"}</span>
                  <input type="file" onChange={handleImageUpload} accept="image/*" className="hidden" disabled={uploading} />
                </label>

                <div>
                  <label className="block text-[9px] font-extrabold uppercase tracking-wider text-zinc-500 mb-1">Direct Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-200 bg-white dark:bg-zinc-950 focus:outline-none"
                  />
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-zinc-450">Grid Card Overrides</span>
                  <div>
                    <label className="block text-[9px] font-extrabold uppercase tracking-wider text-zinc-500 mb-1">Grid Card Title</label>
                    <input
                      type="text"
                      name="gridTitle"
                      value={formData.gridTitle || ""}
                      onChange={handleChange}
                      placeholder="e.g. POS & Billing"
                      className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-200 bg-white dark:bg-zinc-950 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-extrabold uppercase tracking-wider text-zinc-500 mb-1">Grid Card Description</label>
                    <textarea
                      name="gridDesc"
                      value={formData.gridDesc || ""}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Billing that keeps up..."
                      className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-200 bg-white dark:bg-zinc-950 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Dynamic Highlight Panels */}
          <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm space-y-6">
            <h3 className="text-sm font-black uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">Operations Reveal</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 mb-1.5">Section Title</label>
                <input
                  type="text"
                  name="opsTitle"
                  value={formData.opsTitle || ""}
                  onChange={handleChange}
                  placeholder="Ops section header..."
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-200 bg-white dark:bg-zinc-950 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 mb-1.5">Section Paragraph Content</label>
                <textarea
                  name="opsParagraph"
                  value={formData.opsParagraph || ""}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Write the operations text..."
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-200 bg-white dark:bg-zinc-950 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 mb-1.5">Highlighted Words (comma separated)</label>
                <input
                  type="text"
                  name="opsHighlights"
                  value={formData.opsHighlights || ""}
                  onChange={handleChange}
                  placeholder="e.g. five, disconnected, missed"
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-200 bg-white dark:bg-zinc-950 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section: Extra Blocks */}
          <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm space-y-6">
            <h3 className="text-sm font-black uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">Extra Layout Columns</h3>
            
            <div className="space-y-6">
              {/* Extra Growth */}
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#FF4F18]">Scalability Column</span>
                <div>
                  <label className="block text-[9px] font-extrabold uppercase tracking-wider text-zinc-450 mb-1">Growth Title</label>
                  <input
                    type="text"
                    value={formData.extraGrowth?.title || ""}
                    onChange={(e) => handleNestedChange("extraGrowth", "title", e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-200 bg-white dark:bg-zinc-950 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-extrabold uppercase tracking-wider text-zinc-450 mb-1">Growth Description</label>
                  <textarea
                    value={formData.extraGrowth?.desc || ""}
                    onChange={(e) => handleNestedChange("extraGrowth", "desc", e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-200 bg-white dark:bg-zinc-950 focus:outline-none"
                  />
                </div>
              </div>

              {/* Owner's Choice */}
              <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#FF4F18]">Business Value Column</span>
                <div>
                  <label className="block text-[9px] font-extrabold uppercase tracking-wider text-zinc-450 mb-1">Value Title</label>
                  <input
                    type="text"
                    value={formData.extraOwnersChoice?.title || ""}
                    onChange={(e) => handleNestedChange("extraOwnersChoice", "title", e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-200 bg-white dark:bg-zinc-950 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-extrabold uppercase tracking-wider text-zinc-450 mb-1">Value Description</label>
                  <textarea
                    value={formData.extraOwnersChoice?.desc || ""}
                    onChange={(e) => handleNestedChange("extraOwnersChoice", "desc", e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-200 bg-white dark:bg-zinc-950 focus:outline-none"
                  />
                </div>
              </div>

              {/* Customer Success List */}
              <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#FF4F18]">Customer Success List</span>
                  <button
                    type="button"
                    onClick={() => addItem("supportItems", "")}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[9px] font-black uppercase bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 rounded-full text-zinc-650 dark:text-zinc-350 transition-all cursor-pointer"
                  >
                    <Plus className="w-3 h-3 text-[#FF4F18]" />
                    Add Bullet
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.supportItems.map((item: string, idx: number) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateListStringItem("supportItems", idx, e.target.value)}
                        placeholder="e.g. 24/7 Phone Support"
                        className="flex-1 px-3 py-1.5 text-xs font-semibold rounded-xl border border-zinc-200 bg-white dark:bg-zinc-950 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => removeItem("supportItems", idx)}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  {formData.supportItems.length === 0 && (
                    <p className="text-[11px] text-zinc-400 text-center py-2">No bullets defined.</p>
                  )}
                </div>
              </div>

              {/* Bottom CTA Block */}
              <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#FF4F18]">Bottom CTA Block</span>
                <div>
                  <label className="block text-[9px] font-extrabold uppercase tracking-wider text-zinc-450 mb-1">CTA Block Title</label>
                  <input
                    type="text"
                    value={formData.ctaBlock?.title || ""}
                    onChange={(e) => handleNestedChange("ctaBlock", "title", e.target.value)}
                    placeholder="Ready to upgrade?"
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-200 bg-white dark:bg-zinc-950 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-extrabold uppercase tracking-wider text-zinc-450 mb-1">CTA Block Description</label>
                  <textarea
                    value={formData.ctaBlock?.desc || ""}
                    onChange={(e) => handleNestedChange("ctaBlock", "desc", e.target.value)}
                    rows={2}
                    placeholder="Talk to us today"
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-200 bg-white dark:bg-zinc-950 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
