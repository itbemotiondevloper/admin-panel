import { JSONContent } from "@tiptap/react";
import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Schema = yup.object({
  title: yup.string().required("title is required"),
  slug: yup.string().required("slug is required"),
  excerpt: yup.string().required("excerpt is required"),
  featuredImage: yup
    .mixed<File | string>()
    .required("cover image is required"),
  category: yup.string().optional(),
  author: yup.string().optional(),
  tags: yup
    .array()
    .of(yup.object({ tag: yup.string().required("tag is required") }))
    .optional(),
  content: yup.string().required("content is required"),
  status: yup.string().oneOf(['Draft', 'Published']).default('Draft'),
  seo_title: yup.string().optional(),
  meta_description: yup.string().optional(),
  focus_keyword: yup.string().optional(),
  canonical_url: yup.string().optional(),
});

export type FormValues = yup.InferType<typeof Schema>;

export type PostRecord = {
  _id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  category?: any;
  author?: any;
  status: 'Draft' | 'Published';
  tags?: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
    keywords?: string[];
  };
};

type FormSubmitHandler = (data: any) => void;

export function useBlogForm(
  submitHandler: FormSubmitHandler,
  item?: PostRecord
) {
  // We assume content is HTML string in Digitory
  const [description, setDescription] = useState<string>(item?.content || "");

  const form = useForm<FormValues>({
    resolver: yupResolver(Schema) as Resolver<FormValues>,
    defaultValues: {
      title: item?.title || "",
      slug: item?.slug || "",
      excerpt: item?.excerpt || "",
      content: item?.content || "",
      featuredImage: item?.featuredImage || "",
      category: item?.category?._id || item?.category || "",
      author: item?.author?._id || item?.author || "",
      tags: item?.tags?.map(t => ({ tag: t })) || [],
      status: item?.status || 'Draft',
      seo_title: item?.seo?.metaTitle || "",
      meta_description: item?.seo?.metaDescription || "",
      canonical_url: item?.seo?.canonicalUrl || "",
      focus_keyword: item?.seo?.keywords?.[0] || "",
    },
  });

  const handleSubmit = async (data: FormValues) => {
    const submitData = {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: description,
      featuredImage: typeof data.featuredImage === 'string' ? data.featuredImage : undefined,
      category: data.category,
      author: data.author || undefined,
      status: data.status,
      tags: data.tags?.map(t => t.tag) || [],
      seo: {
        metaTitle: data.seo_title,
        metaDescription: data.meta_description,
        canonicalUrl: data.canonical_url,
        keywords: data.focus_keyword ? [data.focus_keyword] : []
      }
    };

    return submitData;
  };

  return { description, setDescription, form, handleSubmit };
}
