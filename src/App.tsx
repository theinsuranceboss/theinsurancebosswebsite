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
import FaqSection from "./components/FaqSection";
import Testimonials from "./components/Testimonials";
import { Sparkles, Info, Settings, ArrowRight, ShieldCheck, HelpCircle, X, ExternalLink } from "lucide-react";
import InsuranceBossChatbot from "./components/InsuranceBossChatbot";
import { SUPABASE_URL } from "./utils/supabase";

// Helper function to robustly deep-merge configurations
function mergeConfigs(parsed: any): WebsiteConfig {
  const merged: WebsiteConfig = {
    ...DEFAULT_CONFIG,
    ...parsed,
    hero: { ...DEFAULT_CONFIG.hero, ...(parsed.hero || {}) },
    metrics: {
      ...DEFAULT_CONFIG.metrics,
      ...(parsed.metrics || {}),
      show: parsed.metrics?.show !== undefined 
        ? parsed.metrics.show 
        : (parsed.hero?.showMetrics !== undefined ? parsed.hero.showMetrics : true),
      items: parsed.metrics?.items || DEFAULT_CONFIG.metrics?.items || []
    } as any,
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
    subwebsites: (!parsed.subwebsites || parsed.subwebsites.length !== DEFAULT_CONFIG.subwebsites.length || parsed.subwebsites[0]?.category === "Commercial Insurance")
      ? DEFAULT_CONFIG.subwebsites
      : parsed.subwebsites,
    subwebsiteBanners: { ...DEFAULT_CONFIG.subwebsiteBanners, ...(parsed.subwebsiteBanners || {}) },
    fontFamilyPage: parsed.fontFamilyPage || DEFAULT_CONFIG.fontFamilyPage || {},
    fontFamilyCategory: parsed.fontFamilyCategory || DEFAULT_CONFIG.fontFamilyCategory || {},
    insuranceBanners: (parsed.insuranceBanners || DEFAULT_CONFIG.insuranceBanners).map((banner: any) => {
      const defBanner = DEFAULT_CONFIG.insuranceBanners.find(b => b.id === banner.id) || {};
      const mediaUrl = banner.mediaUrl || defBanner.mediaUrl || "";
      let mediaType = banner.mediaType;
      if (!mediaType) {
        const isVid = !!(mediaUrl.match(/\.(mp4|webm|ogg|mov)$/i) || mediaUrl.includes("mixkit.co/videos") || mediaUrl.includes("video"));
        mediaType = isVid ? "video" : "image";
      }
      return {
        ...defBanner,
        ...banner,
        mediaUrl,
        mediaType
      };
    }),
    faqs: parsed.faqs || DEFAULT_CONFIG.faqs,
    testimonials: {
      ...DEFAULT_CONFIG.testimonials,
      ...(parsed.testimonials || {}),
      agentReviews: parsed.testimonials?.agentReviews || DEFAULT_CONFIG.testimonials?.agentReviews || [],
      clientReviews: parsed.testimonials?.clientReviews || DEFAULT_CONFIG.testimonials?.clientReviews || []
    } as any,
  };

  // Force background update if using unsplash or if missing
  if (!merged.globalBackgroundImage || merged.globalBackgroundImage.includes("unsplash.com")) {
    merged.globalBackgroundImage = "https://lh3.googleusercontent.com/d/1FHp1j4D8MPh5fUnCoZIFSe2lIKQc61ni";
  }

  // Force correct navigation URLs for Policy Review and Inner Circle sub-apps
  // These may be stale in Supabase/localStorage configs
  if (merged.hero) {
    merged.hero.btnReviewUrl = "#subpage-Policy%20Review";
  }
  if (merged.policyReview) {
    merged.policyReview.externalUrl = "#subpage-Policy%20Review";
  }
  if (merged.innerCircle) {
    merged.innerCircle.btnUrl = "#subpage-Inner%20Circle";
  }
  if (merged.aboutBoss) {
    merged.aboutBoss.btnUrl = "#subpage-Inner%20Circle";
  }

  return merged;
}

