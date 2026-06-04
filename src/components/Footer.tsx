import React from "react";
import { WebsiteConfig } from "../types";
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Twitter, 
  Globe, 
  Link as LinkIcon, 
  MessageCircle, 
  Send,
  Shield, 
  Phone, 
  Mail, 
  ArrowUp 
} from "lucide-react";
import { getDirectImageUrl } from "./Header";

const SOCIAL_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  twitter: Twitter,
  globe: Globe,
  link: LinkIcon,
  whatsapp: MessageCircle,
  telegram: Send
};

interface FooterProps {
  config: WebsiteConfig;
}

export default function Footer({ config }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black border-t border-zinc-900 pt-16 pb-8" id="contact">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-zinc-90 w border-zinc-900">
          
          {/* COLUMN 1: Coverage Solutions (or subwebsites mapper) */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-white uppercase border-b border-zinc-900 pb-2">
              COVERAGE SOLUTIONS
            </h4>
            <div className="flex flex-col space-y-2 text-xs text-zinc-400">
              {config.subwebsites.map((category, idx) => {
                const url = category.items[0]?.url || "#";
                const isLocal = url.startsWith("#");
                return (
                  <a
                    key={idx}
                    href={url}
                    target={isLocal ? undefined : "_blank"}
                    rel={isLocal ? undefined : "noopener noreferrer"}
                    className="hover:text-[#FAC000] hover:underline transition-all font-medium"
                  >
                    {category.category}
                  </a>
                );
              })}
              <a href="#policy-review" className="hover:text-[#FAC000] hover:underline transition-all">
                Policy Review
              </a>
            </div>
          </div>

          {/* COLUMN 2: Agent Resources */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-white uppercase border-b border-zinc-900 pb-2">
              AGENT RESOURCES
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><a href="#for-agents" className="hover:text-[#FAC000] transition-colors">Dashboard Overview</a></li>
              <li><a href="#for-agents" className="hover:text-[#FAC000] transition-colors">Lead Gen Pipelines</a></li>
              <li><a href="#for-agents" className="hover:text-[#FAC000] transition-colors">Social Management</a></li>
              <li><a href="#for-agents" className="hover:text-[#FAC000] transition-colors">Automation CRM Setup</a></li>
              <li><a href="#for-agents" className="hover:text-[#FAC000] transition-colors">Consulting Services</a></li>
              <li><a href="#for-agents" className="hover:text-[#FAC000] transition-colors">Recruiting Portals</a></li>
            </ul>
          </div>

          {/* COLUMN 3: Partners */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-white uppercase border-b border-zinc-900 pb-2">
              PARTNERS & CIRCLE
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><a href="#inner-circle" className="hover:text-[#FAC000] transition-colors">Become a Partner</a></li>
              <li><a href="#inner-circle" className="hover:text-[#FAC000] transition-colors">Affiliate Network</a></li>
              <li><a href="#inner-circle" className="hover:text-[#FAC000] transition-colors">Partner Benefits</a></li>
              <li><a href="#inner-circle" className="hover:text-[#FAC000] transition-colors">Inner Circle Dashboard</a></li>
            </ul>
          </div>

          {/* COLUMN 4: Contact Us */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-white uppercase border-b border-zinc-900 pb-2">
              CONTACT US
            </h4>
            <div className="space-y-3.5 text-xs text-zinc-400">
              <p className="font-bold text-white uppercase tracking-wider">THE INSURANCE BOSS</p>
              
              <a href={`tel:${config.phone.replace(/[^0-9]/g, "")}`} className="flex items-center space-x-2 hover:text-[#FAC000] transition-colors">
                <Phone className="w-3.5 h-3.5 shrink-0 text-[#FAC000]" />
                <span className="font-mono">{config.phone}</span>
              </a>

              <a href={`mailto:${config.email}`} className="flex items-center space-x-2 hover:text-[#FAC000] transition-colors truncate">
                <Mail className="w-3.5 h-3.5 shrink-0 text-[#FAC000]" />
                <span className="font-mono truncate">{config.email}</span>
              </a>

              <p className="text-[11px] text-zinc-500 italic">
                Serving Multiple States nationwide with smart tech solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Brand Slogan and Social Icons Row */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              {config.logoUrl ? (
                <img
                  src={getDirectImageUrl(config.logoUrl)}
                  alt={config.logoText}
                  className="h-10 w-auto object-contain"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                    const fallback = document.getElementById("footer-logo-text-fallback");
                    if (fallback) fallback.classList.remove("hidden");
                  }}
                />
              ) : null}
              <span 
                id="footer-logo-text-fallback"
                className={`text-sm font-black tracking-widest border border-zinc-800 bg-zinc-950 p-1 rounded font-serif uppercase ${config.logoUrl ? 'hidden' : ''}`}
              >
                THE INSURANCE <span className="text-[#FAC000]">BOSS</span>
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-mono">
              Smart Coverage. Serious Protection. Real Growth. Real Opportunity.
            </p>
          </div>

          {/* Social Media Link Icons */}
          <div className="flex items-center md:justify-end space-x-4">
            {(config.socialLinks || []).map((social, sIdx) => {
              const IconComponent = SOCIAL_ICON_MAP[social.icon.toLowerCase()] || Globe;
              return (
                <a
                  key={sIdx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-zinc-900 bg-zinc-950 text-zinc-400 hover:text-[#FAC000] hover:border-[#FAC000] hover:bg-[#FAC000]/10 hover:scale-110 hover:shadow-[0_0_12px_rgba(250,192,0,0.5)] rounded-full transition-all duration-300"
                  aria-label={social.icon}
                >
                  <IconComponent className="w-4 h-4" />
                </a>
              );
            })}

            {/* Back to top float */}
            <button
              onClick={scrollToTop}
              className="p-2 bg-[#FAC000]/10 hover:bg-[#FAC000] border border-[#FAC000]/25 hover:border-[#FAC000] text-[#FAC000] hover:text-black rounded transition-all ml-4"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Copy bar */}
        <div className="pt-6 border-t border-zinc-90 w border-zinc-900 flex flex-col md:flex-row justify-between items-center text-[10px] text-zinc-500 space-y-3 md:space-y-0 select-none font-mono">
          <span>
            © 2026 The Insurance Boss. All Rights Reserved. Fully persistent and editable.
          </span>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-zinc-300">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-zinc-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
