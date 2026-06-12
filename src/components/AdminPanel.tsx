import React, { useState, useEffect } from "react";
import { WebsiteConfig, SubwebsiteCategory, Subwebsite } from "../types";
import { X, Save, RefreshCw, Layers, Sliders, Type, Link, Image, Trash2, Plus, Info, Layout, Lock, Upload, Loader2, AlertCircle, Grid, LogOut, ArrowUp, ArrowDown, Code, MessageSquare, Settings, ShieldCheck, Target, Award, Star, Users, Zap, Globe } from "lucide-react";
import { getDirectImageUrl, isVideoUrl } from "./Header";
import { uploadToSupabase, extractGoogleDriveFolderImages, saveConfigToSupabase } from "../utils/supabase";
import { SUBWEBSITE_HTML_DATA } from "../subwebsiteHtml";
import { getSubpageStaticKey } from "./SubpageViewer";
import { VisitorsDashboard } from "./VisitorsDashboard";

interface SupabaseImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
}

function SupabaseImageUploader({ value, onChange, label }: SupabaseImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrorMsg("Image file is too large (max 10MB). Please compress it first.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please select a valid image file.");
      return;
    }

    setErrorMsg(null);
    setIsUploading(true);
    try {
      const publicUrl = await uploadToSupabase(file);
      onChange(publicUrl);
    } catch (err: any) {
      console.error("Supabase upload error:", err);
      setErrorMsg(err.message || "Failed to upload file to Supabase.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2.5 p-3.5 bg-zinc-950 border border-zinc-900 rounded-lg">
      <div className="flex justify-between items-center">
        <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">
          {label}
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-[9px] font-mono font-bold text-red-500 hover:text-red-400 uppercase tracking-wider px-1.5 py-0.5 border border-red-950 rounded bg-red-950/20 hover:bg-red-950/40"
          >
            Clear Image
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="flex-1">
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste direct URL or upload below"
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2 text-xs text-white font-mono focus:outline-none placeholder-zinc-600"
          />
        </div>

        {value && (
          <div className="flex items-center shrink-0">
            <img
              src={getDirectImageUrl(value)}
              alt="Preview"
              className="h-9 w-16 object-cover rounded border border-zinc-800"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-3">
          <label className="relative flex items-center justify-center space-x-2 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-850 hover:border-[#FAC000] border border-zinc-800 rounded text-xs font-mono text-zinc-300 cursor-pointer transition-all">
            <Upload className="w-3.5 h-3.5 text-zinc-400" />
            <span>{isUploading ? "Uploading..." : "Upload File"}</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
              className="hidden"
            />
          </label>

          {isUploading && (
            <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-400">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#FAC000]" />
              <span>Uploading to Supabase Storage...</span>
            </div>
          )}
        </div>

        {errorMsg && (
          <div className="flex items-start space-x-1.5 text-[10px] font-mono text-red-500 bg-red-950/20 border border-red-950/40 p-2 rounded">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <span className="text-[9px] font-mono text-zinc-600 block">
          * Uploads to Supabase. Make sure the public bucket <strong>'banners'</strong> exists. Max 10MB.
        </span>
      </div>
    </div>
  );
}

interface SupabaseMediaUploaderProps {
  value: string;
  onChange: (url: string, mediaType?: "image" | "video") => void;
  label: string;
}

function SupabaseMediaUploader({ value, onChange, label }: SupabaseMediaUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 30 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrorMsg("File is too large (max 30MB).");
      return;
    }

    const isImage = file.type.startsWith("image/") || /\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i.test(file.name);
    const isVideo = file.type.startsWith("video/") || /\.(mp4|webm|ogg|mov|m4v|avi)$/i.test(file.name);

    if (!isImage && !isVideo) {
      setErrorMsg("Please select a valid image or video file.");
      return;
    }

    setErrorMsg(null);
    setIsUploading(true);
    try {
      const publicUrl = await uploadToSupabase(file);
      onChange(publicUrl, isVideo ? "video" : "image");
    } catch (err: any) {
      console.error("Supabase upload error:", err);
      setErrorMsg(err.message || "Failed to upload file to Supabase.");
    } finally {
      setIsUploading(false);
    }
  };


  return (
    <div className="space-y-2.5 p-3.5 bg-zinc-950 border border-zinc-900 rounded-lg">
      <div className="flex justify-between items-center">
        <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">
          {label}
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange("", "image")}
            className="text-[9px] font-mono font-bold text-red-500 hover:text-red-400 uppercase tracking-wider px-1.5 py-0.5 border border-red-950 rounded bg-red-950/20 hover:bg-red-950/40"
          >
            Clear Media
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="flex-1">
          <input
            type="text"
            value={value || ""}
            onChange={(e) => {
              const val = e.target.value;
              const guessedType = isVideoUrl(val) ? "video" : "image";
              onChange(val, guessedType);
            }}
            placeholder="Paste direct media URL or upload below"
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2 text-xs text-white font-mono focus:outline-none placeholder-zinc-600"
          />
        </div>

        {value && (
          <div className="flex items-center shrink-0">
            {isVideoUrl(value) ? (
              <div className="h-9 w-16 bg-zinc-900 rounded border border-zinc-800 flex items-center justify-center overflow-hidden">
                <video
                  key={value}
                  src={value}
                  className="h-full w-full object-cover"
                  muted
                  playsInline
                  autoPlay
                  loop
                />
              </div>
            ) : (
              <img
                src={getDirectImageUrl(value)}
                alt="Preview"
                className="h-9 w-16 object-cover rounded border border-zinc-800"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-3">
          <label className="relative flex items-center justify-center space-x-2 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-850 hover:border-[#FAC000] border border-zinc-800 rounded text-xs font-mono text-zinc-300 cursor-pointer transition-all">
            <Upload className="w-3.5 h-3.5 text-zinc-400" />
            <span>{isUploading ? "Uploading..." : "Upload Image or Video"}</span>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              disabled={isUploading}
              className="hidden"
            />
          </label>

          {isUploading && (
            <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-400">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#FAC000]" />
              <span>Uploading to Supabase Storage...</span>
            </div>
          )}
        </div>

        {errorMsg && (
          <div className="flex items-start space-x-1.5 text-[10px] font-mono text-red-500 bg-red-950/20 border border-red-950/40 p-2 rounded">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <span className="text-[9px] font-mono text-zinc-600 block">
          * Uploads to Supabase. Supports images & videos (MP4/WebM/etc.). Max 30MB.
        </span>
      </div>
    </div>
  );
}

interface CarrierLogoUploaderProps {
  value: string;
  onChange: (url: string) => void;
}

function CarrierLogoUploader({ value, onChange }: CarrierLogoUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrorMsg("Logo file is too large (max 5MB).");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please select a valid image file.");
      return;
    }

    setErrorMsg(null);
    setIsUploading(true);
    try {
      const publicUrl = await uploadToSupabase(file);
      onChange(publicUrl);
    } catch (err: any) {
      console.error("Supabase logo upload error:", err);
      setErrorMsg(err.message || "Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <label className="flex items-center justify-center space-x-1 px-2 py-0.5 bg-zinc-950 hover:bg-zinc-900 hover:border-[#FAC000] border border-zinc-850 rounded text-[9px] font-mono text-zinc-400 cursor-pointer transition-all">
        <Upload className="w-2.5 h-2.5 text-zinc-500" />
        <span>{isUploading ? "Uploading..." : "Upload logo"}</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
          className="hidden"
        />
      </label>

      {isUploading && (
        <Loader2 className="w-2.5 h-2.5 animate-spin text-[#FAC000]" />
      )}

      {errorMsg && (
        <span className="text-[8px] font-mono text-red-500">{errorMsg}</span>
      )}
    </div>
  );
}

interface AdminPanelProps {
  config: WebsiteConfig;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newConfig: WebsiteConfig) => void;
}

export default function AdminPanel({ config, isOpen, onClose, onSave }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<"global" | "hero" | "homepageButtons" | "pillars" | "splits" | "carriers" | "banners" | "buttons" | "fonts" | "builder" | "subpageEditor" | "integrations" | "insuranceBanners" | "faqs" | "metrics" | "testimonials">("global");
  const [localConfig, setLocalConfig] = useState<WebsiteConfig>({ ...config });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return sessionStorage.getItem("boss_admin_unlocked") === "true";
  });
  const [passwordError, setPasswordError] = useState("");
  const [selectedInsuranceBannerId, setSelectedInsuranceBannerId] = useState<string>("life");
  const [previewTestimonialTab, setPreviewTestimonialTab] = useState<"agents" | "clients">("agents");

  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [savingToSupabase, setSavingToSupabase] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const handleSyncToCodebase = async () => {
    setSyncing(true);
    setSyncMessage(null);
    try {
      // First save to standard local storage cache
      onSave(localConfig);

      const response = await fetch("/api/save-config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(localConfig),
      });
      const result = await response.json();
      if (result.success) {
        setSyncMessage("✓ Config successfully written to defaultConfig.ts!");
        setTimeout(() => setSyncMessage(null), 4000);
      } else {
        setSyncMessage("Error: " + result.error);
      }
    } catch (err: any) {
      setSyncMessage("Error: " + err.message);
    } finally {
      setSyncing(false);
    }
  };

  // Keep localConfig in sync with the saved config when the panel is opened or config changes
  useEffect(() => {
    if (isOpen) {
      setLocalConfig({ ...config });
    }
  }, [isOpen, config]);

  const mainCategories = ["Life Insurance", "Commercial Lines", "Personal Lines", "Retirement & Investment"];

  // All available subpage labels (recalculated each render as localConfig changes)
  const allSubwebsiteLabels = [
    ...mainCategories,
    "Policy Review",
    "Inner Circle",
    ...localConfig.subwebsites.flatMap(c => c.items.map(i => i.label))
  ];

  const [selectedBannerPage, setSelectedBannerPage] = useState<string>(allSubwebsiteLabels[0] || "Life Insurance");

  // Subpage Editor input fields state
  const [selectedEditorPage, setSelectedEditorPage] = useState<string>(allSubwebsiteLabels[0] || "Life Insurance");

  // Sync selectedBannerPage and selectedEditorPage when config loads async from Supabase
  // This ensures the selectors show a valid page even if config wasn't ready at mount time
  useEffect(() => {
    if (localConfig.subwebsites.length > 0) {
      const labels = [
        ...mainCategories,
        "Policy Review",
        "Inner Circle",
        ...localConfig.subwebsites.flatMap(c => c.items.map(i => i.label))
      ];
      if (!labels.includes(selectedBannerPage) || !selectedBannerPage) {
        setSelectedBannerPage(labels[0] || "Life Insurance");
      }
      if (!labels.includes(selectedEditorPage) || !selectedEditorPage) {
        setSelectedEditorPage(labels[0] || "Life Insurance");
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localConfig.subwebsites]);
  const [editorPageHtml, setEditorPageHtml] = useState("");
  const [editorPageCss, setEditorPageCss] = useState("");
  const [editorPageTitle, setEditorPageTitle] = useState("");
  const [editorPageDesc, setEditorPageDesc] = useState("");
  const [editorPageButtons, setEditorPageButtons] = useState("");

  // Selected page for Buttons HTML tab editing
  const [selectedButtonsPage, setSelectedButtonsPage] = useState<string>("Global Default");

  // Keep subpage inputs synchronized with current overrides or defaults
  useEffect(() => {
    if (!selectedEditorPage) return;
    const staticKey = getSubpageStaticKey(selectedEditorPage);
    const overrides = localConfig.subpageHtmlOverrides?.[selectedEditorPage] || localConfig.subpageHtmlOverrides?.[staticKey];
    const staticData = SUBWEBSITE_HTML_DATA[selectedEditorPage] || SUBWEBSITE_HTML_DATA[staticKey];
    
    setEditorPageHtml(overrides?.html !== undefined ? overrides.html : (staticData?.html || ""));
    setEditorPageCss(overrides?.css !== undefined ? overrides.css : (staticData?.css || ""));
    setEditorPageTitle(overrides?.title !== undefined ? overrides.title : (staticData?.title || ""));
    setEditorPageDesc(overrides?.description !== undefined ? overrides.description : (staticData?.description || ""));
    
    const bannerConfig = localConfig.subwebsiteBanners[selectedEditorPage] || localConfig.subwebsiteBanners[staticKey];
    setEditorPageButtons(bannerConfig?.buttonsHtml || "");
  }, [selectedEditorPage, localConfig.subpageHtmlOverrides, localConfig.subwebsiteBanners]);

  const handleSaveSubpageEdits = () => {
    const staticKey = getSubpageStaticKey(selectedEditorPage);
    // Always save under the canonical static key so SubpageViewer can find it
    const saveKey = staticKey !== selectedEditorPage ? staticKey : selectedEditorPage;
    setLocalConfig(prev => {
      const overrides = { ...(prev.subpageHtmlOverrides || {}) };
      // Remove any stale entry under the display label (if different from static key)
      if (saveKey !== selectedEditorPage) {
        delete overrides[selectedEditorPage];
      }
      overrides[saveKey] = {
        title: editorPageTitle,
        description: editorPageDesc,
        css: editorPageCss,
        html: editorPageHtml
      };
      
      const banners = { ...prev.subwebsiteBanners };
      const existingBanner = banners[selectedEditorPage] || banners[saveKey];
      banners[saveKey] = {
        ...(existingBanner || {
          topBannerUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80&w=1920",
          bottomBannerUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800"
        }),
        buttonsHtml: editorPageButtons
      };
      // Clean up stale banner entry under the display label
      if (saveKey !== selectedEditorPage && banners[selectedEditorPage]) {
        delete banners[selectedEditorPage];
      }
      
      return {
        ...prev,
        subpageHtmlOverrides: overrides,
        subwebsiteBanners: banners
      };
    });
    alert(`Successfully applied edits for page "${selectedEditorPage}". Remember to click "SAVE CHANGES" at the top right to make them permanent!`);
  };

  const renderColorInput = (
    label: string,
    value: string,
    onChange: (val: string) => void
  ) => {
    return (
      <div className="space-y-1.5">
        <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">{label}</label>
        <div className="flex items-center space-x-2">
          <input
            type="color"
            value={value || "#ffffff"}
            onChange={(e) => onChange(e.target.value)}
            className="w-10 h-10 bg-transparent border border-zinc-800 rounded cursor-pointer shrink-0"
          />
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Default"
            className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-center text-white font-mono text-xs focus:outline-none"
          />
        </div>
      </div>
    );
  };
  const renderLogoCategoryEditor = (
    categoryKey: "personalLogos" | "commercialLogos" | "lifeLogos",
    label: string
  ) => {
    const logos = localConfig.carriersBanner[categoryKey] || [];
    
    const updateLogos = (newLogos: string[]) => {
      setLocalConfig(prev => ({
        ...prev,
        carriersBanner: {
          ...prev.carriersBanner,
          [categoryKey]: newLogos
        }
      }));
    };

    return (
      <div className="p-5 bg-zinc-950/40 border border-zinc-900 rounded-xl space-y-4">
        {/* Category Header */}
        <div className="flex items-center justify-between border-b border-zinc-905 border-zinc-900 pb-2">
          <span className="text-[11px] font-mono text-[#FAC000] font-black tracking-widest uppercase">
            {label} ({logos.length})
          </span>
          <button
            onClick={() => {
              updateLogos([...logos, "https://"]);
            }}
            className="text-[10px] font-mono text-[#FAC000] hover:text-white flex items-center gap-1 font-bold"
          >
            <Plus className="w-3.5 h-3.5" /> ADD LOGO
          </button>
        </div>

        {/* Category Bulk Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-zinc-950/80 border border-zinc-900/60 rounded-lg">
          {/* Local Bulk File Uploader */}
          <div className="space-y-1">
            <span className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">Bulk Local Upload</span>
            <label className="flex items-center justify-center space-x-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-850 hover:border-[#FAC000] border border-zinc-800 rounded text-xs font-mono text-zinc-350 cursor-pointer transition-all text-center">
              <Upload className="w-3.5 h-3.5 text-zinc-400" />
              <span>Select Files</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={async (e) => {
                  const files = e.target.files;
                  if (!files || files.length === 0) return;
                  
                  const filesArray = Array.from(files) as File[];
                  const uploadPromises = filesArray.map(async (file) => {
                    try {
                      return await uploadToSupabase(file);
                    } catch (err) {
                      console.error(`Failed to upload ${file.name}:`, err);
                      return null;
                    }
                  });
                  
                  const urls = (await Promise.all(uploadPromises)).filter((url): url is string => url !== null);
                  if (urls.length > 0) {
                    updateLogos([...logos, ...urls]);
                    alert(`Uploaded ${urls.length} images to ${label}!`);
                  }
                }}
                className="hidden"
              />
            </label>
          </div>

          {/* Google Drive Link Import */}
          <div className="space-y-1">
            <span className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">Import Google Drive Folder</span>
            <div className="flex space-x-1.5">
              <input
                id={`drive-input-${categoryKey}`}
                type="text"
                placeholder="Paste shared folder URL..."
                className="flex-1 bg-zinc-900 border border-zinc-850 rounded px-2 py-1 text-xs text-white"
              />
              <button
                type="button"
                onClick={async () => {
                  const input = document.getElementById(`drive-input-${categoryKey}`) as HTMLInputElement;
                  if (!input || !input.value) {
                    alert("Please paste a valid Google Drive folder link first.");
                    return;
                  }
                  try {
                    const originalVal = input.value;
                    input.disabled = true;
                    input.placeholder = "Loading folder...";
                    
                    const urls = await extractGoogleDriveFolderImages(originalVal);
                    if (urls.length > 0) {
                      updateLogos([...logos, ...urls]);
                      alert(`Successfully imported ${urls.length} images to ${label}!`);
                      input.value = "";
                    }
                  } catch (err: any) {
                    console.error(err);
                    alert(`Error: ${err.message || "Failed to load Google Drive folder."}`);
                  } finally {
                    input.disabled = false;
                    input.placeholder = "Paste shared folder URL...";
                  }
                }}
                className="px-2.5 py-1 bg-[#FAC000] text-black font-mono font-bold text-[10px] rounded hover:bg-black hover:text-[#FAC000] border border-[#FAC000] transition-all"
              >
                LOAD
              </button>
            </div>
          </div>
        </div>

        {/* Logos List */}
        <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
          {logos.length === 0 ? (
            <p className="p-2 text-zinc-650 italic text-[10px] text-center">No logos added. Upload files or paste links above.</p>
          ) : (
            logos.map((logo, idx) => (
              <div key={idx} className="flex gap-2 items-center bg-zinc-900/30 p-2 border border-zinc-900 rounded">
                <div className="w-10 h-10 bg-zinc-900 rounded border border-zinc-800 flex items-center justify-center shrink-0 p-1">
                  <img src={getDirectImageUrl(logo)} alt="" className="max-h-full max-w-full object-contain filter grayscale" onError={(e)=>{(e.target as HTMLElement).style.display="none"}} />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <input
                    type="text"
                    value={logo}
                    onChange={(e) => {
                      const val = e.target.value;
                      const updated = [...logos];
                      updated[idx] = val;
                      updateLogos(updated);
                    }}
                    className="w-full bg-zinc-950 border border-zinc-850 rounded p-1 text-[10px] text-zinc-300 font-mono"
                    placeholder="Logo URL or upload"
                  />
                  <CarrierLogoUploader
                    value={logo}
                    onChange={(url) => {
                      const updated = [...logos];
                      updated[idx] = url;
                      updateLogos(updated);
                    }}
                  />
                </div>
                <button
                  onClick={() => {
                    const updated = logos.filter((_, i) => i !== idx);
                    updateLogos(updated);
                  }}
                  className="text-red-500 hover:text-red-400 p-1.5 self-start"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

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

  const handleUpdateMetricItem = (index: number, field: string, value: any) => {
    setLocalConfig((prev) => {
      const currentMetrics = prev.metrics || {
        show: prev.hero.showMetrics !== false,
        title: "BENEFITS & METRICS",
        stabilityLabel: "SYSTEM STABILITY",
        stabilityStatus: "ACTIVE",
        items: [
          { title: "MAXIMUM SECURITY", description: "Multi-million-dollar coverage configurations designed to save costs and reduce vulnerabilities.", icon: "shield" },
          { title: "AGENCY SCALE SYSTEM", description: "Premium lead-gen pipelines, recruitment automation, and social media dashboards.", icon: "target" },
          { title: "INVESTMENT GROWTH", description: "Partner with our multi-business network. Elevate referral revenue channels today.", icon: "award" }
        ]
      };
      const newItems = [...(currentMetrics.items || [])];
      // Backfill items up to index if needed
      for (let i = 0; i <= index; i++) {
        if (!newItems[i]) {
          newItems[i] = { title: "", description: "", icon: "shield" };
        }
      }
      newItems[index] = {
        ...newItems[index],
        [field]: value
      };
      return {
        ...prev,
        metrics: {
          ...currentMetrics,
          items: newItems
        }
      };
    });
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

  const handleSave = async () => {
    setSavingToSupabase(true);
    setSaveMessage(null);
    try {
      // First save locally to React state and localStorage cache
      onSave(localConfig);

      // Upload configuration JSON file to Supabase Storage public bucket
      await saveConfigToSupabase(localConfig);

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err: any) {
      setSaveMessage("Error: " + err.message);
    } finally {
      setSavingToSupabase(false);
    }
  };

  const handleResetDefaults = () => {
    if (confirm("Are you sure you want to revert all changes to standard website defaults?")) {
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
      url: "#subpage-New%20Subwebsite%20Line"
    });
    setLocalConfig((prev) => ({ ...prev, subwebsites: updated }));
  };

  const handleRemoveSubwebsite = (catIdx: number, itemIdx: number) => {
    const updated = [...localConfig.subwebsites];
    updated[catIdx].items.splice(itemIdx, 1);
    setLocalConfig((prev) => ({ ...prev, subwebsites: updated }));
  };

  const handleUpdateBannerField = (page: string, field: string, val: any) => {
    const staticKey = getSubpageStaticKey(page);
    setLocalConfig(prev => {
      const banners = { ...prev.subwebsiteBanners };
      const current = banners[staticKey] || { topBannerUrl: "", bottomBannerUrl: "" };
      banners[staticKey] = {
        ...current,
        [field]: val
      };
      if (staticKey !== page && banners[page]) {
        delete banners[page];
      }
      return {
        ...prev,
        subwebsiteBanners: banners
      };
    });
  };
  const handleAddTestimonial = (type: "agents" | "clients") => {
    setLocalConfig(prev => {
      const current = prev.testimonials || { show: true, title: "Testimonials", subtitle: "Trusted by Professionals. Built for Families.", agentReviews: [], clientReviews: [] };
      const key = type === "agents" ? "agentReviews" : "clientReviews";
      const newReviews = [...(current[key] || [])];
      
      newReviews.push({
        name: "New Name",
        role: type === "agents" ? "Insurance Agent" : "Homeowner",
        location: "City, State",
        quote: "Write custom testimonial comments here...",
        rating: 5,
        category: type === "clients" ? "Life Insurance" : undefined
      });

      return {
        ...prev,
        testimonials: {
          ...current,
          [key]: newReviews
        }
      };
    });
  };

  const handleDeleteTestimonial = (type: "agents" | "clients", idx: number) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    setLocalConfig(prev => {
      const current = prev.testimonials || { show: true, title: "Testimonials", subtitle: "Trusted by Professionals. Built for Families.", agentReviews: [], clientReviews: [] };
      const key = type === "agents" ? "agentReviews" : "clientReviews";
      const newReviews = (current[key] || []).filter((_, i) => i !== idx);
      
      return {
        ...prev,
        testimonials: {
          ...current,
          [key]: newReviews
        }
      };
    });
  };

  const handleMoveTestimonial = (type: "agents" | "clients", idx: number, direction: "up" | "down") => {
    setLocalConfig(prev => {
      const current = prev.testimonials || { show: true, title: "Testimonials", subtitle: "Trusted by Professionals. Built for Families.", agentReviews: [], clientReviews: [] };
      const key = type === "agents" ? "agentReviews" : "clientReviews";
      const reviews = [...(current[key] || [])];
      if (direction === "up" && idx > 0) {
        const temp = reviews[idx];
        reviews[idx] = reviews[idx - 1];
        reviews[idx - 1] = temp;
      } else if (direction === "down" && idx < reviews.length - 1) {
        const temp = reviews[idx];
        reviews[idx] = reviews[idx + 1];
        reviews[idx + 1] = temp;
      }
      return {
        ...prev,
        testimonials: {
          ...current,
          [key]: reviews
        }
      };
    });
  };

  const handleChangeTestimonialType = (fromType: "agents" | "clients", idx: number, toType: "agents" | "clients") => {
    if (fromType === toType) return;
    setLocalConfig(prev => {
      const current = prev.testimonials || { show: true, title: "Testimonials", subtitle: "Trusted by Professionals. Built for Families.", agentReviews: [], clientReviews: [] };
      const fromKey = fromType === "agents" ? "agentReviews" : "clientReviews";
      const toKey = toType === "agents" ? "agentReviews" : "clientReviews";
      
      const fromReviews = [...(current[fromKey] || [])];
      const toReviews = [...(current[toKey] || [])];
      
      if (idx < 0 || idx >= fromReviews.length) return prev;
      const [movedItem] = fromReviews.splice(idx, 1);
      
      // Adapt fields if needed
      if (toType === "agents") {
        delete movedItem.category;
        if (movedItem.role === "Homeowner") {
          movedItem.role = "Insurance Agent";
        }
      } else {
        movedItem.category = movedItem.category || "Life Insurance";
        if (movedItem.role === "Insurance Agent") {
          movedItem.role = "Homeowner";
        }
      }
      
      toReviews.push(movedItem);
      
      return {
        ...prev,
        testimonials: {
          ...current,
          [fromKey]: fromReviews,
          [toKey]: toReviews
        }
      };
    });
  };


  const fontOptions = [
    { value: "Default", label: "Default Site Font (Bitter)" },
    { value: "Outfit", label: "Outfit (Sleek Geometric Sans)" },
    { value: "Inter", label: "Inter (Clean & Professional)" },
    { value: "Poppins", label: "Poppins (Friendly Geometric)" },
    { value: "Montserrat", label: "Montserrat (Classic Headline)" },
    { value: "Playfair Display", label: "Playfair Display (Premium Editorial Serif)" },
    { value: "Cinzel", label: "Cinzel (Classical Luxury Serif)" },
    { value: "Lora", label: "Lora (Contemporary Text Serif)" },
    { value: "Roboto", label: "Roboto (Standard Modern Sans)" },
    { value: "EB Garamond", label: "EB Garamond (Elegant Traditional Serif)" },
    { value: "Syncopate", label: "Syncopate (Wide Futuristic Display)" }
  ];

  const handleUpdateFontCategory = (categoryName: string, fontValue: string) => {
    setLocalConfig(prev => ({
      ...prev,
      fontFamilyCategory: {
        ...(prev.fontFamilyCategory || {}),
        [categoryName]: fontValue
      }
    }));
  };

  const handleUpdateFontPage = (pageLabel: string, fontValue: string) => {
    setLocalConfig(prev => ({
      ...prev,
      fontFamilyPage: {
        ...(prev.fontFamilyPage || {}),
        [pageLabel]: fontValue
      }
    }));
  };

  if (!isUnlocked) {
    return (
      <div className="fixed inset-0 w-full h-full bg-zinc-950 z-[999] flex flex-col items-center justify-center p-4">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FAC000]/10 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FAC000]/5 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 max-w-md w-full shadow-2xl backdrop-blur-md relative z-10 flex flex-col items-center text-center space-y-6">
          <div className="p-4 bg-zinc-950 border border-zinc-850 rounded-2xl text-[#FAC000]">
            <Lock className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white tracking-widest uppercase">
              BOSS ADMIN PANEL GATE
            </h3>
            <p className="text-[10px] text-zinc-500 font-mono mt-1 uppercase">
              ENTER SYSTEM KEYCODE FOR PERSISTENT DESIGN ACCESS
            </p>
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const requiredPassword = import.meta.env.VITE_ADMIN_PASSWORD || "insuranceboss";
              if (passwordInput === requiredPassword) {
                setIsUnlocked(true);
                sessionStorage.setItem("boss_admin_unlocked", "true");
                setPasswordError("");
              } else {
                setPasswordError("Access Denied: Invalid Keycode");
              }
            }}
            className="w-full space-y-4"
          >
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">
                System Password
              </label>
              <input
                type="password"
                placeholder="Enter password..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#FAC000] rounded-lg p-3 text-center text-white font-mono text-sm tracking-widest focus:outline-none placeholder-zinc-700"
                autoFocus
              />
              {passwordError && (
                <p className="text-red-500 text-[10px] font-mono font-bold text-center mt-1 animate-pulse">
                  {passwordError}
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 font-mono text-xs font-bold text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 rounded-lg p-2.5 transition-all bg-transparent"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="flex-1 font-mono text-xs font-black tracking-widest bg-[#FAC000] text-black hover:bg-black hover:text-[#FAC000] border border-[#FAC000] rounded-lg p-2.5 transition-all"
              >
                UNLOCK
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Full Screen Admin Panel */}
      <div 
        className="fixed inset-0 h-full w-full z-50 flex flex-col justify-between overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed admin-portal-wrapper"
        style={{
          backgroundImage: config.globalBackgroundImage ? `linear-gradient(rgba(9, 9, 11, 0.93), rgba(0, 0, 0, 0.97)), url(${getDirectImageUrl(config.globalBackgroundImage)})` : "linear-gradient(to bottom, #09090b, #000000)"
        }}
      >
        
        {/* Header Drawer */}
        <div className="px-8 py-5 border-b border-zinc-900/60 bg-zinc-950/40 backdrop-blur-md flex flex-col md:flex-row gap-4 md:items-center justify-between shrink-0 select-none">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-zinc-900/80 rounded-xl flex items-center justify-center border border-zinc-800 shadow-md">
              <Grid className="w-5 h-5 text-[#FAC000]" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white tracking-tight leading-tight">
                Admin Portal
              </h3>
              <p className="text-xs text-zinc-500 font-medium">
                The Insurance Boss Customizer
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3.5">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-zinc-900/80 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-zinc-350 hover:text-white text-xs font-bold transition-all duration-200 cursor-pointer shadow-md"
            >
              View Website
            </button>
            <button
              onClick={() => {
                sessionStorage.removeItem("boss_admin_unlocked");
                setIsUnlocked(false);
              }}
              className="px-5 py-2 rounded-full bg-red-650 hover:bg-red-500 text-white text-xs font-bold transition-all duration-200 cursor-pointer shadow-md flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Dynamic Category Navigation Tabs */}
        <div className="flex flex-col gap-3 bg-zinc-950/30 backdrop-blur-sm px-8 py-4 select-none border-b border-zinc-900/60 shrink-0 text-xs">
          {/* Row 1: General customization */}
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setActiveTab("global")}
              className={`py-2 px-4.5 rounded-full font-bold transition-all flex items-center space-x-2 border text-xs cursor-pointer ${
                activeTab === "global" 
                  ? "bg-[#FAC000] border-[#FAC000] text-black shadow-lg shadow-[#FAC000]/25" 
                  : "bg-zinc-900/40 border-zinc-800/60 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              <span>Global Branding</span>
            </button>
            
            <button
              onClick={() => setActiveTab("hero")}
              className={`py-2 px-4.5 rounded-full font-bold transition-all flex items-center space-x-2 border text-xs cursor-pointer ${
                activeTab === "hero" 
                  ? "bg-[#FAC000] border-[#FAC000] text-black shadow-lg shadow-[#FAC000]/25" 
                  : "bg-zinc-900/40 border-zinc-800/60 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Hero Banner</span>
            </button>

            <button
              onClick={() => setActiveTab("homepageButtons")}
              className={`py-2 px-4.5 rounded-full font-bold transition-all flex items-center space-x-2 border text-xs cursor-pointer ${
                activeTab === "homepageButtons" 
                  ? "bg-[#FAC000] border-[#FAC000] text-black shadow-lg shadow-[#FAC000]/25" 
                  : "bg-zinc-900/40 border-zinc-800/60 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              <Link className="w-3.5 h-3.5" />
              <span>Homepage Buttons</span>
            </button>

            <button
              onClick={() => setActiveTab("metrics")}
              className={`py-2 px-4.5 rounded-full font-bold transition-all flex items-center space-x-2 border text-xs cursor-pointer ${
                activeTab === "metrics" 
                  ? "bg-[#FAC000] border-[#FAC000] text-black shadow-lg shadow-[#FAC000]/25" 
                  : "bg-zinc-900/40 border-zinc-800/60 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Benefits & Metrics</span>
            </button>

            <button
              onClick={() => setActiveTab("testimonials")}
              className={`py-2 px-4.5 rounded-full font-bold transition-all flex items-center space-x-2 border text-xs cursor-pointer ${
                activeTab === "testimonials" 
                  ? "bg-[#FAC000] border-[#FAC000] text-black shadow-lg shadow-[#FAC000]/25" 
                  : "bg-zinc-900/40 border-zinc-800/60 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Testimonials</span>
            </button>

            <button
              onClick={() => setActiveTab("pillars")}
              className={`py-2 px-4.5 rounded-full font-bold transition-all flex items-center space-x-2 border text-xs cursor-pointer ${
                activeTab === "pillars" 
                  ? "bg-[#FAC000] border-[#FAC000] text-black shadow-lg shadow-[#FAC000]/25" 
                  : "bg-zinc-900/40 border-zinc-800/60 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>Pillars Section</span>
            </button>

            <button
              onClick={() => setActiveTab("splits")}
              className={`py-2 px-4.5 rounded-full font-bold transition-all flex items-center space-x-2 border text-xs cursor-pointer ${
                activeTab === "splits" 
                  ? "bg-[#FAC000] border-[#FAC000] text-black shadow-lg shadow-[#FAC000]/25" 
                  : "bg-zinc-900/40 border-zinc-800/60 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Home Sections</span>
            </button>

            <button
              onClick={() => setActiveTab("carriers")}
              className={`py-2 px-4.5 rounded-full font-bold transition-all flex items-center space-x-2 border text-xs cursor-pointer ${
                activeTab === "carriers" 
                  ? "bg-[#FAC000] border-[#FAC000] text-black shadow-lg shadow-[#FAC000]/25" 
                  : "bg-zinc-900/40 border-zinc-800/60 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              <Image className="w-3.5 h-3.5" />
              <span>Carrier Logos</span>
            </button>

            <button
              onClick={() => setActiveTab("banners")}
              className={`py-2 px-4.5 rounded-full font-bold transition-all flex items-center space-x-2 border text-xs cursor-pointer ${
                activeTab === "banners" 
                  ? "bg-[#FAC000] border-[#FAC000] text-black shadow-lg shadow-[#FAC000]/25" 
                  : "bg-zinc-900/40 border-zinc-800/60 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              <Image className="w-3.5 h-3.5" />
              <span>Page Banners</span>
            </button>
          </div>

          {/* Row 2: Elements and pages */}
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setActiveTab("fonts")}
              className={`py-2 px-4.5 rounded-full font-bold transition-all flex items-center space-x-2 border text-xs cursor-pointer ${
                activeTab === "fonts" 
                  ? "bg-[#FAC000] border-[#FAC000] text-black shadow-lg shadow-[#FAC000]/25" 
                  : "bg-zinc-900/40 border-zinc-800/60 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>Visual Fonts</span>
            </button>

            <button
              onClick={() => setActiveTab("builder")}
              className={`py-2 px-4.5 rounded-full font-bold transition-all flex items-center space-x-2 border text-xs cursor-pointer ${
                activeTab === "builder" 
                  ? "bg-[#FAC000] border-[#FAC000] text-black shadow-lg shadow-[#FAC000]/25" 
                  : "bg-zinc-900/40 border-zinc-800/60 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Homepage Layout</span>
            </button>

            <button
              onClick={() => setActiveTab("subpageEditor")}
              className={`py-2 px-4.5 rounded-full font-bold transition-all flex items-center space-x-2 border text-xs cursor-pointer ${
                activeTab === "subpageEditor" 
                  ? "bg-[#FAC000] border-[#FAC000] text-black shadow-lg shadow-[#FAC000]/25" 
                  : "bg-zinc-900/40 border-zinc-800/60 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Subpages HTML/CSS</span>
            </button>

            <button
              onClick={() => setActiveTab("integrations")}
              className={`py-2 px-4.5 rounded-full font-bold transition-all flex items-center space-x-2 border text-xs cursor-pointer ${
                activeTab === "integrations" 
                  ? "bg-[#FAC000] border-[#FAC000] text-black shadow-lg shadow-[#FAC000]/25" 
                  : "bg-zinc-900/40 border-zinc-800/60 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Widgets & Chatbot</span>
            </button>

            <button
              onClick={() => setActiveTab("insuranceBanners")}
              className={`py-2 px-4.5 rounded-full font-bold transition-all flex items-center space-x-2 border text-xs cursor-pointer ${
                activeTab === "insuranceBanners" 
                  ? "bg-[#FAC000] border-[#FAC000] text-black shadow-lg shadow-[#FAC000]/25" 
                  : "bg-zinc-900/40 border-zinc-800/60 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              <Image className="w-3.5 h-3.5" />
              <span>Product Banners</span>
            </button>

            <button
              onClick={() => setActiveTab("faqs")}
              className={`py-2 px-4.5 rounded-full font-bold transition-all flex items-center space-x-2 border text-xs cursor-pointer ${
                activeTab === "faqs" 
                  ? "bg-[#FAC000] border-[#FAC000] text-black shadow-lg shadow-[#FAC000]/25" 
                  : "bg-zinc-900/40 border-zinc-800/60 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>FAQs</span>
            </button>

            <button
              onClick={() => setActiveTab("visitors")}
              className={`py-2 px-4.5 rounded-full font-bold transition-all flex items-center space-x-2 border text-xs cursor-pointer ${
                activeTab === "visitors" 
                  ? "bg-[#FAC000] border-[#FAC000] text-black shadow-lg shadow-[#FAC000]/25" 
                  : "bg-zinc-900/40 border-zinc-800/60 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Website Visitors</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8 md:p-10 overflow-y-auto bg-transparent">
          <div className="max-w-6xl mx-auto w-full space-y-8 text-sm text-zinc-300">
            
            {/* Tab Header Card */}
            <div className="p-6 bg-zinc-900/80 border border-zinc-800/60 backdrop-blur-md rounded-2xl flex items-center space-x-4 shadow-xl">
              <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-center text-[#FAC000] shadow-inner shrink-0 overflow-hidden">
                {activeTab === "global" && (
                  config.logoUrl ? (
                    <img 
                      src={getDirectImageUrl(config.logoUrl)} 
                      alt="Logo" 
                      className="w-9 h-9 object-contain"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <Layout className="w-6 h-6" />
                  )
                )}
                {activeTab === "hero" && <Layers className="w-6 h-6" />}
                {activeTab === "pillars" && <Type className="w-6 h-6" />}
                {activeTab === "splits" && <Sliders className="w-6 h-6" />}
                {activeTab === "carriers" && <Image className="w-6 h-6" />}
                {activeTab === "banners" && <Image className="w-6 h-6" />}
                {activeTab === "buttons" && <Link className="w-6 h-6" />}
                {activeTab === "fonts" && <Type className="w-6 h-6" />}
                {activeTab === "builder" && <Grid className="w-6 h-6" />}
                {activeTab === "subpageEditor" && <Code className="w-6 h-6" />}
                {activeTab === "integrations" && <MessageSquare className="w-6 h-6" />}
                {activeTab === "insuranceBanners" && <Layers className="w-6 h-6" />}
                {activeTab === "faqs" && <MessageSquare className="w-6 h-6" />}
                {activeTab === "metrics" && <Target className="w-6 h-6" />}
                {activeTab === "testimonials" && <Star className="w-6 h-6" />}
                {activeTab === "visitors" && <Globe className="w-6 h-6" />}
              </div>
              <div>
                <h2 className="text-xl font-black text-white tracking-wide uppercase leading-tight">
                  {activeTab === "global" && "Global Branding"}
                  {activeTab === "hero" && "Hero Section Banner"}
                  {activeTab === "homepageButtons" && "Homepage Action Buttons"}
                  {activeTab === "pillars" && "Core Value Pillars"}
                  {activeTab === "splits" && "Split Information Panels"}
                  {activeTab === "carriers" && "Insurance Carriers Slider"}
                  {activeTab === "banners" && "Subwebsite Banner Layouts"}
                  {activeTab === "buttons" && "HTML Custom Button Integrations"}
                  {activeTab === "fonts" && "Typography Styling Controls"}
                  {activeTab === "builder" && "Homepage Layout Builder"}
                  {activeTab === "subpageEditor" && "Subpage HTML/CSS Override Editor"}
                  {activeTab === "integrations" && "Widgets & Chatbot scripts"}
                  {activeTab === "insuranceBanners" && "Homepage Product Banners"}
                  {activeTab === "faqs" && "Frequently Asked Questions (FAQs)"}
                  {activeTab === "metrics" && "Benefits & Metrics Panel"}
                  {activeTab === "testimonials" && "Customer Testimonials"}
                  {activeTab === "visitors" && "Website Visitors Analytics"}
                </h2>
                <p className="text-xs text-zinc-500 font-medium mt-1">
                  {activeTab === "global" && "Configure primary contact details, logo assets, social links, and the default background image."}
                  {activeTab === "hero" && "Update the main homepage hero statement, description copy, action buttons, and background preset."}
                  {activeTab === "homepageButtons" && "Manage where all the buttons on the homepage lead."}
                  {activeTab === "pillars" && "Edit the highlights of the three main service offerings (Coverage, Agents, Partners)."}
                  {activeTab === "splits" && "Modify copywriting layouts for the growth programs, policy reviews, and About sections."}
                  {activeTab === "carriers" && "Add or modify logos of the trusted carriers that rotate on the home page."}
                  {activeTab === "banners" && "Customize top and bottom banner images and global typography parameters for all subwebsites."}
                  {activeTab === "buttons" && "Customize the raw HTML codes for floating review/call CTAs."}
                  {activeTab === "fonts" && "Manage family typefaces and scaling sizes dynamically across categories and subpages."}
                  {activeTab === "builder" && "Enable, disable, and drag/reorder layout sections or custom HTML blocks like in Elementor."}
                  {activeTab === "subpageEditor" && "Edit raw HTML & CSS layout code, custom CTA buttons, meta titles, and descriptions for each subpage."}
                  {activeTab === "integrations" && "Paste custom HTML code templates, chatbot widgets (e.g., WhatsApp, LiveChat), or tracker scripts."}
                  {activeTab === "insuranceBanners" && "Edit the 5 horizontal product banners displayed on the homepage (Life, Commercial, Homeowners, Auto, Umbrella)."}
                  {activeTab === "faqs" && "Manage the accordion style FAQ list displayed on the homepage."}
                  {activeTab === "metrics" && "Toggle visibility, and customize headings, items, and icons of the Benefits & Metrics card on the homepage."}
                  {activeTab === "testimonials" && "Manage testimonial section visibility, section titles, and edit agent & client reviews."}
                  {activeTab === "visitors" && "Live analytics dashboard — visitor counts, countries, devices, top pages, and recent visitors feed."}
                </p>
              </div>
            </div>
          
          {/* TAB: WEBSITE VISITORS */}
          {activeTab === "visitors" && (
            <VisitorsDashboard />
          )}

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
                <SupabaseImageUploader
                  value={localConfig.logoUrl || ""}
                  onChange={(url) => handleUpdateGlobal("logoUrl", url)}
                  label="Custom Logo Image"
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
                      className="w-10 h-10 bg-transparent border border-zinc-800 rounded cursor-pointer shrink-0"
                    />
                    <input
                      type="text"
                      value={localConfig.accentColor}
                      onChange={(e) => handleUpdateGlobal("accentColor", e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-center text-white font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">Global Background Color</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={localConfig.globalBackground || "#000000"}
                      onChange={(e) => handleUpdateGlobal("globalBackground", e.target.value)}
                      className="w-10 h-10 bg-transparent border border-zinc-800 rounded cursor-pointer shrink-0"
                    />
                    <input
                      type="text"
                      value={localConfig.globalBackground || "#000000"}
                      onChange={(e) => handleUpdateGlobal("globalBackground", e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-center text-white font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div className="col-span-2 space-y-1.5 mt-2">
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

                <div className="col-span-2 border-t border-zinc-900 pt-4 mt-2">
                  <SupabaseImageUploader
                    value={localConfig.globalBackgroundImage || ""}
                    onChange={(url) => handleUpdateGlobal("globalBackgroundImage", url)}
                    label="Global Background Image"
                  />
                </div>

                <div className="col-span-2 border-t border-zinc-900 pt-4 mt-2 space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">Social Media Footer Links</label>
                    <button
                      onClick={() => {
                        const updated = [...(localConfig.socialLinks || [])];
                        updated.push({ icon: "facebook", url: "https://" });
                        handleUpdateGlobal("socialLinks", updated);
                      }}
                      className="text-[9px] font-mono font-bold tracking-wider px-2 py-1 bg-[#FAC000]/10 border border-[#FAC000]/30 hover:border-[#FAC000] text-[#FAC000] hover:bg-[#FAC000]/25 rounded transition-all"
                    >
                      + ADD SOCIAL LINK
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {((localConfig.socialLinks) || []).map((social, idx) => (
                      <div key={idx} className="flex items-center space-x-2 bg-zinc-900/50 p-2 rounded border border-zinc-900">
                        <select
                          value={social.icon}
                          onChange={(e) => {
                            const updated = [...localConfig.socialLinks];
                            updated[idx] = { ...updated[idx], icon: e.target.value };
                            handleUpdateGlobal("socialLinks", updated);
                          }}
                          className="bg-zinc-900 border border-zinc-800 text-xs text-white p-1.5 rounded focus:outline-none font-mono"
                        >
                          <option value="facebook">Facebook</option>
                          <option value="instagram">Instagram</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="youtube">YouTube</option>
                          <option value="twitter">Twitter</option>
                          <option value="globe">Website/Globe</option>
                          <option value="whatsapp">WhatsApp</option>
                          <option value="telegram">Telegram</option>
                        </select>
                        <input
                          type="text"
                          value={social.url}
                          onChange={(e) => {
                            const updated = [...localConfig.socialLinks];
                            updated[idx] = { ...updated[idx], url: e.target.value };
                            handleUpdateGlobal("socialLinks", updated);
                          }}
                          placeholder="Link URL"
                          className="w-full bg-zinc-900 border border-zinc-800 text-xs text-white p-2 rounded focus:outline-none font-mono"
                        />
                        <button
                          onClick={() => {
                            const updated = localConfig.socialLinks.filter((_, sIdx) => sIdx !== idx);
                            handleUpdateGlobal("socialLinks", updated);
                          }}
                          className="p-2 border border-red-900/40 text-red-500 hover:bg-red-500 hover:text-white rounded transition-colors"
                          title="Delete Social Link"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: HERO EDITING */}
          {activeTab === "hero" && (
            <div className="space-y-4">
              {/* LIVE PREVIEW MODULE */}
              <div className="p-4 bg-zinc-950/80 border border-zinc-850 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                  <span className="text-[10px] font-mono text-[#FAC000] font-black tracking-widest uppercase block">
                    Live Preview (Before Applying Changes)
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                    <span className="text-[9px] font-mono font-bold text-zinc-400">REAL-TIME</span>
                  </span>
                </div>
                
                <div 
                  className="relative rounded-xl border border-zinc-800/80 overflow-hidden min-h-[200px] flex items-center p-6 bg-zinc-900/60"
                  style={localConfig.hero.layout !== "split" && !isVideoUrl(localConfig.hero.bgUrl) ? {
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.85)), url(${getDirectImageUrl(localConfig.hero.bgUrl)})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  } : {
                    backgroundColor: "#050507"
                  }}
                >
                  {localConfig.hero.layout !== "split" && isVideoUrl(localConfig.hero.bgUrl) && (
                    <>
                      <video
                        key={localConfig.hero.bgUrl}
                        src={getDirectImageUrl(localConfig.hero.bgUrl)}
                        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
                        muted
                        playsInline
                        autoPlay
                        loop
                      />
                      <div className="absolute inset-0 bg-black/60" />
                    </>
                  )}
                  {localConfig.hero.layout === "split" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center w-full">
                      {localConfig.hero.splitImageSide === "left" && (
                        <div className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-zinc-850 order-first md:order-none">
                          {isVideoUrl(localConfig.hero.bgUrl) ? (
                            <video
                              key={localConfig.hero.bgUrl}
                              src={getDirectImageUrl(localConfig.hero.bgUrl)}
                              className="w-full h-full object-cover"
                              muted
                              playsInline
                              autoPlay
                              loop
                            />
                          ) : (
                            <img 
                              key={localConfig.hero.bgUrl}
                              src={getDirectImageUrl(localConfig.hero.bgUrl)} 
                              alt="Preview Hero" 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          )}
                        </div>
                      )}
                      
                      <div className={`flex flex-col space-y-2 ${
                        localConfig.hero.align === "center" ? "items-center text-center mx-auto" : localConfig.hero.align === "right" ? "items-end text-right ml-auto" : "items-start text-left mr-auto"
                      }`}>
                        <div className="flex items-center space-x-1.5">
                          <span className="h-[1px] w-4 bg-[#FAC000]" />
                          <span className="text-[8px] font-mono tracking-widest text-zinc-500 uppercase">PREVIEW</span>
                        </div>
                        <h3 className="font-sans font-black leading-tight text-white" style={{ fontSize: `${(localConfig.hero.titleSize || 56) * 0.45}px` }}>
                          <span className="block" style={{ color: localConfig.hero.titleWhiteColor || "#ffffff" }}>{localConfig.hero.titleWhite}</span>
                          <span className="block mt-0.5" style={{ color: localConfig.hero.titleYellowColor || localConfig.accentColor || "#FAC000" }}>{localConfig.hero.titleYellow}</span>
                        </h3>
                        <p className="font-sans leading-relaxed text-[10px] max-w-xs" style={{ color: localConfig.hero.subtitleColor || "rgb(161 161 170)" }}>
                          {localConfig.hero.subtitle}
                        </p>
                        <div className="flex gap-2 pt-2">
                          <span className="px-3 py-1 bg-[#FAC000] text-black font-mono font-bold text-[8px] rounded select-none">
                            {localConfig.hero.btnReviewText || "REVIEW"}
                          </span>
                          <span className="px-3 py-1 border border-zinc-800 text-white font-mono text-[8px] rounded select-none">
                            {localConfig.hero.btnGrowText || "GROW"}
                          </span>
                        </div>
                      </div>

                      {localConfig.hero.splitImageSide !== "left" && (
                        <div className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-zinc-850">
                          {isVideoUrl(localConfig.hero.bgUrl) ? (
                            <video
                              key={localConfig.hero.bgUrl}
                              src={getDirectImageUrl(localConfig.hero.bgUrl)}
                              className="w-full h-full object-cover"
                              muted
                              playsInline
                              autoPlay
                              loop
                            />
                          ) : (
                            <img 
                              key={localConfig.hero.bgUrl}
                              src={getDirectImageUrl(localConfig.hero.bgUrl)} 
                              alt="Preview Hero" 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full">
                      {(() => {
                        const mShow = localConfig.metrics?.show !== undefined ? localConfig.metrics.show : (localConfig.hero.showMetrics !== false);
                        const mTitle = localConfig.metrics?.title || "BENEFITS & METRICS";
                        const mItems = localConfig.metrics?.items || [
                          { title: "MAXIMUM SECURITY", description: "", icon: "shield" },
                          { title: "AGENCY SCALE SYSTEM", description: "", icon: "target" },
                          { title: "INVESTMENT GROWTH", description: "", icon: "award" }
                        ];

                        if (mShow) {
                          return (
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center w-full">
                              <div className={`md:col-span-8 flex flex-col space-y-2 ${
                                localConfig.hero.align === "center" ? "items-center text-center mx-auto" : localConfig.hero.align === "right" ? "items-end text-right ml-auto" : "items-start text-left mr-auto"
                              }`}>
                                <div className="flex items-center space-x-1.5">
                                  <span className="h-[1px] w-4 bg-[#FAC000]" />
                                  <span className="text-[8px] font-mono tracking-widest text-zinc-500 uppercase">PREVIEW</span>
                                </div>
                                <h3 className="font-sans font-black leading-tight text-white" style={{ fontSize: `${(localConfig.hero.titleSize || 56) * 0.45}px` }}>
                                  <span className="block" style={{ color: localConfig.hero.titleWhiteColor || "#ffffff" }}>{localConfig.hero.titleWhite}</span>
                                  <span className="block mt-0.5" style={{ color: localConfig.hero.titleYellowColor || localConfig.accentColor || "#FAC000" }}>{localConfig.hero.titleYellow}</span>
                                </h3>
                                <p className="font-sans leading-relaxed text-[10px] max-w-xs" style={{ color: localConfig.hero.subtitleColor || "rgb(161 161 170)" }}>
                                  {localConfig.hero.subtitle}
                                </p>
                                <div className="flex gap-2 pt-2">
                                  <span className="px-3 py-1 bg-[#FAC000] text-black font-mono font-bold text-[8px] rounded select-none">
                                    {localConfig.hero.btnReviewText || "REVIEW"}
                                  </span>
                                  <span className="px-3 py-1 border border-zinc-800 text-white font-mono text-[8px] rounded select-none">
                                    {localConfig.hero.btnGrowText || "GROW"}
                                  </span>
                                </div>
                              </div>
                              <div className="md:col-span-4 hidden md:flex flex-col space-y-1.5 p-3 bg-zinc-950/90 border border-zinc-850 rounded-lg text-[7px] text-zinc-400 font-mono">
                                <span className="text-[8px] text-[#FAC000] font-bold tracking-widest uppercase block border-b border-zinc-900 pb-1">{mTitle}</span>
                                {mItems.map((mi, idx) => {
                                  const IconComp = 
                                    mi.icon === "shield" ? ShieldCheck :
                                    mi.icon === "target" ? Target :
                                    mi.icon === "award" ? Award :
                                    mi.icon === "star" ? Star :
                                    mi.icon === "users" ? Users :
                                    mi.icon === "zap" ? Zap :
                                    ShieldCheck;
                                  return (
                                    <div key={idx} className="flex items-center gap-1.5 uppercase truncate">
                                      <IconComp className="w-2.5 h-2.5 text-[#FAC000] shrink-0" />
                                      <span>{mi.title || "Untitled Item"}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        } else {
                          return (
                            <div className={`flex flex-col space-y-2 w-full ${
                              localConfig.hero.align === "center" ? "items-center text-center mx-auto" : localConfig.hero.align === "right" ? "items-end text-right ml-auto" : "items-start text-left mr-auto"
                            }`}>
                              <div className="flex items-center space-x-1.5">
                                <span className="h-[1px] w-4 bg-[#FAC000]" />
                                <span className="text-[8px] font-mono tracking-widest text-zinc-500 uppercase">PREVIEW</span>
                              </div>
                              <h3 className="font-sans font-black leading-tight text-white" style={{ fontSize: `${(localConfig.hero.titleSize || 56) * 0.45}px` }}>
                                <span className="block" style={{ color: localConfig.hero.titleWhiteColor || "#ffffff" }}>{localConfig.hero.titleWhite}</span>
                                <span className="block mt-0.5" style={{ color: localConfig.hero.titleYellowColor || localConfig.accentColor || "#FAC000" }}>{localConfig.hero.titleYellow}</span>
                              </h3>
                              <p className="font-sans leading-relaxed text-[10px] max-w-xs" style={{ color: localConfig.hero.subtitleColor || "rgb(161 161 170)" }}>
                                {localConfig.hero.subtitle}
                              </p>
                              <div className="flex gap-2 pt-2">
                                <span className="px-3 py-1 bg-[#FAC000] text-black font-mono font-bold text-[8px] rounded select-none">
                                  {localConfig.hero.btnReviewText || "REVIEW"}
                                </span>
                                <span className="px-3 py-1 border border-zinc-800 text-white font-mono text-[8px] rounded select-none">
                                  {localConfig.hero.btnGrowText || "GROW"}
                                </span>
                              </div>
                            </div>
                          );
                        }
                      })()}
                    </div>
                  )}
                </div>
              </div>

              {/* EDIT FORM FIELDS */}
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-b border-zinc-900 py-4 my-2">
                {renderColorInput("Title White Color", localConfig.hero.titleWhiteColor || "", (val) => {
                  setLocalConfig(prev => ({
                    ...prev,
                    hero: { ...prev.hero, titleWhiteColor: val }
                  }));
                })}
                {renderColorInput("Title Yellow Color", localConfig.hero.titleYellowColor || "", (val) => {
                  setLocalConfig(prev => ({
                    ...prev,
                    hero: { ...prev.hero, titleYellowColor: val }
                  }));
                })}
                {renderColorInput("Subtitle Color", localConfig.hero.subtitleColor || "", (val) => {
                  setLocalConfig(prev => ({
                    ...prev,
                    hero: { ...prev.hero, subtitleColor: val }
                  }));
                })}
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

              {/* Typography sizing sliders */}
              <div className="grid grid-cols-2 gap-4 border-t border-zinc-900 pt-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">
                    Title Font Size ({localConfig.hero.titleSize || 56}px)
                  </label>
                  <input
                    type="range"
                    min="32"
                    max="80"
                    value={localConfig.hero.titleSize || 56}
                    onChange={(e) => handleUpdateNested("hero", "titleSize", parseInt(e.target.value))}
                    className="w-full accent-[#FAC000] cursor-pointer"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">
                    Subtitle Font Size ({localConfig.hero.subtitleSize || 18}px)
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="28"
                    value={localConfig.hero.subtitleSize || 18}
                    onChange={(e) => handleUpdateNested("hero", "subtitleSize", parseInt(e.target.value))}
                    className="w-full accent-[#FAC000] cursor-pointer"
                  />
                </div>
              </div>

              {/* Alignment & Layout selectors */}
              <div className="grid grid-cols-2 gap-4 border-t border-zinc-900 pt-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">
                    Text Alignment
                  </label>
                  <select
                    value={localConfig.hero.align || "left"}
                    onChange={(e) => handleUpdateNested("hero", "align", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white font-mono focus:outline-none"
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">
                    Hero Banner Layout
                  </label>
                  <select
                    value={localConfig.hero.layout || "full"}
                    onChange={(e) => handleUpdateNested("hero", "layout", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white font-mono focus:outline-none"
                  >
                    <option value="full">Full Background Cover</option>
                    <option value="split">Split layout (Text + Image Side-by-Side)</option>
                  </select>
                </div>
              </div>

              {/* Split Placement */}
              {(localConfig.hero.layout === "split") && (
                <div className="space-y-1.5 border-t border-zinc-900 pt-4">
                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">
                    Split Image Side
                  </label>
                  <select
                    value={localConfig.hero.splitImageSide || "right"}
                    onChange={(e) => handleUpdateNested("hero", "splitImageSide", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white font-mono focus:outline-none"
                  >
                    <option value="left">Left Column</option>
                    <option value="right">Right Column</option>
                  </select>
                </div>
              )}

              {/* Show/Hide Metrics option (Full layout only) */}
              {localConfig.hero.layout !== "split" && (
                <div className="flex items-center space-x-3 p-3 bg-zinc-900/40 rounded-lg border border-zinc-900 mt-4">
                  <input
                    type="checkbox"
                    id="showMetricsCheckbox"
                    checked={localConfig.hero.showMetrics !== false}
                    onChange={(e) => {
                      handleUpdateNested("hero", "showMetrics", e.target.checked);
                    }}
                    className="w-4 h-4 accent-[#FAC000] cursor-pointer"
                  />
                  <div className="flex-1">
                    <label htmlFor="showMetricsCheckbox" className="text-xs font-bold text-white cursor-pointer select-none">
                      Show Benefits & Metrics Panel
                    </label>
                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                      IF UNCHECKED, THE RIGHT-HAND METRICS CARD WILL BE HIDDEN, AND TEXT WILL COVER FULL WIDTH.
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-3 border-t border-zinc-900 pt-4">
                <SupabaseMediaUploader
                  value={localConfig.hero.bgUrl}
                  onChange={(url) => handleUpdateNested("hero", "bgUrl", url)}
                  label="Hero Background Image or Video"
                />

                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-zinc-500 uppercase block">Or Choose Preset</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {bgPresetOptions.slice(0, 3).map((opt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleUpdateNested("hero", "bgUrl", opt.url)}
                        className={`p-2 bg-zinc-900 hover:bg-zinc-850 rounded text-[10px] font-mono text-center border transition-all ${
                          localConfig.hero.bgUrl === opt.url ? "border-[#FAC000] text-[#FAC000]" : "border-zinc-800 text-zinc-400"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: HOMEPAGE BUTTONS */}
          {activeTab === "homepageButtons" && (
            <div className="space-y-6">
              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg space-y-4">
                <h4 className="text-[12px] font-mono text-[#FAC000] font-bold uppercase tracking-wider block border-b border-zinc-900 pb-2">Hero Section Links</h4>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">"REVIEW MY POLICY" Button Link</label>
                  <input
                    type="text"
                    value={localConfig.hero.btnReviewUrl}
                    onChange={(e) => handleUpdateNested("hero", "btnReviewUrl", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">"GROW MY AGENCY" Button Link</label>
                  <input
                    type="text"
                    value={localConfig.hero.btnGrowUrl}
                    onChange={(e) => handleUpdateNested("hero", "btnGrowUrl", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg space-y-4">
                <h4 className="text-[12px] font-mono text-[#FAC000] font-bold uppercase tracking-wider block border-b border-zinc-900 pb-2">Middle Split Section</h4>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">"UPLOAD POLICY" Button Link</label>
                  <input
                    type="text"
                    value={localConfig.policyReview.externalUrl}
                    onChange={(e) => handleUpdateNested("policyReview", "externalUrl", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg space-y-4">
                <h4 className="text-[12px] font-mono text-[#FAC000] font-bold uppercase tracking-wider block border-b border-zinc-900 pb-2">Core Pillars Section</h4>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">"BECOME A PARTNER" Button Link</label>
                  <input
                    type="text"
                    value={localConfig.pillars.partners.btnUrl}
                    onChange={(e) => handleUpdatePillar("partners", "btnUrl", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Agents Growth Button Link</label>
                  <input
                    type="text"
                    value={localConfig.pillars.agents.btnUrl}
                    onChange={(e) => handleUpdatePillar("agents", "btnUrl", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Coverage Button Link</label>
                  <input
                    type="text"
                    value={localConfig.pillars.coverage.btnUrl}
                    onChange={(e) => handleUpdatePillar("coverage", "btnUrl", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg space-y-4">
                <h4 className="text-[12px] font-mono text-[#FAC000] font-bold uppercase tracking-wider block border-b border-zinc-900 pb-2">Bottom Split Section</h4>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">"JOIN INNER CIRCLE" Button Link</label>
                  <input
                    type="text"
                    value={localConfig.innerCircle.btnUrl}
                    onChange={(e) => handleUpdateNested("innerCircle", "btnUrl", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: BENEFITS & METRICS */}
          {activeTab === "metrics" && (
            <div className="space-y-6">
              {/* LIVE PREVIEW CARD */}
              <div className="p-4 bg-zinc-950/60 border border-zinc-900 rounded-lg space-y-3">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Live Card Preview</span>
                {(() => {
                  const mShow = localConfig.metrics?.show !== false;
                  const mTitle = localConfig.metrics?.title || "BENEFITS & METRICS";
                  const mStabilityLabel = localConfig.metrics?.stabilityLabel || "SYSTEM STABILITY";
                  const mStabilityStatus = localConfig.metrics?.stabilityStatus || "ACTIVE";
                  const mItems = localConfig.metrics?.items || [
                    { title: "MAXIMUM SECURITY", description: "Multi-million-dollar coverage...", icon: "shield" },
                    { title: "AGENCY SCALE SYSTEM", description: "Premium lead-gen...", icon: "target" },
                    { title: "INVESTMENT GROWTH", description: "Partner with our...", icon: "award" }
                  ];

                  if (!mShow) {
                    return (
                      <div className="p-6 bg-zinc-950/40 border border-zinc-900 rounded-xl text-center text-xs text-zinc-500 font-mono">
                        METRICS PANEL IS HIDDEN. TOGGLE ON BELOW TO ENABLE.
                      </div>
                    );
                  }

                  return (
                    <div className="max-w-md mx-auto bg-zinc-950/90 border border-zinc-800/80 p-6 rounded-xl shadow-2xl relative overflow-hidden group hover:border-[#FAC000]/60 transition-colors text-left font-mono">
                      <div className="absolute top-0 right-0 w-20 h-20 opacity-10 pointer-events-none text-[#FAC000]">
                        {(() => {
                          const firstIcon = mItems[0]?.icon;
                          const IconComp = 
                            firstIcon === "shield" ? ShieldCheck :
                            firstIcon === "target" ? Target :
                            firstIcon === "award" ? Award :
                            firstIcon === "star" ? Star :
                            firstIcon === "users" ? Users :
                            firstIcon === "zap" ? Zap :
                            ShieldCheck;
                          return <IconComp className="w-full h-full" />;
                        })()}
                      </div>

                      <div className="text-[10px] uppercase tracking-widest mb-4" style={{ color: localConfig.metrics?.titleColor || "rgb(113 113 122)" }}>
                        {mTitle}
                      </div>

                      <div className="space-y-4">
                        {mItems.map((item, index) => {
                          const IconComp = 
                            item.icon === "shield" ? ShieldCheck :
                            item.icon === "target" ? Target :
                            item.icon === "award" ? Award :
                            item.icon === "star" ? Star :
                            item.icon === "users" ? Users :
                            item.icon === "zap" ? Zap :
                            ShieldCheck;

                          return (
                            <div key={index} className="flex items-start space-x-3">
                              <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded text-[#FAC000] shrink-0">
                                <IconComp className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="text-[11px] font-bold uppercase" style={{ color: localConfig.metrics?.itemTitleColor || "rgb(228 228 231)" }}>{item.title || "Untitled Item"}</h4>
                                <p className="text-[9px] mt-0.5 font-sans leading-normal" style={{ color: localConfig.metrics?.itemDescriptionColor || "rgb(161 161 170)" }}>{item.description || "No description provided."}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-5 pt-3 border-t border-zinc-900 flex justify-between items-center text-[9px]">
                        <span className="uppercase" style={{ color: localConfig.metrics?.stabilityLabelColor || "rgb(113 113 122)" }}>{mStabilityLabel}</span>
                        <span className="flex items-center space-x-1">
                          <span className="w-1.5 h-1.5 bg-[#FAC000] rounded-full animate-ping" />
                          <span className="font-bold text-zinc-300 uppercase">{mStabilityStatus}</span>
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Toggle switch */}
              <div className="flex items-center space-x-3 p-3 bg-zinc-900/40 rounded-lg border border-zinc-900">
                <input
                  type="checkbox"
                  id="metricsShowCheckbox"
                  checked={localConfig.metrics?.show !== false}
                  onChange={(e) => {
                    handleUpdateNested("metrics", "show", e.target.checked);
                    // Sync to hero for backwards compatibility
                    handleUpdateNested("hero", "showMetrics", e.target.checked);
                  }}
                  className="w-4 h-4 accent-[#FAC000] cursor-pointer"
                />
                <div className="flex-1">
                  <label htmlFor="metricsShowCheckbox" className="text-xs font-bold text-white cursor-pointer select-none">
                    Show Benefits & Metrics Panel
                  </label>
                  <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                    ENABLE OR DISABLE THIS COMPONENT FROM RENDERING ON THE HOMEPAGE HERO SECTION.
                  </p>
                </div>
              </div>

              {/* Core Titles */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-zinc-900 pt-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Panel Title</label>
                  <input
                    type="text"
                    value={localConfig.metrics?.title || "BENEFITS & METRICS"}
                    onChange={(e) => handleUpdateNested("metrics", "title", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white focus:outline-none font-bold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Stability Label</label>
                  <input
                    type="text"
                    value={localConfig.metrics?.stabilityLabel || "SYSTEM STABILITY"}
                    onChange={(e) => handleUpdateNested("metrics", "stabilityLabel", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white focus:outline-none font-mono text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Stability Status</label>
                  <input
                    type="text"
                    value={localConfig.metrics?.stabilityStatus || "ACTIVE"}
                    onChange={(e) => handleUpdateNested("metrics", "stabilityStatus", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white focus:outline-none font-mono text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-zinc-900 pt-4 mt-2">
                {renderColorInput("Panel Title Color", localConfig.metrics?.titleColor || "", (val) => {
                  setLocalConfig(prev => ({
                    ...prev,
                    metrics: { ...prev.metrics, titleColor: val } as any
                  }));
                })}
                {renderColorInput("Stability Label Color", localConfig.metrics?.stabilityLabelColor || "", (val) => {
                  setLocalConfig(prev => ({
                    ...prev,
                    metrics: { ...prev.metrics, stabilityLabelColor: val } as any
                  }));
                })}
                {renderColorInput("Item Title Color", localConfig.metrics?.itemTitleColor || "", (val) => {
                  setLocalConfig(prev => ({
                    ...prev,
                    metrics: { ...prev.metrics, itemTitleColor: val } as any
                  }));
                })}
                {renderColorInput("Item Description Color", localConfig.metrics?.itemDescriptionColor || "", (val) => {
                  setLocalConfig(prev => ({
                    ...prev,
                    metrics: { ...prev.metrics, itemDescriptionColor: val } as any
                  }));
                })}
              </div>

              {/* Three items */}
              <div className="space-y-4 border-t border-zinc-900 pt-4">
                <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">
                  Metric Items List (3 Max)
                </span>
                
                {[0, 1, 2].map((idx) => {
                  const item = localConfig.metrics?.items?.[idx] || {
                    title: idx === 0 ? "MAXIMUM SECURITY" : idx === 1 ? "AGENCY SCALE SYSTEM" : "INVESTMENT GROWTH",
                    description: "",
                    icon: idx === 0 ? "shield" : idx === 1 ? "target" : "award"
                  };

                  return (
                    <div key={idx} className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg space-y-4">
                      <span className="text-[10px] font-mono text-[#FAC000] font-bold tracking-widest uppercase block border-b border-zinc-900 pb-1.5">
                        Item {idx + 1}
                      </span>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 space-y-1.5">
                          <label className="text-[9px] font-mono text-zinc-500">Item Title</label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => handleUpdateMetricItem(idx, "title", e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2 text-white font-bold"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-mono text-zinc-500">Icon Type</label>
                          <select
                            value={item.icon || "shield"}
                            onChange={(e) => handleUpdateMetricItem(idx, "icon", e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2 text-white font-mono focus:outline-none"
                          >
                            <option value="shield">Shield</option>
                            <option value="target">Target</option>
                            <option value="award">Award</option>
                            <option value="star">Star</option>
                            <option value="users">Users</option>
                            <option value="zap">Zap</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono text-zinc-500">Item Description</label>
                        <textarea
                          rows={2}
                          value={item.description}
                          onChange={(e) => handleUpdateMetricItem(idx, "description", e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2 text-white leading-relaxed"
                          placeholder="Provide a short subtext or metric description..."
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: PILLARS */}
          {activeTab === "pillars" && (
            <div className="space-y-6">
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
                <div className="grid grid-cols-2 gap-4 border-t border-zinc-900/60 pt-2 mt-2">
                  {renderColorInput("Title Color", localConfig.pillars.coverage.titleColor || "", (val) => {
                    setLocalConfig(prev => ({
                      ...prev,
                      pillars: {
                        ...prev.pillars,
                        coverage: { ...prev.pillars.coverage, titleColor: val }
                      }
                    }));
                  })}
                  {renderColorInput("Description Color", localConfig.pillars.coverage.descriptionColor || "", (val) => {
                    setLocalConfig(prev => ({
                      ...prev,
                      pillars: {
                        ...prev.pillars,
                        coverage: { ...prev.pillars.coverage, descriptionColor: val }
                      }
                    }));
                  })}
                </div>
              </div>

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
                <div className="grid grid-cols-2 gap-4 border-t border-zinc-900/60 pt-2 mt-2">
                  {renderColorInput("Title Color", localConfig.pillars.agents.titleColor || "", (val) => {
                    setLocalConfig(prev => ({
                      ...prev,
                      pillars: {
                        ...prev.pillars,
                        agents: { ...prev.pillars.agents, titleColor: val }
                      }
                    }));
                  })}
                  {renderColorInput("Description Color", localConfig.pillars.agents.descriptionColor || "", (val) => {
                    setLocalConfig(prev => ({
                      ...prev,
                      pillars: {
                        ...prev.pillars,
                        agents: { ...prev.pillars.agents, descriptionColor: val }
                      }
                    }));
                  })}
                </div>
              </div>

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
                <div className="grid grid-cols-2 gap-4 border-t border-zinc-900/60 pt-2 mt-2">
                  {renderColorInput("Title Color", localConfig.pillars.partners.titleColor || "", (val) => {
                    setLocalConfig(prev => ({
                      ...prev,
                      pillars: {
                        ...prev.pillars,
                        partners: { ...prev.pillars.partners, titleColor: val }
                      }
                    }));
                  })}
                  {renderColorInput("Description Color", localConfig.pillars.partners.descriptionColor || "", (val) => {
                    setLocalConfig(prev => ({
                      ...prev,
                      pillars: {
                        ...prev.pillars,
                        partners: { ...prev.pillars.partners, descriptionColor: val }
                      }
                    }));
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB: SECTIONS */}
          {activeTab === "splits" && (
            <div className="space-y-6">
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
                <div className="grid grid-cols-2 gap-4 border-t border-zinc-900/60 pt-2 mt-2">
                  {renderColorInput("Title Color", localConfig.policyReview.titleColor || "", (val) => {
                    setLocalConfig(prev => ({
                      ...prev,
                      policyReview: { ...prev.policyReview, titleColor: val }
                    }));
                  })}
                  {renderColorInput("Description Color", localConfig.policyReview.bodyColor || "", (val) => {
                    setLocalConfig(prev => ({
                      ...prev,
                      policyReview: { ...prev.policyReview, bodyColor: val }
                    }));
                  })}
                </div>
              </div>

              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg space-y-3">
                <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase block border-b border-zinc-900 pb-1.5">Agents Growth Column</span>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-zinc-500 block">Section Label</label>
                  <input
                    type="text"
                    value={localConfig.biggerAgency.label || ""}
                    onChange={(e) => handleUpdateNested("biggerAgency", "label", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-zinc-500 block">Title</label>
                  <input
                    type="text"
                    value={localConfig.biggerAgency.title}
                    onChange={(e) => handleUpdateNested("biggerAgency", "title", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white font-extrabold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-zinc-900/60 pt-2 mt-2">
                  {renderColorInput("Label Color", localConfig.biggerAgency.labelColor || "", (val) => {
                    setLocalConfig(prev => ({
                      ...prev,
                      biggerAgency: { ...prev.biggerAgency, labelColor: val }
                    }));
                  })}
                  {renderColorInput("Title Color", localConfig.biggerAgency.titleColor || "", (val) => {
                    setLocalConfig(prev => ({
                      ...prev,
                      biggerAgency: { ...prev.biggerAgency, titleColor: val }
                    }));
                  })}
                </div>
              </div>

              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg space-y-3">
                <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase block border-b border-zinc-900 pb-1.5">Inner Circle Referral Column</span>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-zinc-500 block">Section Label</label>
                  <input
                    type="text"
                    value={localConfig.innerCircle.label || ""}
                    onChange={(e) => handleUpdateNested("innerCircle", "label", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-zinc-500 block">Title</label>
                  <input
                    type="text"
                    value={localConfig.innerCircle.title}
                    onChange={(e) => handleUpdateNested("innerCircle", "title", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white font-extrabold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-zinc-500 block">Body Text</label>
                  <textarea
                    rows={2}
                    value={localConfig.innerCircle.body}
                    onChange={(e) => handleUpdateNested("innerCircle", "body", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 border-t border-zinc-900/60 pt-2 mt-2">
                  {renderColorInput("Label Color", localConfig.innerCircle.labelColor || "", (val) => {
                    setLocalConfig(prev => ({
                      ...prev,
                      innerCircle: { ...prev.innerCircle, labelColor: val }
                    }));
                  })}
                  {renderColorInput("Title Color", localConfig.innerCircle.titleColor || "", (val) => {
                    setLocalConfig(prev => ({
                      ...prev,
                      innerCircle: { ...prev.innerCircle, titleColor: val }
                    }));
                  })}
                  {renderColorInput("Body Color", localConfig.innerCircle.bodyColor || "", (val) => {
                    setLocalConfig(prev => ({
                      ...prev,
                      innerCircle: { ...prev.innerCircle, bodyColor: val }
                    }));
                  })}
                </div>
              </div>

              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg space-y-3">
                <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase block border-b border-zinc-900 pb-1.5">About Us Column</span>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-zinc-500 block">Section Label</label>
                  <input
                    type="text"
                    value={localConfig.aboutBoss.label || ""}
                    onChange={(e) => handleUpdateNested("aboutBoss", "label", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-zinc-500 block">Title</label>
                  <input
                    type="text"
                    value={localConfig.aboutBoss.title}
                    onChange={(e) => handleUpdateNested("aboutBoss", "title", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white font-extrabold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-zinc-500 block">Body Text</label>
                  <textarea
                    rows={3}
                    value={localConfig.aboutBoss.body}
                    onChange={(e) => handleUpdateNested("aboutBoss", "body", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                  />
                </div>
                <div className="pt-2">
                  <SupabaseImageUploader
                    value={localConfig.aboutBoss.bgUrl}
                    onChange={(url) => handleUpdateNested("aboutBoss", "bgUrl", url)}
                    label="Avatar Photo Link"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 border-t border-zinc-900/60 pt-2 mt-2">
                  {renderColorInput("Label Color", localConfig.aboutBoss.labelColor || "", (val) => {
                    setLocalConfig(prev => ({
                      ...prev,
                      aboutBoss: { ...prev.aboutBoss, labelColor: val }
                    }));
                  })}
                  {renderColorInput("Title Color", localConfig.aboutBoss.titleColor || "", (val) => {
                    setLocalConfig(prev => ({
                      ...prev,
                      aboutBoss: { ...prev.aboutBoss, titleColor: val }
                    }));
                  })}
                  {renderColorInput("Body Color", localConfig.aboutBoss.bodyColor || "", (val) => {
                    setLocalConfig(prev => ({
                      ...prev,
                      aboutBoss: { ...prev.aboutBoss, bodyColor: val }
                    }));
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB: CARRIERS BANNER */}
          {activeTab === "carriers" && (
            <div className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">Carriers Section Title</label>
                <input
                  type="text"
                  value={localConfig.carriersBanner.title}
                  onChange={(e) => {
                    const val = e.target.value;
                    setLocalConfig(prev => ({
                      ...prev,
                      carriersBanner: { ...prev.carriersBanner, title: val }
                    }));
                  }}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">Carriers Section Subtitle</label>
                <textarea
                  rows={3}
                  value={localConfig.carriersBanner.subtitle}
                  onChange={(e) => {
                    const val = e.target.value;
                    setLocalConfig(prev => ({
                      ...prev,
                      carriersBanner: { ...prev.carriersBanner, subtitle: val }
                    }));
                  }}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-zinc-900/60 pt-2 pb-2">
                {renderColorInput("Title Color", localConfig.carriersBanner.titleColor || "", (val) => {
                  setLocalConfig(prev => ({
                    ...prev,
                    carriersBanner: { ...prev.carriersBanner, titleColor: val }
                  }));
                })}
                {renderColorInput("Description Color", localConfig.carriersBanner.subtitleColor || "", (val) => {
                  setLocalConfig(prev => ({
                    ...prev,
                    carriersBanner: { ...prev.carriersBanner, subtitleColor: val }
                  }));
                })}
              </div>

              {/* Speed Slider Box */}
              <div className="p-4 bg-zinc-950/60 border border-zinc-900 rounded-xl space-y-2">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-zinc-500 font-bold uppercase">Carousel Scrolling Speed (Shared)</span>
                  <span className="text-white font-bold">{localConfig.carriersBanner.speed || 25}s duration (lower is faster)</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="1"
                  value={localConfig.carriersBanner.speed || 25}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 25;
                    setLocalConfig(prev => ({
                      ...prev,
                      carriersBanner: { ...prev.carriersBanner, speed: val }
                    }));
                  }}
                  className="w-full accent-[#FAC000] cursor-pointer"
                />
              </div>
              {/* Category Editors */}
              {renderLogoCategoryEditor("personalLogos", "Personal Lines Carriers")}
              {renderLogoCategoryEditor("commercialLogos", "Commercial Lines Carriers")}
              {renderLogoCategoryEditor("lifeLogos", "Life Insurance Carriers")}
            </div>
          )}

          {/* TAB: PAGE BANNERS */}
          {activeTab === "banners" && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">Select Subpage to Configure</label>
                <select
                  value={selectedBannerPage}
                  onChange={(e) => setSelectedBannerPage(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white font-mono focus:outline-none"
                >
                  <optgroup label="Main Pages / Categories" className="text-zinc-500 font-bold bg-zinc-950">
                    {mainCategories.map((cat, idx) => (
                      <option key={idx} value={cat} className="bg-zinc-900 text-white font-normal">{cat}</option>
                    ))}
                  </optgroup>
                  {localConfig.subwebsites.map((cat, cIdx) => (
                    <optgroup key={cIdx} label={cat.category} className="text-zinc-500 font-bold bg-zinc-950">
                      {cat.items.map((sub, sIdx) => (
                        <option key={sIdx} value={sub.label} className="bg-zinc-900 text-white font-normal">{sub.label}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {selectedBannerPage && (
                <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg space-y-6">
                  <span className="text-[10px] font-mono text-[#FAC000] font-bold tracking-widest uppercase block border-b border-zinc-900 pb-1.5">
                    BANNERS FOR: {selectedBannerPage}
                  </span>
                  
                  {(() => {
                    const staticKey = getSubpageStaticKey(selectedBannerPage);
                    const currentBanners = localConfig.subwebsiteBanners[staticKey] || { topBannerUrl: "", bottomBannerUrl: "" };
                    return (
                      <div className="space-y-8">
                        {/* TOP BANNER CONFIG BLOCK */}
                        <div className="space-y-3 p-4 bg-zinc-900/40 border border-zinc-800/80 rounded-xl">
                          <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider block">Top Banner Configuration</span>
                          
                          <SupabaseMediaUploader
                            value={currentBanners.topBannerUrl}
                            onChange={(url) => handleUpdateBannerField(selectedBannerPage, "topBannerUrl", url)}
                            label="Top Banner Image or Video"
                          />

                          {/* Large Preview Block */}
                          {currentBanners.topBannerUrl && (
                            <div className="space-y-1 mt-2">
                              <label className="text-[9px] font-mono text-zinc-500 uppercase block">Live Preview (Scaled)</label>
                              <div 
                                className="relative w-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 flex items-center justify-center shadow-inner transition-all duration-300"
                                style={{
                                  height: `${Math.max(100, Math.min(350, parseInt(currentBanners.topHeight || "600") * 0.25))}px`
                                }}
                              >
                                {isVideoUrl(currentBanners.topBannerUrl) ? (
                                  <video
                                    key={currentBanners.topBannerUrl}
                                    src={getDirectImageUrl(currentBanners.topBannerUrl)}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    style={{
                                      opacity: currentBanners.topOpacity !== undefined ? currentBanners.topOpacity / 100 : 0.4
                                    }}
                                    muted
                                    playsInline
                                    autoPlay
                                    loop
                                  />
                                ) : (
                                  <div 
                                    className="absolute inset-0 w-full h-full"
                                    style={{
                                      backgroundImage: `url(${getDirectImageUrl(currentBanners.topBannerUrl)})`,
                                      backgroundRepeat: currentBanners.topFit === "tile" ? "repeat" : "no-repeat",
                                      backgroundSize: currentBanners.topFit === "tile" ? "auto" : 
                                                       currentBanners.topFit === "contain" ? "contain" :
                                                       currentBanners.topFit === "fill" ? "100% 100%" :
                                                       currentBanners.topFit === "center" ? "auto" : "cover",
                                      backgroundPosition: currentBanners.topPosition || "center",
                                      backgroundColor: "#000000",
                                      opacity: currentBanners.topOpacity !== undefined ? currentBanners.topOpacity / 100 : 0.4
                                    }}
                                  />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className={`relative z-10 p-3 select-none pointer-events-none w-full flex flex-col justify-center ${
                                  currentBanners.align === "left" 
                                    ? "text-left items-start" 
                                    : currentBanners.align === "right" 
                                      ? "text-right items-end" 
                                      : "text-center items-center"
                                }`}>
                                  <span className="text-[8px] font-mono tracking-widest uppercase block" style={{ color: currentBanners.titleColor || "#FAC000" }}>TOP BANNER</span>
                                  <h4 
                                    className="text-xs font-extrabold uppercase tracking-wider mt-1 font-sans"
                                    style={{
                                      color: currentBanners.titleColor || "#FAC000",
                                      fontSize: currentBanners.titleSize ? `${currentBanners.titleSize * 0.3}px` : "12px"
                                    }}
                                  >
                                    {currentBanners.titleText || selectedBannerPage}
                                  </h4>
                                  <p 
                                    className="text-[8px] mt-1 line-clamp-1 font-sans font-medium w-full"
                                    style={{
                                      color: currentBanners.subtitleColor || "#D4D4D8",
                                      fontSize: currentBanners.subtitleSize ? `${currentBanners.subtitleSize * 0.5}px` : "8px",
                                      textAlign: (currentBanners.subtitleAlign || currentBanners.align || "center") as any,
                                      marginLeft: (currentBanners.subtitleAlign || currentBanners.align || "center") === "left" ? "0" : "auto",
                                      marginRight: (currentBanners.subtitleAlign || currentBanners.align || "center") === "right" ? "0" : "auto"
                                    }}
                                  >
                                    {currentBanners.subtitleText || "Custom subtitle description text..."}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Custom Controls */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 pt-3 border-t border-zinc-900/60">
                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px] font-mono">
                                <span className="text-zinc-500 uppercase font-bold">Height</span>
                                <span className="text-white font-bold">{currentBanners.topHeight || "600px"}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="range"
                                  min="200"
                                  max="1200"
                                  step="10"
                                  value={parseInt(currentBanners.topHeight || "600")}
                                  onChange={(e) => handleUpdateBannerField(selectedBannerPage, "topHeight", `${e.target.value}px`)}
                                  className="flex-1 accent-[#FAC000] cursor-pointer"
                                />
                                <input
                                  type="text"
                                  value={currentBanners.topHeight || ""}
                                  onChange={(e) => handleUpdateBannerField(selectedBannerPage, "topHeight", e.target.value)}
                                  placeholder="600px"
                                  className="w-20 bg-zinc-900 border border-zinc-800 rounded p-1 text-center text-xs text-white font-mono focus:outline-none focus:border-[#FAC000]"
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Image Fit</label>
                              <select
                                value={currentBanners.topFit || "cover"}
                                onChange={(e) => handleUpdateBannerField(selectedBannerPage, "topFit", e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                              >
                                <option value="cover">Cover (Crop & Fit)</option>
                                <option value="wide">Wide (Full Width)</option>
                                <option value="center">Center (Original)</option>
                                <option value="contain">Contain (Show Entire)</option>
                                <option value="fill">Fill (Stretch)</option>
                                <option value="tile">Tile (Repeat)</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Image Position</label>
                              <select
                                value={currentBanners.topPosition || "center"}
                                onChange={(e) => handleUpdateBannerField(selectedBannerPage, "topPosition", e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                              >
                                <option value="center">Center</option>
                                <option value="top">Top</option>
                                <option value="bottom">Bottom</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px] font-mono">
                                <span className="text-zinc-500 uppercase font-bold">Opacity</span>
                                <span className="text-white font-bold">{currentBanners.topOpacity !== undefined ? currentBanners.topOpacity : 40}%</span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                step="5"
                                value={currentBanners.topOpacity !== undefined ? currentBanners.topOpacity : 40}
                                onChange={(e) => handleUpdateBannerField(selectedBannerPage, "topOpacity", parseInt(e.target.value))}
                                className="w-full accent-[#FAC000] cursor-pointer"
                              />
                            </div>
                          </div>

                          {/* Banner Text & Styling Overrides */}
                          <div className="space-y-3 mt-3 pt-3 border-t border-zinc-900/60">
                            <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider block">Banner Text & Styles Overrides</span>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Custom Title Text</label>
                                <input
                                  type="text"
                                  placeholder={selectedBannerPage}
                                  value={currentBanners.titleText || ""}
                                  onChange={(e) => handleUpdateBannerField(selectedBannerPage, "titleText", e.target.value)}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Custom Subtitle Text</label>
                                <input
                                  type="text"
                                  placeholder="Leave blank to use default subtitle..."
                                  value={currentBanners.subtitleText || ""}
                                  onChange={(e) => handleUpdateBannerField(selectedBannerPage, "subtitleText", e.target.value)}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-6 gap-3 items-end">
                              {/* Alignment */}
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Title Align</label>
                                <select
                                  value={currentBanners.align || "center"}
                                  onChange={(e) => handleUpdateBannerField(selectedBannerPage, "align", e.target.value)}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white font-mono"
                                >
                                  <option value="left">Left</option>
                                  <option value="center">Center</option>
                                  <option value="right">Right</option>
                                </select>
                              </div>

                              {/* Subtitle Alignment */}
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Subtitle Align</label>
                                <select
                                  value={currentBanners.subtitleAlign || "center"}
                                  onChange={(e) => handleUpdateBannerField(selectedBannerPage, "subtitleAlign", e.target.value)}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white font-mono"
                                >
                                  <option value="left">Left</option>
                                  <option value="center">Center</option>
                                  <option value="right">Right</option>
                                </select>
                              </div>

                              {/* Title Color */}
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Title Color</label>
                                <div className="flex space-x-1 items-center">
                                  <input
                                    type="color"
                                    value={currentBanners.titleColor || "#FAC000"}
                                    onChange={(e) => handleUpdateBannerField(selectedBannerPage, "titleColor", e.target.value)}
                                    className="w-8 h-8 bg-transparent border border-zinc-800 rounded cursor-pointer shrink-0"
                                  />
                                  <input
                                    type="text"
                                    value={currentBanners.titleColor || ""}
                                    onChange={(e) => handleUpdateBannerField(selectedBannerPage, "titleColor", e.target.value)}
                                    placeholder="#FAC000"
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-[10px] text-white font-mono"
                                  />
                                </div>
                              </div>

                              {/* Title Size */}
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Title Size (px)</label>
                                <input
                                  type="number"
                                  min="20"
                                  max="100"
                                  value={currentBanners.titleSize || 48}
                                  onChange={(e) => handleUpdateBannerField(selectedBannerPage, "titleSize", parseInt(e.target.value) || 48)}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                                />
                              </div>

                              {/* Subtitle Color */}
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Subtitle Color</label>
                                <div className="flex space-x-1 items-center">
                                  <input
                                    type="color"
                                    value={currentBanners.subtitleColor || "#D4D4D8"}
                                    onChange={(e) => handleUpdateBannerField(selectedBannerPage, "subtitleColor", e.target.value)}
                                    className="w-8 h-8 bg-transparent border border-zinc-800 rounded cursor-pointer shrink-0"
                                  />
                                  <input
                                    type="text"
                                    value={currentBanners.subtitleColor || ""}
                                    onChange={(e) => handleUpdateBannerField(selectedBannerPage, "subtitleColor", e.target.value)}
                                    placeholder="#D4D4D8"
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-[10px] text-white font-mono"
                                  />
                                </div>
                              </div>

                              {/* Subtitle Size */}
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Subtitle Size (px)</label>
                                <input
                                  type="number"
                                  min="12"
                                  max="36"
                                  value={currentBanners.subtitleSize || 16}
                                  onChange={(e) => handleUpdateBannerField(selectedBannerPage, "subtitleSize", parseInt(e.target.value) || 16)}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Banner Text & Styling Overrides */}
                          <div className="space-y-3 mt-3 pt-3 border-t border-zinc-900/60">
                            <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider block">Banner Text & Styles Overrides</span>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Custom Title Text</label>
                                <input
                                  type="text"
                                  placeholder={selectedBannerPage}
                                  value={currentBanners.titleText || ""}
                                  onChange={(e) => handleUpdateBannerField(selectedBannerPage, "titleText", e.target.value)}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Custom Subtitle Text</label>
                                <input
                                  type="text"
                                  placeholder="Leave blank to use default subtitle..."
                                  value={currentBanners.subtitleText || ""}
                                  onChange={(e) => handleUpdateBannerField(selectedBannerPage, "subtitleText", e.target.value)}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-end">
                              {/* Alignment */}
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Text Alignment</label>
                                <select
                                  value={currentBanners.align || "center"}
                                  onChange={(e) => handleUpdateBannerField(selectedBannerPage, "align", e.target.value)}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white font-mono"
                                >
                                  <option value="left">Left</option>
                                  <option value="center">Center</option>
                                  <option value="right">Right</option>
                                </select>
                              </div>

                              {/* Title Color */}
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Title Color</label>
                                <div className="flex space-x-1 items-center">
                                  <input
                                    type="color"
                                    value={currentBanners.titleColor || "#FAC000"}
                                    onChange={(e) => handleUpdateBannerField(selectedBannerPage, "titleColor", e.target.value)}
                                    className="w-8 h-8 bg-transparent border border-zinc-800 rounded cursor-pointer shrink-0"
                                  />
                                  <input
                                    type="text"
                                    value={currentBanners.titleColor || ""}
                                    onChange={(e) => handleUpdateBannerField(selectedBannerPage, "titleColor", e.target.value)}
                                    placeholder="#FAC000"
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-[10px] text-white font-mono"
                                  />
                                </div>
                              </div>

                              {/* Title Size */}
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Title Size (px)</label>
                                <input
                                  type="number"
                                  min="20"
                                  max="100"
                                  value={currentBanners.titleSize || 48}
                                  onChange={(e) => handleUpdateBannerField(selectedBannerPage, "titleSize", parseInt(e.target.value) || 48)}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                                />
                              </div>

                              {/* Subtitle Color */}
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Subtitle Color</label>
                                <div className="flex space-x-1 items-center">
                                  <input
                                    type="color"
                                    value={currentBanners.subtitleColor || "#D4D4D8"}
                                    onChange={(e) => handleUpdateBannerField(selectedBannerPage, "subtitleColor", e.target.value)}
                                    className="w-8 h-8 bg-transparent border border-zinc-800 rounded cursor-pointer shrink-0"
                                  />
                                  <input
                                    type="text"
                                    value={currentBanners.subtitleColor || ""}
                                    onChange={(e) => handleUpdateBannerField(selectedBannerPage, "subtitleColor", e.target.value)}
                                    placeholder="#D4D4D8"
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-[10px] text-white font-mono"
                                  />
                                </div>
                              </div>

                              {/* Subtitle Size */}
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Subtitle Size (px)</label>
                                <input
                                  type="number"
                                  min="12"
                                  max="36"
                                  value={currentBanners.subtitleSize || 16}
                                  onChange={(e) => handleUpdateBannerField(selectedBannerPage, "subtitleSize", parseInt(e.target.value) || 16)}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* BOTTOM BANNER CONFIG BLOCK */}
                        <div className="space-y-3 p-4 bg-zinc-900/40 border border-zinc-800/80 rounded-xl">
                          <div className="flex justify-between items-center select-none">
                            <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider">Bottom Banner Configuration</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={currentBanners.showBottomBanner !== false}
                                onChange={(e) => handleUpdateBannerField(selectedBannerPage, "showBottomBanner", e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-7 h-4 bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 peer-checked:after:bg-[#FAC000] after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-zinc-900 border border-zinc-700/60 peer-checked:border-[#FAC000]/60"></div>
                              <span className="ml-2 text-[10px] font-mono font-bold text-zinc-500 peer-checked:text-zinc-300 uppercase tracking-wider">
                                {currentBanners.showBottomBanner !== false ? "Visible" : "Hidden"}
                              </span>
                            </label>
                          </div>
                          
                           {currentBanners.bottomUseSameImageAsTop !== false ? (
                            <div className="p-3 bg-zinc-950/40 border border-zinc-900 rounded-lg text-[10px] font-mono text-zinc-500 uppercase tracking-wide">
                              Inheriting media & settings from Top Banner
                            </div>
                          ) : (
                            <SupabaseMediaUploader
                              value={currentBanners.bottomBannerUrl}
                              onChange={(url) => handleUpdateBannerField(selectedBannerPage, "bottomBannerUrl", url)}
                              label="Bottom Banner Image or Video"
                            />
                          )}

                          {/* Use same image as top banner toggle */}
                          <div className="mt-2 select-none">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={currentBanners.bottomUseSameImageAsTop !== false}
                                onChange={(e) => handleUpdateBannerField(selectedBannerPage, "bottomUseSameImageAsTop", e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-7 h-4 bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 peer-checked:after:bg-[#FAC000] after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-zinc-900 border border-zinc-700/60 peer-checked:border-[#FAC000]/60"></div>
                              <span className="ml-2 text-[10px] font-mono font-bold text-zinc-500 peer-checked:text-zinc-300 uppercase tracking-wider">
                                Use same pictures as Top
                              </span>
                            </label>
                          </div>

                          {/* Large Preview Block */}
                          {(() => {
                            const activeBottomUrl = currentBanners.bottomUseSameImageAsTop !== false
                              ? currentBanners.topBannerUrl
                              : currentBanners.bottomBannerUrl;

                            if (!activeBottomUrl) return null;

                            const activeBottomFit = currentBanners.bottomUseSameImageAsTop !== false
                              ? currentBanners.topFit
                              : currentBanners.bottomFit;

                            const activeBottomPosition = currentBanners.bottomUseSameImageAsTop !== false
                              ? currentBanners.topPosition
                              : currentBanners.bottomPosition;

                            const activeBottomOpacity = currentBanners.bottomUseSameImageAsTop !== false
                              ? (currentBanners.topOpacity !== undefined ? currentBanners.topOpacity : 40)
                              : (currentBanners.bottomOpacity !== undefined ? currentBanners.bottomOpacity : 40);

                            return (
                              <div className="space-y-1 mt-2">
                                <label className="text-[9px] font-mono text-zinc-500 uppercase block">Live Preview (Scaled)</label>
                                <div 
                                  className="relative w-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 flex items-center justify-center shadow-inner transition-all duration-300"
                                  style={{
                                    height: `${Math.max(100, Math.min(350, parseInt(currentBanners.bottomHeight || "600") * 0.25))}px`
                                  }}
                                >
                                  {isVideoUrl(activeBottomUrl) ? (
                                    <video
                                      key={activeBottomUrl}
                                      src={getDirectImageUrl(activeBottomUrl)}
                                      className="absolute inset-0 w-full h-full object-cover"
                                      style={{
                                        opacity: activeBottomOpacity / 100
                                      }}
                                      muted
                                      playsInline
                                      autoPlay
                                      loop
                                    />
                                  ) : (
                                    <div 
                                      className="absolute inset-0 w-full h-full"
                                      style={{
                                        backgroundImage: `url(${getDirectImageUrl(activeBottomUrl)})`,
                                        backgroundRepeat: activeBottomFit === "tile" ? "repeat" : "no-repeat",
                                        backgroundSize: activeBottomFit === "tile" ? "auto" : 
                                                         activeBottomFit === "contain" ? "contain" :
                                                         activeBottomFit === "fill" ? "100% 100%" :
                                                         activeBottomFit === "center" ? "auto" : "cover",
                                        backgroundPosition: activeBottomPosition || "center",
                                        backgroundColor: "#000000",
                                        opacity: activeBottomOpacity / 100
                                      }}
                                    />
                                  )}
                                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent" />
                                  {(() => {
                                    const useSame = currentBanners.bottomUseSameAsTop !== false;
                                    const bTitle = useSame ? (currentBanners.titleText || selectedBannerPage) : (currentBanners.bottomTitleText || selectedBannerPage);
                                    const bSubtitle = useSame ? (currentBanners.subtitleText || "Custom subtitle description text...") : (currentBanners.bottomSubtitleText || "Custom subtitle description text...");
                                    const bAlign = useSame ? (currentBanners.align || "center") : (currentBanners.bottomAlign || "center");
                                    const bSubAlign = useSame ? (currentBanners.subtitleAlign || bAlign) : (currentBanners.bottomSubtitleAlign || bAlign);
                                    const bTitleColor = useSame ? (currentBanners.titleColor || "#FAC000") : (currentBanners.bottomTitleColor || "#FAC000");
                                    const bTitleSize = useSame ? (currentBanners.titleSize || 48) : (currentBanners.bottomTitleSize || 48);
                                    const bSubColor = useSame ? (currentBanners.subtitleColor || "#D4D4D8") : (currentBanners.bottomSubtitleColor || "#D4D4D8");
                                    const bSubSize = useSame ? (currentBanners.subtitleSize || 16) : (currentBanners.bottomSubtitleSize || 16);

                                    return (
                                      <div className={`relative z-10 p-3 select-none pointer-events-none w-full flex flex-col justify-center ${
                                        bAlign === "left" 
                                          ? "text-left items-start" 
                                          : bAlign === "right" 
                                            ? "text-right items-end" 
                                            : "text-center items-center"
                                      }`}>
                                        <span className="text-[8px] font-mono tracking-widest uppercase block" style={{ color: bTitleColor }}>BOTTOM BANNER</span>
                                        <h4 
                                          className="text-xs font-extrabold uppercase tracking-wider mt-1 font-sans"
                                          style={{
                                            color: bTitleColor,
                                            fontSize: `${bTitleSize * 0.3}px`
                                          }}
                                        >
                                          {bTitle}
                                        </h4>
                                        <p 
                                          className="text-[8px] mt-1 line-clamp-1 font-sans font-medium w-full"
                                          style={{
                                            color: bSubColor,
                                            fontSize: `${bSubSize * 0.5}px`,
                                            textAlign: bSubAlign as any,
                                            marginLeft: bSubAlign === "left" ? "0" : "auto",
                                            marginRight: bSubAlign === "right" ? "0" : "auto"
                                          }}
                                        >
                                          {bSubtitle}
                                        </p>
                                      </div>
                                    );
                                  })()}
                                  {currentBanners.showBottomBanner === false && (
                                    <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm z-20 flex items-center justify-center">
                                      <span className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-wider px-2.5 py-1 border border-red-950 bg-red-950/20 rounded">Hidden on Subpage</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })()}

                          {/* Custom Controls */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 pt-3 border-t border-zinc-900/60">
                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px] font-mono">
                                <span className="text-zinc-500 uppercase font-bold">Banner Height</span>
                                <span className="text-white font-bold">{currentBanners.bottomHeight || "600px"}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="range"
                                  min="200"
                                  max="1200"
                                  step="10"
                                  value={parseInt(currentBanners.bottomHeight || "600")}
                                  onChange={(e) => handleUpdateBannerField(selectedBannerPage, "bottomHeight", `${e.target.value}px`)}
                                  className="flex-1 accent-[#FAC000] cursor-pointer"
                                />
                                <input
                                  type="text"
                                  value={currentBanners.bottomHeight || ""}
                                  onChange={(e) => handleUpdateBannerField(selectedBannerPage, "bottomHeight", e.target.value)}
                                  placeholder="600px"
                                  className="w-20 bg-zinc-900 border border-zinc-800 rounded p-1 text-center text-xs text-white font-mono focus:outline-none focus:border-[#FAC000]"
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Image Fit</label>
                              <select
                                value={(currentBanners.bottomUseSameImageAsTop !== false ? currentBanners.topFit : currentBanners.bottomFit) || "cover"}
                                onChange={(e) => handleUpdateBannerField(selectedBannerPage, "bottomFit", e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white disabled:opacity-50"
                                disabled={currentBanners.bottomUseSameImageAsTop !== false}
                              >
                                <option value="cover">Cover (Crop & Fit)</option>
                                <option value="contain">Contain (Show Entire)</option>
                                <option value="fill">Fill (Stretch)</option>
                                <option value="tile">Tile (Repeat)</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Image Position</label>
                              <select
                                value={(currentBanners.bottomUseSameImageAsTop !== false ? currentBanners.topPosition : currentBanners.bottomPosition) || "center"}
                                onChange={(e) => handleUpdateBannerField(selectedBannerPage, "bottomPosition", e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white disabled:opacity-50"
                                disabled={currentBanners.bottomUseSameImageAsTop !== false}
                              >
                                <option value="center">Center</option>
                                <option value="top">Top</option>
                                <option value="bottom">Bottom</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px] font-mono">
                                <span className="text-zinc-500 uppercase font-bold">Opacity</span>
                                <span className="text-white font-bold">
                                  {currentBanners.bottomUseSameImageAsTop !== false
                                    ? (currentBanners.topOpacity !== undefined ? currentBanners.topOpacity : 40)
                                    : (currentBanners.bottomOpacity !== undefined ? currentBanners.bottomOpacity : 40)}%
                                </span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                step="5"
                                value={
                                  currentBanners.bottomUseSameImageAsTop !== false
                                    ? (currentBanners.topOpacity !== undefined ? currentBanners.topOpacity : 40)
                                    : (currentBanners.bottomOpacity !== undefined ? currentBanners.bottomOpacity : 40)
                                }
                                onChange={(e) => handleUpdateBannerField(selectedBannerPage, "bottomOpacity", parseInt(e.target.value))}
                                className="w-full accent-[#FAC000] cursor-pointer disabled:opacity-50"
                                disabled={currentBanners.bottomUseSameImageAsTop !== false}
                              />
                            </div>
                          </div>

                          {/* Use same as top banner toggle */}
                          <div className="mt-3 pt-3 border-t border-zinc-900/60 select-none">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={currentBanners.bottomUseSameAsTop !== false}
                                onChange={(e) => handleUpdateBannerField(selectedBannerPage, "bottomUseSameAsTop", e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-7 h-4 bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 peer-checked:after:bg-[#FAC000] after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-zinc-900 border border-zinc-700/60 peer-checked:border-[#FAC000]/60"></div>
                              <span className="ml-2 text-[10px] font-mono font-bold text-zinc-500 peer-checked:text-zinc-300 uppercase tracking-wider">
                                Use same text & styling as top banner
                              </span>
                            </label>
                          </div>

                          {/* Bottom Banner Text & Style Overrides */}
                          {currentBanners.bottomUseSameAsTop === false && (
                            <div className="space-y-3 mt-3 pt-3 border-t border-zinc-900/60 animate-in fade-in slide-in-from-top-1 duration-200">
                              <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider block">Bottom Banner Text & Styles Overrides</span>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Custom Title Text</label>
                                  <input
                                    type="text"
                                    placeholder={selectedBannerPage}
                                    value={currentBanners.bottomTitleText || ""}
                                    onChange={(e) => handleUpdateBannerField(selectedBannerPage, "bottomTitleText", e.target.value)}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Custom Subtitle Text</label>
                                  <input
                                    type="text"
                                    placeholder="Leave blank to use default subtitle..."
                                    value={currentBanners.bottomSubtitleText || ""}
                                    onChange={(e) => handleUpdateBannerField(selectedBannerPage, "bottomSubtitleText", e.target.value)}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-6 gap-3 items-end">
                                {/* Alignment */}
                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Title Align</label>
                                  <select
                                    value={currentBanners.bottomAlign || "center"}
                                    onChange={(e) => handleUpdateBannerField(selectedBannerPage, "bottomAlign", e.target.value)}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white font-mono"
                                  >
                                    <option value="left">Left</option>
                                    <option value="center">Center</option>
                                    <option value="right">Right</option>
                                  </select>
                                </div>

                                {/* Subtitle Alignment */}
                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Subtitle Align</label>
                                  <select
                                    value={currentBanners.bottomSubtitleAlign || "center"}
                                    onChange={(e) => handleUpdateBannerField(selectedBannerPage, "bottomSubtitleAlign", e.target.value)}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white font-mono"
                                  >
                                    <option value="left">Left</option>
                                    <option value="center">Center</option>
                                    <option value="right">Right</option>
                                  </select>
                                </div>

                                {/* Title Color */}
                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Title Color</label>
                                  <div className="flex space-x-1 items-center">
                                    <input
                                      type="color"
                                      value={currentBanners.bottomTitleColor || "#FAC000"}
                                      onChange={(e) => handleUpdateBannerField(selectedBannerPage, "bottomTitleColor", e.target.value)}
                                      className="w-8 h-8 bg-transparent border border-zinc-800 rounded cursor-pointer shrink-0"
                                    />
                                    <input
                                      type="text"
                                      value={currentBanners.bottomTitleColor || ""}
                                      onChange={(e) => handleUpdateBannerField(selectedBannerPage, "bottomTitleColor", e.target.value)}
                                      placeholder="#FAC000"
                                      className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-[10px] text-white font-mono"
                                    />
                                  </div>
                                </div>

                                {/* Title Size */}
                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Title Size (px)</label>
                                  <input
                                    type="number"
                                    min="20"
                                    max="100"
                                    value={currentBanners.bottomTitleSize || 48}
                                    onChange={(e) => handleUpdateBannerField(selectedBannerPage, "bottomTitleSize", parseInt(e.target.value) || 48)}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                                  />
                                </div>

                                {/* Subtitle Color */}
                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Subtitle Color</label>
                                  <div className="flex space-x-1 items-center">
                                    <input
                                      type="color"
                                      value={currentBanners.bottomSubtitleColor || "#D4D4D8"}
                                      onChange={(e) => handleUpdateBannerField(selectedBannerPage, "bottomSubtitleColor", e.target.value)}
                                      className="w-8 h-8 bg-transparent border border-zinc-800 rounded cursor-pointer shrink-0"
                                    />
                                    <input
                                      type="text"
                                      value={currentBanners.bottomSubtitleColor || ""}
                                      onChange={(e) => handleUpdateBannerField(selectedBannerPage, "bottomSubtitleColor", e.target.value)}
                                      placeholder="#D4D4D8"
                                      className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-[10px] text-white font-mono"
                                    />
                                  </div>
                                </div>

                                {/* Subtitle Size */}
                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Subtitle Size (px)</label>
                                  <input
                                    type="number"
                                    min="12"
                                    max="36"
                                    value={currentBanners.bottomSubtitleSize || 16}
                                    onChange={(e) => handleUpdateBannerField(selectedBannerPage, "bottomSubtitleSize", parseInt(e.target.value) || 16)}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* CUSTOM BUTTONS HTML CONFIG BLOCK */}
                        <div className="space-y-3 p-4 bg-zinc-900/40 border border-zinc-800/80 rounded-xl">
                          <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider block">Custom CTA Buttons HTML</span>
                          <p className="text-zinc-500 text-[10px] leading-relaxed font-mono">
                            Enter raw HTML code to override the default "GET A QUOTE" button in the top banner. If left blank, it will inherit the Global Buttons HTML config.
                          </p>
                          <textarea
                            rows={12}
                            value={currentBanners.buttonsHtml || ""}
                            onChange={(e) => handleUpdateBannerField(selectedBannerPage, "buttonsHtml", e.target.value)}
                            placeholder="Currently using Global Default buttons HTML..."
                            className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white font-mono text-xs focus:outline-none leading-normal"
                          />
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Banner Title Styles Section */}
              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg space-y-4">
                <span className="text-[10px] font-mono text-[#FAC000] font-bold tracking-widest uppercase block border-b border-zinc-900 pb-1.5">
                  BANNER TITLE TYPOGRAPHY (GLOBAL FOR ALL SUBWEBSITES)
                </span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Banner Title Color */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Title Color</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={localConfig.bannerTitleColor || "#FAC000"}
                        onChange={(e) => {
                          const val = e.target.value;
                          setLocalConfig(prev => ({ ...prev, bannerTitleColor: val }));
                        }}
                        className="w-10 h-10 bg-transparent border border-zinc-805 rounded cursor-pointer shrink-0"
                      />
                      <input
                        type="text"
                        value={localConfig.bannerTitleColor || "#FAC000"}
                        onChange={(e) => {
                          const val = e.target.value;
                          setLocalConfig(prev => ({ ...prev, bannerTitleColor: val }));
                        }}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-center text-white font-mono focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Banner Title Size */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">
                      Title Font Size ({localConfig.bannerTitleSize || 48}px)
                    </label>
                    <input
                      type="range"
                      min="20"
                      max="72"
                      step="1"
                      value={localConfig.bannerTitleSize || 48}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setLocalConfig(prev => ({ ...prev, bannerTitleSize: val }));
                      }}
                      className="w-full accent-[#FAC000] mt-3"
                    />
                  </div>

                  {/* Banner Title Font Family */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Title Font Family</label>
                    {(() => {
                      const activeFont = localConfig.bannerTitleFont || "Default";
                      const isCustom = activeFont !== "Default" && !fontOptions.some(f => f.value === activeFont);
                      return (
                        <div className="space-y-2">
                          <select
                            value={isCustom ? "Custom" : activeFont}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val === "Custom") {
                                setLocalConfig(prev => ({ ...prev, bannerTitleFont: "Outfit" }));
                              } else {
                                setLocalConfig(prev => ({ ...prev, bannerTitleFont: val }));
                              }
                            }}
                            className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white focus:outline-none font-mono"
                          >
                            {fontOptions.map((opt, oIdx) => (
                              <option key={oIdx} value={opt.value} className="bg-zinc-900 text-white">
                                {opt.label}
                              </option>
                            ))}
                            <option value="Custom" className="bg-zinc-900 text-white">Custom Google Font...</option>
                          </select>
                          {(isCustom || activeFont === "Custom") && (
                            <div className="space-y-1.5">
                              <span className="text-[9px] font-mono text-zinc-650 uppercase">Google Font Name</span>
                              <input
                                type="text"
                                value={activeFont === "Custom" ? "" : activeFont}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setLocalConfig(prev => ({ ...prev, bannerTitleFont: val }));
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-white font-mono"
                                placeholder="e.g. Space Grotesk"
                              />
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: BUTTONS HTML */}
          {activeTab === "buttons" && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">
                  Select Page to Customize Buttons
                </label>
                <select
                  value={selectedButtonsPage}
                  onChange={(e) => setSelectedButtonsPage(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white font-mono focus:outline-none"
                >
                  <option value="Global Default" className="bg-zinc-900 text-[#FAC000] font-bold">Global Default (All Pages)</option>
                  <optgroup label="Main Pages / Categories" className="text-zinc-500 font-bold bg-zinc-950">
                    {mainCategories.map((cat, idx) => (
                      <option key={idx} value={cat} className="bg-zinc-900 text-white font-normal">{cat}</option>
                    ))}
                  </optgroup>
                  {localConfig.subwebsites.map((cat, cIdx) => (
                    <optgroup key={cIdx} label={cat.category} className="text-zinc-500 font-bold bg-zinc-950">
                      {cat.items.map((sub, sIdx) => (
                        <option key={sIdx} value={sub.label} className="bg-zinc-900 text-white font-normal">{sub.label}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-[#FAC000] font-bold uppercase tracking-wider block border-b border-zinc-900 pb-1.5">
                  {selectedButtonsPage === "Global Default" ? "Global Buttons HTML Section" : `Custom Buttons HTML for: ${selectedButtonsPage}`}
                </label>
                <p className="text-zinc-500 text-[10px] leading-relaxed mb-2 font-mono">
                  {selectedButtonsPage === "Global Default" 
                    ? "This HTML code is embedded at the bottom of all subwebsite pages unless overridden on a specific page." 
                    : "If left blank, this page will inherit the Global Default button layout. Enter custom buttons HTML to override it."}
                </p>
                <textarea
                  rows={18}
                  value={
                    selectedButtonsPage === "Global Default" 
                      ? localConfig.buttonsHtml 
                      : (() => {
                          const staticKey = getSubpageStaticKey(selectedButtonsPage);
                          const banner = localConfig.subwebsiteBanners[selectedButtonsPage] || localConfig.subwebsiteBanners[staticKey];
                          return banner?.buttonsHtml || "";
                        })()
                  }
                  onChange={(e) => {
                    const newVal = e.target.value;
                    if (selectedButtonsPage === "Global Default") {
                      handleUpdateGlobal("buttonsHtml", newVal);
                    } else {
                      const staticKey = getSubpageStaticKey(selectedButtonsPage);
                      const saveKey = staticKey !== selectedButtonsPage ? staticKey : selectedButtonsPage;
                      const banners = { ...localConfig.subwebsiteBanners };
                      const existing = banners[selectedButtonsPage] || banners[saveKey] || {
                        topBannerUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80&w=1920",
                        bottomBannerUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800"
                      };
                      banners[saveKey] = {
                        ...existing,
                        buttonsHtml: newVal
                      };
                      if (saveKey !== selectedButtonsPage && banners[selectedButtonsPage]) {
                        delete banners[selectedButtonsPage];
                      }
                      setLocalConfig(prev => ({
                        ...prev,
                        subwebsiteBanners: banners
                      }));
                    }
                  }}
                  placeholder={selectedButtonsPage !== "Global Default" ? "Currently using Global Default buttons HTML..." : ""}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white font-mono text-xs focus:outline-none leading-normal"
                />
              </div>
            </div>
          )}

          {/* TAB: FONTS CUSTOMIZATION */}
          {activeTab === "fonts" && (
            <div className="space-y-6">
              <div className="bg-zinc-900/40 p-3 rounded border border-zinc-850 text-zinc-400 text-[11px] leading-relaxed flex items-start gap-2 select-none">
                <Info className="w-4 h-4 text-[#FAC000] shrink-0 mt-0.5" />
                <span>
                  Configure typography styles for each subwebsite. You can set a <strong>Category Font</strong> (applies to all subpages in a category) or specify a <strong>Page Font Override</strong> (applies to that specific page only).
                </span>
              </div>

              {/* Category-level Fonts */}
              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl space-y-4">
                <span className="text-[10px] font-mono text-[#FAC000] font-black tracking-widest uppercase block border-b border-zinc-900 pb-2">
                  Category Fonts (Global for each category)
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {localConfig.subwebsites.map((cat, idx) => {
                    const activeFont = (localConfig.fontFamilyCategory || {})[cat.category] || "Default";
                    const isCustom = activeFont !== "Default" && !fontOptions.some(f => f.value === activeFont);
                    return (
                      <div key={idx} className="bg-zinc-900/30 p-3 border border-zinc-900 rounded-lg space-y-2">
                        <label className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider block">
                          {cat.category}
                        </label>
                        <select
                          value={isCustom ? "Custom" : activeFont}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === "Custom") {
                              handleUpdateFontCategory(cat.category, "Outfit");
                            } else {
                              handleUpdateFontCategory(cat.category, val);
                            }
                          }}
                          className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#FAC000] rounded p-2 text-xs text-white focus:outline-none"
                        >
                          {fontOptions.map((opt, oIdx) => (
                            <option key={oIdx} value={opt.value} className="bg-zinc-950 text-white">
                              {opt.label}
                            </option>
                          ))}
                          <option value="Custom" className="bg-zinc-950 text-white">Custom Google Font...</option>
                        </select>
                        {(isCustom || activeFont === "Custom") && (
                          <div className="space-y-1 mt-1">
                            <span className="text-[9px] font-mono text-zinc-600 uppercase">Google Font Name</span>
                            <input
                              type="text"
                              value={activeFont === "Custom" ? "" : activeFont}
                              onChange={(e) => handleUpdateFontCategory(cat.category, e.target.value)}
                              className="w-full bg-zinc-950 border border-zinc-800 rounded p-1.5 text-xs text-white font-mono"
                              placeholder="e.g. Space Grotesk"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Page-level Fonts */}
              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl space-y-4">
                <span className="text-[10px] font-mono text-[#FAC000] font-black tracking-widest uppercase block border-b border-zinc-900 pb-2">
                  Page Font Overrides (Set font per individual page)
                </span>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {localConfig.subwebsites.map((cat, catIdx) => (
                    <div key={catIdx} className="space-y-2">
                      <h4 className="text-[9px] font-mono text-zinc-550 font-bold uppercase tracking-widest border-b border-zinc-900 pb-1">
                        {cat.category} Overrides
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Main Category Page Override */}
                        {(() => {
                          const activeFont = (localConfig.fontFamilyPage || {})[cat.category] || "Default";
                          const isCustom = activeFont !== "Default" && !fontOptions.some(f => f.value === activeFont);
                          return (
                            <div className="bg-zinc-900/20 p-2.5 border border-zinc-900/60 rounded-md flex flex-col space-y-1.5 border-dashed border-[#FAC000]/40">
                              <span className="text-[#FAC000] text-xs font-bold font-mono truncate">{cat.category} (Main Page)</span>
                              <select
                                value={isCustom ? "Custom" : activeFont}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (val === "Custom") {
                                    handleUpdateFontPage(cat.category, "Outfit");
                                  } else {
                                    handleUpdateFontPage(cat.category, val);
                                  }
                                }}
                                className="w-full bg-zinc-950 border border-zinc-850 rounded p-1.5 text-[11px] text-white focus:outline-none"
                              >
                                {fontOptions.map((opt, oIdx) => (
                                  <option key={oIdx} value={opt.value} className="bg-zinc-950 text-white">
                                    {opt.label}
                                  </option>
                                ))}
                                <option value="Custom" className="bg-zinc-950 text-white">Custom Google Font...</option>
                              </select>
                              {(isCustom || activeFont === "Custom") && (
                                <div className="space-y-1">
                                  <span className="text-[8px] font-mono text-zinc-650 uppercase">Google Font Name</span>
                                  <input
                                    type="text"
                                    value={activeFont === "Custom" ? "" : activeFont}
                                    onChange={(e) => handleUpdateFontPage(cat.category, e.target.value)}
                                    className="w-full bg-zinc-950 border border-zinc-850 rounded p-1 text-[10px] text-white font-mono"
                                    placeholder="e.g. Space Grotesk"
                                  />
                                </div>
                              )}
                            </div>
                          );
                        })()}

                        {cat.items.map((sub, itemIdx) => {
                          const activeFont = (localConfig.fontFamilyPage || {})[sub.label] || "Default";
                          const isCustom = activeFont !== "Default" && !fontOptions.some(f => f.value === activeFont);
                          return (
                            <div key={itemIdx} className="bg-zinc-900/10 p-2.5 border border-zinc-900 rounded-md flex flex-col space-y-1.5">
                              <span className="text-zinc-300 text-xs font-bold font-mono truncate">{sub.label}</span>
                              <select
                                value={isCustom ? "Custom" : activeFont}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (val === "Custom") {
                                    handleUpdateFontPage(sub.label, "Outfit");
                                  } else {
                                    handleUpdateFontPage(sub.label, val);
                                  }
                                }}
                                className="w-full bg-zinc-950 border border-zinc-850 rounded p-1.5 text-[11px] text-white focus:outline-none"
                              >
                                {fontOptions.map((opt, oIdx) => (
                                  <option key={oIdx} value={opt.value} className="bg-zinc-950 text-white">
                                    {opt.label}
                                  </option>
                                ))}
                                <option value="Custom" className="bg-zinc-950 text-white">Custom Google Font...</option>
                              </select>
                              {(isCustom || activeFont === "Custom") && (
                                <div className="space-y-1">
                                  <span className="text-[8px] font-mono text-zinc-650 uppercase">Google Font Name</span>
                                  <input
                                    type="text"
                                    value={activeFont === "Custom" ? "" : activeFont}
                                    onChange={(e) => handleUpdateFontPage(sub.label, e.target.value)}
                                    className="w-full bg-zinc-950 border border-zinc-850 rounded p-1 text-[10px] text-white font-mono"
                                    placeholder="e.g. Space Grotesk"
                                  />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: HOMEPAGE PAGE BUILDER */}
          {activeTab === "builder" && (
            <div className="space-y-6">
              <div className="p-4 bg-zinc-950/60 border border-zinc-900 rounded-xl space-y-4">
                <span className="text-[10px] font-mono text-[#FAC000] font-black tracking-widest uppercase block border-b border-zinc-900 pb-2">
                  Homepage Section Ordering & Visibility (Elementor Style)
                </span>
                <p className="text-xs text-zinc-400">
                  Toggle sections visibility on the homepage and adjust their sequence using the Arrow keys.
                </p>

                <div className="space-y-2.5">
                  {(() => {
                    const sections = localConfig.homepageLayout?.sections || [
                      { id: "hero", label: "Hero Section", enabled: true },
                      { id: "pillars", label: "Core Pillars", enabled: true },
                      { id: "valueProps", label: "Value Propositions", enabled: true },
                      { id: "middleSplit", label: "Policy Review", enabled: true },
                      { id: "bottomSplit", label: "Agency Overview", enabled: true },
                      { id: "carriers", label: "Carrier Logos", enabled: true },
                      { id: "customHtml1", label: "Custom HTML Block 1", enabled: false },
                      { id: "customHtml2", label: "Custom HTML Block 2", enabled: false },
                      { id: "customHtml3", label: "Custom HTML Block 3", enabled: false },
                    ];

                    const handleMove = (index: number, direction: "up" | "down") => {
                      const newIdx = direction === "up" ? index - 1 : index + 1;
                      if (newIdx < 0 || newIdx >= sections.length) return;
                      const updated = [...sections];
                      const temp = updated[index];
                      updated[index] = updated[newIdx];
                      updated[newIdx] = temp;
                      
                      setLocalConfig(prev => ({
                        ...prev,
                        homepageLayout: {
                          sections: updated,
                          customHtmlBlocks: prev.homepageLayout?.customHtmlBlocks || {}
                        }
                      }));
                    };

                    const handleToggle = (index: number) => {
                      const updated = [...sections];
                      updated[index] = { ...updated[index], enabled: !updated[index].enabled };
                      setLocalConfig(prev => ({
                        ...prev,
                        homepageLayout: {
                          sections: updated,
                          customHtmlBlocks: prev.homepageLayout?.customHtmlBlocks || {}
                        }
                      }));
                    };

                    return sections.map((sec, idx) => (
                      <div key={sec.id} className="flex items-center justify-between p-3.5 bg-zinc-900/40 border border-zinc-800/80 rounded-lg hover:border-zinc-700 transition-all select-none">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={sec.enabled}
                            onChange={() => handleToggle(idx)}
                            className="w-4 h-4 rounded border-zinc-800 text-[#FAC000] accent-[#FAC000] cursor-pointer"
                          />
                          <span className={`text-xs font-mono font-bold ${sec.enabled ? "text-white" : "text-zinc-550 line-through"}`}>
                            {sec.label}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMove(idx, "up")}
                            className="p-1 text-zinc-400 hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === sections.length - 1}
                            onClick={() => handleMove(idx, "down")}
                            className="p-1 text-zinc-400 hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>

              {/* Custom HTML Code Blocks Box */}
              <div className="p-4 bg-zinc-950/60 border border-zinc-900 rounded-xl space-y-4">
                <span className="text-[10px] font-mono text-[#FAC000] font-black tracking-widest uppercase block border-b border-zinc-900 pb-2">
                  Custom HTML Blocks Content
                </span>
                <p className="text-xs text-zinc-400">
                  Write or paste raw HTML code here. Ensure you enable the corresponding block in the list above to render it on the page.
                </p>

                {["customHtml1", "customHtml2", "customHtml3"].map((id, index) => {
                  const val = localConfig.homepageLayout?.customHtmlBlocks?.[id] || "";
                  return (
                    <div key={id} className="space-y-1.5 p-3.5 bg-zinc-900/30 border border-zinc-900 rounded-lg">
                      <label className="text-[10px] font-mono text-[#FAC000] font-bold uppercase tracking-wider block">
                        Custom HTML Block {index + 1}
                      </label>
                      <textarea
                        rows={6}
                        value={val}
                        placeholder="<section class='my-section'>\n  <div class='container'>\n    <h2>Hello World</h2>\n  </div>\n</section>"
                        onChange={(e) => {
                          const newText = e.target.value;
                          setLocalConfig(prev => {
                            const blocks = { ...(prev.homepageLayout?.customHtmlBlocks || {}) };
                            blocks[id] = newText;
                            return {
                              ...prev,
                              homepageLayout: {
                                sections: prev.homepageLayout?.sections || [
                                  { id: "hero", label: "Hero Section", enabled: true },
                                  { id: "pillars", label: "Core Pillars", enabled: true },
                                  { id: "valueProps", label: "Value Propositions", enabled: true },
                                  { id: "middleSplit", label: "Policy Review", enabled: true },
                                  { id: "bottomSplit", label: "Agency Overview", enabled: true },
                                  { id: "carriers", label: "Carrier Logos", enabled: true },
                                  { id: "customHtml1", label: "Custom HTML Block 1", enabled: false },
                                  { id: "customHtml2", label: "Custom HTML Block 2", enabled: false },
                                  { id: "customHtml3", label: "Custom HTML Block 3", enabled: false },
                                ],
                                customHtmlBlocks: blocks
                              }
                            };
                          });
                        }}
                        className="w-full bg-zinc-950 border border-zinc-850 focus:border-[#FAC000] rounded p-2.5 text-xs text-white font-mono focus:outline-none"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: SUBPAGE HTML/CSS OVERRIDES */}
          {activeTab === "subpageEditor" && (
            <div className="space-y-6">
              {/* Select Page and Basic Meta fields */}
              <div className="p-4 bg-zinc-950/60 border border-zinc-900 rounded-xl space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">
                    Select Subpage to Edit
                  </label>
                  <select
                    value={selectedEditorPage}
                    onChange={(e) => setSelectedEditorPage(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white font-mono focus:outline-none"
                  >
                    <optgroup label="Main Pages / Categories" className="text-zinc-500 font-bold bg-zinc-950">
                      {mainCategories.map((cat, idx) => (
                        <option key={idx} value={cat} className="bg-zinc-900 text-white font-normal">{cat}</option>
                      ))}
                    </optgroup>
                    {localConfig.subwebsites.map((cat, cIdx) => (
                      <optgroup key={cIdx} label={cat.category} className="text-zinc-500 font-bold bg-zinc-950">
                        {cat.items.map((sub, sIdx) => (
                          <option key={sIdx} value={sub.label} className="bg-zinc-900 text-white font-normal">{sub.label}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">
                      Page Title Tag (Meta Title)
                    </label>
                    <input
                      type="text"
                      value={editorPageTitle}
                      onChange={(e) => setEditorPageTitle(e.target.value)}
                      placeholder="Custom browser tab title..."
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">
                      Page Meta Description
                    </label>
                    <input
                      type="text"
                      value={editorPageDesc}
                      onChange={(e) => setEditorPageDesc(e.target.value)}
                      placeholder="Brief search engine snippet..."
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <label className="text-[10px] font-mono text-zinc-550 font-bold uppercase tracking-wider block">
                    Page-Specific Action Buttons HTML (CTAs next to Banner)
                  </label>
                  <p className="text-[10px] text-zinc-500 -mt-1 font-sans">
                    Allows you to place custom CTA buttons for this page (e.g. customized phone numbers, distinct quote links).
                  </p>
                  <textarea
                    rows={3}
                    value={editorPageButtons}
                    onChange={(e) => setEditorPageButtons(e.target.value)}
                    placeholder='<a href="tel:555" class="btn">Call Us</a>'
                    className="w-full bg-zinc-950 border border-zinc-850 focus:border-[#FAC000] rounded p-2.5 text-xs text-white font-mono focus:outline-none"
                  />
                </div>
              </div>

              {/* HTML/CSS Code Editor Drawers */}
              <div className="grid grid-cols-1 gap-6">
                <div className="p-4 bg-zinc-950/60 border border-zinc-900 rounded-xl space-y-2">
                  <label className="text-[10px] font-mono text-[#FAC000] font-black tracking-widest uppercase block border-b border-zinc-900 pb-2">
                    HTML Layout Content
                  </label>
                  <textarea
                    rows={16}
                    value={editorPageHtml}
                    onChange={(e) => setEditorPageHtml(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-850 focus:border-[#FAC000] rounded p-2.5 text-xs text-white font-mono focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="p-4 bg-zinc-950/60 border border-zinc-900 rounded-xl space-y-2">
                  <label className="text-[10px] font-mono text-[#FAC000] font-black tracking-widest uppercase block border-b border-zinc-900 pb-2">
                    CSS Styles Content
                  </label>
                  <textarea
                    rows={12}
                    value={editorPageCss}
                    onChange={(e) => setEditorPageCss(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-850 focus:border-[#FAC000] rounded p-2.5 text-xs text-white font-mono focus:outline-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Save/Reset subpage bar */}
              <div className="flex justify-between items-center p-4 bg-zinc-900/20 border border-zinc-850 rounded-xl select-none">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Reset current page HTML and CSS overrides back to standard defaults?")) {
                      const resetStaticKey = getSubpageStaticKey(selectedEditorPage);
                      setLocalConfig(prev => {
                        const overrides = { ...(prev.subpageHtmlOverrides || {}) };
                        // Remove both the display label entry and the static key entry
                        delete overrides[selectedEditorPage];
                        if (resetStaticKey !== selectedEditorPage) {
                          delete overrides[resetStaticKey];
                        }
                        return {
                          ...prev,
                          subpageHtmlOverrides: overrides
                        };
                      });
                      alert(`Reset page "${selectedEditorPage}" successfully. Remember to click "SAVE CHANGES" at the top right to commit!`);
                    }
                  }}
                  className="px-3 py-1.5 border border-red-500/20 text-red-500 hover:bg-red-500/10 font-mono text-[10px] font-bold rounded transition-all"
                >
                  REVERT PAGE TO DEFAULT
                </button>

                <button
                  type="button"
                  onClick={handleSaveSubpageEdits}
                  className="px-4 py-2 bg-[#FAC000] text-black font-mono font-bold text-xs rounded hover:bg-black hover:text-[#FAC000] border border-[#FAC000] transition-all flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" /> APPLY PAGE EDITS
                </button>
              </div>
            </div>
          )}

          {/* TAB: INTEGRATIONS & CHATBOT SCRIPTS */}
          {activeTab === "integrations" && (
            <div className="space-y-4">
              {/* Custom Chatbot Controls */}
              <div className="p-4 bg-zinc-950/60 border border-zinc-900 rounded-xl space-y-4">
                <span className="text-[10px] font-mono text-[#FAC000] font-black tracking-widest uppercase block border-b border-zinc-900 pb-2">
                  Insurance Boss Chatbot Integration
                </span>
                <p className="text-xs text-zinc-400">
                  Configure the built-in AI assistant, choose to hide it completely, or customize its endpoints and integration credentials.
                </p>

                <div className="flex items-center space-x-3 p-3 bg-zinc-900/40 rounded-lg border border-zinc-900">
                  <input
                    type="checkbox"
                    id="hideChatbotCheckbox"
                    checked={!!localConfig.hideChatbot}
                    onChange={(e) => {
                      setLocalConfig(prev => ({
                        ...prev,
                        hideChatbot: e.target.checked
                      }));
                    }}
                    className="w-4 h-4 accent-[#FAC000] cursor-pointer"
                  />
                  <div className="flex-1">
                    <label htmlFor="hideChatbotCheckbox" className="text-xs font-bold text-white cursor-pointer select-none">
                      Ocultar / Hide Chatbot Widget
                    </label>
                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                      IF CHECKED, THE WIDGET WILL BE FULLY HIDDEN AND MUTED FOR VISITORS.
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">
                    Gemini API Key
                  </label>
                  <input
                    type="password"
                    value={localConfig.chatbotGeminiKey || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setLocalConfig(prev => ({
                        ...prev,
                        chatbotGeminiKey: val
                      }));
                    }}
                    placeholder="Enter Google Gemini API Key..."
                    className="w-full bg-zinc-950 border border-zinc-850 focus:border-[#FAC000] rounded p-2.5 text-xs text-white font-mono focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">
                    Slack Lead Webhook URL
                  </label>
                  <input
                    type="text"
                    value={localConfig.chatbotSlackWebhook || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setLocalConfig(prev => ({
                        ...prev,
                        chatbotSlackWebhook: val
                      }));
                    }}
                    placeholder="https://hooks.slack.com/services/..."
                    className="w-full bg-zinc-950 border border-zinc-850 focus:border-[#FAC000] rounded p-2.5 text-xs text-white font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-4 bg-zinc-950/60 border border-zinc-900 rounded-xl space-y-4">
                <span className="text-[10px] font-mono text-[#FAC000] font-black tracking-widest uppercase block border-b border-zinc-900 pb-2">
                  Global Integration Scripts (Chatbots, Analytics, Pixels)
                </span>
                <p className="text-xs text-zinc-400">
                  Paste custom script tags (e.g. your WhatsApp Chatbot snippet, LiveChat, Google Analytics tracker, or Facebook Pixel). 
                  These will be automatically loaded and executed in the background across all pages.
                </p>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">
                    Global Integration HTML/Scripts
                  </label>
                  <textarea
                    rows={12}
                    value={localConfig.globalChatbotHtml || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setLocalConfig(prev => ({
                        ...prev,
                        globalChatbotHtml: val
                      }));
                    }}
                    placeholder="<!-- WhatsApp Widget / Live Chat Widget -->\n<script src='https://example.com/chatbot.js'></script>\n<script>\n  window.initChatbot({ token: 'xyz' });\n</script>"
                    className="w-full bg-zinc-950 border border-zinc-850 focus:border-[#FAC000] rounded p-2.5 text-xs text-white font-mono focus:outline-none leading-relaxed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: PRODUCT BANNERS */}
          {activeTab === "insuranceBanners" && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">
                  Select Product Banner to Configure
                </label>
                <select
                  value={selectedInsuranceBannerId}
                  onChange={(e) => setSelectedInsuranceBannerId(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white font-mono focus:outline-none"
                >
                  {(localConfig.insuranceBanners || []).map((banner) => (
                    <option key={banner.id} value={banner.id}>
                      {banner.title}
                    </option>
                  ))}
                </select>
              </div>

              {(() => {
                const banners = localConfig.insuranceBanners || [];
                const bannerIdx = banners.findIndex(b => b.id === selectedInsuranceBannerId);
                if (bannerIdx === -1) return <div className="text-zinc-500 italic">No banner found</div>;
                const currentBanner = banners[bannerIdx];

                const updateBanner = (field: keyof InsuranceBanner | Partial<InsuranceBanner>, value?: any) => {
                  setLocalConfig(prev => {
                    const currentBanners = prev.insuranceBanners || [];
                    const idx = currentBanners.findIndex(b => b.id === selectedInsuranceBannerId);
                    if (idx === -1) return prev;
                    const updated = [...currentBanners];
                    if (typeof field === "object") {
                      updated[idx] = {
                        ...updated[idx],
                        ...field
                      };
                    } else {
                      updated[idx] = {
                        ...updated[idx],
                        [field]: value
                      };
                    }
                    return {
                      ...prev,
                      insuranceBanners: updated
                    };
                  });
                };

                return (
                  <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg space-y-6">
                    <span className="text-[10px] font-mono text-[#FAC000] font-bold tracking-widest uppercase block border-b border-zinc-900 pb-1.5">
                      PRODUCT BANNER: {currentBanner.title}
                    </span>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Title</label>
                          <input
                            type="text"
                            value={currentBanner.title}
                            onChange={(e) => updateBanner("title", e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white focus:outline-none font-bold"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Button CTA Link URL</label>
                          <input
                            type="text"
                            value={currentBanner.btnUrl}
                            onChange={(e) => updateBanner("btnUrl", e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white focus:outline-none font-mono"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Subtitle Description</label>
                        <textarea
                          rows={3}
                          value={currentBanner.subtitle}
                          onChange={(e) => updateBanner("subtitle", e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Media Type</label>
                          <select
                            value={currentBanner.mediaType || (!!(currentBanner.mediaUrl && (currentBanner.mediaUrl.match(/\.(mp4|webm|ogg|mov|m4v|avi)$/i) || currentBanner.mediaUrl.includes("mixkit.co/videos") || currentBanner.mediaUrl.includes("video"))) ? "video" : "image")}
                            onChange={(e) => updateBanner("mediaType", e.target.value as "image" | "video")}
                            className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white focus:outline-none"
                          >
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                          </select>
                        </div>

                        <div className="md:col-span-2 space-y-1.5">
                          <SupabaseMediaUploader
                            value={currentBanner.mediaUrl}
                            onChange={(url, mediaType) => {
                              const updates: Partial<InsuranceBanner> = { mediaUrl: url };
                              if (mediaType) {
                                updates.mediaType = mediaType;
                              }
                              updateBanner(updates);
                            }}
                            label="Banner Background Media (Image/Video)"
                          />
                        </div>
                      </div>

                      {/* Preview Card */}
                      {currentBanner.mediaUrl && (
                        <div className="space-y-1 mt-2">
                          <label className="text-[9px] font-mono text-zinc-500 uppercase block">Live Preview</label>
                          <div 
                            className="relative w-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 flex items-center justify-center shadow-inner"
                            style={{ height: "180px" }}
                          >
                            {(currentBanner.mediaType === "video" || (!currentBanner.mediaType && !!(currentBanner.mediaUrl && (currentBanner.mediaUrl.match(/\.(mp4|webm|ogg|mov|m4v|avi)$/i) || currentBanner.mediaUrl.includes("mixkit.co/videos") || currentBanner.mediaUrl.includes("video"))))) ? (
                              <video
                                key={currentBanner.mediaUrl}
                                src={currentBanner.mediaUrl}
                                className="absolute inset-0 w-full h-full object-cover opacity-40"
                                muted
                                playsInline
                                autoPlay
                                loop
                              />
                            ) : (
                              <div 
                                className="absolute inset-0 w-full h-full opacity-40 bg-cover bg-center"
                                style={{ backgroundImage: `url(${getDirectImageUrl(currentBanner.mediaUrl)})` }}
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent" />
                            <div className="relative z-10 p-6 text-center">
                              <h4 className="text-lg font-black text-white uppercase tracking-wider">{currentBanner.title}</h4>
                              <p className="text-xs text-zinc-300 mt-2 line-clamp-2 max-w-lg mx-auto">{currentBanner.subtitle}</p>
                              <div className="mt-3">
                                <span className="inline-block px-4 py-1.5 bg-[#FAC000] text-black font-mono font-bold text-xs rounded uppercase tracking-wider">
                                  Get Quote
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB: FAQS */}
          {activeTab === "faqs" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 border border-zinc-900 bg-zinc-950 p-4 rounded-xl">
                {renderColorInput("FAQ Title Color", localConfig.faqTitleColor || "", (val) => {
                  setLocalConfig(prev => ({ ...prev, faqTitleColor: val }));
                })}
                {renderColorInput("FAQ Subtitle Color", localConfig.faqSubtitleColor || "", (val) => {
                  setLocalConfig(prev => ({ ...prev, faqSubtitleColor: val }));
                })}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">
                  Manage Accordion FAQ Items
                </span>
                <button
                  onClick={() => {
                    const updated = [...(localConfig.faqs || [])];
                    updated.push({ question: "New Question?", answer: "Answer description..." });
                    setLocalConfig(prev => ({ ...prev, faqs: updated }));
                  }}
                  className="text-[10px] font-mono font-bold tracking-wider px-3 py-1.5 bg-[#FAC000]/10 border border-[#FAC000]/30 hover:border-[#FAC000] text-[#FAC000] hover:bg-[#FAC000]/25 rounded flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" /> ADD NEW FAQ
                </button>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                {(localConfig.faqs || []).length === 0 ? (
                  <div className="p-8 text-center bg-zinc-900/20 border border-zinc-900 rounded-xl text-zinc-550 italic">
                    No FAQs defined yet. Click "Add New FAQ" above to create one.
                  </div>
                ) : (
                  (localConfig.faqs || []).map((faq, idx) => (
                    <div key={idx} className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl space-y-4 hover:border-zinc-800 transition-all">
                      <div className="flex justify-between items-center border-b border-zinc-900 pb-2.5">
                        <span className="text-[10px] font-mono text-[#FAC000] font-black tracking-widest uppercase">
                          FAQ Item #{idx + 1}
                        </span>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => {
                              const updated = [...localConfig.faqs];
                              const temp = updated[idx];
                              updated[idx] = updated[idx - 1];
                              updated[idx - 1] = temp;
                              setLocalConfig(prev => ({ ...prev, faqs: updated }));
                            }}
                            className="p-1.5 bg-zinc-900 hover:bg-zinc-850 rounded border border-zinc-800 text-zinc-400 hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === localConfig.faqs.length - 1}
                            onClick={() => {
                              const updated = [...localConfig.faqs];
                              const temp = updated[idx];
                              updated[idx] = updated[idx + 1];
                              updated[idx + 1] = temp;
                              setLocalConfig(prev => ({ ...prev, faqs: updated }));
                            }}
                            className="p-1.5 bg-zinc-900 hover:bg-zinc-850 rounded border border-zinc-800 text-zinc-400 hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this FAQ item?")) {
                                const updated = localConfig.faqs.filter((_, fIdx) => fIdx !== idx);
                                setLocalConfig(prev => ({ ...prev, faqs: updated }));
                              }
                            }}
                            className="p-1.5 bg-red-950/20 hover:bg-red-950/40 rounded border border-red-950/40 text-red-500 hover:text-red-400 cursor-pointer"
                            title="Delete FAQ"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">Question</label>
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => {
                              const updated = [...localConfig.faqs];
                              updated[idx] = { ...updated[idx], question: e.target.value };
                              setLocalConfig(prev => ({ ...prev, faqs: updated }));
                            }}
                            className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2 text-xs text-white focus:outline-none"
                            placeholder="Enter FAQ Question..."
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">Answer / Description</label>
                          <textarea
                            rows={3}
                            value={faq.answer}
                            onChange={(e) => {
                              const updated = [...localConfig.faqs];
                              updated[idx] = { ...updated[idx], answer: e.target.value };
                              setLocalConfig(prev => ({ ...prev, faqs: updated }));
                            }}
                            className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2 text-xs text-white focus:outline-none leading-relaxed"
                            placeholder="Enter FAQ Answer..."
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "testimonials" && (
            <div className="space-y-6">
              {/* SECTION TOGGLE & HEADERS */}
              <div className="p-5 bg-zinc-950 border border-zinc-900 rounded-xl space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="showTestimonialsCheckbox"
                    checked={localConfig.testimonials?.show !== false}
                    onChange={(e) => {
                      const val = e.target.checked;
                      setLocalConfig(prev => ({
                        ...prev,
                        testimonials: {
                          ...(prev.testimonials || { title: "Testimonials", subtitle: "Trusted by Professionals. Built for Families.", agentReviews: [], clientReviews: [] }),
                          show: val
                        }
                      }));
                    }}
                    className="w-4 h-4 rounded bg-zinc-900 border-zinc-800 text-[#FAC000] focus:ring-0 cursor-pointer"
                  />
                  <div className="flex-1">
                    <label htmlFor="showTestimonialsCheckbox" className="text-xs font-bold text-white cursor-pointer select-none">
                      Show Testimonials Section
                    </label>
                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                      TOGGLE VISIBILITY OF CUSTOMER TESTIMONIALS SLIDER DIRECTLY ON THE HOMEPAGE.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-zinc-900 pt-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Section Category Title</label>
                    <input
                      type="text"
                      value={localConfig.testimonials?.title || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setLocalConfig(prev => ({
                          ...prev,
                          testimonials: {
                            ...(prev.testimonials || { show: true, subtitle: "", agentReviews: [], clientReviews: [] }),
                            title: val
                          }
                        }));
                      }}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-xs text-white focus:outline-none font-bold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Section Subtitle Statement</label>
                    <input
                      type="text"
                      value={localConfig.testimonials?.subtitle || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setLocalConfig(prev => ({
                          ...prev,
                          testimonials: {
                            ...(prev.testimonials || { show: true, title: "", agentReviews: [], clientReviews: [] }),
                            subtitle: val
                          }
                        }));
                      }}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-zinc-900 pt-4 mt-2">
                  {renderColorInput("Title Color", localConfig.testimonials?.titleColor || "", (val) => {
                    setLocalConfig(prev => ({
                      ...prev,
                      testimonials: {
                        ...(prev.testimonials || { show: true, title: "Testimonials", subtitle: "Trusted by Professionals. Built for Families.", agentReviews: [], clientReviews: [] }),
                        titleColor: val
                      }
                    }));
                  })}
                  {renderColorInput("Subtitle Color", localConfig.testimonials?.subtitleColor || "", (val) => {
                    setLocalConfig(prev => ({
                      ...prev,
                      testimonials: {
                        ...(prev.testimonials || { show: true, title: "Testimonials", subtitle: "Trusted by Professionals. Built for Families.", agentReviews: [], clientReviews: [] }),
                        subtitleColor: val
                      }
                    }));
                  })}
                  {renderColorInput("Quote Color", localConfig.testimonials?.quoteColor || "", (val) => {
                    setLocalConfig(prev => ({
                      ...prev,
                      testimonials: {
                        ...(prev.testimonials || { show: true, title: "Testimonials", subtitle: "Trusted by Professionals. Built for Families.", agentReviews: [], clientReviews: [] }),
                        quoteColor: val
                      }
                    }));
                  })}
                  {renderColorInput("Author Color", localConfig.testimonials?.authorColor || "", (val) => {
                    setLocalConfig(prev => ({
                      ...prev,
                      testimonials: {
                        ...(prev.testimonials || { show: true, title: "Testimonials", subtitle: "Trusted by Professionals. Built for Families.", agentReviews: [], clientReviews: [] }),
                        authorColor: val
                      }
                    }));
                  })}
                </div>
              </div>

              {/* B2B AGENT REVIEWS */}
              <div className="p-5 bg-zinc-950 border border-zinc-900 rounded-xl space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <span className="text-[10px] font-mono text-[#FAC000] font-black tracking-widest uppercase block">
                    1. For Insurance Agents (B2B Testimonials)
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAddTestimonial("agents")}
                    className="text-[9px] font-mono font-bold tracking-wider px-2.5 py-1 bg-[#FAC000]/10 border border-[#FAC000]/30 hover:border-[#FAC000] text-[#FAC000] hover:bg-[#FAC000]/25 rounded flex items-center gap-1.5 transition-all"
                  >
                    <Plus className="w-3 h-3" /> ADD B2B TESTIMONIAL
                  </button>
                </div>
                
                <div className="space-y-4">
                  {(!localConfig.testimonials?.agentReviews || localConfig.testimonials.agentReviews.length === 0) ? (
                    <div className="p-6 text-center text-xs text-zinc-550 italic bg-zinc-900/10 border border-zinc-900 rounded-lg">
                      No agent reviews configured. Click the button above to add one.
                    </div>
                  ) : (
                    (localConfig.testimonials?.agentReviews || []).map((review, idx) => {
                      const handleUpdateReview = (field: keyof TestimonialItem, val: any) => {
                        const updated = [...(localConfig.testimonials?.agentReviews || [])];
                        updated[idx] = { ...updated[idx], [field]: val };
                        setLocalConfig(prev => ({
                          ...prev,
                          testimonials: {
                            ...(prev.testimonials || { show: true, title: "", subtitle: "", clientReviews: [] }),
                            agentReviews: updated
                          }
                        }));
                      };

                      return (
                        <div key={idx} className="p-4 bg-zinc-900/40 border border-zinc-900 rounded-lg space-y-3">
                          <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 border-b border-zinc-950 pb-2">
                            <span>Review #{idx + 1}</span>
                            
                            <div className="flex items-center space-x-2">
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => handleMoveTestimonial("agents", idx, "up")}
                                className="p-1 bg-zinc-950 hover:bg-zinc-900 rounded border border-zinc-800 text-zinc-400 hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                                title="Move Up"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                disabled={idx === (localConfig.testimonials?.agentReviews || []).length - 1}
                                onClick={() => handleMoveTestimonial("agents", idx, "down")}
                                className="p-1 bg-zinc-950 hover:bg-zinc-900 rounded border border-zinc-800 text-zinc-400 hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                                title="Move Down"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteTestimonial("agents", idx)}
                                className="p-1 bg-red-950/20 hover:bg-red-950/40 rounded border border-red-950/40 text-red-500 hover:text-red-400 cursor-pointer"
                                title="Delete Testimonial"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">Author Name</label>
                              <input
                                type="text"
                                value={review.name}
                                onChange={(e) => handleUpdateReview("name", e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2 text-xs text-white focus:outline-none font-bold"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">Category Type (Target Group)</label>
                              <select
                                value="agents"
                                onChange={(e) => handleChangeTestimonialType("agents", idx, e.target.value as "agents" | "clients")}
                                className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2 text-xs text-white focus:outline-none font-mono"
                              >
                                <option value="agents">For Insurance Agents (B2B)</option>
                                <option value="clients">For Businesses & Families (B2C)</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">Role / Agency</label>
                              <input
                                type="text"
                                value={review.role}
                                onChange={(e) => handleUpdateReview("role", e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2 text-xs text-white focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">Location</label>
                              <input
                                type="text"
                                value={review.location}
                                onChange={(e) => handleUpdateReview("location", e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2 text-xs text-white focus:outline-none"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">Rating (Stars)</label>
                              <select
                                value={review.rating || 5}
                                onChange={(e) => handleUpdateReview("rating", parseInt(e.target.value))}
                                className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2 text-xs text-white focus:outline-none"
                              >
                                <option value="5">5 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="3">3 Stars</option>
                                <option value="2">2 Stars</option>
                                <option value="1">1 Star</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-1 font-mono">
                            <label className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">Testimonial Quote</label>
                            <textarea
                              rows={2}
                              value={review.quote}
                              onChange={(e) => handleUpdateReview("quote", e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2 text-xs text-white focus:outline-none leading-relaxed"
                            />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* B2C CLIENT REVIEWS */}
              <div className="p-5 bg-zinc-950 border border-zinc-900 rounded-xl space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <span className="text-[10px] font-mono text-[#FAC000] font-black tracking-widest uppercase block">
                    2. For Businesses & Families (B2C Testimonials)
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAddTestimonial("clients")}
                    className="text-[9px] font-mono font-bold tracking-wider px-2.5 py-1 bg-[#FAC000]/10 border border-[#FAC000]/30 hover:border-[#FAC000] text-[#FAC000] hover:bg-[#FAC000]/25 rounded flex items-center gap-1.5 transition-all"
                  >
                    <Plus className="w-3 h-3" /> ADD B2C TESTIMONIAL
                  </button>
                </div>
                
                <div className="space-y-4">
                  {(!localConfig.testimonials?.clientReviews || localConfig.testimonials.clientReviews.length === 0) ? (
                    <div className="p-6 text-center text-xs text-zinc-550 italic bg-zinc-900/10 border border-zinc-900 rounded-lg">
                      No client reviews configured. Click the button above to add one.
                    </div>
                  ) : (
                    (localConfig.testimonials?.clientReviews || []).map((review, idx) => {
                      const handleUpdateReview = (field: keyof TestimonialItem, val: any) => {
                        const updated = [...(localConfig.testimonials?.clientReviews || [])];
                        updated[idx] = { ...updated[idx], [field]: val };
                        setLocalConfig(prev => ({
                          ...prev,
                          testimonials: {
                            ...(prev.testimonials || { show: true, title: "", subtitle: "", agentReviews: [] }),
                            clientReviews: updated
                          }
                        }));
                      };

                      const predefinedCategories = ["Life Insurance", "Commercial Lines", "Personal Lines", "Retirement & Investment"];
                      const isCustomCategory = !predefinedCategories.includes(review.category || "");

                      return (
                        <div key={idx} className="p-4 bg-zinc-900/40 border border-zinc-900 rounded-lg space-y-3">
                          <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 border-b border-zinc-950 pb-2">
                            <span>Review #{idx + 1}</span>
                            
                            <div className="flex items-center space-x-2">
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => handleMoveTestimonial("clients", idx, "up")}
                                className="p-1 bg-zinc-950 hover:bg-zinc-900 rounded border border-zinc-800 text-zinc-400 hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                                title="Move Up"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                disabled={idx === (localConfig.testimonials?.clientReviews || []).length - 1}
                                onClick={() => handleMoveTestimonial("clients", idx, "down")}
                                className="p-1 bg-zinc-950 hover:bg-zinc-900 rounded border border-zinc-800 text-zinc-400 hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                                title="Move Down"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteTestimonial("clients", idx)}
                                className="p-1 bg-red-950/20 hover:bg-red-950/40 rounded border border-red-950/40 text-red-500 hover:text-red-400 cursor-pointer"
                                title="Delete Testimonial"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">Author Name</label>
                              <input
                                type="text"
                                value={review.name}
                                onChange={(e) => handleUpdateReview("name", e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2 text-xs text-white focus:outline-none font-bold"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">Category Type (Target Group)</label>
                              <select
                                value="clients"
                                onChange={(e) => handleChangeTestimonialType("clients", idx, e.target.value as "agents" | "clients")}
                                className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2 text-xs text-white focus:outline-none font-mono"
                              >
                                <option value="agents">For Insurance Agents (B2B)</option>
                                <option value="clients">For Businesses & Families (B2C)</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">Category Badge</label>
                              <select
                                value={isCustomCategory ? "Custom" : (review.category || "Life Insurance")}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (val === "Custom") {
                                    handleUpdateReview("category", "Custom Category");
                                  } else {
                                    handleUpdateReview("category", val);
                                  }
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2 text-xs text-white focus:outline-none font-mono"
                              >
                                <option value="Life Insurance">Life Insurance</option>
                                <option value="Commercial Lines">Commercial Lines</option>
                                <option value="Personal Lines">Personal Lines</option>
                                <option value="Retirement & Investment">Retirement & Investment</option>
                                <option value="Custom">Custom (Specify Below)...</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">Role / Occupation</label>
                              <input
                                type="text"
                                value={review.role}
                                onChange={(e) => handleUpdateReview("role", e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2 text-xs text-white focus:outline-none"
                              />
                            </div>

                            {isCustomCategory && (
                              <div className="space-y-1">
                                <label className="text-[9px] font-mono text-[#FAC000] uppercase block font-bold">Custom Category Name</label>
                                <input
                                  type="text"
                                  value={review.category || ""}
                                  onChange={(e) => handleUpdateReview("category", e.target.value)}
                                  placeholder="e.g. Homeowners"
                                  className="w-full bg-zinc-900 border border-[#FAC000]/50 focus:border-[#FAC000] rounded p-2 text-xs text-white focus:outline-none"
                                />
                              </div>
                            )}

                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">Location</label>
                              <input
                                type="text"
                                value={review.location}
                                onChange={(e) => handleUpdateReview("location", e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2 text-xs text-white focus:outline-none"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">Rating (Stars)</label>
                              <select
                                value={review.rating || 5}
                                onChange={(e) => handleUpdateReview("rating", parseInt(e.target.value))}
                                className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2 text-xs text-white focus:outline-none font-mono"
                              >
                                <option value="5">5 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="3">3 Stars</option>
                                <option value="2">2 Stars</option>
                                <option value="1">1 Star</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-1 font-mono">
                            <label className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">Testimonial Quote</label>
                            <textarea
                              rows={2}
                              value={review.quote}
                              onChange={(e) => handleUpdateReview("quote", e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2 text-xs text-white focus:outline-none leading-relaxed"
                            />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* LIVE PREVIEW CARD */}
              <div className="space-y-1.5 mt-2">
                <label className="text-[9px] font-mono text-zinc-500 uppercase block font-bold">Live Preview</label>
                <div className="p-6 bg-neutral-950 border border-zinc-800 rounded-xl space-y-6">
                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase" style={{ color: localConfig.testimonials?.titleColor || localConfig.accentColor || "#FAC000" }}>
                      {localConfig.testimonials?.title || "TESTIMONIALS"}
                    </span>
                    <h4 className="text-md font-extrabold uppercase tracking-tight" style={{ color: localConfig.testimonials?.subtitleColor || "rgb(243 243 243)" }}>
                      {localConfig.testimonials?.subtitle || "Trusted by Professionals. Built for Families."}
                    </h4>
                  </div>

                  {/* Preview Tab Switcher */}
                  <div className="flex justify-center my-2">
                    <div className="bg-neutral-900 p-0.5 rounded border border-neutral-850 inline-flex shadow-inner select-none text-[9px]">
                      <button
                        type="button"
                        onClick={() => setPreviewTestimonialTab("agents")}
                        className="px-3 py-1 font-bold font-mono tracking-wider rounded transition-all duration-355 uppercase cursor-pointer"
                        style={previewTestimonialTab === "agents" ? {
                          backgroundColor: localConfig.accentColor || "#FAC000",
                          color: "#000000",
                        } : {
                          color: "#A3A3A3"
                        }}
                      >
                        Agents
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewTestimonialTab("clients")}
                        className="px-3 py-1 font-bold font-mono tracking-wider rounded transition-all duration-355 uppercase cursor-pointer"
                        style={previewTestimonialTab === "clients" ? {
                          backgroundColor: localConfig.accentColor || "#FAC000",
                          color: "#000000",
                        } : {
                          color: "#A3A3A3"
                        }}
                      >
                        Clients
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2 max-w-2xl mx-auto items-stretch select-none">
                    {previewTestimonialTab === "agents" ? (
                      (localConfig.testimonials?.agentReviews || []).map((review, index) => (
                        <div key={index} className="bg-neutral-900/60 border border-neutral-850 p-4 rounded-xl flex flex-col justify-between text-left">
                          <div className="space-y-2">
                            <div className="flex space-x-0.5">
                              {[...Array(review.rating || 5)].map((_, i) => (
                                <Star key={i} className="w-2.5 h-2.5 fill-current" style={{ color: localConfig.accentColor || "#FAC000" }} />
                              ))}
                            </div>
                            <p className="leading-normal italic text-[10px] line-clamp-4" style={{ color: localConfig.testimonials?.quoteColor || "rgb(209 213 219)" }}>
                              "{review.quote}"
                            </p>
                          </div>
                          <div className="mt-4 pt-2 border-t border-neutral-850/60">
                            <h5 className="font-bold text-[10px]" style={{ color: localConfig.testimonials?.authorColor || "rgb(243 243 243)" }}>{review.name}</h5>
                            <p className="text-[8px] text-neutral-400 mt-0.5 font-mono uppercase">
                              <span className="font-bold" style={{ color: localConfig.accentColor || "#FAC000" }}>{review.role}</span> — {review.location}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      (localConfig.testimonials?.clientReviews || []).map((review, index) => (
                        <div key={index} className="bg-neutral-900/60 border border-neutral-850 p-4 rounded-xl flex flex-col justify-between text-left">
                          <div className="space-y-2">
                            <div className="flex justify-between items-start">
                              <div className="flex space-x-0.5">
                                {[...Array(review.rating || 5)].map((_, i) => (
                                  <Star key={i} className="w-2.5 h-2.5 fill-current" style={{ color: localConfig.accentColor || "#FAC000" }} />
                                ))}
                              </div>
                              {review.category && (
                                <span className="text-[7px] uppercase font-bold font-mono tracking-wider bg-neutral-950 text-neutral-400 px-1 py-0.5 rounded border border-neutral-800">
                                  {review.category}
                                </span>
                              )}
                            </div>
                            <p className="leading-normal italic text-[10px] line-clamp-4" style={{ color: localConfig.testimonials?.quoteColor || "rgb(209 213 219)" }}>
                              "{review.quote}"
                            </p>
                          </div>
                          <div className="mt-4 pt-2 border-t border-neutral-850/60">
                            <h5 className="font-bold text-[10px]" style={{ color: localConfig.testimonials?.authorColor || "rgb(243 243 243)" }}>{review.name}</h5>
                            <p className="text-[8px] text-neutral-400 mt-0.5 font-mono uppercase">
                              <span className="font-bold text-neutral-300">{review.role}</span> — {review.location}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

        {/* Drawer Action Bar */}
        <div className="p-6 border-t border-zinc-90 w border-zinc-900 bg-zinc-900/60 flex items-center justify-between select-none">
          <div className="flex items-center space-x-3 flex-wrap gap-y-2">
            <button
              onClick={handleResetDefaults}
              className="text-[10px] font-mono font-bold tracking-wider text-red-500 hover:text-red-400 bg-red-500/10 border border-red-500/20 px-3.5 py-2 rounded flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> RESET DEFAULTS
            </button>

            {(window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") && (
              <button
                onClick={handleSyncToCodebase}
                disabled={syncing}
                className="text-[10px] font-mono font-bold tracking-wider text-purple-400 hover:text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3.5 py-2 rounded flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                {syncing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />} EXPORT TO CODEBASE
              </button>
            )}

            {syncMessage && (
              <span className="text-[11px] font-mono font-bold text-purple-400 animate-pulse">
                {syncMessage}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-3">
            {saveMessage && (
              <span className="text-[11px] font-mono font-bold text-red-500 mr-2">
                {saveMessage}
              </span>
            )}
            {saveSuccess && (
              <span className="text-[11px] font-mono font-bold text-emerald-400">
                ✓ SAVED LIVE TO CLOUD & CACHE
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={savingToSupabase}
              className="font-mono text-xs font-black tracking-wider bg-[#FAC000] text-black hover:bg-black hover:text-[#FAC000] border border-[#FAC000] px-5 py-2.5 rounded flex items-center gap-2 transition-all duration-300 shadow-[0_2px_10px_rgba(250,192,0,0.15)] disabled:opacity-50"
            >
              {savingToSupabase ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} SAVE CHANGES
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
