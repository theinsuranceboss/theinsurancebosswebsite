import React from "react";
import { WebsiteConfig } from "../types";
import { ArrowRight, ShieldCheck, Target, Award } from "lucide-react";

interface HeroProps {
  config: WebsiteConfig;
}

export default function Hero({ config }: HeroProps) {
  const { titleWhite, titleYellow, subtitle, keywords, supportingText, btnReviewText, btnReviewUrl, btnGrowText, btnGrowUrl, bgUrl } = config.hero;

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-black overflow-hidden py-16 md:py-24">
      {/* Background with Dark Overlays for absolute high contrast layout */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700" 
        style={{ backgroundImage: `url(${bgUrl})` }}
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

      {/* Decorative Glow Elements */}
      <div 
        className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 filter blur-[120px] pointer-events-none"
        style={{ backgroundColor: config.accentColor }}
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Hero Left Content */}
        <div className="lg:col-span-8 flex flex-col text-left space-y-6" style={{ transform: `scale(${config.fontScale})` }}>
          {/* Accent Line Tag */}
          <div className="flex items-center space-x-2">
            <span className="h-[2px] w-12 rounded-full" style={{ backgroundColor: config.accentColor }} />
            <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase text-zinc-400">
              ESTABLISHED NATIONWIDE
            </span>
          </div>

          {/* Main Huge Titles */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] font-sans">
            <span className="text-white block">{titleWhite}</span>
            <span className="block mt-1 font-extrabold" style={{ color: config.accentColor }}>
              {titleYellow}
            </span>
          </h1>

          {/* Subheadline description */}
          <p className="max-w-2xl text-base md:text-lg text-zinc-300 leading-relaxed font-sans">
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
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href={btnReviewUrl}
              className="px-8 py-4 text-sm font-mono font-extrabold tracking-wider text-black text-center rounded bg-[#FAC000] hover:bg-black hover:text-[#FAC000] border border-[#FAC000] shadow-[0_4px_20px_rgba(250,192,0,0.25)] hover:shadow-none transition-all duration-300"
              style={{ backgroundColor: config.accentColor, borderColor: config.accentColor }}
            >
              {btnReviewText}
            </a>
            <a
              href={btnGrowUrl}
              className="px-8 py-4 text-sm font-mono font-extrabold tracking-wider text-white text-center rounded border border-zinc-700 hover:border-[#FAC000] bg-black/40 hover:bg-zinc-950 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>{btnGrowText}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>

        {/* Hero Right Decorative Panel - matching image silhouette or summary statistics */}
        <div className="lg:col-span-4 hidden lg:block">
          <div className="bg-zinc-950/80 border border-zinc-800/80 p-6 md:p-8 rounded-xl shadow-2xl relative overflow-hidden group hover:border-[#FAC000]/60 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 opacity-10 pointer-events-none">
              <ShieldCheck className="w-full h-full text-[#FAC000]" />
            </div>

            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">
              BENEFITS & METRICS
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-3.5">
                <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-[#FAC000]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-200">MAXIMUM SECURITY</h4>
                  <p className="text-[11px] text-zinc-400 mt-1">Multi-million-dollar coverage configurations designed to save costs and reduce vulnerabilities.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-[#FAC000]">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-200">AGENCY SCALE SYSTEM</h4>
                  <p className="text-[11px] text-zinc-400 mt-1">Premium lead-gen pipelines, recruitment automation, and social media dashboards.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-[#FAC000]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-200">INVESTMENT GROWTH</h4>
                  <p className="text-[11px] text-zinc-400 mt-1">Partner with our multi-business network. Elevate referral revenue channels today.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-900 flex justify-between items-center">
              <span className="text-[10px] font-mono text-zinc-500">SYSTEM STABILITY</span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-[#FAC000] rounded-full animate-ping" />
                <span className="text-[10px] font-mono font-bold text-zinc-300">ACTIVE</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