export default function App() {
  const [config, setConfig] = useState<WebsiteConfig>(DEFAULT_CONFIG);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeSubpage, setActiveSubpage] = useState<string | null>(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  // Read config from Supabase Storage first, then fallback to Local Storage
  useEffect(() => {
    async function loadConfig() {
      // 1. Try to fetch from Supabase public storage
      try {
        const supabaseConfigUrl = `${SUPABASE_URL}/storage/v1/object/public/banners/config.json?t=${Date.now()}`;
        const response = await fetch(supabaseConfigUrl);
        if (response.ok) {
          const parsed = await response.json();
          const merged = mergeConfigs(parsed);
          setConfig(merged);
          // Sync to local storage for local cache
          localStorage.setItem("the_insurance_boss_config", JSON.stringify(merged));
          return;
        }
      } catch (err) {
        console.warn("Failed to load config from Supabase, falling back to local cache", err);
      }

      // 2. Fall back to local storage cache
      const saved = localStorage.getItem("the_insurance_boss_config");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const merged = mergeConfigs(parsed);
          setConfig(merged);
        } catch (err) {
          console.error("Failed to parse cached config, using default", err);
          setConfig(DEFAULT_CONFIG);
        }
      } else {
        localStorage.setItem("the_insurance_boss_config", JSON.stringify(DEFAULT_CONFIG));
        setConfig(DEFAULT_CONFIG);
      }
    }

    loadConfig();
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

  // Path & Hash based Admin Route listener
  useEffect(() => {
    const checkAdminState = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === "/admin" || path === "/admin/" || hash === "#admin") {
        setIsAdminOpen(true);
      }
    };

    window.addEventListener("hashchange", checkAdminState);
    window.addEventListener("popstate", checkAdminState);
    checkAdminState();

    return () => {
      window.removeEventListener("hashchange", checkAdminState);
      window.removeEventListener("popstate", checkAdminState);
    };
  }, []);

  // Load Zapier Interfaces script once on mount
  useEffect(() => {
    const ZAPIER_SRC = 'https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js';
    if (!document.querySelector(`script[src="${ZAPIER_SRC}"]`)) {
      const s = document.createElement('script');
      s.type = 'module';
      s.src = ZAPIER_SRC;
      document.head.appendChild(s);
    }
  }, []);

  // Global click interceptor — catches any "Get a Quote" link/button and opens the modal instead
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Walk up the DOM to find a link or button
      const el = target.closest('a, button') as HTMLAnchorElement | HTMLButtonElement | null;
      if (!el) return;

      const text = (el.textContent || "").trim().toLowerCase();
      const href = (el as HTMLAnchorElement).href || "";

      const isGetAQuote =
        text.includes("get a quote") ||
        text.includes("get an auto quote") ||
        href.includes("get-a-quote") ||
        href.includes("get-an-auto-quote") ||
        href.includes("get-a-bop-quote") ||
        href.includes("get-a-commercial-quote") ||
        href.includes("back9ins.com");

      if (isGetAQuote) {
        e.preventDefault();
        e.stopPropagation();
        setShowQuoteModal(true);
      }
    };

    document.addEventListener('click', handleGlobalClick, true);
    return () => document.removeEventListener('click', handleGlobalClick, true);
  }, []);

  // Dynamic script injection for chatbot and custom HTML blocks
  useEffect(() => {
    // 1. Remove old injected scripts
    const oldScripts = document.querySelectorAll(".injected-global-script");
    oldScripts.forEach(el => el.remove());

    const scriptContents: string[] = [];

    // Collect global chatbot script
    if (config.globalChatbotHtml) {
      scriptContents.push(config.globalChatbotHtml);
    }

    // Collect custom HTML blocks scripts
    const layout = config.homepageLayout?.sections || [
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
    
    layout.forEach(sec => {
      if (sec.enabled && (sec.id === "customHtml1" || sec.id === "customHtml2" || sec.id === "customHtml3")) {
        const html = config.homepageLayout?.customHtmlBlocks?.[sec.id];
        if (html) {
          scriptContents.push(html);
        }
      }
    });

    // Parse and execute scripts
    scriptContents.forEach(html => {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;
      const scripts = tempDiv.querySelectorAll("script");
      scripts.forEach(oldScript => {
        const newScript = document.createElement("script");
        newScript.className = "injected-global-script";
        
        // Copy attributes
        Array.from(oldScript.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value);
        });
        
        // Copy inner code
        newScript.textContent = oldScript.textContent;
        
        document.body.appendChild(newScript);
      });
    });
  }, [config.globalChatbotHtml, config.homepageLayout]);

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

      {/* ── ZAPIER GET A QUOTE MODAL ── */}
      {showQuoteModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowQuoteModal(false); }}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 100%)',
              border: '1px solid rgba(250,192,0,0.25)',
              boxShadow: '0 0 80px rgba(250,192,0,0.12), 0 25px 50px rgba(0,0,0,0.8)'
            }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'rgba(250,192,0,0.15)' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(250,192,0,0.1)', border: '1px solid rgba(250,192,0,0.3)' }}>
                  <ShieldCheck className="w-4 h-4" style={{ color: '#FAC000' }} />
                </div>
                <div>
                  <h2 className="text-white font-black text-sm uppercase tracking-widest">Get a Free Quote</h2>
                  <p className="text-zinc-500 text-xs mt-0.5">Powered by The Insurance Boss</p>
                </div>
              </div>
              <button
                onClick={() => setShowQuoteModal(false)}
                className="text-zinc-500 hover:text-white transition-colors rounded-full p-1 hover:bg-zinc-800"
                aria-label="Close quote form"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Zapier Form Embed */}
            <div
              className="w-full"
              dangerouslySetInnerHTML={{
                __html: `<zapier-interfaces-page-embed page-id="cmlkyd2mk002vwj9wxu01pbn3" test-id="cmlkyd2mk002vwj9wxu01pbn3-zapier-interfaces-page-embed-iframe" no-background="false" style="width:100%;height:520px;display:block;"></zapier-interfaces-page-embed>`
              }}
            />
          </div>
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
        activeSubpage === "Policy Review" ? (
          <div className="w-full bg-black pt-20">
            <iframe
              src="/apps/policy-review/index.html?embed=true"
              className="w-full border-none bg-transparent"
              style={{ minHeight: "calc(100vh - 80px)" }}
              title="Policy Review Tool"
            />
          </div>
        ) : activeSubpage === "Inner Circle" ? (
          <div className="w-full bg-black pt-20">
            <iframe
              src="/apps/inner-circle/index.html"
              className="w-full border-none bg-transparent"
              style={{ minHeight: "calc(100vh - 80px)" }}
              title="Inner Circle"
            />
          </div>
        ) : (
          <SubpageViewer label={activeSubpage} config={config} />
        )
      ) : (
        <>
          {(() => {
            const layout = config.homepageLayout?.sections || [
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

            return layout.map((sec) => {
              if (!sec.enabled) return null;
              
              switch (sec.id) {
                case "hero":
                  return <React.Fragment key="hero"><Hero config={config} /></React.Fragment>;
                case "pillars":
                  return <React.Fragment key="pillars"><CorePillars config={config} /></React.Fragment>;
                case "valueProps":
                  return <React.Fragment key="valueProps"><ValueProps config={config} /></React.Fragment>;
                case "middleSplit":
                  return <React.Fragment key="middleSplit"><MiddleSplit config={config} /></React.Fragment>;
                case "bottomSplit":
                  return <React.Fragment key="bottomSplit"><BottomSplit config={config} /></React.Fragment>;
                case "carriers":
                  return <React.Fragment key="carriers"><CarriersBanner config={config} /></React.Fragment>;
                case "customHtml1":
                case "customHtml2":
                case "customHtml3":
                  const htmlContent = config.homepageLayout?.customHtmlBlocks?.[sec.id] || "";
                  if (!htmlContent) return null;
                  return (
                    <section key={sec.id} className="relative w-full overflow-hidden">
                      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    </section>
                  );
                default:
                  return null;
              }
            });
          })()}
        </>
      )}

      {/* TESTIMONIALS & FAQ SECTIONS (HOMEPAGE ONLY, BEFORE FOOTER) */}
      {!activeSubpage && (
        <>
          {(config.testimonials?.show !== false) && (
            <Testimonials config={config} />
          )}
          <FaqSection config={config} />
        </>
      )}

      {/* FOOTER MULTI-COLUMN SECTION */}
      {!(activeSubpage === "Policy Review" || activeSubpage === "Inner Circle") && (
        <Footer config={config} />
      )}

      {/* DRAWER ADMIN COMPONENT */}
      <AdminPanel
        config={config}
        isOpen={isAdminOpen}
        onClose={() => {
          setIsAdminOpen(false);
          if (window.location.pathname === "/admin" || window.location.pathname === "/admin/") {
            window.history.pushState(null, "", "/");
          }
          if (window.location.hash === "#admin") {
            window.history.pushState(null, "", window.location.pathname);
          }
        }}
        onSave={handleSaveConfig}
      />

      {/* Chatbot Widget Integration */}
      {!config.hideChatbot && (
        <InsuranceBossChatbot key={activeSubpage || "home"} config={config} />
      )}

      {/* Dynamic Chatbot Non-Script HTML container */}
      {config.globalChatbotHtml && (
        <div dangerouslySetInnerHTML={{ __html: config.globalChatbotHtml }} />
      )}
    </div>
  );
}

