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
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] block uppercase" style={{ color: config.accentColor }}>
                {innerCircle.label}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {innerCircle.title}
              </h2>
              <p className="text-sm text-zinc-400">
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

              {/* Partner Earnings Estimator calculator */}
              <div className="bg-zinc-900/60 p-5 rounded-lg border border-zinc-850 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1">
                    <Calculator className="w-3.5 h-3.5 text-[#FAC000]" /> PARTNER REVENUE ESTIMATOR
                  </span>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase">{partnerType}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-zinc-400">Monthly referrals:</span>
                    <span className="text-white font-extrabold">{referralsCount} clients</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={referralsCount}
                    onChange={(e) => setReferralsCount(Number(e.target.value))}
                    className="w-full accent-[#FAC000]"
                  />
                </div>

                <div className="pt-3 border-t border-zinc-800 flex justify-between items-center bg-zinc-950 p-3 rounded border border-zinc-900">
                  <span className="text-xs font-bold text-zinc-400 font-sans">Estimated Annual Pay:</span>
                  <span className="text-base font-mono font-black text-[#FAC000]">
                    ${getEstimatedRevenue().toLocaleString()}.00 / yr
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <a
                href={innerCircle.btnUrl}
                className="w-full text-center block font-mono text-xs font-extrabold tracking-wider py-4 bg-[#FAC000] text-black hover:bg-black hover:text-[#FAC000] border border-[#FAC000] rounded transition-all duration-300"
              >
                {innerCircle.btnText}
              </a>
            </div>
          </div>

          {/* RIGHT PANEL: About the Insurance Boss */}
          <div className="bg-zinc-950 border border-zinc-900 p-8 md:p-10 rounded-2xl flex flex-col justify-between relative overflow-hidden" id="about">
            <div className="space-y-6">
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-zinc-500 uppercase block">
                {about.label}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {about.title}
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {about.body}
              </p>
            </div>

            <div className="pt-6">
              <a
                href={about.btnUrl}
                className="w-full text-center block font-mono text-xs font-extrabold tracking-wider py-4 bg-zinc-90 border border-zinc-800 text-zinc-100 hover:border-[#FAC000] rounded transition-all duration-300"
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
