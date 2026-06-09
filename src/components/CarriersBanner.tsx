import React, { useState } from "react";
import { WebsiteConfig } from "../types";
import { getDirectImageUrl } from "./Header";

interface CarriersBannerProps {
  config: WebsiteConfig;
}

export default function CarriersBanner({ config }: CarriersBannerProps) {
  const { title, subtitle, speed, personalLogos, commercialLogos, lifeLogos } = config.carriersBanner;

  const duration = speed ? speed * 2 : 50; // Double the duration to make it slower (default 50 seconds)

  // Track failed image URLs globally to filter them out in render
  const [failedUrls, setFailedUrls] = useState<Record<string, boolean>>({});

  const renderTrack = (trackLogos: string[], categoryName: string) => {
    if (!trackLogos || trackLogos.length === 0) return null;
    
    // Filter out empty, placeholder, or failed URLs
    const validLogos = trackLogos.filter(logo => {
      if (!logo) return false;
      const clean = logo.trim();
      if (clean === "" || clean === "https://" || clean === "http://" || clean.includes("placeholder")) {
        return false;
      }
      return !failedUrls[logo];
    });

    if (validLogos.length === 0) return null;

    // Duplicate list to ensure seamless infinite looping scroll
    const scrollLogos = [...validLogos, ...validLogos, ...validLogos];
    
    return (
      <div className="space-y-3 mt-8">
        {/* Category Label - White text */}
        <h3 className="text-center font-bold text-base md:text-lg tracking-wider text-white uppercase">
          {categoryName}
        </h3>
        
        {/* Marquee Carousel Container - White background strip */}
        <div className="relative w-full carriers-track-container flex items-center py-3 bg-white border-t border-b border-zinc-100">
          {/* Left & Right gradient mask overlays for soft premium fade effect - white themed */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex w-max carriers-track-animate space-x-6">
            {scrollLogos.map((logo, index) => {
              const isSvg = logo.startsWith("data:image/svg+xml");
              
              let svgHtml = "";
              if (isSvg) {
                try {
                  const commaIdx = logo.indexOf(",");
                  if (commaIdx !== -1) {
                    const rawContent = logo.substring(commaIdx + 1);
                    // Decode URL percent-encoding (like %23 -> #)
                    svgHtml = decodeURIComponent(rawContent);
                  }
                } catch (e) {
                  svgHtml = "";
                }
              }

              return (
                <div 
                  key={index} 
                  className="carrier-card flex items-center justify-center h-16 w-44 md:w-52 shrink-0 bg-transparent border-none p-2 transition-all duration-300 hover:scale-105"
                >
                  {isSvg && svgHtml ? (
                    <div 
                      className="w-full h-full flex items-center justify-center filter grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300 [&>svg]:max-h-12 [&>svg]:max-w-full [&>svg]:w-auto [&>svg]:h-auto [&>svg]:object-contain" 
                      dangerouslySetInnerHTML={{ __html: svgHtml }} 
                    />
                  ) : (
                    <img 
                      src={getDirectImageUrl(logo)} 
                      alt={`${categoryName} Partner Logo ${index + 1}`}
                      className="max-h-12 max-w-full object-contain filter grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                      onError={() => {
                        setFailedUrls(prev => ({ ...prev, [logo]: true }));
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const hasAnyLogos = (personalLogos && personalLogos.length > 0) || 
                      (commercialLogos && commercialLogos.length > 0) || 
                      (lifeLogos && lifeLogos.length > 0);

  if (!hasAnyLogos) return null;

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
          animation: carriersMarquee ${duration}s linear infinite;
        }
        .carriers-track-container:hover .carriers-track-animate {
          animation-play-state: paused;
        }
      `}} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider mb-3" style={{ color: config.carriersBanner.titleColor || config.accentColor || "#FAC000", transform: `scale(${config.fontScale})` }}>
          {title || "We Work with the Most Trusted Insurance Carriers"}
        </h2>
        <p className="text-white text-xs md:text-sm max-w-2xl mx-auto leading-relaxed opacity-90" style={{ color: config.carriersBanner.subtitleColor || "#ffffff" }}>
          {subtitle || "We team up with the nation's most respected insurance companies to make sure you're protected by names you can trust."}
        </p>
      </div>

      {renderTrack(personalLogos, "Personal Lines")}
      {renderTrack(commercialLogos, "Commercial Lines")}
      {renderTrack(lifeLogos, "Life Insurance")}

      <div className="text-center mt-10">
        <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-widest">And More!</h4>
      </div>
    </section>
  );
}
