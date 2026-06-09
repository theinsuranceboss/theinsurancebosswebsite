import React from "react";
import { WebsiteConfig } from "../types";
import { getDirectImageUrl } from "./Header";

interface InsuranceBannersProps {
  config: WebsiteConfig;
}

export default function InsuranceBanners({ config }: InsuranceBannersProps) {
  const banners = config.insuranceBanners || [];

  if (banners.length === 0) return null;

  return (
    <div className="w-full border-t border-b border-zinc-900 bg-black">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0 items-stretch min-h-[520px]">
        {banners.map((banner, idx) => {
          const directMediaUrl = getDirectImageUrl(banner.mediaUrl);
          const isVideo = banner.mediaType === "video" || 
            (!banner.mediaType && !!(directMediaUrl && (directMediaUrl.match(/\.(mp4|webm|ogg|mov|m4v|avi)$/i) || directMediaUrl.includes("mixkit.co/videos") || directMediaUrl.includes("video"))));

          return (
            <div 
              key={banner.id || idx}
              className="relative overflow-hidden group flex flex-col justify-end min-h-[400px] lg:min-h-[520px] border-b md:border-b-0 md:border-r border-zinc-900 last:border-0"
            >
              {/* MEDIA LAYER */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                {isVideo ? (
                  <video
                    key={directMediaUrl}
                    src={directMediaUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover filter grayscale contrast-125 scale-100 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                  />
                ) : (
                  <img
                    src={directMediaUrl}
                    alt={banner.title}
                    className="w-full h-full object-cover filter grayscale contrast-125 scale-100 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                  />
                )}
              </div>

              {/* OVERLAY LAYERS */}
              <div className="absolute inset-0 bg-zinc-950/70 group-hover:bg-zinc-950/50 transition-colors duration-500 z-[1]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 z-[2]" />

              {/* CONTENT CARD (BOTTOM-ALIGNED) */}
              <div className="relative z-10 p-8 flex flex-col justify-end space-y-4 text-left h-full">
                <div className="space-y-2.5">
                  <h3 className="text-xl lg:text-2xl font-black text-white tracking-wide uppercase leading-tight font-serif">
                    {banner.title}
                  </h3>
                  <p className="text-xs lg:text-xs text-zinc-300 leading-relaxed font-sans font-medium">
                    {banner.subtitle}
                  </p>
                </div>

                <div className="pt-2 font-mono">
                  <a
                    href={banner.btnUrl || "#"}
                    className="w-full text-center block font-mono text-[10px] font-black tracking-widest py-3 px-4 bg-[#FAC000] text-black hover:bg-black hover:text-[#FAC000] border border-[#FAC000] rounded transition-all duration-300 uppercase shadow-md"
                  >
                    FIND MORE ↗
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
