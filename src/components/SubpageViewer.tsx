import React, { useEffect } from "react";
import { WebsiteConfig } from "../types";
import { SUBWEBSITE_HTML_DATA, ParsedSubwebsite } from "../subwebsiteHtml";
import { getDirectImageUrl } from "./Header";
import { Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";

function getBannerStyle(url: string, fit?: string, position?: string): React.CSSProperties {
  const directUrl = getDirectImageUrl(url) || "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80&w=1920";
  const pos = position || "center";
  
  if (fit === "tile") {
    return {
      backgroundImage: `url(${directUrl})`,
      backgroundRepeat: "repeat",
      backgroundSize: "auto",
      backgroundPosition: pos,
    };
  } else if (fit === "contain") {
    return {
      backgroundImage: `url(${directUrl})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPosition: pos,
      backgroundColor: "#000000",
    };
  } else if (fit === "fill") {
    return {
      backgroundImage: `url(${directUrl})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% 100%",
      backgroundPosition: pos,
    };
  } else {
    // Default is "cover"
    return {
      backgroundImage: `url(${directUrl})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: pos,
    };
  }
}

interface SubpageViewerProps {
  label: string;
  config: WebsiteConfig;
}

export default function SubpageViewer({ label, config }: SubpageViewerProps) {
  // Try to find custom HTML data for this label
  const customData: ParsedSubwebsite | undefined = SUBWEBSITE_HTML_DATA[label];

  // Banner details from config
  const bannerConfig = config.subwebsiteBanners[label] || {
    topBannerUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80&w=1920",
    bottomBannerUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800"
  };

  // Get active font family for this subpage
  const getActiveFont = () => {
    if (config.fontFamilyPage && config.fontFamilyPage[label] && config.fontFamilyPage[label] !== "Default") {
      return config.fontFamilyPage[label];
    }
    const categoryObj = config.subwebsites.find((cat) =>
      cat.items.some((item) => item.label === label)
    );
    if (categoryObj && config.fontFamilyCategory && config.fontFamilyCategory[categoryObj.category] && config.fontFamilyCategory[categoryObj.category] !== "Default") {
      return config.fontFamilyCategory[categoryObj.category];
    }
    return "Default";
  };

  const activeFont = getActiveFont();
  const titleFont = config.bannerTitleFont || "Default";

  // Scroll to top when page changes and initialize animations/FAQs
  useEffect(() => {
    window.scrollTo(0, 0);

    const container = document.querySelector(".subpage-content");
    if (!container) return;

    // 1. FAQ Toggle functionality
    const faqItems = container.querySelectorAll(".faq-item, details");
    const handleFaqClick = (e: Event) => {
      const targetQuestion = e.currentTarget as HTMLElement;
      const targetItem = targetQuestion.closest(".faq-item") || targetQuestion.closest("details") || targetQuestion;
      if (!targetItem) return;

      faqItems.forEach((item) => {
        if (item !== targetItem) {
          item.classList.remove("active");
          if (item.tagName.toLowerCase() === 'details') {
            item.removeAttribute('open');
          }
        }
      });

      if (targetItem.tagName.toLowerCase() === 'details') {
        targetItem.classList.toggle("active");
      } else {
        targetItem.classList.toggle("active");
      }
    };

    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question") || item.querySelector(".faq-header") || item.querySelector("summary") || item;
      if (question && question !== item) {
        question.addEventListener("click", handleFaqClick);
      } else if (item.tagName.toLowerCase() === 'details') {
        const summary = item.querySelector("summary");
        if (summary) {
          summary.addEventListener("click", handleFaqClick);
        }
      } else {
        item.addEventListener("click", handleFaqClick);
      }
    });

    // 2. Counter animation function
    const startCounterAnim = (el: HTMLElement) => {
      const targetText = el.getAttribute("data-target-value") || el.getAttribute("data-target") || el.textContent || "";
      if (!targetText.trim()) return;

      // Extract numeric values (including optional decimals and commas)
      const numRegex = /([+-]?[0-9,]*\.?[0-9]+)/g;
      
      const numbers: number[] = [];
      const templates: string[] = [];
      const formatting: { hasCommas: boolean; isDecimal: boolean }[] = [];

      let lastIndex = 0;
      let match;

      const cleanNumberStr = (str: string) => str.replace(/,/g, "");

      while ((match = numRegex.exec(targetText)) !== null) {
        const matchStr = match[1];
        templates.push(targetText.substring(lastIndex, match.index));
        
        const cleanStr = cleanNumberStr(matchStr);
        const val = parseFloat(cleanStr);
        numbers.push(isNaN(val) ? 0 : val);
        
        formatting.push({
          hasCommas: matchStr.includes(","),
          isDecimal: cleanStr.includes(".")
        });
        
        lastIndex = numRegex.lastIndex;
      }
      templates.push(targetText.substring(lastIndex));

      if (numbers.length === 0) return;

      const getProgressText = (progress: number) => {
        let result = "";
        for (let i = 0; i < numbers.length; i++) {
          result += templates[i];
          const targetVal = numbers[i];
          const currentVal = targetVal * progress;
          
          let valStr = "";
          if (formatting[i].isDecimal) {
            valStr = currentVal.toFixed(1);
          } else {
            const rounded = Math.floor(currentVal);
            if (formatting[i].hasCommas) {
              valStr = rounded.toLocaleString("en-US");
            } else {
              valStr = rounded.toString();
            }
          }
          result += valStr;
        }
        result += templates[templates.length - 1];
        return result;
      };

      let startTime: number | null = null;
      const duration = 1500;
      
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        el.textContent = getProgressText(progress);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          el.textContent = targetText;
        }
      };
      
      requestAnimationFrame(animate);
    };

    // Pre-parse target values and set counters to 0 representation immediately on mount
    const statElements = container.querySelectorAll(".stat-number, .counter, .number");
    statElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      if (!htmlEl.getAttribute("data-target-value")) {
        const prefix = htmlEl.getAttribute("data-prefix") || "";
        const suffix = htmlEl.getAttribute("data-suffix") || "";
        const targetVal = htmlEl.getAttribute("data-target");
        let originalText = "";
        if (targetVal) {
          originalText = prefix + targetVal + suffix;
        } else {
          originalText = htmlEl.textContent || "";
        }
        htmlEl.setAttribute("data-target-value", originalText);
        
        // Replace all numeric groups with 0 for initial state representation
        const numRegex = /([+-]?[0-9,]*\.?[0-9]+)/g;
        const zeroedText = originalText.replace(numRegex, "0");
        htmlEl.textContent = zeroedText;
      }
    });

    // 3. Scroll Visibility Check and Animation triggers (IntersectionObserver + Scroll event fallback)
    const observerOptions = {
      threshold: 0.01,
      rootMargin: "0px 0px 50px 0px",
    };

    // Animation trigger helper
    const triggerItemAnimation = (targetEl: HTMLElement) => {
      targetEl.classList.add("animated");
      targetEl.classList.add("animate");
      targetEl.classList.add("visible");

      // Trigger nested stats
      const stats = targetEl.querySelectorAll(".stat-number, .counter, .number");
      stats.forEach((stat) => {
        const el = stat as HTMLElement;
        if (!el.classList.contains("counted")) {
          el.classList.add("counted");
          startCounterAnim(el);
        }
      });

      // Trigger stats directly on the animated element
      if (targetEl.classList.contains("stat-number") || targetEl.classList.contains("counter") || targetEl.classList.contains("number")) {
        if (!targetEl.classList.contains("counted")) {
          targetEl.classList.add("counted");
          startCounterAnim(targetEl);
        }
      }

      // Apply fallback animations only to utility classes if they don't have custom ones
      if (targetEl.classList.contains("stats-section") || targetEl.classList.contains("animate-on-scroll")) {
        if (!targetEl.style.animation) {
          targetEl.style.animation = "fadeInUp 0.8s ease-out forwards";
        }
      } else if (targetEl.classList.contains("animate-fade")) {
        if (!targetEl.style.animation) {
          targetEl.style.animation = "fadeIn 1s ease-out forwards";
        }
      }
    };

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          triggerItemAnimation(entry.target as HTMLElement);
        }
      });
    }, observerOptions);

    // Observe elements
    const animElements = container.querySelectorAll([
      ".animate-on-scroll",
      ".animate-fade",
      ".section-title",
      ".section-subtitle",
      ".section-intro",
      ".insurance-card",
      ".investment-card",
      ".feature-item",
      ".faq-item",
      ".stat-number",
      ".counter",
      ".number",
      ".stats-section",
      ".value-card",
      ".stat-box",
      ".testimonial",
      ".problem-box",
      ".solution-box",
      ".annuity-card",
      ".benefit-item",
      ".type-item",
      ".feature-card",
      ".comparison-card",
      ".expense-card",
      ".scenario-item",
      ".coverage-card",
      ".info-box",
      ".critical-card",
      ".stats-banner",
      ".warning-box",
      ".process-step",
      ".contact-banner",
      ".comparison-table",
      ".how-works-content",
      ".risk-section",
      ".risk-stat-box",
      ".card",
      ".stat-item",
      ".price-box",
      ".two-column > div",
      ".highlight-box",
      ".cta-button"
    ].join(", "));

    animElements.forEach((el) => {
      observer.observe(el);
    });

    // Scroll Fallback handler (ensures animation runs even in sandboxes or iframe scrolls)
    const checkVisibilityAndAnimate = () => {
      animElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const isStat = htmlEl.classList.contains("stat-number") || htmlEl.classList.contains("counter") || htmlEl.classList.contains("number");
        const isAnimated = htmlEl.classList.contains("animated");
        const isCounted = htmlEl.classList.contains("counted");

        if ((isStat && !isCounted) || (!isStat && !isAnimated)) {
          const rect = htmlEl.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight + 50 && rect.bottom >= -50;
          if (isVisible) {
            triggerItemAnimation(htmlEl);
          }
        }
      });
    };

    window.addEventListener("scroll", checkVisibilityAndAnimate);
    window.addEventListener("resize", checkVisibilityAndAnimate);
    
    // Execute once initially to catch elements already visible in viewport
    setTimeout(checkVisibilityAndAnimate, 100);

    // Cleanup functions
    return () => {
      faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question") || item.querySelector(".faq-header") || item.querySelector("summary") || item;
        if (question && question !== item) {
          question.removeEventListener("click", handleFaqClick);
        } else if (item.tagName.toLowerCase() === 'details') {
          const summary = item.querySelector("summary");
          if (summary) {
            summary.removeEventListener("click", handleFaqClick);
          }
        } else {
          item.removeEventListener("click", handleFaqClick);
        }
      });
      observer.disconnect();
      window.removeEventListener("scroll", checkVisibilityAndAnimate);
      window.removeEventListener("resize", checkVisibilityAndAnimate);
    };
  }, [label, customData]);

  // Fallback layout when there is no custom HTML file downloaded for this subwebsite
  const renderFallback = () => {
    return (
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-[#FAC000] font-mono mb-6 uppercase tracking-widest animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          Specialty Coverage Solution
        </div>
        <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-wider mb-6">
          Drive Protection and Security
        </h2>
        <p className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-12">
          We shop quotes among the nation's leading A-rated insurance companies for optimal pricing and tailored limits.
        </p>

        {/* Dynamic features list to fill space elegantly */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="bg-zinc-900/40 border border-zinc-900 hover:border-[#FAC000]/40 rounded-xl p-6 transition-all duration-300">
            <CheckCircle2 className="w-8 h-8 text-[#FAC000] mb-4" />
            <h3 className="text-sm font-bold text-white uppercase mb-2">Tailored Protection</h3>
            <p className="text-zinc-500 text-xs leading-relaxed">Coverage limits specifically modeled to cover your unique personal or business risk profile.</p>
          </div>
          <div className="bg-zinc-900/40 border border-zinc-900 hover:border-[#FAC000]/40 rounded-xl p-6 transition-all duration-300">
            <ShieldCheck className="w-8 h-8 text-[#FAC000] mb-4" />
            <h3 className="text-sm font-bold text-white uppercase mb-2">Carrier Network</h3>
            <p className="text-zinc-500 text-xs leading-relaxed">We shop quotes among the nation's leading A-rated insurance companies for optimal pricing.</p>
          </div>
          <div className="bg-zinc-900/40 border border-zinc-900 hover:border-[#FAC000]/40 rounded-xl p-6 transition-all duration-300">
            <Sparkles className="w-8 h-8 text-[#FAC000] mb-4" />
            <h3 className="text-sm font-bold text-white uppercase mb-2">Fast Approvals</h3>
            <p className="text-zinc-500 text-xs leading-relaxed">Digital binding processes ensure you are covered instantly without unnecessary delays.</p>
          </div>
        </div>
      </div>
    );
  };

  const getSubpageDescription = () => {
    if (customData?.description) return customData.description;
    
    // Default tailored subtitles based on the page name
    if (label.includes("Life")) return "Protect Your Family's Future and Financial Security";
    if (label.includes("Auto")) return "Smart Ways to Reduce Your Premium and Stay Covered";
    if (label.includes("Retirement") || label.includes("Annuities") || label.includes("Savings")) return "Build Wealth and Secure a Stable Income for Life";
    
    return "Protect Your Family's Future and Financial Security";
  };

  const activeTitle = bannerConfig.titleText !== undefined && bannerConfig.titleText !== "" 
    ? bannerConfig.titleText 
    : label;
    
  const activeSubtitle = bannerConfig.subtitleText !== undefined && bannerConfig.subtitleText !== "" 
    ? bannerConfig.subtitleText 
    : getSubpageDescription();

  const align = bannerConfig.align || "center";
  const alignContainerClass = align === "left" 
    ? "text-left items-start" 
    : align === "right" 
      ? "text-right items-end" 
      : "text-center items-center";

  const titleColor = bannerConfig.titleColor || config.bannerTitleColor || "#FAC000";
  const titleSize = bannerConfig.titleSize || config.bannerTitleSize || 48;
  const subtitleColor = bannerConfig.subtitleColor || "#D4D4D8"; // zinc-300
  const subtitleSize = bannerConfig.subtitleSize || 16; // md:text-base (16px)
  
  const safeLabelClass = label.replace(/[^a-zA-Z0-9-]/g, '-');

  return (
    <div className="min-h-screen text-white transition-colors">
      {/* DYNAMIC FONT LINK INJECTION */}
      {activeFont !== "Default" && (
        <>
          <link
            rel="stylesheet"
            href={`https://fonts.googleapis.com/css2?family=${encodeURIComponent(activeFont)}:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap`}
          />
          <style dangerouslySetInnerHTML={{ __html: `
            .subpage-content, 
            .subpage-content *, 
            .subpage-content p, 
            .subpage-content span, 
            .subpage-content h1, 
            .subpage-content h2, 
            .subpage-content h3, 
            .subpage-content h4, 
            .subpage-content h5, 
            .subpage-content h6, 
            .subpage-content a, 
            .subpage-content li, 
            .subpage-content input, 
            .subpage-content button, 
            .subpage-content select, 
            .subpage-content textarea, 
            .subpage-content div {
              font-family: '${activeFont}', var(--font-sans), sans-serif !important;
            }
          `}} />
        </>
      )}

      {titleFont !== "Default" && titleFont !== activeFont && (
        <link
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css2?family=${encodeURIComponent(titleFont)}:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap`}
        />
      )}

      {/* DYNAMIC BANNER TITLE STYLING OVERRIDES */}
      <style dangerouslySetInnerHTML={{ __html: `
        .banner-title {
          color: ${config.bannerTitleColor || "#FAC000"} !important;
          font-family: ${titleFont !== "Default" ? `'${titleFont}', sans-serif` : "inherit"} !important;
          font-size: ${config.bannerTitleSize ? `${config.bannerTitleSize * 0.6}px` : "24px"} !important;
        }
        @media (min-width: 640px) {
          .banner-title {
            font-size: ${config.bannerTitleSize ? `${config.bannerTitleSize * 0.8}px` : "36px"} !important;
          }
        }
        @media (min-width: 1024px) {
          .banner-title {
            font-size: ${config.bannerTitleSize ? `${config.bannerTitleSize}px` : "48px"} !important;
          }
        }

        /* Scope-override custom HTML background styling to preserve transparency and match global settings */
        .subpage-content section,
        .subpage-content .social-proof-section,
        .subpage-content .benefits-section,
        .subpage-content .risk-section,
        .subpage-content .content-section,
        .subpage-content .hero-section,
        .subpage-content .how-works-section,
        .subpage-content .faq-section,
        .subpage-content .value-prop-section,
        .subpage-content .annuity-types-section,
        .subpage-content .cta-section,
        .subpage-content .features-section,
        .subpage-content .expenses-section,
        .subpage-content .comparison-section,
        .subpage-content .grid-3-col,
        .subpage-content .grid-2-col,
        .subpage-content .container {
          background: transparent !important;
          background-color: transparent !important;
        }

        .subpage-content .insurance-card,
        .subpage-content .value-card,
        .subpage-content .annuity-card,
        .subpage-content .feature-card,
        .subpage-content .expense-card,
        .subpage-content .testimonial,
        .subpage-content .process-step,
        .subpage-content .faq-item,
        .subpage-content .faq-header,
        .subpage-content .how-works-content,
        .subpage-content .benefit-item,
        .subpage-content .stat-box,
        .subpage-content .comparison-card,
        .subpage-content .feature-item,
        .subpage-content .problem-box,
        .subpage-content .solution-box {
          background: rgba(255, 255, 255, 0.03) !important;
          background-color: rgba(255, 255, 255, 0.03) !important;
        }

        .subpage-content .faq-answer {
          background: transparent !important;
          background-color: transparent !important;
        }

        .subpage-content table,
        .subpage-content tr,
        .subpage-content th,
        .subpage-content td {
          background: transparent !important;
          background-color: transparent !important;
        }

        /* Center the description/intro text after the first title/heading in all custom subpages */
        .subpage-content .hero-section .subtitle,
        .subpage-content .hero-content .subtitle,
        .subpage-content .hero .hero-content p,
        .subpage-content .section-header p,
        .subpage-content .section-intro,
        .subpage-content .how-it-works-section .section-header p,
        .subpage-content .how-works-section .section-header p {
          text-align: center !important;
          max-width: 900px !important;
          margin-left: auto !important;
          margin-right: auto !important;
          display: block !important;
        }
      `}} />

      {/* TOP IMAGE HERO BANNER (BIGGER HEIGHT WITH TITLE, DESCRIPTION, AND BUTTONS) */}
      <div 
        className="relative pt-24 pb-8 sm:pt-32 sm:pb-12 md:pt-40 md:pb-16 w-full overflow-hidden flex items-center justify-center px-4"
        style={{
          minHeight: bannerConfig.topHeight || "380px"
        }}
      >
        <div 
          className="absolute inset-0 w-full h-full animate-fade-in"
          style={getBannerStyle(bannerConfig.topBannerUrl, bannerConfig.topFit, bannerConfig.topPosition)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 to-transparent" />
        
        {/* Dynamic style tag for responsive sizes of this specific page's banner */}
        <style dangerouslySetInnerHTML={{ __html: `
          .page-banner-title-${safeLabelClass} {
            color: ${titleColor} !important;
            font-family: ${titleFont !== "Default" ? `'${titleFont}', sans-serif` : "inherit"} !important;
            font-size: ${titleSize * 0.6}px !important;
            text-align: ${align} !important;
          }
          @media (min-width: 640px) {
            .page-banner-title-${safeLabelClass} {
              font-size: ${titleSize * 0.8}px !important;
            }
          }
          @media (min-width: 1024px) {
            .page-banner-title-${safeLabelClass} {
              font-size: ${titleSize}px !important;
            }
          }
          
          .page-banner-subtitle-${safeLabelClass} {
            color: ${subtitleColor} !important;
            font-size: ${subtitleSize * 0.85}px !important;
            text-align: ${align} !important;
          }
          @media (min-width: 640px) {
            .page-banner-subtitle-${safeLabelClass} {
              font-size: ${subtitleSize}px !important;
            }
          }
        `}} />

        <div className="relative z-10 max-w-4xl w-full">
          <div className={`bg-transparent px-5 sm:px-8 md:px-12 py-8 md:py-10 flex flex-col justify-center font-sans ${alignContainerClass} w-full`}>
            <h1 className={`page-banner-title-${safeLabelClass} font-black uppercase tracking-wider mb-4 drop-shadow-md leading-tight`}>
              {activeTitle}
            </h1>
            <p className={`page-banner-subtitle-${safeLabelClass} text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed mb-6 font-medium`}>
              {activeSubtitle}
            </p>
            {/* Action buttons embedded directly inside the banner */}
            {config.buttonsHtml && (
              <div className={`w-full flex ${align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center'} font-mono`} dangerouslySetInnerHTML={{ __html: config.buttonsHtml }} />
            )}
          </div>
        </div>
      </div>

      {/* CUSTOM STYLE INJECTION (prevent styling leaks by prefixing) */}
      {customData && customData.css && (
        <style dangerouslySetInnerHTML={{ __html: customData.css }} />
      )}

      {/* BODY CONTENT CONTAINER */}
      <div className="subpage-content py-10">
        {customData && customData.html ? (
          <div dangerouslySetInnerHTML={{ __html: customData.html }} />
        ) : (
          renderFallback()
        )}
      </div>

      {/* BOTTOM IMAGE HERO BANNER (MATCHES TOP BANNER DESIGN, RESPONSIVE, BRIGHT IMAGE) */}
      {bannerConfig.bottomBannerUrl && (
        <div 
          className="relative py-8 sm:py-12 md:py-16 w-full overflow-hidden flex items-center justify-center border-t border-zinc-900 px-4"
          style={{
            minHeight: bannerConfig.bottomHeight || "380px"
          }}
        >
          <div 
            className="absolute inset-0 w-full h-full animate-fade-in"
            style={getBannerStyle(bannerConfig.bottomBannerUrl, bannerConfig.bottomFit, bannerConfig.bottomPosition)}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/90 to-transparent" />
          <div className="relative z-10 max-w-3xl w-full">
            <div className="text-center bg-transparent px-5 sm:px-8 md:px-12 py-8 md:py-10 flex flex-col items-center justify-center font-sans">
              <h3 className="banner-title font-black uppercase tracking-wider mb-6 drop-shadow-md leading-tight">
                READY TO SECURE YOUR COVERAGE?
              </h3>
              {/* Action buttons embedded directly inside the bottom banner */}
              {config.buttonsHtml && (
                <div className="w-full flex justify-center font-mono" dangerouslySetInnerHTML={{ __html: config.buttonsHtml }} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
