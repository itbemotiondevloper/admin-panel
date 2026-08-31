"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";
import { ArrowLeft, Clock, Tag, Heart, Copy, Check, Share2, Flag, X, ChevronDown, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import RichEditor from "@/components/rich-text-editor/RichEditor";
import { commentsService } from "@/services/comments.service";
import { postsService } from "@/services/posts.service";
import { useAuth } from "@/hooks/useAuth";
import { signInAnonymously } from "firebase/auth";
import { auth, db } from "@/lib/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/* ─── Helpers ────────────────────────────────────────────────────── */
function formatDate(val: any) {
  if (!val) return "";
  const d = typeof val === "string" ? new Date(val) : val?.toDate?.() ?? new Date();
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}
function shareTwitter(title: string, url: string) {
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, "_blank");
}
function shareFacebook(url: string) {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
}
function shareLinkedIn(url: string) {
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
}
function shareWhatsApp(title: string, url: string) {
  window.open(`https://wa.me/?text=${encodeURIComponent(title + " " + url)}`, "_blank");
}

const ROMAN = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV"];
function roman(n: number) { return ROMAN[n] || String(n + 1); }

const REPORT_REASONS = [
  "Spam or misleading",
  "Hate speech or harassment",
  "Misinformation",
  "Inappropriate content",
  "Copyright violation",
  "Other",
];

