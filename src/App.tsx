import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useParams, useNavigate, Navigate } from "react-router-dom";
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
import SubpageViewer, { getSubpageStaticKey } from "./components/SubpageViewer";
import { Sparkles, ShieldCheck, X } from "lucide-react";
import InsuranceBossChatbot from "./components/InsuranceBossChatbot";
import { SUPABASE_URL, supabase } from "./utils/supabase";

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
    // Preserve subpageHtmlOverrides deeply — critical for custom subpage HTML to persist
    subpageHtmlOverrides: {
      ...(DEFAULT_CONFIG.subpageHtmlOverrides || {}),
      ...(parsed.subpageHtmlOverrides || {})
    },
    homepageLayout: parsed.homepageLayout
      ? {
          sections: parsed.homepageLayout.sections || DEFAULT_CONFIG.homepageLayout?.sections || [],
          customHtmlBlocks: parsed.homepageLayout.customHtmlBlocks || {}
        }
      : DEFAULT_CONFIG.homepageLayout,
  };

  // Force background update if using unsplash or if missing
  if (!merged.globalBackgroundImage || merged.globalBackgroundImage.includes("unsplash.com")) {
    merged.globalBackgroundImage = "https://lh3.googleusercontent.com/d/1FHp1j4D8MPh5fUnCoZIFSe2lIKQc61ni";
  }

  // Force correct navigation URLs for Policy Review and Inner Circle sub-apps
  if (merged.hero) {
    merged.hero.btnReviewUrl = "/policy-review";
  }
  if (merged.policyReview) {
    merged.policyReview.externalUrl = "/policy-review";
  }
  if (merged.innerCircle) {
    merged.innerCircle.btnUrl = "/inner-circle";
  }
  if (merged.aboutBoss) {
    merged.aboutBoss.btnUrl = "/inner-circle";
  }

  return merged;
}

