import React, { useState, useEffect } from "react";
import { WebsiteConfig, SubwebsiteCategory } from "../types";
import { ChevronDown, Menu, X, Settings, Phone, Mail, ExternalLink, Search, Shield } from "lucide-react";

interface HeaderProps {
  config: WebsiteConfig;
  onOpenAdmin: () => void;
  isAdminOpen: boolean;
}

// Helper to transform Google Drive viewer links to direct image source stream links
export function getDirectImageUrl(url: any): string {
  if (typeof url !== "string" || !url) return "";
  const gdFileRegex = /\/file\/d\/([a-zA-Z0-9_-]+)/;
  const gdIdRegex = /[?&]id=([a-zA-Z0-9_-]+)/;
  
  let id = "";
  if (url.includes("drive.google.com")) {
    const fileMatch = url.match(gdFileRegex);
    if (fileMatch && fileMatch[1]) {
      id = fileMatch[1];
    } else {
      const idMatch = url.match(gdIdRegex);
      if (idMatch && idMatch[1]) {
        id = idMatch[1];
      }
    }
  }
  
  if (id) {
    return `https://lh3.googleusercontent.com/d/${id}`;
  }
  return url;
}

export default function Header({ config, onOpenAdmin, isAdminOpen }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdownToggle = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  // Pre-configured custom quick-search over all subwebsites
  const allSubwebsites = config.subwebsites.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, category: cat.category }))
  );

  const filteredSubwebsites = searchQuery
    ? allSubwebsites.filter(
        (sub) =>
          sub.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sub.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className={`fixed top-0 left-0 z-40 w-full transition-all duration-300 ${scrolled ? "bg-zinc-950 border-b border-zinc-900/60 shadow-xl py-2" : "bg-zinc-950/90 backdrop-blur-md border-b border-zinc-900/30 py-3"}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-2 flex items-center justify-between">
        {/* LOGO CONTAINER */}
        <a href="#" className="flex select-none group mr-4 items-center" style={{ transform: `scale(${config.fontScale})` }}>
          {config.logoUrl ? (
            <img
              src={getDirectImageUrl(config.logoUrl)}
              alt={config.logoText}
              className="h-12 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // fallback to text if image error
                (e.target as HTMLElement).style.display = "none";
                const textFallback = document.getElementById("logo-text-fallback");
                if (textFallback) textFallback.classList.remove("hidden");
              }}
            />
          ) : null}
          <div 
            id="logo-text-fallback" 
            className={`flex-col text-left font-serif py-1 px-2 border border-zinc-800 rounded bg-zinc-950/60 shadow-lg relative overflow-hidden group-hover:border-[#FAC000]/60 transition-colors ${config.logoUrl ? 'hidden' : 'flex'}`}
          >
            <span className="text-[9px] uppercase font-bold tracking-[0.4em] text-zinc-400 group-hover:text-[#FAC000] transition-colors leading-none text-center">THE</span>
            <span className="text-sm md:text-base font-extrabold tracking-[0.15em] text-white leading-tight flex items-center justify-center">
              INSURANCE <span className="text-[#FAC000] ml-1.5">BOSS</span>
            </span>
          </div>
        </a>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-mono tracking-wider font-bold text-white bg-black/60 px-6 py-2.5 rounded-full border border-zinc-800/40 shadow-lg backdrop-blur-md">
          
          {/* COVERAGE SOLUTIONS MEGA-MENU DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => handleDropdownToggle("coverage")}
              className="flex items-center space-x-1 hover:text-[#FAC000] transition-colors focus:outline-none py-1"
              id="header-coverage-dropdown-btn"
            >
              <span>COVERAGE SOLUTIONS</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "coverage" ? "rotate-180 text-[#FAC000]" : ""}`} />
            </button>

            {activeDropdown === "coverage" && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)} />
                <div className="absolute left-1/2 -translate-x-[35%] mt-3 w-[840px] bg-zinc-950 mega-menu-container border border-zinc-900 rounded-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)] p-6 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="grid grid-cols-4 gap-6">
                    {config.subwebsites.map((category, idx) => (
                      <div key={idx} className="space-y-3">
                        <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#FAC000] block border-b border-zinc-900 pb-2 uppercase">
                          {category.category}
                        </span>
                        <div className="flex flex-col space-y-2">
                          {category.items.map((sub, sIdx) => {
                            const isLocal = sub.url.startsWith("#");
                            return (
                              <a
                                key={sIdx}
                                href={sub.url}
                                target={isLocal ? undefined : "_blank"}
                                rel={isLocal ? undefined : "noopener noreferrer"}
                                className="group/item font-sans text-xs text-zinc-400 hover:text-white transition-all flex items-center justify-between py-0.5 rounded"
                                onClick={() => {
                                  setActiveDropdown(null);
                                }}
                              >
                                <span className="truncate group-hover/item:translate-x-1 transition-transform inline-block duration-200">{sub.label}</span>
                                {isLocal ? null : <ExternalLink className="w-3 h-3 text-[#FAC000] opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 shrink-0 ml-1" />}
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Subwebsites Footer Info */}
                  <div className="mt-6 pt-4 border-t border-zinc-900 flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Shield className="w-3.5 h-3.5 text-[#FAC000]" />
                      Multi-State Licensed Solutions Live
                    </span>
                    <span>{config.subwebsites.flatMap(c => c.items).length} Specialty Channels Connected</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <a href="#policy-review" className="hover:text-[#FAC000] transition-colors py-1">POLICY REVIEW</a>
          <a href="#for-agents" className="hover:text-[#FAC000] transition-colors py-1">FOR AGENTS</a>
          <a href="#inner-circle" className="hover:text-[#FAC000] transition-colors py-1">INNER CIRCLE</a>
          <a href="#about" className="hover:text-[#FAC000] transition-colors py-1">CONTACT</a>
        </nav>

        {/* CTA BUTTONS AND ADMIN TOGGLE */}
        <div className="flex items-center space-x-3">
          <a
            href="#policy-review"
            className="hidden sm:inline-flex items-center justify-center font-mono text-xs font-bold tracking-wider px-4 py-2 border border-[#FAC000] text-black bg-[#FAC000] hover:bg-black hover:text-[#FAC000] rounded transition-all duration-300 shadow-md"
          >
            GET A QUOTE
          </a>
          <a
            href="#for-agents"
            className="hidden sm:inline-flex items-center justify-center font-mono text-xs font-bold tracking-wider px-4 py-2 border border-zinc-700 hover:border-[#FAC000] text-white hover:text-white bg-black/60 hover:bg-zinc-950 rounded transition-all duration-300 shadow-md"
          >
            FOR AGENTS
          </a>

          {/* ADMIN SLIDE-OUT TOGGLE */}
          <button
            onClick={onOpenAdmin}
            className={`flex items-center justify-center p-2 rounded-lg border transition-all duration-300 ${
              isAdminOpen
                ? "bg-[#FAC000] border-[#FAC000] text-black spin-90"
                : "bg-zinc-900 border-zinc-800 text-[#FAC000] hover:bg-zinc-800"
            }`}
            title="Open Admin Edit Panel"
          >
            <Settings className="w-4 h-4 animate-pulse" />
            <span className="hidden md:inline ml-1.5 text-[10px] font-mono tracking-wider font-semibold">ADMIN PANEL</span>
          </button>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-300 hover:text-[#FAC000]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE DROP-DOWN MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950 mobile-menu-container border-t border-zinc-800/80 px-4 py-6 space-y-4">
          <div className="flex flex-col space-y-3 font-mono text-sm tracking-wider font-semibold text-zinc-300">
            <div className="border-b border-zinc-900 pb-3">
              <span className="text-[#FAC000] text-xs font-bold block mb-2 uppercase tracking-widest font-mono">COVERAGE SOLUTIONS (SUBWEBSITES)</span>
              <div className="space-y-4 pl-2 pt-2">
                {config.subwebsites.map((category, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold block font-mono bg-zinc-900/50 py-1 px-2 rounded">{category.category}</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2">
                      {category.items.map((sub, sIdx) => {
                        const isLocal = sub.url.startsWith("#");
                        return (
                          <a
                            key={sIdx}
                            href={sub.url}
                            target={isLocal ? undefined : "_blank"}
                            rel={isLocal ? undefined : "noopener noreferrer"}
                            className="block text-zinc-400 hover:text-white transition-colors text-xs py-0.5 flex items-center justify-between"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <span>{sub.label}</span>
                            {isLocal ? null : <ExternalLink className="w-3 h-3 text-zinc-650" />}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <a href="#policy-review" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#FAC000] transition-colors py-1">POLICY REVIEW</a>
            <a href="#for-agents" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#FAC000] transition-colors py-1">FOR AGENTS</a>
            <a href="#inner-circle" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#FAC000] transition-colors py-1">INNER CIRCLE</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#FAC000] transition-colors py-1">CONTACT</a>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-zinc-900">
            <a
              href="#policy-review"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center font-mono text-xs font-bold tracking-wider py-2.5 bg-[#FAC000] text-black border border-[#FAC000] rounded hover:bg-transparent hover:text-[#FAC000] transition-colors"
            >
              GET A QUOTE
            </a>
            <a
              href="#for-agents"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center font-mono text-xs font-bold tracking-wider py-2.5 border border-zinc-800 hover:border-[#FAC000] text-white rounded transition-colors"
            >
              FOR AGENTS
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
