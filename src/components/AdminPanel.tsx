import React, { useState, useEffect } from "react";
import { WebsiteConfig, SubwebsiteCategory, Subwebsite } from "../types";
import { X, Save, RefreshCw, Layers, Sliders, Type, Link, Image, Trash2, Plus, Info, Layout, Lock, Upload, Loader2, AlertCircle, Grid, LogOut } from "lucide-react";
import { getDirectImageUrl } from "./Header";
import { uploadToSupabase, extractGoogleDriveFolderImages } from "../utils/supabase";

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
  const [activeTab, setActiveTab] = useState<"global" | "hero" | "pillars" | "splits" | "subwebsites" | "carriers" | "banners" | "buttons" | "fonts">("global");
  const [localConfig, setLocalConfig] = useState<WebsiteConfig>({ ...config });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return sessionStorage.getItem("boss_admin_unlocked") === "true";
  });
  const [passwordError, setPasswordError] = useState("");

  // Keep localConfig in sync with the saved config when the panel is opened or config changes
  useEffect(() => {
    if (isOpen) {
      setLocalConfig({ ...config });
    }
  }, [isOpen, config]);

  // Initialize selected subpage for banner editing
  const allSubwebsiteLabels = localConfig.subwebsites.flatMap(c => c.items.map(i => i.label));
  const [selectedBannerPage, setSelectedBannerPage] = useState<string>(allSubwebsiteLabels[0] || "");

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
    const banners = { ...localConfig.subwebsiteBanners };
    const current = banners[page] || { topBannerUrl: "", bottomBannerUrl: "" };
    banners[page] = {
      ...current,
      [field]: val
    };
    setLocalConfig(prev => ({
      ...prev,
      subwebsiteBanners: banners
    }));
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
              if (passwordInput === "insuranceboss") {
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
        <div className="flex gap-2.5 bg-zinc-950/30 backdrop-blur-sm px-8 py-4 select-none overflow-x-auto text-xs whitespace-nowrap scrollbar-none border-b border-zinc-900/60 shrink-0">
          <button
            onClick={() => setActiveTab("global")}
            className={`py-2.5 px-5 rounded-full font-bold transition-all flex items-center space-x-2 border text-xs cursor-pointer ${
              activeTab === "global" 
                ? "bg-[#FAC000] border-[#FAC000] text-black shadow-lg shadow-[#FAC000]/25" 
                : "bg-zinc-900/40 border-zinc-800/60 text-zinc-400 hover:text-white hover:border-zinc-700"
            }`}
          >
            <Layout className="w-4 h-4" />
            <span>Global Branding</span>
          </button>
          
          <button
            onClick={() => setActiveTab("hero")}
            className={`py-2.5 px-5 rounded-full font-bold transition-all flex items-center space-x-2 border text-xs cursor-pointer ${
              activeTab === "hero" 
                ? "bg-[#FAC000] border-[#FAC000] text-black shadow-lg shadow-[#FAC000]/25" 
                : "bg-zinc-900/40 border-zinc-800/60 text-zinc-400 hover:text-white hover:border-zinc-700"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Hero Banner</span>
          </button>

          <button
            onClick={() => setActiveTab("pillars")}
            className={`py-2.5 px-5 rounded-full font-bold transition-all flex items-center space-x-2 border text-xs cursor-pointer ${
              activeTab === "pillars" 
                ? "bg-[#FAC000] border-[#FAC000] text-black shadow-lg shadow-[#FAC000]/25" 
                : "bg-zinc-900/40 border-zinc-800/60 text-zinc-400 hover:text-white hover:border-zinc-700"
            }`}
          >
            <Type className="w-4 h-4" />
            <span>Pillars Section</span>
          </button>

          <button
            onClick={() => setActiveTab("splits")}
            className={`py-2.5 px-5 rounded-full font-bold transition-all flex items-center space-x-2 border text-xs cursor-pointer ${
              activeTab === "splits" 
                ? "bg-[#FAC000] border-[#FAC000] text-black shadow-lg shadow-[#FAC000]/25" 
                : "bg-zinc-900/40 border-zinc-800/60 text-zinc-400 hover:text-white hover:border-zinc-700"
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Home Sections</span>
          </button>

          <button
            onClick={() => setActiveTab("carriers")}
            className={`py-2.5 px-5 rounded-full font-bold transition-all flex items-center space-x-2 border text-xs cursor-pointer ${
              activeTab === "carriers" 
                ? "bg-[#FAC000] border-[#FAC000] text-black shadow-lg shadow-[#FAC000]/25" 
                : "bg-zinc-900/40 border-zinc-800/60 text-zinc-400 hover:text-white hover:border-zinc-700"
            }`}
          >
            <Image className="w-4 h-4" />
            <span>Carrier Logos</span>
          </button>

          <button
            onClick={() => setActiveTab("banners")}
            className={`py-2.5 px-5 rounded-full font-bold transition-all flex items-center space-x-2 border text-xs cursor-pointer ${
              activeTab === "banners" 
                ? "bg-[#FAC000] border-[#FAC000] text-black shadow-lg shadow-[#FAC000]/25" 
                : "bg-zinc-900/40 border-zinc-800/60 text-zinc-400 hover:text-white hover:border-zinc-700"
            }`}
          >
            <Image className="w-4 h-4" />
            <span>Page Banners</span>
          </button>

          <button
            onClick={() => setActiveTab("buttons")}
            className={`py-2.5 px-5 rounded-full font-bold transition-all flex items-center space-x-2 border text-xs cursor-pointer ${
              activeTab === "buttons" 
                ? "bg-[#FAC000] border-[#FAC000] text-black shadow-lg shadow-[#FAC000]/25" 
                : "bg-zinc-900/40 border-zinc-800/60 text-zinc-400 hover:text-white hover:border-zinc-700"
            }`}
          >
            <Link className="w-4 h-4" />
            <span>Buttons HTML</span>
          </button>

          <button
            onClick={() => setActiveTab("fonts")}
            className={`py-2.5 px-5 rounded-full font-bold transition-all flex items-center space-x-2 border text-xs cursor-pointer ${
              activeTab === "fonts" 
                ? "bg-[#FAC000] border-[#FAC000] text-black shadow-lg shadow-[#FAC000]/25" 
                : "bg-zinc-900/40 border-zinc-800/60 text-zinc-400 hover:text-white hover:border-zinc-700"
            }`}
          >
            <Type className="w-4 h-4" />
            <span>Visual Fonts</span>
          </button>

          <button
            onClick={() => setActiveTab("subwebsites")}
            className={`py-2.5 px-5 rounded-full font-bold transition-all flex items-center space-x-2 border text-xs cursor-pointer ${
              activeTab === "subwebsites" 
                ? "bg-[#FAC000] border-[#FAC000] text-black shadow-lg shadow-[#FAC000]/25" 
                : "bg-zinc-900/40 border-zinc-800/60 text-zinc-400 hover:text-white hover:border-zinc-700"
            }`}
          >
            <Link className="w-4 h-4" />
            <span>Subwebsites Directory ({localConfig.subwebsites.flatMap(c => c.items).length})</span>
          </button>
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
                {activeTab === "subwebsites" && <Link className="w-6 h-6" />}
              </div>
              <div>
                <h2 className="text-xl font-black text-white tracking-wide uppercase leading-tight">
                  {activeTab === "global" && "Global Branding"}
                  {activeTab === "hero" && "Hero Section Banner"}
                  {activeTab === "pillars" && "Core Value Pillars"}
                  {activeTab === "splits" && "Split Information Panels"}
                  {activeTab === "carriers" && "Insurance Carriers Slider"}
                  {activeTab === "banners" && "Subwebsite Banner Layouts"}
                  {activeTab === "buttons" && "HTML Custom Button Integrations"}
                  {activeTab === "fonts" && "Typography Styling Controls"}
                  {activeTab === "subwebsites" && "Subwebsites Directory"}
                </h2>
                <p className="text-xs text-zinc-500 font-medium mt-1">
                  {activeTab === "global" && "Configure primary contact details, logo assets, social links, and the default background image."}
                  {activeTab === "hero" && "Update the main homepage hero statement, description copy, action buttons, and background preset."}
                  {activeTab === "pillars" && "Edit the highlights of the three main service offerings (Coverage, Agents, Partners)."}
                  {activeTab === "splits" && "Modify copywriting layouts for the growth programs, policy reviews, and About sections."}
                  {activeTab === "carriers" && "Add or modify logos of the trusted carriers that rotate on the home page."}
                  {activeTab === "banners" && "Customize top and bottom banner images and global typography parameters for all subwebsites."}
                  {activeTab === "buttons" && "Customize the raw HTML codes for floating review/call CTAs."}
                  {activeTab === "fonts" && "Manage family typefaces and scaling sizes dynamically across categories and subpages."}
                  {activeTab === "subwebsites" && "Manage the categories and labels of all insurance sectors, and write custom page HTML layouts."}
                </p>
              </div>
            </div>
          
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

              <div className="space-y-3 border-t border-zinc-900 pt-4">
                <SupabaseImageUploader
                  value={localConfig.hero.bgUrl}
                  onChange={(url) => handleUpdateNested("hero", "bgUrl", url)}
                  label="Hero Background Image"
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
              </div>

              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg space-y-3">
                <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase block border-b border-zinc-900 pb-1.5">Agents Growth Column</span>
                <input
                  type="text"
                  value={localConfig.biggerAgency.title}
                  onChange={(e) => handleUpdateNested("biggerAgency", "title", e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white font-extrabold"
                />
              </div>

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
                <div className="pt-2">
                  <SupabaseImageUploader
                    value={localConfig.aboutBoss.bgUrl}
                    onChange={(url) => handleUpdateNested("aboutBoss", "bgUrl", url)}
                    label="Avatar Photo Link"
                  />
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
                  {allSubwebsiteLabels.map((l, i) => (
                    <option key={i} value={l} className="bg-zinc-900 text-white">{l}</option>
                  ))}
                </select>
              </div>

              {selectedBannerPage && (
                <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg space-y-6">
                  <span className="text-[10px] font-mono text-[#FAC000] font-bold tracking-widest uppercase block border-b border-zinc-900 pb-1.5">
                    BANNERS FOR: {selectedBannerPage}
                  </span>
                  
                  {(() => {
                    const currentBanners = localConfig.subwebsiteBanners[selectedBannerPage] || { topBannerUrl: "", bottomBannerUrl: "" };
                    return (
                      <div className="space-y-8">
                        {/* TOP BANNER CONFIG BLOCK */}
                        <div className="space-y-3 p-4 bg-zinc-900/40 border border-zinc-800/80 rounded-xl">
                          <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider block">Top Banner Configuration</span>
                          
                          <SupabaseImageUploader
                            value={currentBanners.topBannerUrl}
                            onChange={(url) => handleUpdateBannerField(selectedBannerPage, "topBannerUrl", url)}
                            label="Top Banner Image Link"
                          />

                          {/* Large Preview Block */}
                          {currentBanners.topBannerUrl && (
                            <div className="space-y-1 mt-2">
                              <label className="text-[9px] font-mono text-zinc-500 uppercase block">Live Preview</label>
                              <div 
                                className="relative w-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 flex items-center justify-center shadow-inner"
                                style={{ height: "140px" }}
                              >
                                <div 
                                  className="absolute inset-0 w-full h-full"
                                  style={{
                                    backgroundImage: `url(${getDirectImageUrl(currentBanners.topBannerUrl)})`,
                                    backgroundRepeat: currentBanners.topFit === "tile" ? "repeat" : "no-repeat",
                                    backgroundSize: currentBanners.topFit === "tile" ? "auto" : 
                                                     currentBanners.topFit === "contain" ? "contain" :
                                                     currentBanners.topFit === "fill" ? "100% 100%" : "cover",
                                    backgroundPosition: currentBanners.topPosition || "center",
                                    backgroundColor: "#000000"
                                  }}
                                />
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
                                    className="text-[8px] mt-1 line-clamp-1 font-sans font-medium"
                                    style={{
                                      color: currentBanners.subtitleColor || "#D4D4D8",
                                      fontSize: currentBanners.subtitleSize ? `${currentBanners.subtitleSize * 0.5}px` : "8px"
                                    }}
                                  >
                                    {currentBanners.subtitleText || "Custom subtitle description text..."}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Custom Controls */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 pt-3 border-t border-zinc-900/60">
                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px] font-mono">
                                <span className="text-zinc-500 uppercase font-bold">Banner Height</span>
                                <span className="text-white font-bold">{currentBanners.topHeight || "380px"}</span>
                              </div>
                              <input
                                type="range"
                                min="200"
                                max="600"
                                step="50"
                                value={parseInt(currentBanners.topHeight || "380")}
                                onChange={(e) => handleUpdateBannerField(selectedBannerPage, "topHeight", `${e.target.value}px`)}
                                className="w-full accent-[#FAC000] cursor-pointer"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Image Fit</label>
                              <select
                                value={currentBanners.topFit || "cover"}
                                onChange={(e) => handleUpdateBannerField(selectedBannerPage, "topFit", e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                              >
                                <option value="cover">Ajustar y Recortar (Cover)</option>
                                <option value="contain">Mostrar Completo (Contain)</option>
                                <option value="fill">Estirar / Rellenar (Fill)</option>
                                <option value="tile">Mosaico / Repetir (Tile)</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Image Position</label>
                              <select
                                value={currentBanners.topPosition || "center"}
                                onChange={(e) => handleUpdateBannerField(selectedBannerPage, "topPosition", e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                              >
                                <option value="center">Centro (Center)</option>
                                <option value="top">Arriba (Top)</option>
                                <option value="bottom">Abajo (Bottom)</option>
                              </select>
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
                          <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider block">Bottom Banner Configuration</span>
                          
                          <SupabaseImageUploader
                            value={currentBanners.bottomBannerUrl}
                            onChange={(url) => handleUpdateBannerField(selectedBannerPage, "bottomBannerUrl", url)}
                            label="Bottom Banner Image Link"
                          />

                          {/* Large Preview Block */}
                          {currentBanners.bottomBannerUrl && (
                            <div className="space-y-1 mt-2">
                              <label className="text-[9px] font-mono text-zinc-500 uppercase block">Live Preview</label>
                              <div 
                                className="relative w-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 flex items-center justify-center shadow-inner"
                                style={{ height: "140px" }}
                              >
                                <div 
                                  className="absolute inset-0 w-full h-full"
                                  style={{
                                    backgroundImage: `url(${getDirectImageUrl(currentBanners.bottomBannerUrl)})`,
                                    backgroundRepeat: currentBanners.bottomFit === "tile" ? "repeat" : "no-repeat",
                                    backgroundSize: currentBanners.bottomFit === "tile" ? "auto" : 
                                                     currentBanners.bottomFit === "contain" ? "contain" :
                                                     currentBanners.bottomFit === "fill" ? "100% 100%" : "cover",
                                    backgroundPosition: currentBanners.bottomPosition || "center",
                                    backgroundColor: "#000000"
                                  }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent" />
                                <div className="relative z-10 text-center p-3 select-none pointer-events-none">
                                  <span className="text-[8px] font-mono tracking-widest text-[#FAC000] uppercase block">BOTTOM BANNER</span>
                                  <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mt-1">{selectedBannerPage}</h4>
                                  <p className="text-[9px] text-zinc-400 mt-1 font-mono">
                                    {currentBanners.bottomHeight || "380px"} • {currentBanners.bottomFit || "cover"} • {currentBanners.bottomPosition || "center"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Custom Controls */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 pt-3 border-t border-zinc-900/60">
                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px] font-mono">
                                <span className="text-zinc-500 uppercase font-bold">Banner Height</span>
                                <span className="text-white font-bold">{currentBanners.bottomHeight || "380px"}</span>
                              </div>
                              <input
                                type="range"
                                min="200"
                                max="600"
                                step="50"
                                value={parseInt(currentBanners.bottomHeight || "380")}
                                onChange={(e) => handleUpdateBannerField(selectedBannerPage, "bottomHeight", `${e.target.value}px`)}
                                className="w-full accent-[#FAC000] cursor-pointer"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Image Fit</label>
                              <select
                                value={currentBanners.bottomFit || "cover"}
                                onChange={(e) => handleUpdateBannerField(selectedBannerPage, "bottomFit", e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                              >
                                <option value="cover">Ajustar y Recortar (Cover)</option>
                                <option value="contain">Mostrar Completo (Contain)</option>
                                <option value="fill">Estirar / Rellenar (Fill)</option>
                                <option value="tile">Mosaico / Repetir (Tile)</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">Image Position</label>
                              <select
                                value={currentBanners.bottomPosition || "center"}
                                onChange={(e) => handleUpdateBannerField(selectedBannerPage, "bottomPosition", e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white"
                              >
                                <option value="center">Centro (Center)</option>
                                <option value="top">Arriba (Top)</option>
                                <option value="bottom">Abajo (Bottom)</option>
                              </select>
                            </div>
                          </div>
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
                <label className="text-[10px] font-mono text-[#FAC000] font-bold uppercase tracking-wider block border-b border-zinc-900 pb-1.5">Custom Buttons HTML Section</label>
                <p className="text-zinc-500 text-[10px] leading-relaxed mb-2 font-mono">
                  This HTML code is embedded at the bottom of all subwebsite pages. You can change button names, styles, or targets.
                </p>
                <textarea
                  rows={18}
                  value={localConfig.buttonsHtml}
                  onChange={(e) => handleUpdateGlobal("buttonsHtml", e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FAC000] rounded p-2.5 text-white font-mono text-xs focus:outline-none leading-normal"
                />
              </div>
            </div>
          )}

          {/* TAB: SUBWEBSITES */}
          {activeTab === "subwebsites" && (
            <div className="space-y-6">
              <div className="bg-zinc-900/40 p-3 rounded border border-zinc-855 text-zinc-400 text-[11px] leading-relaxed flex items-start gap-2 select-none">
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
          </div>
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
