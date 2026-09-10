'use client';

import React, { useEffect, useState } from 'react';
import { seoService, RedirectRule } from '@/services/seo.service';
import { 
  Plus, 
  Search, 
  ArrowRight, 
  Trash2, 
  Edit2, 
  X, 
  Check, 
  RefreshCw, 
  Link2, 
  Zap, 
  AlertCircle,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default function SeoRedirectsPage() {
  const [redirects, setRedirects] = useState<RedirectRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | '301' | '302' | 'active' | 'inactive'>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<RedirectRule | null>(null);
  const [formSource, setFormSource] = useState('');
  const [formDestination, setFormDestination] = useState('');
  const [formType, setFormType] = useState<301 | 302>(301);
  const [formStatus, setFormStatus] = useState<'active' | 'inactive'>('active');
  const [formNotes, setFormNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchRedirects();
  }, []);

  const fetchRedirects = async () => {
    setLoading(true);
    try {
      const list = await seoService.getRedirects();
      setRedirects(list);
    } catch (err) {
      console.error('Failed to load redirects:', err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingRule(null);
    setFormSource('');
    setFormDestination('');
    setFormType(301);
    setFormStatus('active');
    setFormNotes('');
    setMessage('');
    setIsModalOpen(true);
  };

  const openEditModal = (rule: RedirectRule) => {
    setEditingRule(rule);
    setFormSource(rule.sourceUrl);
    setFormDestination(rule.destinationUrl);
    setFormType(rule.type);
    setFormStatus(rule.status);
    setFormNotes(rule.notes || '');
    setMessage('');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formSource.trim() || !formDestination.trim()) return;

    setSaving(true);
    setMessage('');
    try {
      await seoService.saveRedirect({
        id: editingRule?.id,
        sourceUrl: formSource.trim(),
        destinationUrl: formDestination.trim(),
        type: formType,
        status: formStatus,
        notes: formNotes.trim(),
        hits: editingRule?.hits || 0,
        createdAt: editingRule?.createdAt,
      });

      setMessage('✅ Redirect rule saved successfully!');
      await fetchRedirects();
      setTimeout(() => {
        setIsModalOpen(false);
      }, 700);
    } catch (err: any) {
      setMessage('❌ Failed to save redirect: ' + (err.message || 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, source: string) => {
    if (!confirm(`Are you sure you want to delete the redirect for "${source}"?`)) return;
    try {
      await seoService.deleteRedirect(id);
      await fetchRedirects();
    } catch (err) {
      console.error('Failed to delete redirect:', err);
    }
  };

  const handleToggleStatus = async (rule: RedirectRule) => {
    const nextStatus = rule.status === 'active' ? 'inactive' : 'active';
    // Optimistic update
    setRedirects(prev => prev.map(r => r.id === rule.id ? { ...r, status: nextStatus } : r));
    try {
      await seoService.toggleRedirectStatus(rule.id, nextStatus);
    } catch (err) {
      console.error('Failed to toggle status:', err);
      await fetchRedirects();
    }
  };

  // Metrics
  const count301 = redirects.filter(r => r.type === 301).length;
  const count302 = redirects.filter(r => r.type === 302).length;
  const countActive = redirects.filter(r => r.status === 'active').length;

  // Filtered List
  const filteredRedirects = redirects.filter(r => {
    // Type Filter
    if (filterType === '301' && r.type !== 301) return false;
    if (filterType === '302' && r.type !== 302) return false;
    if (filterType === 'active' && r.status !== 'active') return false;
    if (filterType === 'inactive' && r.status !== 'inactive') return false;

    // Search Query
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      r.sourceUrl?.toLowerCase().includes(q) ||
      r.destinationUrl?.toLowerCase().includes(q) ||
      r.notes?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6 md:p-10 space-y-8 animate-fade-in">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white flex items-center gap-2.5">
            <Link2 className="text-[#FF4F18]" size={26} />
            <span>301 & 302 URL Redirects</span>
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Manage permanent (301) and temporary (302) HTTP redirects to preserve SEO rankings and fix 404 links.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-[#FF4F18] text-white hover:bg-[#e03f0d] px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer"
        >
          <Plus size={16} />
          <span>Add Redirect Rule</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Redirect Rules', value: redirects.length, color: 'text-zinc-900 dark:text-white' },
          { label: '301 Permanent (SEO)', value: count301, color: 'text-blue-600 dark:text-blue-400' },
          { label: '302 Temporary', value: count302, color: 'text-purple-600 dark:text-purple-400' },
          { label: 'Active Rules', value: countActive, color: 'text-green-600 dark:text-green-400' },
        ].map(card => (
          <div key={card.label} className="bg-zinc-50/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 mb-1">{card.label}</p>
            <p className={`text-2xl font-black ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
          {[
            { id: 'all', label: 'All Rules', count: redirects.length },
            { id: '301', label: '301 Permanent', count: count301 },
            { id: '302', label: '302 Temporary', count: count302 },
            { id: 'active', label: 'Active Only', count: countActive },
            { id: 'inactive', label: 'Inactive', count: redirects.length - countActive },
          ].map(tab => {
            const isActive = filterType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#FF4F18] text-white shadow-sm'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  isActive ? 'bg-white/20 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Box */}
        <div className="relative group min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#FF4F18] transition-colors" size={16} />
          <input
            type="text"
            placeholder="Search source or target URL..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-[#FF4F18] focus:ring-1 focus:ring-[#FF4F18] text-xs font-medium dark:text-white transition-all"
          />
        </div>
      </div>

      {/* Redirects Table */}
      <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800/80 rounded-2xl bg-white dark:bg-zinc-900/40">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-900/80 text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800 uppercase text-[11px] tracking-wider font-extrabold">
            <tr>
              <th className="px-6 py-4">Source Path (Old URL)</th>
              <th className="px-3 py-4 text-center"></th>
              <th className="px-6 py-4">Destination Path (New URL)</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center text-zinc-400 font-semibold animate-pulse">
                  Loading redirect rules...
                </td>
              </tr>
            ) : filteredRedirects.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center text-zinc-500">
                  No redirect rules found. Click <strong>"Add Redirect Rule"</strong> to create your first rule!
                </td>
              </tr>
            ) : (
              filteredRedirects.map(rule => (
                <tr key={rule.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-900/50 transition-colors">
                  {/* Source URL */}
                  <td className="px-6 py-4">
                    <div className="font-mono text-xs font-bold text-zinc-900 dark:text-white truncate max-w-[240px]">
                      {rule.sourceUrl}
                    </div>
                    {rule.notes && (
                      <div className="text-[11px] text-zinc-400 mt-0.5 truncate max-w-[240px] italic">
                        {rule.notes}
                      </div>
                    )}
                  </td>

                  {/* Arrow Indicator */}
                  <td className="px-3 py-4 text-center text-zinc-400">
                    <ArrowRight size={16} />
                  </td>

                  {/* Destination URL */}
                  <td className="px-6 py-4">
                    <div className="font-mono text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate max-w-[240px] flex items-center gap-1.5">
                      <span>{rule.destinationUrl}</span>
                      {rule.destinationUrl.startsWith('http') && (
                        <ExternalLink size={12} className="text-zinc-400 shrink-0" />
                      )}
                    </div>
                  </td>

                  {/* Type Badge */}
                  <td className="px-6 py-4">
                    {rule.type === 301 ? (
                      <span className="inline-flex items-center gap-1 text-blue-700 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/30 px-2.5 py-1 rounded-md font-extrabold text-[11px]">
                        301 Permanent
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-purple-700 bg-purple-50 dark:text-purple-400 dark:bg-purple-950/30 px-2.5 py-1 rounded-md font-extrabold text-[11px]">
                        302 Temporary
                      </span>
                    )}
                  </td>

                  {/* Status Switch */}
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(rule)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                        rule.status === 'active'
                          ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400'
                          : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${rule.status === 'active' ? 'bg-green-500' : 'bg-zinc-400'}`} />
                      <span>{rule.status === 'active' ? 'Active' : 'Inactive'}</span>
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(rule)}
                        className="p-2 text-zinc-500 hover:text-[#FF4F18] dark:hover:text-[#FF4F18] rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                        title="Edit Redirect"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(rule.id, rule.sourceUrl)}
                        className="p-2 text-zinc-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
                        title="Delete Redirect"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Redirect Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-scale-in">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-zinc-150 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
              <div>
                <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">
                  {editingRule ? 'Edit Redirect Rule' : 'Create New Redirect Rule'}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Set source path and target destination path for HTTP redirects.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {message && (
                <div className={`p-3 rounded-xl text-xs font-bold ${
                  message.includes('✅') ? 'bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400'
                }`}>
                  {message}
                </div>
              )}

              {/* Source Path */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                  Source Path (Old URL) <span className="text-[#FF4F18]">*</span>
                </label>
                <input
                  type="text"
                  value={formSource}
                  onChange={e => setFormSource(e.target.value)}
                  placeholder="/old-blog-post or /services/legacy"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#FF4F18] dark:text-white"
                  required
                />
                <p className="text-[11px] text-zinc-400 mt-1">Relative path on your domain (e.g. `/old-page`).</p>
              </div>

              {/* Destination Path */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                  Destination Path (New URL) <span className="text-[#FF4F18]">*</span>
                </label>
                <input
                  type="text"
                  value={formDestination}
                  onChange={e => setFormDestination(e.target.value)}
                  placeholder="/blogs/new-post or https://external-domain.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#FF4F18] dark:text-white"
                  required
                />
                <p className="text-[11px] text-zinc-400 mt-1">Target destination path or full external URL.</p>
              </div>

              {/* Redirect Type (301 vs 302) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                  HTTP Redirect Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormType(301)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      formType === 301
                        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 font-bold'
                        : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    <div className="text-xs font-extrabold">301 Permanent</div>
                    <div className="text-[10px] opacity-80 mt-0.5 leading-tight">Passes SEO link authority to new URL.</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormType(302)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      formType === 302
                        ? 'border-purple-500 bg-purple-50/50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-400 font-bold'
                        : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    <div className="text-xs font-extrabold">302 Temporary</div>
                    <div className="text-[10px] opacity-80 mt-0.5 leading-tight">Temporary redirect for maintenance/campaigns.</div>
                  </button>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                  Status
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={formStatus === 'active'}
                      onChange={() => setFormStatus('active')}
                      className="accent-[#FF4F18]"
                    />
                    Active (Redirect is enabled)
                  </label>
                  <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      checked={formStatus === 'inactive'}
                      onChange={() => setFormStatus('inactive')}
                      className="accent-[#FF4F18]"
                    />
                    Inactive (Paused)
                  </label>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                  Notes / Rationale (Optional)
                </label>
                <input
                  type="text"
                  value={formNotes}
                  onChange={e => setFormNotes(e.target.value)}
                  placeholder="e.g. Migration from old CMS path"
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#FF4F18] dark:text-white"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-zinc-150 dark:border-zinc-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#FF4F18] text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-[#e03f0d] transition-all shadow-md disabled:opacity-50 cursor-pointer flex items-center gap-2"
                >
                  {saving ? 'Saving Rule...' : 'Save Redirect Rule'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