// ── Converts a URL slug like "policy-review" to a display label like "Policy Review" ──
function slugToLabel(slug: string): string {
  // Map known slugs to their canonical labels used in SUBWEBSITE_HTML_DATA / admin panel
  const SLUG_MAP: Record<string, string> = {
    "policy-review": "Policy Review",
    "inner-circle": "Inner Circle",
    "personal-lines": "Personal Lines Main",
    "commercial-lines": "Commercial Insurance Main",
    "life-insurance": "Life Insurance Main",
    "retirement-investment": "Retirement & Investment Main",
    "auto-insurance": "Auto Insurance",
    "home-insurance": "Home Insurance",
    "renters-insurance": "Renters Insurance",
    "umbrella-insurance": "Umbrella Insurance",
    "commercial-auto": "Commercial Auto",
    "general-liability": "General Liability",
    "workers-comp": "Workers' Comp",
    "bop": "BOP (Business Owner's Policy)",
    "cyber-liability": "Cyber Liability",
    "term-life": "Term Life Insurance",
    "whole-life": "Whole Life Insurance",
    "annuities": "Annuities",
    "disability-insurance": "Disability Insurance",
    "long-term-care": "Long-Term Care Insurance",
  };
  if (SLUG_MAP[slug]) return SLUG_MAP[slug];
  // Fallback: capitalize each word
  return slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

// ── Converts a label like "Policy Review" to a URL slug like "policy-review" ──
export function labelToSlug(label: string): string {
  const LABEL_MAP: Record<string, string> = {
    "Policy Review": "policy-review",
    "Inner Circle": "inner-circle",
    "Personal Lines Main": "personal-lines",
    "Commercial Insurance Main": "commercial-lines",
    "Life Insurance Main": "life-insurance",
    "Retirement & Investment Main": "retirement-investment",
    "Auto Insurance": "auto-insurance",
    "Home Insurance": "home-insurance",
    "Renters Insurance": "renters-insurance",
    "Umbrella Insurance": "umbrella-insurance",
    "Commercial Auto": "commercial-auto",
    "General Liability": "general-liability",
    "Workers' Comp": "workers-comp",
    "Workers' Compensation": "workers-comp",
    "BOP (Business Owner's Policy)": "bop",
    "Business Owner's Policy (BOP)": "bop",
    "Cyber Liability": "cyber-liability",
    "Term Life Insurance": "term-life",
    "Whole Life Insurance": "whole-life",
    "Annuities": "annuities",
    "Disability Insurance": "disability-insurance",
    "Long-Term Care Insurance": "long-term-care",
  };
  if (LABEL_MAP[label]) return LABEL_MAP[label];
  // Fallback: lowercase with hyphens
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

// ── Context to share config across all routes ──
export const ConfigContext = React.createContext<{
  config: WebsiteConfig;
  setConfig: React.Dispatch<React.SetStateAction<WebsiteConfig>>;
  isAdminOpen: boolean;
  setIsAdminOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showQuoteModal: boolean;
  setShowQuoteModal: React.Dispatch<React.SetStateAction<boolean>>;
  toastMessage: string | null;
  setToastMessage: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  config: DEFAULT_CONFIG,
  setConfig: () => {},
  isAdminOpen: false,
  setIsAdminOpen: () => {},
  showQuoteModal: false,
  setShowQuoteModal: () => {},
  toastMessage: null,
  setToastMessage: () => {},
});

// ── Subpage route component ──
function SubpageRoute() {
  const { subpageSlug } = useParams<{ subpageSlug: string }>();
  const { config } = React.useContext(ConfigContext);
  const label = slugToLabel(subpageSlug || "");
  
  useEffect(() => {
    document.title = `${label} | ${config.logoText || "The Insurance Boss"}`;
  }, [label, config.logoText]);

  return <SubpageViewer label={label} config={config} />;
}

// ── Home page component ──
function HomePage() {
  const { config, setIsAdminOpen } = React.useContext(ConfigContext);

  const html1 = config.homepageLayout?.customHtmlBlocks?.customHtml1 || "";
  const html2 = config.homepageLayout?.customHtmlBlocks?.customHtml2 || "";
  const html3 = config.homepageLayout?.customHtmlBlocks?.customHtml3 || "";
  const hasCustomHtml = Boolean(html1 || html2 || html3);

  useEffect(() => {
    document.title = `${config.logoText || "The Insurance Boss"} | Personal & Commercial Insurance Coverage`;
  }, [config.logoText]);

  if (hasCustomHtml) {
    return (
      <div className="bg-white min-h-screen w-full text-black">
        {html1 && <section className="relative w-full"><div dangerouslySetInnerHTML={{ __html: html1 }} /></section>}
        {html2 && <section className="relative w-full"><div dangerouslySetInnerHTML={{ __html: html2 }} /></section>}
        {html3 && <section className="relative w-full"><div dangerouslySetInnerHTML={{ __html: html3 }} /></section>}
      </div>
    );
  }

  const layout = config.homepageLayout?.sections || [
    { id: "hero", label: "Hero Section", enabled: true },
    { id: "pillars", label: "Core Pillars", enabled: true },
    { id: "valueProps", label: "Value Propositions", enabled: true },
    { id: "middleSplit", label: "Policy Review", enabled: true },
    { id: "bottomSplit", label: "Agency Overview", enabled: true },
    { id: "carriers", label: "Carrier Logos", enabled: true }
  ];

  return (
    <>
      <Header
        config={config}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdminOpen={false}
      />
      {layout.map((sec) => {
        if (!sec.enabled) return null;
        if (sec.id === "hero") return <Hero key="hero" config={config} />;
        if (sec.id === "pillars") return <CorePillars key="pillars" config={config} />;
        if (sec.id === "valueProps") return <ValueProps key="valueProps" config={config} />;
        if (sec.id === "middleSplit") return <MiddleSplit key="middleSplit" config={config} />;
        if (sec.id === "bottomSplit") return <BottomSplit key="bottomSplit" config={config} />;
        if (sec.id === "carriers") return <CarriersBanner key="carriers" config={config} />;
        return null;
      })}
      <Footer config={config} />
    </>
  );
}

// ── Subpage layout wrapper (with Header) ──
function SubpageLayout() {
  const { subpageSlug } = useParams<{ subpageSlug: string }>();
  const { config, setIsAdminOpen } = React.useContext(ConfigContext);
  const isToolPage = subpageSlug === "policy-review" || subpageSlug === "inner-circle";

  return (
    <>
      <Header
        config={config}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdminOpen={false}
      />
      <SubpageRoute />
      {!isToolPage && <Footer config={config} />}
    </>
  );
}

// ── Admin route: opens admin panel then redirects home ──
function AdminRoute() {
  const { setIsAdminOpen } = React.useContext(ConfigContext);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAdminOpen(true);
    navigate("/", { replace: true });
  }, []);

  return null;
}

