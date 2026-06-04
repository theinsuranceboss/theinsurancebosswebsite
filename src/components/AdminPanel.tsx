import React, { useState } from "react";
import { WebsiteConfig, SubwebsiteCategory, Subwebsite } from "../types";
import { X, Save, RefreshCw, Layers, Sliders, Type, Link, Image, Trash2, Plus, Info, Layout } from "lucide-react";

interface AdminPanelProps {
  config: WebsiteConfig;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newConfig: WebsiteConfig) => void;
}

export default function AdminPanel({ config, isOpen, onClose, onSave }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<"global" | "hero" | "pillars" | "splits" | "subwebsites">("global");
  const [localConfig, setLocalConfig] = useState<WebsiteConfig>({ ...config });
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  // Presets of beautiful dark backgrounds they can easily choose instead of uploading a direct URL
  const bgPresetOptions = [
    { label: "Dark Tokyo Skyline", url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80&w=1920" },
    { label: "Midnight Office", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920" },
    { label: "Dark HighTech Desk", url: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=1920" },
    { label: "Graph Analytics", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
    { label: "Meeting Shaking Hands", url: "https://images.unsplash.com/photo-1521791136364-728647415313?auto=format&fit=crop&q=80&w=800" }
  ];

  const handleUpdateGlobal = (field: keyof WebsiteConfig, value: any) => {
    setLocalConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateNested = (section: keyof WebsiteConfig, field: string, value: any) => {
    setLocalConfig((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [field]: value,
      },
    }));
  };

  const handleUpdatePillar = (pillarName: "coverage" | "agents" | "partners", field: string, value: any) => {
    setLocalConfig((prev) => ({
      ...prev,
      pillars: {
        ...prev.pillars,
        [pillarName]: {
          ...prev.pillars[pillarName],
          [field]: value,
        },
      },
    }));
  };

  const handleSave = () => {
    onSave(localConfig);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleResetDefaults = () => {
    if (confirm("Are you sure you want to revert all changes to standard website defaults?")) {
      // Import on demand to prevent circular reference or just use a standard quick refresh
      localStorage.removeItem("the_insurance_boss_config");
      window.location.reload();
    }
  };

  // Subwebsites category modifiers
  const handleEditSubwebsite = (catIdx: number, itemIdx: number, field: keyof Subwebsite, value: string) => {
    const updated = [...localConfig.subwebsites];
    updated[catIdx].items[itemIdx] = {
      ...updated[catIdx].items[itemIdx],
      [field]: value
    };
    setLocalConfig((prev) => ({ ...prev, subwebsites: updated }));
  };

  const handleAddSubwebsite = (catIdx: number) => {
    const updated = [...localConfig.subwebsites];
    updated[catIdx].items.push({
      label: "New Subwebsite Line",
      url: "https://theinsuranceboss.com/"
    });
    setLocalConfig((prev) => ({ ...prev, subwebsites: updated }));
  };

  const handleRemoveSubwebsite = (catIdx: number, itemIdx: number) => {
    const updated = [...localConfig.subwebsites];
    updated[catIdx].items.splice(itemIdx, 1);
    setLocalConfig((prev) => ({ ...prev, subwebsites: updated }));
  };

  return (
    <>
      {/* Backdrop shade overlay */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity" onClick={onClose} />
      
      {/* Drawer slide-out */}
      <div className="fixed top-0 right-0 h-full w-full max-w-xl bg-zinc-950 border-l border-zinc-90 w border-zinc-900 shadow-2xl z-50 flex flex-col justify-between overflow-hidden">
        
        {/* Header Drawer */}
        <div className="p-6 border-b border-zinc-90 w border-zinc-900 bg-zinc-900/40 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Sliders className="w-5 h-5 text-[#FAC000]" />
            <div>
              <h3 className="text-sm font-black text-white tracking-widest uppercase">
                BOSS VISUAL ADMIN PANEL
              </h3>
              <p className="text-[10px] text-zinc-500 font-mono">
                Real-time configuration & persistent modifications
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-zinc-800 hover:border-[#FAC000]/50 text-zinc-400 hover:text-[#FAC000] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Category Navigation Tabs */}
        <div className="flex border-b border-zinc-900 bg-zinc-950/80 px-2 select-none overflow-x-auto text-[10px] font-mono whitespace-nowrap scrollbar-none">
          <button
            onClick={() => setActiveTab("global")}
            className={`py-3 px-4 border-b-2 font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === "global"
                ? "border-[#FAC000] text-[#FAC000]"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>GLOBAL</span>
          </button>
          
          <button
            onClick={() => setActiveTab("hero")}
            className={`py-3 px-4 border-b-2 font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === "hero"
                ? "border-[#FAC000] text-[#FAC000]"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>HERO</span>
          </button>

          <button
            onClick={() => setActiveTab("pillars")}
            className={`py-3 px-4 border-b-2 font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === "pillars"
                ? "border-[#FAC000] text-[#FAC000]"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>PILLARS</span>
          </button>

          <button
            onClick={() => setActiveTab("splits")}
            className={`py-3 px-4 border-b-2 font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === "splits"
                ? "border-[#FAC000] text-[#FAC000]"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>SECTIONS</span>
          </button>

          <button
            onClick={() => setActiveTab("subwebsites")}
            className={`py-3 px-4 border-b-2 font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === "subwebsites"
                ? "border-[#FAC000] text-[#FAC000]"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Link className="w-3.5 h-3.5" />
            <span>SUBWEBSITES ({localConfig.subwebsites.flatMap(c => c.items).length})</span>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 text-xs text-zinc-300 bg-black">
          
          {/* TAB: GLOBAL SETTINGS */}
          {activeTab === "global" && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">Logo Brand Name</label>
                <input
                  type="text"
                  value={localConfig.logoText}
                  onChange={(e) => handleUpdateGlobal("logoText", e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white font-mono focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">Custom Logo Image URL (Optional)</label>
                <input
                  type="text"
                  placeholder="Paste URL (or leave blank to use text logo above)"
                  value={localConfig.logoUrl}
                  onChange={(e) => handleUpdateGlobal("logoUrl", e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white font-mono focus:outline-none placeholder-zinc-650"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">Phone Number</label>
                  <input
                    type="text"
                    value={localConfig.phone}
                    onChange={(e) => handleUpdateGlobal("phone", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white font-mono focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">Contact Email</label>
                  <input
                    type="text"
                    value={localConfig.email}
                    onChange={(e) => handleUpdateGlobal("email", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-zinc-900 pt-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">Primary Accent Color</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={localConfig.accentColor}
                      onChange={(e) => handleUpdateGlobal("accentColor", e.target.value)}
                      className="w-10 h-10 bg-transparent border border-zinc-805 rounded cursor-pointer shrink-0"
                    />
                    <input
                      type="text"
                      value={localConfig.accentColor}
                      onChange={(e) => handleUpdateGlobal("accentColor", e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-850 rounded p-2 text-center text-white font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">
                    General Font Scale multiplier ({localConfig.fontScale.toFixed(2)}x)
                  </label>
                  <input
                    type="range"
                    min="0.8"
                    max="1.3"
                    step="0.05"
                    value={localConfig.fontScale}
                    onChange={(e) => handleUpdateGlobal("fontScale", parseFloat(e.target.value))}
                    className="w-full accent-[#FAC000] mt-3"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: HERO EDITING */}
          {activeTab === "hero" && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">Title (White part)</label>
                <input
                  type="text"
                  value={localConfig.hero.titleWhite}
                  onChange={(e) => handleUpdateNested("hero", "titleWhite", e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white focus:outline-none font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">Title (Yellow highlight part)</label>
                <input
                  type="text"
                  value={localConfig.hero.titleYellow}
                  onChange={(e) => handleUpdateNested("hero", "titleYellow", e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white focus:outline-none font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">Subtitle Description</label>
                <textarea
                  rows={3}
                  value={localConfig.hero.subtitle}
                  onChange={(e) => handleUpdateNested("hero", "subtitle", e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white focus:outline-none leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">Keywords Accent Line</label>
                <input
                  type="text"
                  value={localConfig.hero.keywords}
                  onChange={(e) => handleUpdateNested("hero", "keywords", e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white focus:outline-none font-mono text-[11px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">Review Policy Button Label</label>
                  <input
                    type="text"
                    value={localConfig.hero.btnReviewText}
                    onChange={(e) => handleUpdateNested("hero", "btnReviewText", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white focus:outline-none font-bold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">Grow Agency Button Label</label>
                  <input
                    type="text"
                    value={localConfig.hero.btnGrowText}
                    onChange={(e) => handleUpdateNested("hero", "btnGrowText", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white focus:outline-none font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2 border-t border-zinc-900 pt-4">
                <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider flex items-center space-x-1">
                  <Image className="w-3.5 h-3.5" />
                  <span>Choose Hero Background Image</span>
                </label>
                
                {/* Input text URL */}
                <input
                  type="text"
                  value={localConfig.hero.bgUrl}
                  onChange={(e) => handleUpdateNested("hero", "bgUrl", e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white font-mono focus:outline-none mb-3"
                  placeholder="Paste direct image URL"
                />

                {/* Grid selection buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {bgPresetOptions.slice(0, 3).map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleUpdateNested("hero", "bgUrl", opt.url)}
                      className={`p-2 bg-zinc-90 w bg-zinc-900 hover:bg-zinc-850 rounded text-[10px] font-mono text-center border transition-all ${
                        localConfig.hero.bgUrl === opt.url
                          ? "border-[#FAC000] text-[#FAC000]"
                          : "border-zinc-800 text-zinc-400"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: PILLARS & CORE VALUES REPRESENTATION */}
          {activeTab === "pillars" && (
            <div className="space-y-6">
              {/* Pillar 1: Coverage Solutions */}
              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg space-y-4">
                <span className="text-[10px] font-mono text-[#FAC000] font-bold tracking-widest uppercase block border-b border-zinc-900 pb-1.5">
                  Pillar 1: Coverage Solutions
                </span>
                <div className="space-y-2">
                  <label className="text-[9px] font-mono text-zinc-500">Pillar Title</label>
                  <input
                    type="text"
                    value={localConfig.pillars.coverage.title}
                    onChange={(e) => handleUpdatePillar("coverage", "title", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2 text-white font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-mono text-zinc-500">Pillar Description</label>
                  <textarea
                    rows={2}
                    value={localConfig.pillars.coverage.description}
                    onChange={(e) => handleUpdatePillar("coverage", "description", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2 text-white leading-relaxed"
                  />
                </div>
              </div>

              {/* Pillar 2: Insurance Agents */}
              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg space-y-4">
                <span className="text-[10px] font-mono text-[#FAC000] font-bold tracking-widest uppercase block border-b border-zinc-900 pb-1.5">
                  Pillar 2: Insurance Agents
                </span>
                <div className="space-y-2">
                  <label className="text-[9px] font-mono text-zinc-500">Pillar Title</label>
                  <input
                    type="text"
                    value={localConfig.pillars.agents.title}
                    onChange={(e) => handleUpdatePillar("agents", "title", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2 text-white font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-mono text-zinc-500">Pillar Description</label>
                  <textarea
                    rows={2}
                    value={localConfig.pillars.agents.description}
                    onChange={(e) => handleUpdatePillar("agents", "description", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2 text-white leading-relaxed"
                  />
                </div>
              </div>

              {/* Pillar 3: Referral Partners */}
              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg space-y-4">
                <span className="text-[10px] font-mono text-[#FAC000] font-bold tracking-widest uppercase block border-b border-zinc-900 pb-1.5">
                  Pillar 3: Referral Partners
                </span>
                <div className="space-y-2">
                  <label className="text-[9px] font-mono text-zinc-500">Pillar Title</label>
                  <input
                    type="text"
                    value={localConfig.pillars.partners.title}
                    onChange={(e) => handleUpdatePillar("partners", "title", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2 text-white font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-mono text-zinc-500">Pillar Description</label>
                  <textarea
                    rows={2}
                    value={localConfig.pillars.partners.description}
                    onChange={(e) => handleUpdatePillar("partners", "description", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2 text-white leading-relaxed"
                  />
                </div>
              </div>

              {/* Tagline/Brand */}
              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg space-y-3">
                <span className="text-[10px] font-mono text-[#FAC000] font-bold tracking-widest uppercase block">Why Boss Tagline</span>
                <input
                  type="text"
                  value={localConfig.valueProps.title}
                  onChange={(e) => handleUpdateNested("valueProps", "title", e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2 text-white font-extrabold uppercase text-[11px]"
                />
              </div>
            </div>
          )}

          {/* TAB: SPLIT SECTIONS (POLICY REVIEW, INNER CIRCLE, ABOUT) */}
          {activeTab === "splits" && (
            <div className="space-y-6">
              {/* Section 1: Policy Review */}
              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg space-y-3">
                <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase block border-b border-zinc-900 pb-1.5">Policy Review Section</span>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-zinc-500 block">Banner Headline</label>
                  <input
                    type="text"
                    value={localConfig.policyReview.title}
                    onChange={(e) => handleUpdateNested("policyReview", "title", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white font-extrabold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-zinc-500 block">Lead Description Text</label>
                  <textarea
                    rows={2}
                    value={localConfig.policyReview.body}
                    onChange={(e) => handleUpdateNested("policyReview", "body", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-zinc-500 block">External scanner and review redirect URL</label>
                  <input
                    type="text"
                    value={localConfig.policyReview.externalUrl || ""}
                    onChange={(e) => handleUpdateNested("policyReview", "externalUrl", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-[#FAC000] font-mono"
                  />
                </div>
              </div>

              {/* Section 2: For Insurance Agents */}
              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg space-y-3">
                <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase block border-b border-zinc-900 pb-1.5">Agents Growth Column</span>
                <input
                  type="text"
                  value={localConfig.biggerAgency.title}
                  onChange={(e) => handleUpdateNested("biggerAgency", "title", e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white font-extrabold"
                />
              </div>

              {/* Section 3: Inner Circle */}
              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg space-y-3">
                <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase block border-b border-zinc-900 pb-1.5">Inner Circle Referral Column</span>
                <input
                  type="text"
                  value={localConfig.innerCircle.title}
                  onChange={(e) => handleUpdateNested("innerCircle", "title", e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white font-extrabold"
                />
                <textarea
                  rows={2}
                  value={localConfig.innerCircle.body}
                  onChange={(e) => handleUpdateNested("innerCircle", "body", e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                />
              </div>

              {/* Section 4: About Boss */}
              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg space-y-3">
                <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase block border-b border-zinc-900 pb-1.5">About Us Column</span>
                <input
                  type="text"
                  value={localConfig.aboutBoss.title}
                  onChange={(e) => handleUpdateNested("aboutBoss", "title", e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white font-extrabold"
                />
                <textarea
                  rows={3}
                  value={localConfig.aboutBoss.body}
                  onChange={(e) => handleUpdateNested("aboutBoss", "body", e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                />
                <div className="space-y-1.5 pt-2">
                  <label className="text-[9px] font-mono text-zinc-500">Avatar Photo Link (Cap style guy)</label>
                  <input
                    type="text"
                    value={localConfig.aboutBoss.bgUrl}
                    onChange={(e) => handleUpdateNested("aboutBoss", "bgUrl", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-850 rounded p-2 text-white font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: SUBWEBSITES COMPREHENSIVE MANAGER */}
          {activeTab === "subwebsites" && (
            <div className="space-y-6">
              <div className="bg-zinc-900/40 p-3 rounded border border-zinc-850 text-zinc-400 text-[11px] leading-relaxed flex items-start gap-2 select-none">
                <Info className="w-4 h-4 text-[#FAC000] shrink-0 mt-0.5" />
                <span>
                  The Insurance Boss owns <strong>25+ independent subwebsites</strong>. Below you can edit their redirect names, modify direct URLs, or add/delete lines under each category!
                </span>
              </div>

              {localConfig.subwebsites.map((category, catIdx) => (
                <div key={catIdx} className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                    <span className="text-[10px] font-mono text-[#FAC000] font-black tracking-widest uppercase">
                      {category.category}
                    </span>
                    <button
                      onClick={() => handleAddSubwebsite(catIdx)}
                      className="text-[10px] font-mono flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold"
                    >
                      <Plus className="w-3.5 h-3.5" /> ADD
                    </button>
                  </div>

                  <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1">
                    {category.items.length === 0 ? (
                      <p className="p-2 text-zinc-650 italic text-[10px]">No links remaining. Click "Add" above to make one.</p>
                    ) : (
                      category.items.map((sub, itemIdx) => (
                        <div key={itemIdx} className="grid grid-cols-12 gap-2 bg-zinc-900/30 p-2 border border-zinc-900 rounded items-center">
                          <div className="col-span-4 space-y-1">
                            <span className="text-[8px] font-mono text-zinc-600 font-bold uppercase">Redirect Label</span>
                            <input
                              type="text"
                              value={sub.label}
                              onChange={(e) => handleEditSubwebsite(catIdx, itemIdx, "label", e.target.value)}
                              className="w-full bg-zinc-950 border border-zinc-850 rounded p-1.5 text-[10px] text-white"
                            />
                          </div>

                          <div className="col-span-7 space-y-1">
                            <span className="text-[8px] font-mono text-zinc-600 font-bold uppercase">URL</span>
                            <input
                              type="text"
                              value={sub.url}
                              onChange={(e) => handleEditSubwebsite(catIdx, itemIdx, "url", e.target.value)}
                              className="w-full bg-zinc-950 border border-zinc-850 rounded p-1.5 text-[10px] text-zinc-300 font-mono"
                            />
                          </div>

                          <div className="col-span-1 text-center pt-3">
                            <button
                              onClick={() => handleRemoveSubwebsite(catIdx, itemIdx)}
                              className="text-red-500 hover:text-red-400 p-1.5 rounded hover:bg-red-500/10 transition-colors"
                              title="Delete subwebsite line"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Action Bar */}
        <div className="p-6 border-t border-zinc-90 w border-zinc-900 bg-zinc-900/60 flex items-center justify-between select-none">
          <button
            onClick={handleResetDefaults}
            className="text-[10px] font-mono font-bold tracking-wider text-red-500 hover:text-red-400 bg-red-500/10 border border-red-500/20 px-3.5 py-2 rounded flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> RESET DEFAULTS
          </button>

          <div className="flex items-center space-x-3">
            {saveSuccess && (
              <span className="text-[11px] font-mono font-bold text-emerald-400">
                ✓ SAVED TO CACHE
              </span>
            )}
            <button
              onClick={handleSave}
              className="font-mono text-xs font-black tracking-wider bg-[#FAC000] text-black hover:bg-black hover:text-[#FAC000] border border-[#FAC000] px-5 py-2.5 rounded flex items-center gap-2 transition-all duration-300 shadow-[0_2px_10px_rgba(250,192,0,0.15)]"
            >
              <Save className="w-4 h-4" /> SAVE CHANGES
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
