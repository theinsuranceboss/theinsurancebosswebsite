import React from "react";
import { WebsiteConfig } from "../types";
import { ArrowRight, ShieldCheck, Target, Award, Star, Users, Zap } from "lucide-react";
import { getDirectImageUrl, isVideoUrl } from "./Header";

interface HeroProps {
  config: WebsiteConfig;
}

export default function Hero({ config }: HeroProps) {
  const { 
    titleWhite, 
    titleYellow, 
    subtitle, 
    keywords, 
    supportingText, 
    btnReviewText, 
    btnReviewUrl, 
    btnGrowText, 
    btnGrowUrl, 
    bgUrl,
    titleSize = 56,
    subtitleSize = 18,
    align = "left",
    layout = "full",
    splitImageSide = "right",
    showMetrics = true
  } = config.hero;

  const metricsConfig = config.metrics || {
    show: showMetrics,
    title: "BENEFITS & METRICS",
    stabilityLabel: "SYSTEM STABILITY",
    stabilityStatus: "ACTIVE",
    items: [
      {
        title: "MAXIMUM SECURITY",
        description: "Multi-million-dollar coverage configurations designed to save costs and reduce vulnerabilities.",
        icon: "shield" as const
      },
      {
        title: "AGENCY SCALE SYSTEM",
        description: "Premium lead-gen pipelines, recruitment automation, and social media dashboards.",
        icon: "target" as const
      },
      {
        title: "INVESTMENT GROWTH",
        description: "Partner with our multi-business network. Elevate referral revenue channels today.",
        icon: "award" as const
      }
    ]
  };

  const finalShowMetrics = metricsConfig.show;

  const heroBg = bgUrl;

  const alignContainerClass = 
    align === "center" 
      ? "text-center items-center justify-center mx-auto" 
      : align === "right" 
        ? "text-right items-end justify-end ml-auto" 
        : "text-left items-start justify-start mr-auto";

  const alignFlexClass = 
    align === "center" 
      ? "justify-center" 
      : align === "right" 
        ? "justify-end" 
        : "justify-start";

  const isSplit = layout === "split";

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-transparent overflow-hidden pt-28 pb-16 md:pt-40 md:pb-24">
      {/* Background with Dark Overlays for absolute high contrast layout */}
      {!isSplit && (
        <div className="absolute inset-0 overflow-hidden transition-all duration-700">
          {isVideoUrl(heroBg) ? (
            <video
              key={getDirectImageUrl(heroBg)}
              src={getDirectImageUrl(heroBg)}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-40 filter grayscale contrast-125 pointer-events-none"
            />
          ) : (
            <div 
              className="w-full h-full bg-cover bg-center" 
              style={{ backgroundImage: `url(${getDirectImageUrl(heroBg)})` }}
              referrerPolicy="no-referrer"
            />
          )}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

      {/* Decorative Glow Elements */}
      <div 
        className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 filter blur-[120px] pointer-events-none"
        style={{ backgroundColor: config.accentColor }}
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 w-full z-10">
        {isSplit ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image Column (if left) */}
            {splitImageSide === "left" && (
              <div className="lg:col-span-5 w-full flex justify-center order-first lg:order-none">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl group">
                  {isVideoUrl(bgUrl) ? (
                    <video
                      key={getDirectImageUrl(bgUrl)}
                      src={getDirectImageUrl(bgUrl)}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                    />
                  ) : (
                    <img 
                      src={getDirectImageUrl(bgUrl)} 
                      alt="Hero Banner" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            )}

            {/* Text Column */}
            <div className={`lg:col-span-7 flex flex-col space-y-6 ${alignContainerClass}`} style={{ transform: `scale(${config.fontScale})` }}>
              <div className={`flex items-center space-x-2 ${alignFlexClass}`}>
                <span className="h-[2px] w-12 rounded-full" style={{ backgroundColor: config.accentColor }} />
                <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase text-zinc-400">
                  ESTABLISHED NATIONWIDE
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] font-sans" style={{ fontSize: `clamp(2rem, 5vw, ${titleSize}px)` }}>
                <span className="block" style={{ color: config.hero.titleWhiteColor || "#ffffff" }}>{titleWhite}</span>
                <span className="block mt-1 font-extrabold" style={{ color: config.hero.titleYellowColor || config.accentColor }}>
                  {titleYellow}
                </span>
              </h1>

              <p className="max-w-2xl leading-relaxed font-sans" style={{ fontSize: `clamp(1rem, 2.5vw, ${subtitleSize}px)`, color: config.hero.subtitleColor || "rgb(209 213 219)" }}>
                {subtitle}
              </p>

              <div className="py-2.5 px-4 bg-zinc-950/80 border border-zinc-800 rounded-md inline-block max-w-[fit-content]">
                <p className="text-[10px] md:text-xs font-mono font-bold tracking-[0.15em] uppercase" style={{ color: config.accentColor }}>
                  {keywords}
                </p>
              </div>

              <p className="text-xs md:text-sm text-zinc-400 italic">
                {supportingText}
              </p>

              <div className={`pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full ${alignFlexClass}`}>
                <a
                  href={btnReviewUrl}
                  target={btnReviewUrl.startsWith("#") ? undefined : "_blank"}
                  rel={btnReviewUrl.startsWith("#") ? undefined : "noopener noreferrer"}
                  className="px-8 py-4 text-sm font-mono font-extrabold tracking-wider text-[#FAC000] text-center rounded bg-transparent hover:bg-[#FAC000] hover:text-black border-2 border-[#FAC000] hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(250,192,0,0.3)] transition-all duration-300"
                >
                  {btnReviewText}
                </a>
                <a
                  href={btnGrowUrl}
                  target={btnGrowUrl.startsWith("#") ? undefined : "_blank"}
                  rel={btnGrowUrl.startsWith("#") ? undefined : "noopener noreferrer"}
                  className="px-8 py-4 text-sm font-mono font-extrabold tracking-wider text-[#FAC000] text-center rounded border-2 border-[#FAC000] bg-transparent hover:bg-[#FAC000] hover:text-black hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(250,192,0,0.3)] transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>{btnGrowText}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>

            {/* Image Column (if right) */}
            {splitImageSide === "right" && (
              <div className="lg:col-span-5 w-full flex justify-center">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl group">
                  {isVideoUrl(bgUrl) ? (
                    <video
                      key={getDirectImageUrl(bgUrl)}
                      src={getDirectImageUrl(bgUrl)}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                    />
                  ) : (
                    <img 
                      src={getDirectImageUrl(bgUrl)} 
                      alt="Hero Banner" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className={`flex flex-col space-y-6 ${alignContainerClass} ${finalShowMetrics ? "lg:col-span-8" : "lg:col-span-12"}`} style={{ transform: `scale(${config.fontScale})` }}>
              {/* Accent Line Tag */}
              <div className={`flex items-center space-x-2 ${alignFlexClass}`}>
                <span className="h-[2px] w-12 rounded-full" style={{ backgroundColor: config.accentColor }} />
                <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase text-zinc-400">
                  ESTABLISHED NATIONWIDE
                </span>
              </div>

              {/* Main Huge Titles */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] font-sans" style={{ fontSize: `clamp(2rem, 5vw, ${titleSize}px)` }}>
                <span className="block" style={{ color: config.hero.titleWhiteColor || "#ffffff" }}>{titleWhite}</span>
                <span className="block mt-1 font-extrabold" style={{ color: config.hero.titleYellowColor || config.accentColor }}>
                  {titleYellow}
                </span>
              </h1>

              {/* Subheadline description */}
              <p className="max-w-2xl leading-relaxed font-sans" style={{ fontSize: `clamp(1rem, 2.5vw, ${subtitleSize}px)`, color: config.hero.subtitleColor || "rgb(209 213 219)" }}>
                {subtitle}
              </p>

              {/* Keywords line in uppercase */}
              <div className="py-2.5 px-4 bg-zinc-950/80 border border-zinc-800 rounded-md inline-block max-w-[fit-content]">
                <p className="text-[10px] md:text-xs font-mono font-bold tracking-[0.15em] uppercase" style={{ color: config.accentColor }}>
                  {keywords}
                </p>
              </div>

              {/* Supporting note text */}
              <p className="text-xs md:text-sm text-zinc-400 italic">
                {supportingText}
              </p>

              {/* CTA Buttons */}
              <div className={`pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full ${alignFlexClass}`}>
                <a
                  href={btnReviewUrl}
                  target={btnReviewUrl.startsWith("#") ? undefined : "_blank"}
                  rel={btnReviewUrl.startsWith("#") ? undefined : "noopener noreferrer"}
                  className="px-8 py-4 text-sm font-mono font-extrabold tracking-wider text-[#FAC000] text-center rounded bg-transparent hover:bg-[#FAC000] hover:text-black border-2 border-[#FAC000] hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(250,192,0,0.3)] transition-all duration-300"
                >
                  {btnReviewText}
                </a>
                <a
                  href={btnGrowUrl}
                  target={btnGrowUrl.startsWith("#") ? undefined : "_blank"}
                  rel={btnGrowUrl.startsWith("#") ? undefined : "noopener noreferrer"}
                  className="px-8 py-4 text-sm font-mono font-extrabold tracking-wider text-[#FAC000] text-center rounded border-2 border-[#FAC000] bg-transparent hover:bg-[#FAC000] hover:text-black hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(250,192,0,0.3)] transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>{btnGrowText}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>

            {/* Hero Right Decorative Panel - matching image silhouette or summary statistics */}
            {finalShowMetrics && (
              <div className="lg:col-span-4 hidden lg:block">
                <div className="bg-zinc-950/80 border border-zinc-800/80 p-6 md:p-8 rounded-xl shadow-2xl relative overflow-hidden group hover:border-[#FAC000]/60 transition-colors">
                  <div className="absolute top-0 right-0 w-24 h-24 opacity-10 pointer-events-none text-[#FAC000]">
                    {(() => {
                      const firstIcon = metricsConfig.items[0]?.icon;
                      const IconComp = 
                        firstIcon === "shield" ? ShieldCheck :
                        firstIcon === "target" ? Target :
                        firstIcon === "award" ? Award :
                        firstIcon === "star" ? Star :
                        firstIcon === "users" ? Users :
                        firstIcon === "zap" ? Zap :
                        ShieldCheck;
                      return <IconComp className="w-full h-full" />;
                    })()}
                  </div>

                  <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">
                    {metricsConfig.title}
                  </div>
                  
                  <div className="space-y-6">
                    {metricsConfig.items.map((item, index) => {
                      const IconComp = 
                        item.icon === "shield" ? ShieldCheck :
                        item.icon === "target" ? Target :
                        item.icon === "award" ? Award :
                        item.icon === "star" ? Star :
                        item.icon === "users" ? Users :
                        item.icon === "zap" ? Zap :
                        ShieldCheck;

                      return (
                        <div key={index} className="flex items-start space-x-3.5">
                          <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-[#FAC000]">
                            <IconComp className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-zinc-200 uppercase">{item.title}</h4>
                            <p className="text-[11px] text-zinc-400 mt-1">{item.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-900 flex justify-between items-center">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">{metricsConfig.stabilityLabel}</span>
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 bg-[#FAC000] rounded-full animate-ping" />
                      <span className="text-[10px] font-mono font-bold text-zinc-300 uppercase">{metricsConfig.stabilityStatus}</span>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