// ── Main App shell ──
export default function App() {
  const [config, setConfig] = useState<WebsiteConfig>(DEFAULT_CONFIG);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  // Read config from Supabase Storage first, then fallback to Local Storage
  useEffect(() => {
    async function loadConfig() {
      try {
        const supabaseConfigUrl = `${SUPABASE_URL}/storage/v1/object/public/banners/config.json?t=${Date.now()}`;
        const response = await fetch(supabaseConfigUrl);
        if (response.ok) {
          const parsed = await response.json();
          const merged = mergeConfigs(parsed);
          setConfig(merged);
          localStorage.setItem("the_insurance_boss_config", JSON.stringify(merged));
          return;
        }
      } catch (err) {
        console.warn("Failed to load config from Supabase, falling back to local cache", err);
      }

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

  // Dynamic favicon update
  useEffect(() => {
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/png';
      document.head.appendChild(link);
    }
    let appleLink: HTMLLinkElement | null = document.querySelector("link[rel~='apple-touch-icon']");
    if (!appleLink) {
      appleLink = document.createElement('link');
      appleLink.rel = 'apple-touch-icon';
      document.head.appendChild(appleLink);
    }
    const activeLogoUrl = getDirectImageUrl(config.logoUrl) || "https://lh3.googleusercontent.com/d/1Lr3oT5chJbkjpbHTHW8f-A32Achcby6v";
    link.href = activeLogoUrl;
    appleLink.href = activeLogoUrl;
  }, [config.logoUrl]);

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

  // Visitor Tracking
  useEffect(() => {
    let sessionId = sessionStorage.getItem('_tib_sid');
    if (!sessionId) {
      sessionId = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem('_tib_sid', sessionId);
    }
    const ua = navigator.userAgent;
    const deviceType = /tablet|ipad|playbook|silk/i.test(ua) ? 'tablet'
      : /mobile|android|iphone|ipod|blackberry|opera mini|iemobile/i.test(ua) ? 'mobile'
      : 'desktop';
    const pageLabel = window.location.pathname.replace("/", "") || "Home";

    fetch('https://api.ipapi.is/?fields=ip,country_name,country_code,city')
      .then(r => r.json())
      .then(async geo => {
        await supabase.from('visitor_events').insert({
          ip: geo.ip || null,
          country: geo.country_name || null,
          country_code: geo.country_code || null,
          city: geo.city || null,
          page: pageLabel,
          referrer: document.referrer || null,
          device_type: deviceType,
          user_agent: navigator.userAgent.slice(0, 200),
          session_id: sessionId,
        });
      })
      .catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Global click interceptor — catches any "Get a Quote" link/button and opens the modal
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
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
    const oldScripts = document.querySelectorAll(".injected-global-script");
    oldScripts.forEach(el => el.remove());
    const scriptContents: string[] = [];
    if (config.globalChatbotHtml) {
      scriptContents.push(config.globalChatbotHtml);
    }
    ["customHtml1", "customHtml2", "customHtml3"].forEach(id => {
      const html = config.homepageLayout?.customHtmlBlocks?.[id];
      if (html) scriptContents.push(html);
    });
    scriptContents.forEach(html => {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;
      const scripts = tempDiv.querySelectorAll("script");
      scripts.forEach(oldScript => {
        const newScript = document.createElement("script");
        newScript.className = "injected-global-script";
        Array.from(oldScript.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value);
        });
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
    setTimeout(() => setToastMessage(null), 4000);
  };

  const ctxValue = {
    config, setConfig,
    isAdminOpen, setIsAdminOpen,
    showQuoteModal, setShowQuoteModal,
    toastMessage, setToastMessage,
  };

  return (
    <ConfigContext.Provider value={ctxValue}>
      <BrowserRouter>
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
          {/* Toast Alert */}
          {toastMessage && (
            <div className="fixed bottom-6 left-6 z-50 animate-bounce bg-zinc-950 border-2 border-[#FAC000] text-white py-3 px-5 rounded-lg shadow-2xl flex items-center space-x-3 text-xs font-mono font-bold">
              <span className="w-2.5 h-2.5 bg-[#FAC000] rounded-full animate-ping" />
              <span>{toastMessage}</span>
              <button onClick={() => setToastMessage(null)} className="text-zinc-500 hover:text-white pl-2">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Get a Quote Modal */}
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
                <div
                  className="w-full"
                  dangerouslySetInnerHTML={{
                    __html: `<zapier-interfaces-page-embed page-id="cmlkyd2mk002vwj9wxu01pbn3" test-id="cmlkyd2mk002vwj9wxu01pbn3-zapier-interfaces-page-embed-iframe" no-background="false" style="width:100%;height:520px;display:block;"></zapier-interfaces-page-embed>`
                  }}
                />
              </div>
            </div>
          )}

          {/* Routes */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminRoute />} />
            <Route path="/:subpageSlug" element={<SubpageLayout />} />
          </Routes>

          {/* Admin Panel Drawer */}
          <AdminPanel
            config={config}
            isOpen={isAdminOpen}
            onClose={() => {
              setIsAdminOpen(false);
              window.location.href = "/";
            }}
            onSave={handleSaveConfig}
          />

          {/* Chatbot Widget */}
          {!config.hideChatbot && (
            <InsuranceBossChatbot config={config} />
          )}

          {/* Global chatbot/integration HTML */}
          {config.globalChatbotHtml && (
            <div dangerouslySetInnerHTML={{ __html: config.globalChatbotHtml }} />
          )}
        </div>
      </BrowserRouter>
    </ConfigContext.Provider>
  );
}
