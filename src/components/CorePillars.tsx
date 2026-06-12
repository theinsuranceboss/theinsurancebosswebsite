import React from "react";
import { WebsiteConfig } from "../types";
import { Shield, TrendingUp, Users, Car, Heart, Briefcase, Award, ArrowRight, Home as HomeIcon } from "lucide-react";

interface CorePillarsProps {
  config: WebsiteConfig;
}

export default function CorePillars({ config }: CorePillarsProps) {
  const { coverage, agents, partners } = config.pillars;

  // Map strings to icons
  const renderItemIcon = (item: string) => {
    switch (item.toLowerCase()) {
      case "auto":
        return <Car className="w-4 h-4 text-[#FAC000]" />;
      case "home":
        return <HomeIcon className="w-4 h-4 text-[#FAC000]" />;
      case "life":
        return <Heart className="w-4 h-4 text-[#FAC000]" />;
      case "business":
        return <Briefcase className="w-4 h-4 text-[#FAC000]" />;
      case "specialty":
        return <Award className="w-4 h-4 text-[#FAC000]" />;
      default:
        return <Shield className="w-4 h-4 text-[#FAC000]" />;
    }
  };

  return (
    <section className="bg-black py-16 md:py-24 border-t border-zinc-900" id="coverage-solutions">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* COLUMN 1: Coverage Solutions */}
          <div className="group relative flex flex-col justify-between bg-zinc-950 border border-zinc-800/80 hover:border-[#FAC000]/60 p-8 md:p-10 rounded-xl transition-all duration-300">
            {/* Corner Decorative Dots */}
            <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-zinc-700 group-hover:bg-[#FAC000] rounded-full transition-colors" />

            <div>
              {/* Header Icon */}
              <div className="w-12 h-12 rounded-lg bg-zinc-90 w bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#FAC000] mb-6">
                <Shield className="w-6 h-6" />
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold tracking-wider font-sans mb-3" style={{ color: coverage.titleColor || "#ffffff" }}>
                {coverage.title}
              </h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: coverage.descriptionColor || "rgb(161 161 170)" }}>
                {coverage.description}
              </p>

              {/* Icon badges layout */}
              <div className="grid grid-cols-5 gap-2 border-t border-b border-zinc-900 py-4 my-6">
                {coverage.items.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-center space-y-1">
                    {renderItemIcon(item)}
                    <span className="text-[9px] font-mono font-medium tracking-wide text-zinc-500 uppercase">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <a
                href={coverage.btnUrl}
                className="w-full text-center block font-mono text-xs font-bold tracking-wider py-3.5 px-4 bg-transparent text-[#FAC000] border-2 border-[#FAC000] hover:bg-[#FAC000] hover:text-black hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(250,192,0,0.3)] rounded transition-all duration-300"
              >
                {coverage.btnText}
              </a>
            </div>
          </div>

          {/* COLUMN 2: Insurance Agents */}
          <div className="group relative flex flex-col justify-between bg-zinc-950 border border-zinc-800/80 hover:border-[#FAC000]/60 p-8 md:p-10 rounded-xl transition-all duration-3000">
            {/* Corner Decorative Dots */}
            <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-zinc-700 group-hover:bg-[#FAC000] rounded-full transition-colors" />

            <div>
              {/* Header Icon */}
              <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#FAC000] mb-6">
                <TrendingUp className="w-6 h-6" />
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold tracking-wider font-sans mb-3" style={{ color: agents.titleColor || "#ffffff" }}>
                {agents.title}
              </h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: agents.descriptionColor || "rgb(161 161 170)" }}>
                {agents.description}
              </p>

              {/* Agent mini layout values */}
              <div className="bg-zinc-900/40 border border-zinc-900/60 p-4 rounded-lg space-y-2 mb-6">
                <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FAC000]" />
                  <span>Lead Generation Pipelines</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FAC000]" />
                  <span>Recruiting Automation Tools</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href={agents.btnUrl}
                className="w-full text-center block font-mono text-xs font-bold tracking-wider py-3.5 px-4 bg-transparent text-[#FAC000] border-2 border-[#FAC000] hover:bg-[#FAC000] hover:text-black hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(250,192,0,0.3)] rounded transition-all duration-300"
              >
                {agents.btnText}
              </a>
            </div>
          </div>

          {/* COLUMN 3: Referral Partners */}
          <div className="group relative flex flex-col justify-between bg-zinc-950 border border-zinc-800/80 hover:border-[#FAC000]/60 p-8 md:p-10 rounded-xl transition-all duration-300">
            {/* Corner Decorative Dots */}
            <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-zinc-700 group-hover:bg-[#FAC000] rounded-full transition-colors" />

            <div>
              {/* Header Icon */}
              <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#FAC000] mb-6">
                <Users className="w-6 h-6" />
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold tracking-wider font-sans mb-3" style={{ color: partners.titleColor || "#ffffff" }}>
                {partners.title}
              </h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: partners.descriptionColor || "rgb(161 161 170)" }}>
                {partners.description}
              </p>

              {/* Partners mini graphic/values */}
              <div className="bg-zinc-900/40 border border-zinc-900/60 p-4 rounded-lg space-y-2 mb-6">
                <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FAC000]" />
                  <span>High-conversion referral loops</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FAC000]" />
                  <span>Real-time partner analytics</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href={partners.btnUrl}
                target={partners.btnUrl.startsWith("#") ? undefined : "_blank"}
                rel={partners.btnUrl.startsWith("#") ? undefined : "noopener noreferrer"}
                className="w-full text-center block font-mono text-xs font-bold tracking-wider py-3.5 px-4 bg-transparent text-[#FAC000] border-2 border-[#FAC000] hover:bg-[#FAC000] hover:text-black hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(250,192,0,0.3)] rounded transition-all duration-300"
              >
                {partners.btnText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
