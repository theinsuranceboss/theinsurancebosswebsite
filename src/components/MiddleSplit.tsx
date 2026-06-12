import React, { useState } from "react";
import { WebsiteConfig } from "../types";
import { Check, ShieldCheck } from "lucide-react";
import InsuranceBanners from "./InsuranceBanners";

interface MiddleSplitProps {
  config: WebsiteConfig;
}

export default function MiddleSplit({ config }: MiddleSplitProps) {
  const policy = config.policyReview;
  const agents = config.biggerAgency;

  // Agent interactive state
  const [selectedAgentTab, setSelectedAgentTab] = useState<string>("dashboard");

  // Preset demo features for agents dashboard preview on the laptop screen
  const agentFeaturesDetails: Record<string, { title: string; text: string; stat: string }> = {
    dashboard: {
      title: "Real-time Command Hub",
      text: "Track gross written premiums, state-specific policy conversions, commission splits, and downline analytics in an ultra-crisp interface.",
      stat: "128% Avg Growth"
    },
    lead_gen: {
      title: "Omnichannel Lead Pipeline",
      text: "Direct integration with local home mortgage brokers and top auto dealers to channel high-intent exclusive leads to your agency pipeline.",
      stat: "+24 Lead flow/day"
    },
    automations: {
      title: "Zero-Touch CRM Automation",
      text: "Automatic multi-channel SMS, email follow-ups, dynamic policy renewal review prompts, and smart calendar syncs.",
      stat: "85% Saved Hours"
    }
  };

  return (
    <section className="bg-black py-16 md:py-24 border-t border-zinc-900" id="policy-review">
      <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-12">
        
        {/* PANEL 1: POLICY REVIEW ("ARE YOU COVERED?") - HORIZONTAL & RESPONSIVE */}
        <div className="bg-zinc-950 border border-zinc-900 p-8 md:p-10 rounded-2xl flex flex-col md:flex-row gap-8 relative overflow-hidden group shadow-2xl backdrop-blur-md text-left items-stretch">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#FAC000]" />
          <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-[#FAC000]/5 rounded-full blur-[120px] pointer-events-none group-hover:bg-[#FAC000]/10 transition-colors duration-500" />
          
          {/* Column 1: Title, Text & Footer Notes */}
          <div className="flex-1 flex flex-col justify-between space-y-6 z-10">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#FAC000]" />
                <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#FAC000] uppercase block">
                  ARE YOU COVERED?
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight uppercase font-sans" style={{ color: policy.titleColor || '#ffffff' }}>
                {policy.title || "ARE YOU COVERED?"}
              </h2>
              
              <p className="text-sm font-normal leading-relaxed max-w-xl" style={{ color: policy.bodyColor || 'rgb(161 161 170)' }}>
                {policy.body || "Upload your declarations pages and receive a personalized coverage review."}
              </p>
            </div>
            
            <div className="pt-4 border-t border-zinc-900/60 flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
              <span>Secure Connection</span>
              <span className="text-[#FAC000]">•</span>
              <span>100% Free Audit</span>
              <span className="text-[#FAC000]">•</span>
              <span>No Obligation</span>
            </div>
          </div>
          
          {/* Column 2: Checklist & CTA Button */}
          <div className="flex-1 flex flex-col justify-between space-y-6 md:border-l md:border-zinc-900 md:pl-8 z-10">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#FAC000]/10 border border-[#FAC000]/30 text-[#FAC000] mt-0.5 shrink-0">
                  <span className="text-xs font-bold font-mono">✓</span>
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-white tracking-wide uppercase font-mono">Identify Hazardous Coverage Gaps</p>
                  <p className="text-[11px] text-zinc-500">Ensure your limits are adjusted for inflation and actual liability exposure.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#FAC000]/10 border border-[#FAC000]/30 text-[#FAC000] mt-0.5 shrink-0">
                  <span className="text-xs font-bold font-mono">✓</span>
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-white tracking-wide uppercase font-mono">Stop Premium Leakages</p>
                  <p className="text-[11px] text-zinc-500">Locate overlapping coverages and unlock premium bulk affiliate discounts.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#FAC000]/10 border border-[#FAC000]/30 text-[#FAC000] mt-0.5 shrink-0">
                  <span className="text-xs font-bold font-mono">✓</span>
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-white tracking-wide uppercase font-mono">Enterprise Level Diagnostics</p>
                  <p className="text-[11px] text-zinc-500">Compare your policies with state-specific minimum guidelines automatically.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 font-mono">
              <a
                href={policy.externalUrl || "https://theinsuranceboss.com/policy-review"}
                target={(policy.externalUrl || "").startsWith("#") || (policy.externalUrl || "").startsWith("/") ? undefined : "_blank"}
                rel={(policy.externalUrl || "").startsWith("#") || (policy.externalUrl || "").startsWith("/") ? undefined : "noopener noreferrer"}
                className="w-full text-center block font-mono text-xs font-black tracking-widest py-4 bg-transparent text-[#FAC000] border-2 border-[#FAC000] hover:bg-[#FAC000] hover:text-black hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(250,192,0,0.3)] rounded-lg transition-all duration-300 md:text-sm uppercase"
              >
                {policy.btnText || "UPLOAD POLICY"} ↗
              </a>
            </div>
          </div>
        </div>

        {/* PANEL 2: FOR INSURANCE AGENTS ("BUILD A BIGGER AGENCY...") - HORIZONTAL & RESPONSIVE */}
        <div className="bg-zinc-950 border border-zinc-900 p-8 md:p-10 rounded-2xl flex flex-col md:flex-row gap-8 relative overflow-hidden shadow-2xl backdrop-blur-md text-left items-stretch" id="for-agents">
          
          {/* Column 1: Title, checklist and CTA button */}
          <div className="flex-1 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] block uppercase" style={{ color: agents.labelColor || config.accentColor }}>
                {agents.label || "FOR INSURANCE AGENTS"}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight uppercase font-sans" style={{ color: agents.titleColor || '#ffffff' }}>
                {agents.title || "BUILD A BIGGER AGENCY WITHOUT GUESSWORK"}
              </h2>

              {/* Checklist elements list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4">
                {(agents.items || [
                  "Agency Dashboard",
                  "Lead Generation",
                  "Social Media Management",
                  "Automation Systems",
                  "Web Design",
                  "Consulting",
                  "Recruiting"
                ]).map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#FAC000]/10 border border-[#FAC000]/30 text-[#FAC000]">
                      <span className="text-xs font-bold font-mono">✓</span>
                    </div>
                    <span className="text-xs font-bold text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 font-mono">
              <a
                href={agents.btnUrl || "#for-agents"}
                className="w-full md:w-auto inline-block text-center font-mono text-xs font-black tracking-widest py-4 px-8 bg-transparent text-[#FAC000] border-2 border-[#FAC000] hover:bg-[#FAC000] hover:text-black hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(250,192,0,0.3)] rounded transition-all duration-300 uppercase"
              >
                {agents.btnText || "SEE AGENT SERVICES"}
              </a>
            </div>
          </div>

          {/* Column 2: Interactive Laptop Dashboard simulator */}
          <div className="w-full md:w-[340px] shrink-0 bg-zinc-900/60 rounded-xl border border-zinc-850 p-4 relative overflow-hidden flex flex-col justify-between shadow-inner z-10">
            <div>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-3">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-widest">
                  THE INSURANCE BOSS COMMAND PANEL
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 mb-3 select-none">
                <button
                  onClick={() => setSelectedAgentTab("dashboard")}
                  className={`py-1.5 px-2 rounded font-mono text-[9px] uppercase tracking-wider text-center transition-all ${
                    selectedAgentTab === "dashboard"
                      ? "bg-[#FAC000] text-black font-extrabold"
                      : "bg-zinc-950 text-zinc-500 border border-zinc-900"
                  }`}
                >
                  DASHBOARD
                </button>
                <button
                  onClick={() => setSelectedAgentTab("lead_gen")}
                  className={`py-1.5 px-2 rounded font-mono text-[9px] uppercase tracking-wider text-center transition-all ${
                    selectedAgentTab === "lead_gen"
                      ? "bg-[#FAC000] text-black font-extrabold"
                      : "bg-zinc-950 text-zinc-500 border border-zinc-900"
                  }`}
                >
                  LEAD GEN
                </button>
                <button
                  onClick={() => setSelectedAgentTab("automations")}
                  className={`py-1.5 px-2 rounded font-mono text-[9px] uppercase tracking-wider text-center transition-all ${
                    selectedAgentTab === "automations"
                      ? "bg-[#FAC000] text-black font-extrabold"
                      : "bg-zinc-950 text-zinc-500 border border-zinc-900"
                  }`}
                >
                  AUTOMATIONS
                </button>
              </div>

              {/* Simulated Content Pane */}
              <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-900 space-y-2">
                <span className="text-[10px] font-mono font-bold text-zinc-650 uppercase tracking-widest flex items-center justify-between">
                  <span>{agentFeaturesDetails[selectedAgentTab].title}</span>
                  <span className="text-[#FAC000] bg-[#FAC000]/10 px-1.5 py-0.5 rounded font-extrabold">
                    {agentFeaturesDetails[selectedAgentTab].stat}
                  </span>
                </span>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  {agentFeaturesDetails[selectedAgentTab].text}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PANEL 3: INSURANCE TYPES BANNERS (5 COLUMNS SIDE-BY-SIDE) */}
        <InsuranceBanners config={config} />

      </div>
    </section>
  );
}
