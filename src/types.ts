export interface Subwebsite {
  label: string;
  url: string;
}

export interface SubwebsiteCategory {
  category: string;
  items: Subwebsite[];
}

export interface WebsiteConfig {
  logoText: string;
  logoUrl: string;
  phone: string;
  email: string;
  accentColor: string; // Dynamic hex color, default #FAC000
  fontScale: number; // multiplier for typography
  
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
