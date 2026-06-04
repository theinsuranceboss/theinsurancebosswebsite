import React, { useState } from "react";
import { WebsiteConfig } from "../types";
import { Check, ShieldCheck } from "lucide-react";

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
    <section className="bg-black py-16 md:py-24 border-t border-zinc-90 w border-zinc-900" id="policy-review">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT COLUMN: Policy Review Call-Out Banner */}
          <div className="bg-zinc-950 border border-zinc-900 p-8 md:p-10 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
            {/* Background Accent Gradient */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#FAC000]" />
            
            {/* Optional elegant graphical elements or glows */}
            <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-[#FAC000]/5 rounded-full blur-[120px] pointer-events-none group-hover:bg-[#FAC000]/10 transition-colors duration-500" />

            <div className="space-y-6 z-10">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#FAC000]" />
                <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-zinc-500 uppercase block">
                  INSURANCE AUDIT
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight uppercase">
                {policy.title || "ARE YOU COVERED?"}
              </h2>
              
              <p className="text-sm text-zinc-400 font-normal leading-relaxed">
                Most individuals, families, and business owners have serious gaps in their coverage limits or are overpaying on premiums. Review your declarations page instantly with our specialized diagnostic scanner tool.
              </p>

              {/* Core check points for the banner */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#FAC000]/10 border border-[#FAC000]/30 text-[#FAC000] mt-0.5 shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-white tracking-wide uppercase font-mono">Identify Hazardous Coverage Gaps</p>
                    <p className="text-[11px] text-zinc-500">Ensure your limits are adjusted for inflation and actual liability exposure.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#FAC000]/10 border border-[#FAC000]/30 text-[#FAC000] mt-0.5 shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-white tracking-wide uppercase font-mono">Stop Premium Leakages</p>
                    <p className="text-[11px] text-zinc-500">Locate overlapping coverages and unlock premium bulk affiliate discounts.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#FAC000]/10 border border-[#FAC000]/30 text-[#FAC000] mt-0.5 shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-white tracking-wide uppercase font-mono">Enterprise Level Diagnostics</p>
                    <p className="text-[11px] text-zinc-500">Compare your policies with state-specific minimum guidelines automatically.</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <a
                  href={policy.externalUrl || "https://theinsuranceboss.com/policy-review/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center block font-mono text-xs font-black tracking-widest py-4 bg-[#FAC000] text-black hover:bg-black hover:text-[#FAC000] border border-[#FAC000] rounded-lg transition-all duration-300 md:text-sm uppercase shadow-[0_4px_20px_rgba(250,192,0,0.15)] hover:shadow-[0_4px_30px_rgba(250,192,0,0.3)]"
                >
                  {policy.btnText || "START POLICY REVIEW"} ↗
                </a>
              </div>
            </div>

            {/* Bottom bar notes */}
            <div className="mt-8 pt-4 border-t border-zinc-90 w border-zinc-900 flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase tracking-wider z-10">
              <span>Secure Connection</span>
              <span className="text-[#FAC000]">•</span>
              <span>100% Free Audit</span>
              <span className="text-[#FAC000]">•</span>
              <span>No Obligation</span>
            </div>
          </div>

          {/* RIGHT COLUMN: For Insurance Agents (Checlist & Laptop Graphics) */}
          <div className="bg-zinc-950 border border-zinc-900 p-8 md:p-10 rounded-2xl flex flex-col justify-between relative overflow-hidden" id="for-agents">
            <div className="space-y-6">
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] block uppercase" style={{ color: config.accentColor }}>
                {agents.label}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {agents.title}
              </h2>

              {/* Checklist elements list from ref design */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4">
                {agents.items.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#FAC000]/10 border border-[#FAC000]/30 text-[#FAC000]">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-xs font-bold text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>

              {/* Interactive Laptop Dashboard simulator */}
              <div className="bg-zinc-900/60 rounded-xl border border-zinc-850 p-4 relative overflow-hidden mt-6 shadow-2xl">
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

            <div className="pt-6">
              <a
                href={agents.btnUrl}
                className="w-full text-center block font-mono text-xs font-extrabold tracking-wider py-4 bg-zinc-90 border border-zinc-800 text-zinc-100 hover:border-[#FAC000] rounded transition-all duration-300"
              >
                {agents.btnText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
