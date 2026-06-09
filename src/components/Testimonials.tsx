import React, { useState } from "react";
import { WebsiteConfig } from "../types";
import { Star } from "lucide-react";

interface TestimonialsProps {
  config: WebsiteConfig;
}

export default function Testimonials({ config }: TestimonialsProps) {
  const [activeTab, setActiveTab] = useState<"agents" | "clients">("agents");

  const testimonialsConfig = config.testimonials || {
    show: true,
    title: "Testimonials",
    subtitle: "Trusted by Professionals. Built for Families.",
    agentReviews: [
      {
        quote: "An absolute game-changer for my independent agency. Navigating complex Commercial Lines like Workers' Comp and complex Business Owner’s Policies used to take days of back-and-forth. Partnering with this team has completely streamlined our consulting workflow.",
        name: "Marcus Vance",
        role: "Principal Agent",
        location: "Chicago, IL",
        rating: 5
      },
      {
        quote: "The ultimate resource for policy strategy. As an agent, my clients look to me for bulletproof advice on Retirement and Investment scaling. The high-level support and consulting provided here have given me the tools to confidently build out complex 401k rollovers.",
        name: "Sarah Jenkins",
        role: "Insurance Consultant",
        location: "Atlanta, GA",
        rating: 5
      }
    ],
    clientReviews: [
      {
        category: "Life Insurance",
        quote: "Secured our family's financial future without the headache. We needed a complete approach to Term Life and Mortgage Protection. The consulting we received was completely transparent and highly professional.",
        name: "David & Amanda Collins",
        role: "Homeowners",
        location: "Austin, TX",
        rating: 5
      },
      {
        category: "Commercial Lines",
        quote: "They took the guesswork out of our commercial coverage. Setting up our General Liability and Commercial Property coverage for our new retail location felt overwhelming. They broke down every clause clearly.",
        name: "Robert Harrison",
        role: "Owner, Harrison Logistics",
        location: "Columbus, OH",
        rating: 5
      },
      {
        category: "Personal Lines",
        quote: "Fast, efficient, and genuinely complete. I originally reached out just to bundle my Auto Insurance and Landlord Dwelling policies, but they went above and beyond to audit my gaps—including adding Flood coverage.",
        name: "Megan Bradley",
        role: "Property Owner",
        location: "Tampa, FL",
        rating: 5
      }
    ]
  };

  const accentColor = config.accentColor || "#FAC000";
  const agentReviews = testimonialsConfig.agentReviews || [];
  const clientReviews = testimonialsConfig.clientReviews || [];

  return (
    <section className="bg-neutral-950 text-white py-16 md:py-24 border-t border-zinc-900" id="testimonials">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <h2 
            className="text-xs font-bold tracking-[0.25em] uppercase font-mono"
            style={{ color: testimonialsConfig.titleColor || accentColor }}
          >
            {testimonialsConfig.title || "TESTIMONIALS"}
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight uppercase font-sans" style={{ color: testimonialsConfig.subtitleColor || "#ffffff" }}>
            {testimonialsConfig.subtitle || "Trusted by Professionals. Built for Families."}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-neutral-900 p-1 rounded-lg border border-neutral-800 inline-flex shadow-inner select-none">
            <button
              onClick={() => setActiveTab("agents")}
              className="px-5 py-2.5 text-xs font-bold font-mono tracking-wider rounded transition-all duration-300 uppercase cursor-pointer"
              style={activeTab === "agents" ? {
                backgroundColor: accentColor,
                color: "#000000",
              } : {
                color: "#A3A3A3"
              }}
            >
              For Insurance Agents
            </button>
            <button
              onClick={() => setActiveTab("clients")}
              className="px-5 py-2.5 text-xs font-bold font-mono tracking-wider rounded transition-all duration-300 uppercase cursor-pointer"
              style={activeTab === "clients" ? {
                backgroundColor: accentColor,
                color: "#000000",
              } : {
                color: "#A3A3A3"
              }}
            >
              For Businesses & Families
            </button>
          </div>
        </div>

        {/* Dynamic Card Grids - Center alignment for B2B, full columns for B2C */}
        {activeTab === "agents" ? (
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto justify-center items-stretch">
            {agentReviews.map((review, index) => (
              <div 
                key={index} 
                className="bg-neutral-900/40 border border-neutral-850 p-6 md:p-8 rounded-2xl flex flex-col justify-between shadow-xl hover:border-neutral-800 transition-all duration-300 text-left"
              >
                <div className="space-y-4">
                  <div className="flex space-x-0.5 select-none">
                    {[...Array(review.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" style={{ color: accentColor }} />
                    ))}
                  </div>
                  <p className="leading-relaxed italic text-xs md:text-sm font-medium" style={{ color: testimonialsConfig.quoteColor || "rgb(209 213 219)" }}>
                    "{review.quote}"
                  </p>
                </div>
                
                <div className="mt-8 pt-4 border-t border-neutral-850/60 select-none">
                  <h4 className="font-bold text-sm" style={{ color: testimonialsConfig.authorColor || "rgb(243 243 243)" }}>{review.name}</h4>
                  <p className="text-[10px] text-neutral-400 mt-1 font-mono uppercase tracking-wider">
                    <span className="font-bold" style={{ color: accentColor }}>{review.role}</span> — {review.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-center items-stretch">
            {clientReviews.map((review, index) => (
              <div 
                key={index} 
                className="bg-neutral-900/40 border border-neutral-850 p-6 md:p-8 rounded-2xl flex flex-col justify-between shadow-xl hover:border-neutral-800 transition-all duration-300 text-left"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start select-none">
                    <div className="flex space-x-0.5">
                      {[...Array(review.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" style={{ color: accentColor }} />
                      ))}
                    </div>
                    {review.category && (
                      <span className="text-[9px] uppercase font-bold font-mono tracking-wider bg-neutral-950 text-neutral-400 px-2 py-0.5 rounded border border-neutral-800">
                        {review.category}
                      </span>
                    )}
                  </div>
                  <p className="leading-relaxed italic text-xs md:text-sm font-medium" style={{ color: testimonialsConfig.quoteColor || "rgb(209 213 219)" }}>
                    "{review.quote}"
                  </p>
                </div>
                
                <div className="mt-8 pt-4 border-t border-neutral-850/60 select-none">
                  <h4 className="font-bold text-sm" style={{ color: testimonialsConfig.authorColor || "rgb(243 243 243)" }}>{review.name}</h4>
                  <p className="text-[10px] text-neutral-400 mt-1 font-mono uppercase tracking-wider">
                    <span className="text-neutral-300 font-bold">{review.role}</span> — {review.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
