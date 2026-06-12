import React, { useState } from "react";
import { WebsiteConfig } from "../types";
import { Users, Handshake, Landmark, Award, ArrowRight, DollarSign, Calculator, HelpCircle } from "lucide-react";

interface BottomSplitProps {
  config: WebsiteConfig;
}

export default function BottomSplit({ config }: BottomSplitProps) {
  const innerCircle = config.innerCircle;
  const about = config.aboutBoss;

  // Calculators values
  const [partnerType, setPartnerType] = useState("Mortgage Professionals");
  const [referralsCount, setReferralsCount] = useState(3);

  const referralCommissionRates: Record<string, number> = {
    "MORTGAGE PROFESSIONALS": 250,
    "REAL ESTATE AGENTS": 220,
    "AUTO DEALERS": 180,
    "FINANCIAL ADVISORS": 350,
    "BUSINESS BROKERS": 400,
    "CPAS": 300
  };

  const getEstimatedRevenue = () => {
    const rate = referralCommissionRates[partnerType.toUpperCase()] || 200;
    return referralsCount * rate * 12; // monthly rate compiled annually
  };

  const renderIcon = (label: string) => {
    switch (label.toUpperCase()) {
      case "MORTGAGE PROFESSIONALS":
        return <Landmark className="w-4 h-4 text-[#FAC000]" />;
      case "REAL ESTATE AGENTS":
        return <Users className="w-4 h-4 text-[#FAC000]" />;
      case "AUTO DEALERS":
        return <Award className="w-4 h-4 text-[#FAC000]" />;
      case "FINANCIAL ADVISORS":
        return <DollarSign className="w-4 h-4 text-[#FAC000]" />;
      default:
        return <Handshake className="w-4 h-4 text-[#FAC000]" />;
    }
  };

  return (
    <section className="bg-black py-16 md:py-24 border-t border-zinc-900" id="inner-circle">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT PANEL: Inner Circle Turning Relationships into Revenue */}
          <div className="bg-zinc-950 border border-zinc-900 p-8 md:p-10 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-6">
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] block uppercase" style={{ color: innerCircle.labelColor || config.accentColor }}>
                {innerCircle.label}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight" style={{ color: innerCircle.titleColor || "#ffffff" }}>
                {innerCircle.title}
              </h2>
              <p className="text-sm font-normal" style={{ color: innerCircle.bodyColor || "rgb(161 161 170)" }}>
                {innerCircle.body}
              </p>

              {/* Grid labels */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {innerCircle.items.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPartnerType(item)}
                    className={`p-3 text-left border rounded-lg transition-all flex flex-col justify-between space-y-2 h-24 ${
                      partnerType === item
                        ? "border-[#FAC000] bg-zinc-900"
                        : "border-zinc-900 bg-zinc-950 hover:border-zinc-800"
                    }`}
                  >
                    <div className="p-1 rounded bg-zinc-90 w bg-zinc-900 border border-zinc-800 w-fit">
                      {renderIcon(item)}
                    </div>
                    <span className="text-[10px] font-mono text-zinc-300 uppercase leading-tight font-extrabold truncate w-full">
                      {item}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <a
                href={innerCircle.btnUrl}
                target={innerCircle.btnUrl.startsWith("#") ? undefined : "_blank"}
                rel={innerCircle.btnUrl.startsWith("#") ? undefined : "noopener noreferrer"}
                className="w-full text-center block font-mono text-xs font-extrabold tracking-wider py-4 bg-transparent text-[#FAC000] border-2 border-[#FAC000] hover:bg-[#FAC000] hover:text-black hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(250,192,0,0.3)] rounded transition-all duration-300"
              >
                {innerCircle.btnText}
              </a>
            </div>
          </div>

          {/* RIGHT PANEL: About the Insurance Boss */}
          <div className="bg-zinc-950 border border-zinc-900 p-8 md:p-10 rounded-2xl flex flex-col justify-between relative overflow-hidden" id="about">
            <div className="space-y-6">
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase block" style={{ color: about.labelColor || "rgb(113 113 122)" }}>
                {about.label}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight" style={{ color: about.titleColor || "#ffffff" }}>
                {about.title}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: about.bodyColor || "rgb(161 161 170)" }}>
                {about.body}
              </p>
            </div>

            <div className="pt-6">
              <a
                href={about.btnUrl}
                target={about.btnUrl.startsWith("#") ? undefined : "_blank"}
                rel={about.btnUrl.startsWith("#") ? undefined : "noopener noreferrer"}
                className="w-full text-center block font-mono text-xs font-extrabold tracking-wider py-4 bg-transparent text-[#FAC000] border-2 border-[#FAC000] hover:bg-[#FAC000] hover:text-black hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(250,192,0,0.3)] rounded transition-all duration-300"
              >
                {about.btnText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
