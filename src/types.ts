export interface Subwebsite {
  label: string;
  url: string;
}

export interface SubwebsiteCategory {
  category: string;
  items: Subwebsite[];
}

export interface SocialLink {
  icon: string;
  url: string;
}

export interface WebsiteConfig {
  logoText: string;
  logoUrl: string;
  phone: string;
  email: string;
  accentColor: string; // Dynamic hex color, default #FAC000
  fontScale: number; // multiplier for typography
  globalBackground: string;
  globalBackgroundImage?: string;
  buttonsHtml: string;
  socialLinks: SocialLink[];
  carriersBanner: {
    title: string;
    subtitle: string;
    logos: string[];
  };
  subwebsiteBanners: Record<string, {
    topBannerUrl: string;
    bottomBannerUrl: string;
    topHeight?: string;
    topFit?: "cover" | "contain" | "fill" | "tile";
    topPosition?: "center" | "top" | "bottom";
    bottomHeight?: string;
    bottomFit?: "cover" | "contain" | "fill" | "tile";
    bottomPosition?: "center" | "top" | "bottom";
  }>;
  fontFamilyPage?: Record<string, string>;
  fontFamilyCategory?: Record<string, string>;
  bannerTitleColor?: string;
  bannerTitleSize?: number;
  bannerTitleFont?: string;

  
  hero: {
    titleWhite: string;
    titleYellow: string;
    subtitle: string;
    keywords: string;
    supportingText: string;
    btnReviewText: string;
    btnReviewUrl: string;
    btnGrowText: string;
    btnGrowUrl: string;
    bgUrl: string;
  };
  
  pillars: {
    coverage: {
      title: string;
      description: string;
      items: string[];
      btnText: string;
      btnUrl: string;
    };
    agents: {
      title: string;
      description: string;
      btnText: string;
      btnUrl: string;
    };
    partners: {
      title: string;
      description: string;
      btnText: string;
      btnUrl: string;
    };
  };

  valueProps: {
    tagline: string;
    title: string;
    items: string[];
  };

  policyReview: {
    title: string;
    body: string;
    btnText: string;
    bgUrl: string;
    externalUrl: string;
  };

  biggerAgency: {
    label: string;
    title: string;
    items: string[];
    btnText: string;
    btnUrl: string;
    bgUrl: string;
  };

  innerCircle: {
    label: string;
    title: string;
    body: string;
    items: string[];
    btnText: string;
    btnUrl: string;
    bgUrl: string;
  };

  aboutBoss: {
    label: string;
    title: string;
    body: string;
    btnText: string;
    btnUrl: string;
    bgUrl: string;
  };

  subwebsites: SubwebsiteCategory[];
}
