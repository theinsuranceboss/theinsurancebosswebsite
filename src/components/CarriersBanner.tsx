import React from "react";
import { WebsiteConfig } from "../types";

interface CarriersBannerProps {
  config: WebsiteConfig;
}

export default function CarriersBanner({ config }: CarriersBannerProps) {
  const { title, subtitle, logos } = config.carriersBanner;

  if (!logos || logos.length === 0) return null;

  // Duplicate list to ensure seamless infinite looping scroll
  const scrollLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-16 bg-zinc-950 border-t border-b border-zinc-900 overflow-hidden relative select-none">
      {/* Scope CSS animation directly for easy self-containment */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes carriersMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.3333%);
          }
        }
        .carriers-track-animate {
          animation: carriersMarquee 25s linear infinite;
        }
        .carriers-track-container:hover .carriers-track-animate {
          animation-play-state: paused;
        }
      `}} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider mb-3" style={{ transform: `scale(${config.fontScale})` }}>
          {title || "We Work with the Most Trusted Insurance Carriers"}
        </h2>
        <p className="text-zinc-400 text-xs md:text-sm max-w-2xl mx-auto leading-relaxed">
          {subtitle || "We team up with the nation's most respected insurance companies to make sure you're protected by names you can trust."}
        </p>
      </div>

      {/* Marquee Carousel Container */}
      <div className="relative w-full carriers-track-container flex items-center py-4 bg-zinc-950/60 backdrop-blur-sm">
        {/* Left & Right gradient mask overlays for soft premium fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

        <div className="flex w-max carriers-track-animate space-x-6">
          {scrollLogos.map((logo, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center h-16 w-44 md:w-52 shrink-0 bg-zinc-900/40 border border-zinc-900 rounded-lg p-2 hover:border-[#FAC000]/40 transition-all duration-300 hover:scale-105"
            >
              <img 
                src={logo} 
                alt={`Carrier Partner Logo ${index + 1}`}
                className="max-h-12 max-w-full object-contain filter grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                onError={(e) => {
                  // Fallback: if data URI or image breaks, show clean placeholder text
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const pNode = target.parentNode as HTMLElement;
                  if (pNode) {
                    const fallbackSpan = pNode.querySelector(".logo-fallback");
                    if (fallbackSpan) fallbackSpan.classList.remove("hidden");
                  }
                }}
              />
              <span className="logo-fallback hidden text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase">
                CARRIER LOGO
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
