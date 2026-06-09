import React from "react";
import { WebsiteConfig } from "../types";
import { Globe, Shield, TrendingUp, Users, FileCheck, Cpu } from "lucide-react";

interface ValuePropsProps {
  config: WebsiteConfig;
}

export default function ValueProps({ config }: ValuePropsProps) {
  const { tagline, title, items } = config.valueProps;

  const renderIcon = (titleStr: string) => {
    const text = titleStr.toLowerCase();
    if (text.includes("state")) {
      return <Globe className="w-6 h-6 text-[#FAC000]" />;
    } else if (text.includes("coverage")) {
      return <Shield className="w-6 h-6 text-[#FAC000]" />;
    } else if (text.includes("growth")) {
      return <TrendingUp className="w-6 h-6 text-[#FAC000]" />;
    } else if (text.includes("network") || text.includes("referral")) {
      return <Users className="w-6 h-6 text-[#FAC000]" />;
    } else if (text.includes("policy") || text.includes("review")) {
      return <FileCheck className="w-6 h-6 text-[#FAC000]" />;
    } else if (text.includes("ai") || text.includes("resources")) {
      return <Cpu className="w-6 h-6 text-[#FAC000]" />;
    }
    return <Shield className="w-6 h-6 text-[#FAC000]" />;
  };

  return (
    <section className="bg-black py-16 md:py-20 border-t border-zinc-900 relative">
      {/* Accent Background Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-10 filter blur-[100px] pointer-events-none"
        style={{ backgroundColor: config.accentColor }}
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 text-center z-10">
        {/* Caption */}
        <span className="text-xs font-mono font-bold tracking-[0.25em] block mb-2 uppercase" style={{ color: config.valueProps.taglineColor || config.accentColor }}>
          {tagline}
        </span>
        
        {/* Main Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wider uppercase mb-12" style={{ color: config.valueProps.titleColor || "#ffffff" }}>
          {title}
        </h2>

        {/* Six Bento Grid Features */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {items.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-zinc-950 border border-zinc-900 hover:border-[#FAC000]/60 p-6 flex flex-col items-center justify-center text-center space-y-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-2xl"
            >
              {/* Graphic Icon Wrapper */}
              <div className="w-12 h-12 rounded-full bg-zinc-90 w bg-zinc-900 flex items-center justify-center border border-zinc-800">
                {renderIcon(item)}
              </div>

              {/* Tagline name */}
              <h4 className="text-[10px] md:text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase leading-snug">
                {item}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