/* ═══════════════════════════════════════════════════════════════════
   REPORT MODAL
══════════════════════════════════════════════════════════════════════ */
function ReportModal({
  commentId, commentAuthor, onClose,
}: { commentId: string; commentAuthor: string; onClose: () => void }) {
  const [selected, setSelected] = useState("");
  const [other, setOther] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const reason = selected === "Other" ? other.trim() : selected;
    if (!reason) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, "reports"), {
        commentId,
        commentAuthor,
        reason,
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch {
      alert("Failed to submit report. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md bg-white dark:bg-[#111113] rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Flag size={16} className="text-[#FF4F18]" />
            <h3 className="font-bold text-zinc-900 dark:text-white text-base">Report Comment</h3>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
            <X size={15} />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-14 h-14 bg-green-50 dark:bg-green-950/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={24} className="text-green-500" />
            </div>
            <h4 className="font-bold text-zinc-900 dark:text-white mb-1">Report submitted</h4>
            <p className="text-sm text-zinc-500 mb-5">Thank you. Our team will review this comment.</p>
            <button onClick={onClose} className="bg-[#FF4F18] text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-[#E03F0D] transition-all cursor-pointer">
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Why are you reporting this comment by <span className="font-semibold text-zinc-700 dark:text-zinc-300">{commentAuthor}</span>?</p>
            <div className="space-y-2">
              {REPORT_REASONS.map(reason => (
                <label key={reason} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selected === reason ? "border-[#FF4F18]/50 bg-[#FFF3EF] dark:bg-[#FF4F18]/10" : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"}`}>
                  <input type="radio" name="reason" value={reason} checked={selected === reason} onChange={() => setSelected(reason)} className="accent-[#FF4F18]" />
                  <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{reason}</span>
                </label>
              ))}
            </div>
            {selected === "Other" && (
              <textarea
                value={other}
                onChange={e => setOther(e.target.value)}
                placeholder="Describe the issue..."
                rows={3}
                required
                className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-[#FF4F18] focus:border-[#FF4F18] resize-none"
              />
            )}
            <div className="flex gap-3 pt-1">
              <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all cursor-pointer">
                Cancel
              </button>
              <button type="submit" disabled={!selected || submitting} className="flex-1 py-2.5 rounded-full bg-[#FF4F18] text-white text-sm font-bold hover:bg-[#E03F0D] transition-all disabled:opacity-50 cursor-pointer">
                {submitting ? "Submitting…" : "Submit Report"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   COMMENT ITEM — Digitory 2 card style + reply + report
══════════════════════════════════════════════════════════════════════ */
interface CommentItemProps {
  comment: any;
  replies: any[];
  blog: any;
  user: any;
  profile: any;
  isRealUser: boolean;
  likesCounts: Record<string, number>;
  userLikes: Record<string, boolean>;
  onLikeToggle: (id: string) => void;
  onReplySubmitted: (r: any) => void;
}

function CommentItem({ comment, replies, blog, user, profile, isRealUser, likesCounts, userLikes, onLikeToggle, onReplySubmitted }: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const [replyText, setReplyText] = useState("");
  const [submittingReply, setSubmittingReply] = useState(false);
  const [reportTarget, setReportTarget] = useState<null | { id: string; author: string }>(null);

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !user || user.isAnonymous) return;
    setSubmittingReply(true);
    try {
      const name = profile?.name || user.displayName || user.email?.split("@")[0] || "User";
      const r = await commentsService.submitReply({ post: blog._id, postTitle: blog.title, userId: user.uid, name, text: replyText, parentId: comment._id });
      onReplySubmitted(r);
      setReplyText("");
      setShowReplyForm(false);
    } catch (err: any) { alert(err.message || "Failed to post reply"); }
    finally { setSubmittingReply(false); }
  };

  return (
    <>
      {reportTarget && <ReportModal commentId={reportTarget.id} commentAuthor={reportTarget.author} onClose={() => setReportTarget(null)} />}
      <div className="bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/40 dark:border-zinc-800/60 p-6 rounded-[24px] flex flex-col sm:flex-row gap-5">
        {/* Avatar */}
        <div className="w-12 h-12 bg-[#FFF3EF] dark:bg-[#FF4F18]/10 text-[#FF4F18] rounded-full flex items-center justify-center font-extrabold text-lg shrink-0 border border-orange-100/50 dark:border-transparent select-none">
          {comment.name?.charAt(0)?.toUpperCase() || "?"}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header row */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <h4 className="font-extrabold text-zinc-900 dark:text-white text-base">{comment.name}</h4>
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-semibold mt-0.5">{formatDate(comment.createdAt)}</p>
            </div>
            {/* Actions: like + report */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => onLikeToggle(comment._id)}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${userLikes[comment._id] ? "text-red-500" : "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"}`}
              >
                <Heart size={12} className={userLikes[comment._id] ? "fill-red-500" : ""} />
                <span>{likesCounts[comment._id] || 0}</span>
              </button>
              <button
                onClick={() => setReportTarget({ id: comment._id, author: comment.name })}
                title="Report this comment"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-300 dark:text-zinc-600 hover:text-[#FF4F18] hover:bg-[#FFF3EF] dark:hover:bg-[#FF4F18]/10 transition-all cursor-pointer"
              >
                <Flag size={12} />
              </button>
            </div>
          </div>

          {/* Text */}
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm mb-3">{comment.text}</p>

          {/* Reply button */}
          <div className="flex items-center gap-4">
            {isRealUser && (
              <button onClick={() => setShowReplyForm(v => !v)} className="text-[11px] font-bold text-zinc-400 hover:text-[#FF4F18] dark:text-zinc-600 dark:hover:text-[#FF4F18] transition-colors cursor-pointer">
                {showReplyForm ? "Cancel" : "↩ Reply"}
              </button>
            )}
            {replies.length > 0 && (
              <button onClick={() => setShowReplies(v => !v)} className="flex items-center gap-1 text-[11px] font-bold text-zinc-400 hover:text-[#FF4F18] dark:text-zinc-600 dark:hover:text-[#FF4F18] transition-colors cursor-pointer">
                <ChevronDown size={12} className={`transition-transform ${showReplies ? "rotate-180" : ""}`} />
                {replies.length} {replies.length === 1 ? "reply" : "replies"}
              </button>
            )}
          </div>

          {/* Inline reply form */}
          {showReplyForm && (
            <div className="mt-4">
              {isRealUser ? (
                <form onSubmit={handleReply} className="space-y-3">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    Replying as <span className="text-zinc-600 dark:text-zinc-300 normal-case tracking-normal">{profile?.name || user?.displayName || user?.email?.split("@")[0] || "User"}</span>
                  </div>
                  <textarea
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    placeholder={`Reply to ${comment.name}…`}
                    rows={3}
                    required
                    autoFocus
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#FF4F18] focus:border-[#FF4F18] transition-all resize-none text-sm font-semibold"
                  />
                  <div className="flex gap-2">
                    <button type="submit" disabled={submittingReply} className="bg-[#FF4F18] text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-[#E03F0D] disabled:opacity-50 transition-all cursor-pointer">
                      {submittingReply ? "Posting…" : "Post Reply"}
                    </button>
                    <button type="button" onClick={() => { setShowReplyForm(false); setReplyText(""); }} className="px-6 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-500 hover:text-zinc-800 transition-all cursor-pointer">
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="mt-2 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/20 text-center">
                  <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-2">Sign in to reply</p>
                  <Link href={`/login?required=comment&redirect=${encodeURIComponent(typeof window !== "undefined" ? window.location.pathname : "/blogs")}`} className="inline-block bg-[#FF4F18] text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#E03F0D] transition-all">Sign In</Link>
                </div>
              )}
            </div>
          )}

          {/* Nested replies */}
          {showReplies && replies.length > 0 && (
            <div className="mt-4 space-y-3 pl-4 border-l-2 border-zinc-100 dark:border-zinc-800">
              {replies.map((reply: any) => (
                <div key={reply._id} className="flex gap-3">
                  <div className="w-8 h-8 bg-[#FFF3EF] dark:bg-[#FF4F18]/10 text-[#FF4F18] rounded-full flex items-center justify-center font-extrabold text-sm shrink-0 select-none">
                    {reply.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="font-extrabold text-zinc-900 dark:text-white text-sm">{reply.name}</span>
                        <span className="ml-2 text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold">{formatDate(reply.createdAt)}</span>
                      </div>
                      <button onClick={() => setReportTarget({ id: reply._id, author: reply.name })} title="Report" className="text-zinc-300 dark:text-zinc-700 hover:text-[#FF4F18] transition-colors cursor-pointer">
                        <Flag size={11} />
                      </button>
                    </div>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mt-1">{reply.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════════════ */
function BlogDetails({ blog }: { blog: any }) {
  const { user, profile, logout } = useAuth();

  const readTime = useMemo(() => Math.max(1, Math.ceil((blog.content?.length || 0) / 100)), [blog.content]);
  const authorName = typeof blog.author === "object" && blog.author ? blog.author.name : (blog.author || "Admin");
  const isRealUser = !!(user && !user.isAnonymous);
  const currentUrl = typeof window !== "undefined" ? window.location.href : `https://digitory.io/blogs/${blog.slug}`;

  // Comments
  const [comments, setComments] = useState<any[]>([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [newCommentName, setNewCommentName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentsLoaded, setCommentsLoaded] = useState(false);

  // Comment likes
  const [likesCounts, setLikesCounts] = useState<Record<string, number>>({});
  const [userLikes, setUserLikes] = useState<Record<string, boolean>>({});

  // Article like
  const [articleLiked, setArticleLiked] = useState(false);
  const [articleLikeCount, setArticleLikeCount] = useState<number>(blog.likesCount || 0);

  // Share copy
  const [copied, setCopied] = useState(false);

  // TOC
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeHeadingId, setActiveHeadingId] = useState("");

  // Related posts
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

  /* --- Load comments --- */
  useEffect(() => {
    if (!blog._id) return;
    commentsService.getCommentsByPost(blog._id)
      .then(c => { setComments(c); setCommentsLoaded(true); })
      .catch(console.error);
  }, [blog._id]);

  /* --- Pre-fill name from profile --- */
  useEffect(() => {
    if (isRealUser && !newCommentName) {
      setNewCommentName(profile?.name || user?.displayName || user?.email?.split("@")[0] || "");
    }
  }, [isRealUser, profile, user]);

  /* --- Comment likes --- */
  useEffect(() => {
    if (!commentsLoaded) return;
    comments.forEach(async comment => {
      try {
        const count = await commentsService.getLikesCount(comment._id);
        setLikesCounts(p => ({ ...p, [comment._id]: count }));
        if (user) {
          const liked = await commentsService.hasUserLiked(comment._id, user.uid);
          setUserLikes(p => ({ ...p, [comment._id]: liked }));
        }
      } catch { /* silent */ }
    });
  }, [commentsLoaded, comments, user]);

  /* --- Related posts --- */
  useEffect(() => {
    postsService.getPosts({ status: "Published" })
      .then((all: any[]) => {
        const others = all.filter((p: any) => p._id !== blog._id);
        const sameCat = others.filter((p: any) => (p.categoryName || p.category?.name) === (blog.categoryName || blog.category?.name));
        setRelatedPosts((sameCat.length >= 2 ? sameCat : others).slice(0, 3));
      })
      .catch(console.error);
  }, [blog._id, blog.categoryName, blog.category]);

  /* --- TOC extraction --- */
  useEffect(() => {
    const timer = setTimeout(() => {
      const els = document.querySelectorAll(".ProseMirror h2, .ProseMirror h3");
      const extracted: { id: string; text: string; level: number }[] = [];
      els.forEach((el, i) => {
        const text = el.textContent || "";
        const id = (text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `heading`) + `-${i}`;
        el.setAttribute("id", id);
        (el as HTMLElement).style.scrollMarginTop = "110px";
        extracted.push({ id, text, level: el.tagName === "H2" ? 2 : 3 });
      });
      setHeadings(extracted);
    }, 300);
    return () => clearTimeout(timer);
  }, [blog.content]);

  /* --- Scrollspy --- */
  useEffect(() => {
    if (!headings.length) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveHeadingId(e.target.id); }),
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 }
    );
    headings.forEach(h => { const el = document.getElementById(h.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [headings]);

  const handleHeadingClick = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) { window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 100, behavior: "smooth" }); setActiveHeadingId(id); }
  }, []);

  const headingListWithRoman = useMemo<{ id: string; text: string; level: number; roman?: string }[]>(() => {
    let h2Count = 0;
    return headings.map(h => h.level === 2 ? { ...h, roman: roman(h2Count++) } : { ...h });
  }, [headings]);

  /* --- Submit comment --- */
  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !user || user.isAnonymous) return;
    setIsSubmitting(true);
    try {
      const name = profile?.name || user.displayName || user.email?.split("@")[0] || newCommentName || "User";
      const newComment = await commentsService.submitComment({ post: blog._id, postTitle: blog.title, userId: user.uid, name, text: newCommentText });
      setComments(prev => [newComment, ...prev]);
      setNewCommentText("");
    } catch (err: any) { alert(err.message || "Failed to post comment"); }
    finally { setIsSubmitting(false); }
  };

  /* --- Comment like toggle --- */
  const handleLikeToggle = async (commentId: string) => {
    try {
      let activeUser = user;
      if (!activeUser) { const res = await signInAnonymously(auth); activeUser = res.user; }
      if (userLikes[commentId]) {
        await commentsService.unlikeComment(commentId, activeUser.uid);
        setUserLikes(p => ({ ...p, [commentId]: false }));
        setLikesCounts(p => ({ ...p, [commentId]: Math.max(0, (p[commentId] || 0) - 1) }));
      } else {
        await commentsService.likeComment(commentId, activeUser.uid);
        setUserLikes(p => ({ ...p, [commentId]: true }));
        setLikesCounts(p => ({ ...p, [commentId]: (p[commentId] || 0) + 1 }));
      }
    } catch (err) { console.error(err); }
  };

  /* --- Article like --- */
  const handleArticleLike = async () => {
    try {
      if (!user) { await signInAnonymously(auth); }
      setArticleLiked(v => !v);
      setArticleLikeCount(c => articleLiked ? Math.max(0, c - 1) : c + 1);
    } catch (err) { console.error(err); }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  /* ══════════════════════════════════════════════ RENDER ══════════════════════════════════════════════ */
  return (
    <article className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 text-left">

      {/* Back */}
      <div className="mb-8">
        <Link href="/blogs" className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-[#FF4F18] transition-colors group">
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" /> All Articles
        </Link>
      </div>

      {/* Two-column layout: Left TOC + Right content */}
      <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 items-start">

        {/* ─── LEFT: Sticky TOC (Cofounder Editorial Style) ─── */}
        <aside className="hidden lg:block w-[260px] shrink-0 sticky top-28 max-h-[calc(100vh-140px)] overflow-y-auto scrollbar-none space-y-6 pr-2">
          {/* Subtitle & CTA Button */}
          <div className="space-y-3 pb-5 border-b border-zinc-200/80 dark:border-zinc-800">
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 leading-snug">
              How to run a company with Digitory
            </p>
            <Link
              href="/request-demo"
              className="inline-flex items-center gap-1.5 bg-[#1E1E1E] dark:bg-white text-white dark:text-zinc-950 px-4 py-2 rounded-xl text-xs font-bold shadow-xs hover:bg-black dark:hover:bg-zinc-100 transition-all group cursor-pointer"
            >
              <span>Try in Digitory</span>
              <span className="text-xs transition-transform group-hover:translate-x-0.5">&rarr;</span>
            </Link>
          </div>

          {/* Grouped Table of Contents */}
          <nav className="space-y-4">
            <div className="space-y-2">
              <div className="text-xs font-extrabold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                <span className="text-zinc-400 font-bold text-[11px]">(I)</span>
                <span>On this page</span>
              </div>

              <div className="space-y-1 pt-1">
                {headingListWithRoman.map(h => {
                  const active = activeHeadingId === h.id;
                  return (
                    <div key={h.id} className={h.level === 3 ? "pl-4" : ""}>
                      <a
                        href={`#${h.id}`}
                        onClick={e => handleHeadingClick(e, h.id)}
                        className={`group flex items-center gap-2.5 text-xs py-1.5 px-3 rounded-xl transition-all ${
                          active
                            ? "border border-zinc-900 dark:border-zinc-300 bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white font-extrabold shadow-xs"
                            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white font-medium"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 border transition-all ${
                            active
                              ? "border-[#0088FF] bg-[#0088FF]"
                              : "border-zinc-400 dark:border-zinc-600 bg-transparent group-hover:border-zinc-600"
                          }`}
                        />
                        <span className="truncate">{h.text}</span>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </nav>
        </aside>

        {/* ─── RIGHT: Article ─── */}
        <div className="flex-1 min-w-0">

          {/* Mobile TOC */}
          {headings.length >= 2 && (
            <div className="lg:hidden mb-8 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 shadow-xs">
              <details className="group">
                <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none font-bold text-[11px] uppercase tracking-wider text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900">
                  <span>On this page</span>
                  <ChevronDown size={14} className="transition-transform group-open:rotate-180 text-zinc-400" />
                </summary>
                <nav className="px-4 pb-4 pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60 space-y-2">
                  {headingListWithRoman.map(h => (
                    <a key={h.id} href={`#${h.id}`} onClick={e => handleHeadingClick(e, h.id)} className={`flex items-center gap-2 text-xs transition-colors py-1 ${h.level === 3 ? "pl-4 text-zinc-500" : "font-semibold"} ${activeHeadingId === h.id ? "text-[#0088FF] font-bold" : "text-zinc-700 dark:text-zinc-300"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${activeHeadingId === h.id ? "bg-[#0088FF]" : "bg-zinc-300 dark:bg-zinc-700"}`} />
                      <span>{h.text}</span>
                    </a>
                  ))}
                </nav>
              </details>
            </div>
          )}

          {/* ══ HEADER ══ */}
          <header className="mb-10">
            {/* Chapter / Category Pill Badge */}
            <div className="mb-4">
              <span className="inline-block bg-zinc-200/70 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide border border-zinc-300/40 dark:border-zinc-700/40">
                {typeof blog.category === "object" && blog.category ? blog.category.name : (blog.category || blog.categoryName || "Chapter I")}
              </span>
            </div>

            {/* Main Article Title */}
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.12] mb-6">
              {blog.title}
            </h1>

            {/* Author + date + read time + share row */}
            <div className="flex items-center justify-between flex-wrap gap-4 pt-2 border-t border-zinc-200/80 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  {authorName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-zinc-900 dark:text-white text-xs">{authorName}</p>
                  <p className="text-[11px] text-zinc-500 font-medium flex items-center gap-2 mt-0.5">
                    <span>{formatDate(blog.createdAt)}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {readTime} min read</span>
                  </p>
                </div>
              </div>

              {/* Share buttons */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider">Share:</span>
                <button onClick={() => shareTwitter(blog.title, currentUrl)} title="Share on X/Twitter" className="w-8 h-8 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 transition-all font-bold text-[10px] cursor-pointer">TW</button>
                <button onClick={() => shareFacebook(currentUrl)} title="Share on Facebook" className="w-8 h-8 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 transition-all font-bold text-[10px] cursor-pointer">FB</button>
                <button onClick={() => shareLinkedIn(currentUrl)} title="Share on LinkedIn" className="w-8 h-8 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 transition-all font-bold text-[10px] cursor-pointer">LI</button>
                <button onClick={() => shareWhatsApp(blog.title, currentUrl)} title="Share on WhatsApp" className="w-8 h-8 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 transition-all font-bold text-[10px] cursor-pointer">WA</button>
                <button onClick={handleCopyLink} title="Copy link" className="w-8 h-8 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 transition-all cursor-pointer">
                  {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                </button>
              </div>
            </div>
          </header>

          {/* ══ FEATURED IMAGE ══ */}
          {blog.featuredImage && (
            <div className="w-full aspect-[21/9] bg-zinc-200 dark:bg-zinc-900 rounded-2xl overflow-hidden mb-12 relative border border-zinc-300/80 dark:border-zinc-800 shadow-xs">
              <Image src={blog.featuredImage} alt={blog.title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 1200px" />
            </div>
          )}

          {/* ══ EXCERPT ══ */}
          {blog.excerpt && (
            <div className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 font-normal leading-relaxed mb-10 border-l-2 border-zinc-900 dark:border-zinc-300 pl-6">
              {blog.excerpt}
            </div>
          )}

          {/* ══ RICH CONTENT ══ */}
          <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-200
            [&_.ProseMirror]:bg-transparent [&_.ProseMirror]:border-none [&_.ProseMirror]:text-zinc-800 dark:[&_.ProseMirror]:text-zinc-200 [&_.ProseMirror]:px-0 [&_.ProseMirror]:py-0 [&_.ProseMirror]:min-h-0 focus:outline-none select-none
            [&_p]:text-[17px] [&_p]:leading-[1.85] [&_p]:text-zinc-700 dark:[&_p]:text-zinc-300 [&_p]:mb-6
            [&_h2]:text-[26px] [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-zinc-900 dark:[&_h2]:text-white [&_h2]:mt-12 [&_h2]:mb-4
            [&_h3]:text-[21px] [&_h3]:font-semibold [&_h3]:text-zinc-900 dark:[&_h3]:text-white [&_h3]:mt-8 [&_h3]:mb-3
            [&_blockquote]:border-l-2 [&_blockquote]:border-zinc-900 dark:[&_blockquote]:border-zinc-300 [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:my-8 [&_blockquote]:text-zinc-700 dark:[&_blockquote]:text-zinc-300
            [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-6 [&_ul]:space-y-2.5
            [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-6 [&_ol]:space-y-2.5
            [&_li]:text-[16px] [&_li]:leading-relaxed [&_li]:text-zinc-700 dark:[&_li]:text-zinc-300
            [&_img]:rounded-2xl [&_img]:border [&_img]:border-zinc-300/80 dark:[&_img]:border-zinc-800 [&_img]:shadow-xs [&_img]:my-8
            [&_a]:text-[#0088FF] [&_a]:no-underline hover:[&_a]:underline [&_a]:font-semibold
          ">
            <RichEditor defaultValue={blog.content} notionMode={true} editable={false} />
          </div>

          {/* ══ TAGS ══ */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-16 pt-8 border-t border-zinc-200/60 dark:border-zinc-800/60">
              <div className="flex items-center gap-3 flex-wrap">
                <Tag size={16} className="text-zinc-400 dark:text-zinc-550" />
                {blog.tags.map((tag: any, idx: number) => (
                  <span key={idx} className="bg-zinc-100 dark:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300 px-4 py-1.5 rounded-full text-xs font-extrabold hover:bg-[#FFF3EF] dark:hover:bg-[#FF4F18]/15 hover:text-[#FF4F18] dark:hover:text-[#FF4F18] transition-colors border border-transparent hover:border-orange-100 dark:hover:border-transparent cursor-pointer">
                    {tag.tag || tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ══ ARTICLE LIKE ══ */}
          <div className="mt-10 pt-8 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center gap-4">
            <button
              onClick={handleArticleLike}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all text-sm font-bold cursor-pointer select-none ${articleLiked ? "border-red-300 bg-red-50 dark:bg-red-950/20 text-red-500" : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-red-300 hover:text-red-500"}`}
            >
              <Heart size={15} className={articleLiked ? "fill-red-500 text-red-500" : ""} />
              <span>{articleLiked ? "Liked" : "Like this article"}</span>
              {articleLikeCount > 0 && <span className="ml-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold">{articleLikeCount}</span>}
            </button>
            <span className="text-xs text-zinc-400 dark:text-zinc-600">Did you find this useful?</span>
          </div>

          {/* ══ DISCUSSION / COMMENTS ══ */}
          <div className="mt-16 pt-12 border-t border-zinc-200/60 dark:border-zinc-800/60 space-y-10">
            <h3 className="text-2xl font-[850] text-[#111111] dark:text-white tracking-tight">
              Discussion ({comments.filter((c: any) => !c.parentId).length})
            </h3>

            {/* Comment list */}
            <div className="space-y-6">
              {comments.filter((c: any) => !c.parentId).map((comment: any) => (
                <CommentItem
                  key={comment._id}
                  comment={comment}
                  replies={comments.filter((r: any) => r.parentId === comment._id)}
                  blog={blog}
                  user={user}
                  profile={profile}
                  isRealUser={isRealUser}
                  likesCounts={likesCounts}
                  userLikes={userLikes}
                  onLikeToggle={handleLikeToggle}
                  onReplySubmitted={reply => setComments(prev => [...prev, reply])}
                />
              ))}
              {commentsLoaded && comments.filter((c: any) => !c.parentId).length === 0 && (
                <p className="text-zinc-400 dark:text-zinc-500 italic text-sm">No comments yet. Be the first to share your thoughts!</p>
              )}
            </div>

            {/* Add Comment Form */}
            <div className="bg-white dark:bg-zinc-900/40 p-6 md:p-8 rounded-[28px] border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-6 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <div>
                  <h4 className="font-[850] text-zinc-900 dark:text-white text-xl tracking-tight">Add a comment</h4>
                  {isRealUser && (
                    <p className="text-xs text-zinc-500 font-medium mt-0.5">
                      Signed in as <span className="font-bold text-zinc-800 dark:text-zinc-200">{profile?.name || user?.displayName || user?.email}</span>
                    </p>
                  )}
                </div>

                {isRealUser && (
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        if (logout) {
                          await logout();
                        } else {
                          const { signOut } = await import("firebase/auth");
                          await signOut(auth);
                        }
                      } catch (err) {
                        console.error("Failed to sign out:", err);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all border border-zinc-200 dark:border-zinc-800 cursor-pointer"
                  >
                    <LogOut size={13} />
                    <span>Sign Out</span>
                  </button>
                )}
              </div>

              {isRealUser ? (
                <form onSubmit={handleAddComment} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">Your Name</label>
                    <input
                      type="text"
                      value={profile?.name || user?.displayName || user?.email?.split("@")[0] || newCommentName}
                      onChange={e => setNewCommentName(e.target.value)}
                      placeholder="John Doe"
                      required
                      readOnly={!!(profile?.name || user?.displayName)}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#FF4F18] focus:border-[#FF4F18] transition-all text-sm font-semibold read-only:bg-zinc-50 dark:read-only:bg-zinc-900 read-only:cursor-default"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">Your Comment</label>
                    <textarea
                      value={newCommentText}
                      onChange={e => setNewCommentText(e.target.value)}
                      placeholder="Share your thoughts..."
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#FF4F18] focus:border-[#FF4F18] transition-all resize-none text-sm font-semibold"
                    />
                  </div>
                  <button type="submit" disabled={isSubmitting} className="mt-2 self-start bg-[#FF4F18] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#E03F0D] transition-all shadow-[0_8px_20px_rgba(255,79,24,0.35)] hover:shadow-[0_10px_24px_rgba(255,79,24,0.45)] disabled:opacity-50 active:scale-[0.98] cursor-pointer text-sm">
                    {isSubmitting ? "Posting..." : "Post Comment"}
                  </button>
                </form>
              ) : (
                <div className="text-center py-4">
                  <p className="text-zinc-500 dark:text-zinc-400 font-semibold mb-4 text-sm">Sign in to join the discussion</p>
                  <Link href={`/login?required=comment&redirect=${encodeURIComponent(typeof window !== "undefined" ? window.location.pathname : `/blogs/${blog.slug}`)}`} className="inline-block bg-[#FF4F18] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#E03F0D] transition-all shadow-[0_8px_20px_rgba(255,79,24,0.35)] text-sm">
                    Sign In to Comment
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* ══ RELATED POSTS ══ */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-12 border-t border-zinc-200/60 dark:border-zinc-800/60">
              <div className="flex items-center gap-2 mb-2">
                <Share2 size={14} className="text-[#FF4F18]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF4F18]">More Reads</span>
              </div>
              <h2 className="text-2xl font-[850] text-zinc-950 dark:text-white tracking-tight mb-8">You might also like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((post: any) => (
                  <Link key={post._id || post.id} href={`/blogs/${post.slug}`} className="group flex flex-col gap-3 p-5 rounded-[24px] border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/30 hover:border-[#FF4F18]/30 hover:shadow-sm transition-all">
                    {post.featuredImage && (
                      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                        <Image src={post.featuredImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 640px) 100vw, 33vw" />
                      </div>
                    )}
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF4F18]">{post.categoryName || post.category?.name || "Article"}</span>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white leading-snug group-hover:text-[#FF4F18] transition-colors line-clamp-2">{post.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>{/* end article column */}
      </div>{/* end two-column */}
    </article>
  );
}

export default BlogDetails;
