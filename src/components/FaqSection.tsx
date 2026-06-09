import React, { useState } from "react";
import { WebsiteConfig } from "../types";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

interface FaqSectionProps {
  config: WebsiteConfig;
}

export default function FaqSection({ config }: FaqSectionProps) {
  const faqs = config.faqs || [];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (faqs.length === 0) return null;

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-black py-16 md:py-24 border-t border-zinc-900" id="faqs">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Centered Heading */}
        <div className="text-center space-y-3.5 mb-16 select-none">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase leading-none font-serif" style={{ color: config.faqTitleColor || config.accentColor || "#FAC000" }}>
            Frequently Asked Questions
          </h2>
          <p className="text-xs md:text-sm leading-relaxed font-sans font-medium" style={{ color: config.faqSubtitleColor || "rgb(161 161 170)" }}>
            Explore detailed insights on coverage strategy, risk consulting, and licensed partner networks
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;

            return (
              <div 
                key={idx}
                className="border border-zinc-900 bg-zinc-950/40 rounded-xl overflow-hidden hover:border-zinc-800 transition-all duration-300 shadow-lg"
              >
                {/* QUESTION BUTTON */}
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center p-5 text-left text-[#FAC000] hover:text-[#FAC000]/85 font-mono text-xs md:text-sm font-bold tracking-wide uppercase focus:outline-none select-none transition-colors"
                >
                  <span className="pr-4 leading-normal">{faq.question}</span>
                  <div className="shrink-0 text-[#FAC000] p-1 bg-[#FAC000]/10 border border-[#FAC000]/30 rounded-lg">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* ANSWER EXPANSION */}
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 border-t border-zinc-900/40" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="p-5 text-zinc-300 text-xs md:text-sm leading-relaxed font-sans font-medium whitespace-pre-wrap">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
