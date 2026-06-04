import React, { useState, useEffect } from "react";
import { WebsiteConfig } from "./types";
import { DEFAULT_CONFIG } from "./defaultConfig";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CorePillars from "./components/CorePillars";
import ValueProps from "./components/ValueProps";
import MiddleSplit from "./components/MiddleSplit";
import BottomSplit from "./components/BottomSplit";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import { Sparkles, Info, Settings, ArrowRight, ShieldCheck, HelpCircle, X, ExternalLink } from "lucide-react";

export default function App() {
  const [config, setConfig] = useState<WebsiteConfig>(DEFAULT_CONFIG);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Read config from local storage on load
  useEffect(() => {
    const saved = localStorage.getItem("the_insurance_boss_config");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setConfig(parsed);
      } catch (err) {
        console.error("Failed to parse cached config, using default", err);
      }
    }
  }, []);

  const handleSaveConfig = (newConfig: WebsiteConfig) => {
    setConfig(newConfig);
    localStorage.setItem("the_insurance_boss_config", JSON.stringify(newConfig));
    triggerToast("Website customized successfully! Check changes below.");
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#FAC000] selection:text-black transition-colors" style={{ fontFamily: "var(--font-sans)" }}>
      
      {/* Toast Alert System element */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 animate-bounce bg-zinc-950 border-2 border-[#FAC000] text-white py-3 px-5 rounded-lg shadow-2xl flex items-center space-x-3 text-xs font-mono font-bold">
          <span className="w-2.5 h-2.5 bg-[#FAC000] rounded-full animate-ping" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-zinc-500 hover:text-white pl-2">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* HEADER SECTION */}
      <Header
        config={config}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdminOpen={isAdminOpen}
      />

      {/* HERO SECTION */}
      <Hero config={config} />

      {/* CORE PILLARS SECTION */}
      <CorePillars config={config} />

      {/* VALUE PROPOSITIONS SECTION */}
      <ValueProps config={config} />

      {/* MIDDLE SECTION SPLIT (Policy Review & Bigger Agency checklists + animations) */}
      <MiddleSplit config={config} />

      {/* BOTTOM SECTION SPLIT (Inner Circle & About story) */}
      <BottomSplit config={config} />

      {/* FOOTER MULTI-COLUMN SECTION */}
      <Footer config={config} />

      {/* DRAWER ADMIN COMPONENT */}
      <AdminPanel
        config={config}
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onSave={handleSaveConfig}
      />
    </div>
  );
}
