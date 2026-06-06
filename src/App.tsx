import React, { useState, useEffect } from "react";
import { WebsiteConfig } from "./types";
import { DEFAULT_CONFIG } from "./defaultConfig";
import Header, { getDirectImageUrl } from "./components/Header";
import Hero from "./components/Hero";
import CorePillars from "./components/CorePillars";
import ValueProps from "./components/ValueProps";
import MiddleSplit from "./components/MiddleSplit";
import BottomSplit from "./components/BottomSplit";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import CarriersBanner from "./components/CarriersBanner";
import SubpageViewer from "./components/SubpageViewer";
import { Sparkles, Info, Settings, ArrowRight, ShieldCheck, HelpCircle, X, ExternalLink } from "lucide-react";

export default function App() {
  const [config, setConfig] = useState<WebsiteConfig>(DEFAULT_CONFIG);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeSubpage, setActiveSubpage] = useState<string | null>(null);

  // Read config from local storage on load
  useEffect(() => {
    const saved = localStorage.getItem("the_insurance_boss_config");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        
        // Robust deep merge of parsed config with DEFAULT_CONFIG to prevent undefined keys causing crashes
        const merged: WebsiteConfig = {
          ...DEFAULT_CONFIG,
          ...parsed,
          hero: { ...DEFAULT_CONFIG.hero, ...(parsed.hero || {}) },
          pillars: {
            ...DEFAULT_CONFIG.pillars,
            coverage: { ...DEFAULT_CONFIG.pillars?.coverage, ...(parsed.pillars?.coverage || {}) },
            agents: { ...DEFAULT_CONFIG.pillars?.agents, ...(parsed.pillars?.agents || {}) },
            partners: { ...DEFAULT_CONFIG.pillars?.partners, ...(parsed.pillars?.partners || {}) }
          },
          valueProps: { ...DEFAULT_CONFIG.valueProps, ...(parsed.valueProps || {}) },
          policyReview: { ...DEFAULT_CONFIG.policyReview, ...(parsed.policyReview || {}) },
          biggerAgency: { ...DEFAULT_CONFIG.biggerAgency, ...(parsed.biggerAgency || {}) },
          innerCircle: { ...DEFAULT_CONFIG.innerCircle, ...(parsed.innerCircle || {}) },
          aboutBoss: { ...DEFAULT_CONFIG.aboutBoss, ...(parsed.aboutBoss || {}) },
          carriersBanner: {
            ...DEFAULT_CONFIG.carriersBanner,
            ...(parsed.carriersBanner || {}),
            personalLogos: parsed.carriersBanner?.personalLogos || (parsed.carriersBanner?.logos ? parsed.carriersBanner.logos : DEFAULT_CONFIG.carriersBanner.personalLogos),
            commercialLogos: parsed.carriersBanner?.commercialLogos || DEFAULT_CONFIG.carriersBanner.commercialLogos,
            lifeLogos: parsed.carriersBanner?.lifeLogos || DEFAULT_CONFIG.carriersBanner.lifeLogos,
          },
          socialLinks: parsed.socialLinks || DEFAULT_CONFIG.socialLinks,
          subwebsites: (!parsed.subwebsites || parsed.subwebsites.length !== 3 || parsed.subwebsites[0]?.category === "Commercial Insurance")
            ? DEFAULT_CONFIG.subwebsites
            : parsed.subwebsites,
          subwebsiteBanners: { ...DEFAULT_CONFIG.subwebsiteBanners, ...(parsed.subwebsiteBanners || {}) },
          fontFamilyPage: parsed.fontFamilyPage || DEFAULT_CONFIG.fontFamilyPage || {},
          fontFamilyCategory: parsed.fontFamilyCategory || DEFAULT_CONFIG.fontFamilyCategory || {},
        };

        // Force background update if using unsplash or if missing
        if (!merged.globalBackgroundImage || merged.globalBackgroundImage.includes("unsplash.com")) {
          merged.globalBackgroundImage = "https://lh3.googleusercontent.com/d/1FHp1j4D8MPh5fUnCoZIFSe2lIKQc61ni";
        }
        
        // Write the merged version back to prevent future crashes
        localStorage.setItem("the_insurance_boss_config", JSON.stringify(merged));
        setConfig(merged);
      } catch (err) {
        console.error("Failed to parse cached config, using default", err);
        setConfig(DEFAULT_CONFIG);
      }
    } else {
      localStorage.setItem("the_insurance_boss_config", JSON.stringify(DEFAULT_CONFIG));
    }
  }, []);

  // Dynamic favicon and document title update based on custom logo settings
  useEffect(() => {
    // Update Document Title based on active page
    if (activeSubpage) {
      document.title = `${activeSubpage} | ${config.logoText || "The Insurance Boss"}`;
    } else {
      document.title = `${config.logoText || "The Insurance Boss"} | Personal & Commercial Insurance Coverage`;
    }

    // Find or create standard Favicon
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/png';
      document.head.appendChild(link);
    }
    
    // Find or create Apple Touch Icon
    let appleLink: HTMLLinkElement | null = document.querySelector("link[rel~='apple-touch-icon']");
    if (!appleLink) {
      appleLink = document.createElement('link');
      appleLink.rel = 'apple-touch-icon';
      document.head.appendChild(appleLink);
    }

    const activeLogoUrl = getDirectImageUrl(config.logoUrl) || "https://lh3.googleusercontent.com/d/1Lr3oT5chJbkjpbHTHW8f-A32Achcby6v";
    link.href = activeLogoUrl;
    appleLink.href = activeLogoUrl;
  }, [config.logoUrl, config.logoText, activeSubpage]);

  // Hash-based routing effect
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#subpage-")) {
        const pageLabel = decodeURIComponent(hash.substring("#subpage-".length));
        setActiveSubpage(pageLabel);
      } else {
        setActiveSubpage(null);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Run once on load

    return () => window.removeEventListener("hashchange", handleHashChange);
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
    <div 
      className="relative min-h-screen text-white selection:bg-[#FAC000] selection:text-black transition-colors" 
      style={{ 
        fontFamily: "var(--font-sans)",
        backgroundColor: config.globalBackground || "#000000",
        backgroundImage: config.globalBackgroundImage ? `linear-gradient(rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0.72)), url(${getDirectImageUrl(config.globalBackgroundImage)})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat"
      }}
    >
      
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

      {/* CONDITIONAL SUBPAGE VIEW OR HOME SECTIONS */}
      {activeSubpage ? (
        <SubpageViewer label={activeSubpage} config={config} />
      ) : (
        <>
          {/* HERO SECTION */}
          <Hero config={config} />

          {/* CORE PILLARS SECTION */}
          <CorePillars config={config} />

          {/* VALUE PROPOSITIONS SECTION */}
          <ValueProps config={config} />

          {/* MIDDLE SECTION SPLIT */}
          <MiddleSplit config={config} />

          {/* BOTTOM SECTION SPLIT */}
          <BottomSplit config={config} />

          {/* CARRIERS AUTO-SCROLL SLIDESHOW BANNER */}
          <CarriersBanner config={config} />
        </>
      )}

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

