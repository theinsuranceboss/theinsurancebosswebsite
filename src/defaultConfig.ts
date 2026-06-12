import { WebsiteConfig } from "./types";
import { DEFAULT_BUTTONS_HTML } from "./subwebsiteHtml";

export const DEFAULT_CONFIG: WebsiteConfig = {
  "logoText": "THE INSURANCE BOSS",
  "logoUrl": "https://lh3.googleusercontent.com/d/1Lr3oT5chJbkjpbHTHW8f-A32Achcby6v",
  "phone": "732-COVERED (268-3373)",
  "email": "info@theinsuranceboss.com",
  "accentColor": "#FAC000",
  "fontScale": 1,
  "globalBackground": "#000000",
  "globalBackgroundImage": "https://lh3.googleusercontent.com/d/1FHp1j4D8MPh5fUnCoZIFSe2lIKQc61ni",
  "buttonsHtml": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  /* Contenedor principal centrado */\n  .boss-button-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 15px; /* Espacio moderado entre botones */\n    padding: 20px 10px;\n    width: 100%;\n    flex-wrap: wrap;\n    font-family: 'Arial', sans-serif;\n  }\n\n  .btn-boss-medium {\n    /* Fondo transparente y borde amarillo de 2px */\n    background-color: transparent;\n    border: 2px solid #FFD700;\n    color: #FFD700;\n    \n    /* Tama\\u00f1o MEDIO */\n    padding: 12px 28px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    \n    /* Est\\u00e9tica y suavidad */\n    border-radius: 6px;\n    transition: all 0.3s ease;\n    cursor: pointer;\n    min-width: 200px; /* Ancho consistente para ambos */\n  }\n\n  /* Efecto al pasar el mouse */\n  .btn-boss-medium:hover {\n    background-color: #FFD700;\n    color: #000000;\n    transform: translateY(-2px);\n    box-shadow: 0px 4px 10px rgba(255, 215, 0, 0.3);\n  }\n\n  /* Ajuste para m\\u00f3viles */\n  @media (max-width: 480px) {\n    .btn-boss-medium {\n      width: 90%;\n      min-width: unset;\n    }\n  }\n</style>\n</head>\n<body>\n\n  <div class=\"boss-button-container\">\n    <a href=\"https://theinsuranceboss.com/contact/\" class=\"btn-boss-medium\">\n      Speak with the boss\n    </a>\n\n    <a href=\"https://theinsuranceboss.com/get-an-auto-quote/\" class=\"btn-boss-medium\">\n      Get a Quote\n    </a>\n  </div>\n\n</body>\n</html>",
  "hideChatbot": false,
  "chatbotGeminiKey": "AIzaSyCu20SwPp_WGo5TZ03J-B11c3dOlhqbs8M",
  "chatbotSlackWebhook": "",
  "metrics": {
    "show": true,
    "title": "BENEFITS & METRICS",
    "stabilityLabel": "SYSTEM STABILITY",
    "stabilityStatus": "ACTIVE",
    "items": [
      {
        "title": "MAXIMUM SECURITY",
        "description": "Multi-million-dollar coverage configurations designed to save costs and reduce vulnerabilities.",
        "icon": "shield"
      },
      {
        "title": "AGENCY SCALE SYSTEM",
        "description": "Premium lead-gen pipelines, recruitment automation, and social media dashboards.",
        "icon": "target"
      },
      {
        "title": "INVESTMENT GROWTH",
        "description": "Partner with our multi-business network. Elevate referral revenue channels today.",
        "icon": "award"
      }
    ]
  },
  "socialLinks": [
    {
      "icon": "facebook",
      "url": "https://facebook.com"
    },
    {
      "icon": "instagram",
      "url": "https://instagram.com"
    },
    {
      "icon": "linkedin",
      "url": "https://linkedin.com"
    },
    {
      "icon": "youtube",
      "url": "https://youtube.com"
    }
  ],
  "carriersBanner": {
    "title": "We Work with the Most Trusted Insurance Carriers",
    "subtitle": "We team up with the nation's most respected insurance companies to make sure you're protected by names you can trust.",
    "speed": 25,
    "personalLogos": [
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036455138_jng3sy0sgeb.png",
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036455139_7g49xjnuoe4.png",
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036455140_lso2dwx5eg.png",
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036455140_r3yn9h58p4d.png",
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036455141_q87lugb2mjq.png",
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036455141_esn5hpcdwj9.png",
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036455142_lcbfwvbs5lf.png",
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036455143_wmh1wka049.png",
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036455143_4frtb24ocva.png",
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036455144_kvltx6m77r.jpg",
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036455144_8u05sk2btdm.png",
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036455145_n36kyukgch8.webp",
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036455145_l9g2f0ldrfn.png",
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036455146_txndwonoefk.png"
    ],
    "commercialLogos": [
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036471710_rq1oico12wa.png",
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036471711_e33yrb7jyyu.png",
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036471711_i53d0o1xa7.png",
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036471712_c9xwcndzit6.png",
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036471712_mqcbncrkqs.png",
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036471713_lj5wd3wjpao.png",
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036471716_sqyazmjz8e.png",
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036471718_8kdsd5qzgsr.png",
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036471719_hs3sqr5hylg.png",
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036471720_3q1854l57r4.png",
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036471720_q4tk1ppjcq.png",
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036471721_tcyh1sar7u.png",
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036471722_37iw2de7e3h.png",
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036471722_a0y60boii1.png",
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036471723_poyucuas55l.jpg",
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036471723_qld1odixvn.png"
    ],
    "lifeLogos": [
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036484567_v7ek4dm0nr.webp",
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036484568_476mg9b9sdf.png",
      "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781036484569_vxwwzkara0p.jpg"
    ]
  },
  "fontFamilyPage": {},
  "fontFamilyCategory": {},
  "bannerTitleColor": "#FAC000",
  "bannerTitleSize": 48,
  "bannerTitleFont": "Default",
  "subwebsiteBanners": {
    "Auto Insurance": {
      "topBannerUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781119637300_kr20es4uva.png",
      "bottomBannerUrl": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
      "titleText": "Coverage that keeps you moving.",
      "subtitleText": "Smarter protection for real‑world driving built around your car, your commute, and your budget.",
      "buttonsHtml": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  /* Contenedor principal centrado */\n  .boss-button-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 15px; /* Espacio moderado entre botones */\n    padding: 20px 10px;\n    width: 100%;\n    flex-wrap: wrap;\n    font-family: 'Arial', sans-serif;\n  }\n\n  .btn-boss-medium {\n    /* Fondo transparente y borde amarillo de 2px */\n    background-color: transparent;\n    border: 2px solid #FFD700;\n    color: #FFD700;\n    \n    /* Tamaño MEDIO */\n    padding: 12px 28px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    \n    /* Estética y suavidad */\n    border-radius: 6px;\n    transition: all 0.3s ease;\n    cursor: pointer;\n    min-width: 200px; /* Ancho consistente para ambos */\n  }\n\n  /* Efecto al pasar el mouse */\n  .btn-boss-medium:hover {\n    background-color: #FFD700;\n    color: #000000;\n    transform: translateY(-2px);\n    box-shadow: 0px 4px 10px rgba(255, 215, 0, 0.3);\n  }\n\n  /* Ajuste para móviles */\n  @media (max-width: 480px) {\n    .btn-boss-medium {\n      width: 90%;\n      min-width: unset;\n    }\n  }\n</style>\n</head>\n<body>\n\n  <div class=\"boss-button-container\">\n    <a href=\"https://theinsuranceboss.com/contact/\" class=\"btn-boss-medium\">\n      Speak with the boss\n    </a>\n\n    <a href=\"https://theinsuranceboss.com/get-an-auto-quote/\" class=\"btn-boss-medium\">\n      Get a Quote\n    </a>\n  </div>\n\n</body>\n</html>",
      "topHeight": "1200px",
      "topFit": "fill",
      "bottomHeight": "1200px"
    },
    "Homeowners Insurance": {
      "topBannerUrl": "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=800",
      "bottomBannerUrl": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800"
    },
    "Personal Lines Main": {
      "topBannerUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781119187685_od5u015az2j.png",
      "bottomBannerUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781040668860_yc8eztz6cuq.jpeg",
      "topHeight": "1200px",
      "buttonsHtml": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  /* Contenedor principal centrado */\n  .boss-button-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 15px; \n    padding: 20px 10px;\n    width: 100%;\n    flex-wrap: wrap;\n    font-family: 'Arial', sans-serif;\n  }\n\n  .btn-boss-medium {\n    /* Fondo transparente y borde amarillo de 2px */\n    background-color: transparent;\n    border: 2px solid #FFD700;\n    color: #FFD700;\n    \n    /* Tamaño MEDIO */\n    padding: 12px 28px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    \n    /* Estética y suavidad */\n    border-radius: 6px;\n    transition: all 0.3s ease;\n    cursor: pointer;\n    min-width: 200px;\n  }\n\n  /* Efecto al pasar el mouse */\n  .btn-boss-medium:hover {\n    background-color: #FFD700;\n    color: #000000;\n    transform: translateY(-2px);\n    box-shadow: 0px 4px 10px rgba(255, 215, 0, 0.3);\n  }\n\n  /* Ajuste para móviles */\n  @media (max-width: 480px) {\n    .btn-boss-medium {\n      width: 90%;\n      min-width: unset;\n    }\n  }\n</style>\n</head>\n<body>\n\n  <div class=\"boss-button-container\">\n    <a href=\"https://theinsuranceboss.com/contact/\" class=\"btn-boss-medium\">\n      Speak with the boss\n    </a>\n\n    <a href=\"https://theinsuranceboss.com/get-a-quote/\" class=\"btn-boss-medium\">\n      Get a Quote\n    </a>\n  </div>\n\n</body>\n</html>",
      "bottomHeight": "1200px",
      "titleText": "Personal Lines Insurance",
      "subtitleText": "Complete Protection for Your Home, Vehicles, and Personal Assets"
    },
    "Umbrella Insurance": {
      "topBannerUrl": "https://images.unsplash.com/photo-1527239441953-caffd968d952?auto=format&fit=crop&q=80&w=800",
      "bottomBannerUrl": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800"
    },
    "Landlord Dwelling": {
      "topBannerUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781119676754_ohu8wnne.png",
      "bottomBannerUrl": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
      "titleText": "Protect Your Investment While You Sleep",
      "subtitleText": "Landlord insurance that covers property damage, liability claims, and loss of rental income helping your investment property stay profitable no matter what happens.",
      "topHeight": "1200px",
      "buttonsHtml": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  /* Contenedor principal centrado */\n  .boss-button-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 15px; \n    padding: 20px 10px;\n    width: 100%;\n    flex-wrap: wrap;\n    font-family: 'Arial', sans-serif;\n  }\n\n  .btn-boss-medium {\n    /* Fondo transparente y borde amarillo de 2px */\n    background-color: transparent;\n    border: 2px solid #FFD700;\n    color: #FFD700;\n    \n    /* Tamaño MEDIO */\n    padding: 12px 28px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    \n    /* Estética y suavidad */\n    border-radius: 6px;\n    transition: all 0.3s ease;\n    cursor: pointer;\n    min-width: 200px;\n  }\n\n  /* Efecto al pasar el mouse */\n  .btn-boss-medium:hover {\n    background-color: #FFD700;\n    color: #000000;\n    transform: translateY(-2px);\n    box-shadow: 0px 4px 10px rgba(255, 215, 0, 0.3);\n  }\n\n  /* Ajuste para móviles */\n  @media (max-width: 480px) {\n    .btn-boss-medium {\n      width: 90%;\n      min-width: unset;\n    }\n  }\n</style>\n</head>\n<body>\n\n  <div class=\"boss-button-container\">\n    <a href=\"https://theinsuranceboss.com/contact/\" class=\"btn-boss-medium\">\n      Speak with the boss\n    </a>\n\n    <a href=\"https://theinsuranceboss.com/get-a-quote/\" class=\"btn-boss-medium\">\n      Get a Quote\n    </a>\n  </div>\n\n</body>\n</html>",
      "bottomHeight": "1200px"
    },
    "Flood": {
      "topBannerUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781119699232_gw7191xxaln.png",
      "bottomBannerUrl": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
      "titleText": "Flood Insurance Protection",
      "subtitleText": "Standard Homeowners Policies DON’T Cover Floods Get Protected Today",
      "buttonsHtml": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  /* Contenedor principal centrado */\n  .boss-button-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 15px; \n    padding: 20px 10px;\n    width: 100%;\n    flex-wrap: wrap;\n    font-family: 'Arial', sans-serif;\n  }\n\n  .btn-boss-medium {\n    /* Fondo transparente y borde amarillo de 2px */\n    background-color: transparent;\n    border: 2px solid #FFD700;\n    color: #FFD700;\n    \n    /* Tamaño MEDIO */\n    padding: 12px 28px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    \n    /* Estética y suavidad */\n    border-radius: 6px;\n    transition: all 0.3s ease;\n    cursor: pointer;\n    min-width: 200px;\n  }\n\n  /* Efecto al pasar el mouse */\n  .btn-boss-medium:hover {\n    background-color: #FFD700;\n    color: #000000;\n    transform: translateY(-2px);\n    box-shadow: 0px 4px 10px rgba(255, 215, 0, 0.3);\n  }\n\n  /* Ajuste para móviles */\n  @media (max-width: 480px) {\n    .btn-boss-medium {\n      width: 90%;\n      min-width: unset;\n    }\n  }\n</style>\n</head>\n<body>\n\n  <div class=\"boss-button-container\">\n    <a href=\"https://theinsuranceboss.com/contact/\" class=\"btn-boss-medium\">\n      Speak with the boss\n    </a>\n\n    <a href=\"https://theinsuranceboss.com/get-a-quote/\" class=\"btn-boss-medium\">\n      Get a Quote\n    </a>\n  </div>\n\n</body>\n</html>",
      "topHeight": "1200px",
      "topFit": "center",
      "bottomHeight": "1200px"
    },
    "Specialty Vehicles": {
      "topBannerUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781119730281_ljihs7j8j.png",
      "bottomBannerUrl": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
      "titleText": "Specialty Vehicle Insurance Protection",
      "subtitleText": "Your specialty vehicles deserve more than basic coverage. RVs, classic cars, motorcycles, boats, and exotic vehicles need protection designed specifically for their unique value and risks.",
      "topHeight": "1200px",
      "buttonsHtml": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  /* Contenedor principal centrado */\n  .boss-button-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 15px; /* Espacio moderado entre botones */\n    padding: 20px 10px;\n    width: 100%;\n    flex-wrap: wrap;\n    font-family: 'Arial', sans-serif;\n  }\n\n  .btn-boss-medium {\n    /* Fondo transparente y borde amarillo de 2px */\n    background-color: transparent;\n    border: 2px solid #FFD700;\n    color: #FFD700;\n    \n    /* Tamaño MEDIO */\n    padding: 12px 28px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    \n    /* Estética y suavidad */\n    border-radius: 6px;\n    transition: all 0.3s ease;\n    cursor: pointer;\n    min-width: 200px; /* Ancho consistente para ambos */\n  }\n\n  /* Efecto al pasar el mouse */\n  .btn-boss-medium:hover {\n    background-color: #FFD700;\n    color: #000000;\n    transform: translateY(-2px);\n    box-shadow: 0px 4px 10px rgba(255, 215, 0, 0.3);\n  }\n\n  /* Ajuste para móviles */\n  @media (max-width: 480px) {\n    .btn-boss-medium {\n      width: 90%;\n      min-width: unset;\n    }\n  }\n</style>\n</head>\n<body>\n\n  <div class=\"boss-button-container\">\n    <a href=\"https://theinsuranceboss.com/contact/\" class=\"btn-boss-medium\">\n      Speak with the boss\n    </a>\n\n    <a href=\"https://theinsuranceboss.com/get-an-auto-quote/\" class=\"btn-boss-medium\">\n      Get a Quote\n    </a>\n  </div>\n\n</body>\n</html>",
      "bottomHeight": "1200px"
    },
    "Commercial Insurance Main": {
      "topBannerUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781119064219_ywkvcxmiub.png",
      "bottomBannerUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781040518535_3h2yjejpn95.jpeg",
      "buttonsHtml": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  /* Contenedor principal centrado */\n  .boss-button-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 15px; \n    padding: 20px 10px;\n    width: 100%;\n    flex-wrap: wrap;\n    font-family: 'Arial', sans-serif;\n  }\n\n  .btn-boss-medium {\n    /* Fondo transparente y borde amarillo de 2px */\n    background-color: transparent;\n    border: 2px solid #FFD700;\n    color: #FFD700;\n    \n    /* Tamaño MEDIO */\n    padding: 12px 28px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    \n    /* Estética y suavidad */\n    border-radius: 6px;\n    transition: all 0.3s ease;\n    cursor: pointer;\n    min-width: 200px;\n  }\n\n  /* Efecto al pasar el mouse */\n  .btn-boss-medium:hover {\n    background-color: #FFD700;\n    color: #000000;\n    transform: translateY(-2px);\n    box-shadow: 0px 4px 10px rgba(255, 215, 0, 0.3);\n  }\n\n  /* Ajuste para móviles */\n  @media (max-width: 480px) {\n    .btn-boss-medium {\n      width: 90%;\n      min-width: unset;\n    }\n  }\n</style>\n</head>\n<body>\n\n  <div class=\"boss-button-container\">\n    <a href=\"https://theinsuranceboss.com/contact/\" class=\"btn-boss-medium\">\n      Speak with the boss\n    </a>\n\n    <a href=\"https://theinsuranceboss.com/get-a-quote/\" class=\"btn-boss-medium\">\n      Get a Quote\n    </a>\n  </div>\n\n</body>\n</html>",
      "topHeight": "1200px",
      "bottomHeight": "1200px",
      "bottomPosition": "center",
      "bottomFit": "cover",
      "topFit": "wide",
      "topOpacity": 40
    },
    "BOP (Business Owner's Policy)": {
      "topBannerUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781119586224_jch11ka3ks.png",
      "bottomBannerUrl": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
      "titleText": "Business Owner's Policy (BOP)",
      "subtitleText": "The smart package that combines General Liability and Property Insurance at a discounted rate. Complete protection designed specifically for small businesses.",
      "buttonsHtml": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  /* Contenedor principal centrado */\n  .boss-button-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 15px; \n    padding: 20px 10px;\n    width: 100%;\n    flex-wrap: wrap;\n    font-family: 'Arial', sans-serif;\n  }\n\n  .btn-boss-medium {\n    /* Fondo transparente y borde amarillo de 2px */\n    background-color: transparent;\n    border: 2px solid #FFD700;\n    color: #FFD700;\n    \n    /* Tamaño MEDIO */\n    padding: 12px 28px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    \n    /* Estética y suavidad */\n    border-radius: 6px;\n    transition: all 0.3s ease;\n    cursor: pointer;\n    min-width: 200px;\n  }\n\n  /* Efecto al pasar el mouse */\n  .btn-boss-medium:hover {\n    background-color: #FFD700;\n    color: #000000;\n    transform: translateY(-2px);\n    box-shadow: 0px 4px 10px rgba(255, 215, 0, 0.3);\n  }\n\n  /* Ajuste para móviles */\n  @media (max-width: 480px) {\n    .btn-boss-medium {\n      width: 90%;\n      min-width: unset;\n    }\n  }\n</style>\n</head>\n<body>\n\n  <div class=\"boss-button-container\">\n    <a href=\"https://theinsuranceboss.com/contact/\" class=\"btn-boss-medium\">\n      Speak with the boss\n    </a>\n\n    <a href=\"https://theinsuranceboss.com/get-a-bop-quote/\" class=\"btn-boss-medium\">\n      Get a Quote\n    </a>\n  </div>\n\n</body>\n</html>",
      "topHeight": "1200px",
      "bottomHeight": "1200px"
    },
    "Commercial Auto": {
      "topBannerUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781119604738_tn9wdagd87.png",
      "bottomBannerUrl": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
      "titleText": "Commercial Auto Insurance",
      "subtitleText": "Commercial auto insurance provides coverage options tailored for vehicles used in business operations.",
      "buttonsHtml": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  /* Contenedor principal centrado */\n  .boss-button-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 15px; /* Espacio moderado entre botones */\n    padding: 20px 10px;\n    width: 100%;\n    flex-wrap: wrap;\n    font-family: 'Arial', sans-serif;\n  }\n\n  .btn-boss-medium {\n    /* Fondo transparente y borde amarillo de 2px */\n    background-color: transparent;\n    border: 2px solid #FFD700;\n    color: #FFD700;\n    \n    /* Tamaño MEDIO */\n    padding: 12px 28px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    \n    /* Estética y suavidad */\n    border-radius: 6px;\n    transition: all 0.3s ease;\n    cursor: pointer;\n    min-width: 200px; /* Ancho consistente para ambos */\n  }\n\n  /* Efecto al pasar el mouse */\n  .btn-boss-medium:hover {\n    background-color: #FFD700;\n    color: #000000;\n    transform: translateY(-2px);\n    box-shadow: 0px 4px 10px rgba(255, 215, 0, 0.3);\n  }\n\n  /* Ajuste para móviles */\n  @media (max-width: 480px) {\n    .btn-boss-medium {\n      width: 90%;\n      min-width: unset;\n    }\n  }\n</style>\n</head>\n<body>\n\n  <div class=\"boss-button-container\">\n    <a href=\"https://theinsuranceboss.com/contact/\" class=\"btn-boss-medium\">\n      Speak with the boss\n    </a>\n\n    <a href=\"https://theinsuranceboss.com/get-an-auto-quote/\" class=\"btn-boss-medium\">\n      Get a Quote\n    </a>\n  </div>\n\n</body>\n</html>",
      "topHeight": "1200px",
      "bottomHeight": "1200px",
      "topFit": "fill"
    },
    "Cyber Liability": {
      "topBannerUrl": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
      "bottomBannerUrl": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800"
    },
    "General Liability": {
      "topBannerUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781119494020_jezn8qz7wa.png",
      "bottomBannerUrl": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
      "titleText": "General Liability Insurance",
      "subtitleText": "Protect your business from the most common risks: customer injuries, property damage, and advertising claims. The essential coverage every business needs.",
      "buttonsHtml": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  /* Contenedor principal centrado */\n  .boss-button-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 15px; \n    padding: 20px 10px;\n    width: 100%;\n    flex-wrap: wrap;\n    font-family: 'Arial', sans-serif;\n  }\n\n  .btn-boss-medium {\n    /* Fondo transparente y borde amarillo de 2px */\n    background-color: transparent;\n    border: 2px solid #FFD700;\n    color: #FFD700;\n    \n    /* Tamaño MEDIO */\n    padding: 12px 28px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    \n    /* Estética y suavidad */\n    border-radius: 6px;\n    transition: all 0.3s ease;\n    cursor: pointer;\n    min-width: 200px;\n  }\n\n  /* Efecto al pasar el mouse */\n  .btn-boss-medium:hover {\n    background-color: #FFD700;\n    color: #000000;\n    transform: translateY(-2px);\n    box-shadow: 0px 4px 10px rgba(255, 215, 0, 0.3);\n  }\n\n  /* Ajuste para móviles */\n  @media (max-width: 480px) {\n    .btn-boss-medium {\n      width: 90%;\n      min-width: unset;\n    }\n  }\n</style>\n</head>\n<body>\n\n  <div class=\"boss-button-container\">\n    <a href=\"https://theinsuranceboss.com/contact/\" class=\"btn-boss-medium\">\n      Speak with the boss\n    </a>\n\n    <a href=\"https://theinsuranceboss.com/get-a-bop-quote/\" class=\"btn-boss-medium\">\n      Get a Quote\n    </a>\n  </div>\n\n</body>\n</html>",
      "topHeight": "1200px",
      "bottomHeight": "1200px"
    },
    "Commercial Property": {
      "topBannerUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781119528646_m28algc0sms.png",
      "bottomBannerUrl": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
      "topHeight": "1200px",
      "buttonsHtml": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  /* Contenedor principal centrado */\n  .boss-button-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 15px; \n    padding: 20px 10px;\n    width: 100%;\n    flex-wrap: wrap;\n    font-family: 'Arial', sans-serif;\n  }\n\n  .btn-boss-medium {\n    /* Fondo transparente y borde amarillo de 2px */\n    background-color: transparent;\n    border: 2px solid #FFD700;\n    color: #FFD700;\n    \n    /* Tamaño MEDIO */\n    padding: 12px 28px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    \n    /* Estética y suavidad */\n    border-radius: 6px;\n    transition: all 0.3s ease;\n    cursor: pointer;\n    min-width: 200px;\n  }\n\n  /* Efecto al pasar el mouse */\n  .btn-boss-medium:hover {\n    background-color: #FFD700;\n    color: #000000;\n    transform: translateY(-2px);\n    box-shadow: 0px 4px 10px rgba(255, 215, 0, 0.3);\n  }\n\n  /* Ajuste para móviles */\n  @media (max-width: 480px) {\n    .btn-boss-medium {\n      width: 90%;\n      min-width: unset;\n    }\n  }\n</style>\n</head>\n<body>\n\n  <div class=\"boss-button-container\">\n    <a href=\"https://theinsuranceboss.com/contact/\" class=\"btn-boss-medium\">\n      Speak with the boss\n    </a>\n\n    <a href=\"https://theinsuranceboss.com/get-a-bop-quote/\" class=\"btn-boss-medium\">\n      Get a Quote\n    </a>\n  </div>\n\n</body>\n</html>",
      "bottomHeight": "1200px"
    },
    "Workers' Comp": {
      "topBannerUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781119546034_q6sbaiuxu2o.png",
      "bottomBannerUrl": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
      "titleText": "Workers' Compensation Insurance",
      "subtitleText": "Mandatory protection that covers employee work-related injuries and illnesses. Required by law in nearly every state. Protect your employees and your business from devastating medical costs.",
      "topHeight": "1200px",
      "bottomHeight": "1200px",
      "buttonsHtml": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  /* Contenedor principal centrado */\n  .boss-button-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 15px; \n    padding: 20px 10px;\n    width: 100%;\n    flex-wrap: wrap;\n    font-family: 'Arial', sans-serif;\n  }\n\n  .btn-boss-medium {\n    /* Fondo transparente y borde amarillo de 2px */\n    background-color: transparent;\n    border: 2px solid #FFD700;\n    color: #FFD700;\n    \n    /* Tamaño MEDIO */\n    padding: 12px 28px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    \n    /* Estética y suavidad */\n    border-radius: 6px;\n    transition: all 0.3s ease;\n    cursor: pointer;\n    min-width: 200px;\n  }\n\n  /* Efecto al pasar el mouse */\n  .btn-boss-medium:hover {\n    background-color: #FFD700;\n    color: #000000;\n    transform: translateY(-2px);\n    box-shadow: 0px 4px 10px rgba(255, 215, 0, 0.3);\n  }\n\n  /* Ajuste para móviles */\n  @media (max-width: 480px) {\n    .btn-boss-medium {\n      width: 90%;\n      min-width: unset;\n    }\n  }\n</style>\n</head>\n<body>\n\n  <div class=\"boss-button-container\">\n    <a href=\"https://theinsuranceboss.com/contact/\" class=\"btn-boss-medium\">\n      Speak with the boss\n    </a>\n\n    <a href=\"https://theinsuranceboss.com/get-a-bop-quote/\" class=\"btn-boss-medium\">\n      Get a Quote\n    </a>\n  </div>\n\n</body>\n</html>"
    },
    "Employee Benefits": {
      "topBannerUrl": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
      "bottomBannerUrl": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800"
    },
    "For Agents": {
      "topBannerUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1920",
      "bottomBannerUrl": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
      "titleText": "Agency Solutions",
      "subtitleText": "Complete lead generation, carrier access, staffing, coaching, and marketing systems to scale your agency.",
      "topHeight": "1200px",
      "bottomHeight": "1200px",
      "buttonsHtml": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  /* Contenedor principal centrado */\n  .boss-button-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 15px; \n    padding: 20px 10px;\n    width: 100%;\n    flex-wrap: wrap;\n    font-family: 'Arial', sans-serif;\n  }\n\n  .btn-boss-medium {\n    /* Fondo transparente y borde amarillo de 2px */\n    background-color: transparent;\n    border: 2px solid #FFD700;\n    color: #FFD700;\n    \n    /* Tamaño MEDIO */\n    padding: 12px 28px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    \n    /* Estética y suavidad */\n    border-radius: 6px;\n    transition: all 0.3s ease;\n    cursor: pointer;\n    min-width: 200px;\n  }\n\n  /* Efecto al pasar el mouse */\n  .btn-boss-medium:hover {\n    background-color: #FFD700;\n    color: #000000;\n    transform: translateY(-2px);\n    box-shadow: 0px 4px 10px rgba(255, 215, 0, 0.3);\n  }\n\n  /* Ajuste para móviles */\n  @media (max-width: 480px) {\n    .btn-boss-medium {\n      width: 90%;\n      min-width: unset;\n    }\n  }\n</style>\n</head>\n<body>\n\n  <div class=\"boss-button-container\">\n    <a href=\"https://theinsuranceboss.com/contact/\" class=\"btn-boss-medium\">\n      Speak with the boss\n    </a>\n\n    <a href=\"https://theinsuranceboss.com/get-a-quote/\" class=\"btn-boss-medium\">\n      Get a Quote\n    </a>\n  </div>\n\n</body>\n</html>"
    },
    "Life Insurance Main": {
      "topBannerUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781118927561_0byvryh2ygk8.png",
      "bottomBannerUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781039823628_mm2jabmgdqr.jpeg",
      "buttonsHtml": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  /* Contenedor principal centrado */\n  .boss-button-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 15px; \n    padding: 20px 10px;\n    width: 100%;\n    flex-wrap: wrap;\n    font-family: 'Arial', sans-serif;\n  }\n\n  .btn-boss-medium {\n    /* Fondo transparente y borde amarillo de 2px */\n    background-color: transparent;\n    border: 2px solid #FFD700;\n    color: #FFD700;\n    \n    /* Tamaño MEDIO */\n    padding: 12px 28px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    \n    /* Estética y suavidad */\n    border-radius: 6px;\n    transition: all 0.3s ease;\n    cursor: pointer;\n    min-width: 200px;\n  }\n\n  /* Efecto al pasar el mouse */\n  .btn-boss-medium:hover {\n    background-color: #FFD700;\n    color: #000000;\n    transform: translateY(-2px);\n    box-shadow: 0px 4px 10px rgba(255, 215, 0, 0.3);\n  }\n\n  /* Ajuste para móviles */\n  @media (max-width: 480px) {\n    .btn-boss-medium {\n      width: 90%;\n      min-width: unset;\n    }\n  }\n</style>\n</head>\n<body>\n\n  <div class=\"boss-button-container\">\n    <a href=\"https://theinsuranceboss.com/contact/\" class=\"btn-boss-medium\">\n      Speak with the boss\n    </a>\n\n    <a href=\"https://app.back9ins.com/apply/ChristopherUccio\" class=\"btn-boss-medium\">\n      Get a Quote\n    </a>\n  </div>\n\n</body>\n</html>",
      "topFit": "cover",
      "bottomFit": "cover",
      "topHeight": "1080",
      "bottomHeight": "1080",
      "titleText": "Life Insurance Solutions",
      "subtitleText": "Protect Your Family's Future and Financial Security",
      "bottomUseSameAsTop": true,
      "showBottomBanner": false
    },
    "Whole Life": {
      "topBannerUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781119298053_qwqdak4g9h.png",
      "bottomBannerUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781040846410_wlfafrpz87.jpeg",
      "topHeight": "1200px",
      "topFit": "cover",
      "bottomHeight": "1200px",
      "buttonsHtml": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  /* Contenedor principal centrado */\n  .boss-button-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 15px; \n    padding: 20px 10px;\n    width: 100%;\n    flex-wrap: wrap;\n    font-family: 'Arial', sans-serif;\n  }\n\n  .btn-boss-medium {\n    /* Fondo transparente y borde amarillo de 2px */\n    background-color: transparent;\n    border: 2px solid #FFD700;\n    color: #FFD700;\n    \n    /* Tamaño MEDIO */\n    padding: 12px 28px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    \n    /* Estética y suavidad */\n    border-radius: 6px;\n    transition: all 0.3s ease;\n    cursor: pointer;\n    min-width: 200px;\n  }\n\n  /* Efecto al pasar el mouse */\n  .btn-boss-medium:hover {\n    background-color: #FFD700;\n    color: #000000;\n    transform: translateY(-2px);\n    box-shadow: 0px 4px 10px rgba(255, 215, 0, 0.3);\n  }\n\n  /* Ajuste para móviles */\n  @media (max-width: 480px) {\n    .btn-boss-medium {\n      width: 90%;\n      min-width: unset;\n    }\n  }\n</style>\n</head>\n<body>\n\n  <div class=\"boss-button-container\">\n    <a href=\"https://theinsuranceboss.com/contact/\" class=\"btn-boss-medium\">\n      Speak with the boss\n    </a>\n\n    <a href=\"https://app.back9ins.com/apply/ChristopherUccio\" class=\"btn-boss-medium\">\n      Get a Quote\n    </a>\n  </div>\n\n</body>\n</html>",
      "titleText": "Whole Life: Guaranteed Protection & Wealth Building",
      "subtitleText": "Whole Life Insurance provides lifelong financial protection, fixed premiums, and a tax-advantaged cash value component that is guaranteed to grow over time."
    },
    "Universal Life": {
      "topBannerUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781119318187_d76vzlbaeu7.png",
      "bottomBannerUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781040933128_7lg02zhdmbq.png",
      "topHeight": "1200px",
      "topFit": "fill",
      "buttonsHtml": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  /* Contenedor principal centrado */\n  .boss-button-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 15px; \n    padding: 20px 10px;\n    width: 100%;\n    flex-wrap: wrap;\n    font-family: 'Arial', sans-serif;\n  }\n\n  .btn-boss-medium {\n    /* Fondo transparente y borde amarillo de 2px */\n    background-color: transparent;\n    border: 2px solid #FFD700;\n    color: #FFD700;\n    \n    /* Tamaño MEDIO */\n    padding: 12px 28px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    \n    /* Estética y suavidad */\n    border-radius: 6px;\n    transition: all 0.3s ease;\n    cursor: pointer;\n    min-width: 200px;\n  }\n\n  /* Efecto al pasar el mouse */\n  .btn-boss-medium:hover {\n    background-color: #FFD700;\n    color: #000000;\n    transform: translateY(-2px);\n    box-shadow: 0px 4px 10px rgba(255, 215, 0, 0.3);\n  }\n\n  /* Ajuste para móviles */\n  @media (max-width: 480px) {\n    .btn-boss-medium {\n      width: 90%;\n      min-width: unset;\n    }\n  }\n</style>\n</head>\n<body>\n\n  <div class=\"boss-button-container\">\n    <a href=\"https://theinsuranceboss.com/contact/\" class=\"btn-boss-medium\">\n      Speak with the boss\n    </a>\n\n    <a href=\"https://app.back9ins.com/apply/ChristopherUccio\" class=\"btn-boss-medium\">\n      Get a Quote\n    </a>\n  </div>\n\n</body>\n</html>",
      "titleText": "Universal Life: Permanent Protection, Dynamic Design",
      "subtitleText": "Universal life separates the cost of insurance from interest crediting so you can adjust premiums within contract limits. Choose current-assumption, indexed, or variable designs to balance guarantees, growth potential, and risk.",
      "subtitleAlign": "center",
      "bottomHeight": "1200px"
    },
    "Term Life": {
      "topBannerUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781119338411_2se0tduqgip.png",
      "bottomBannerUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781042169130_gm1vtpmq3vs.jpeg",
      "topHeight": "1200px",
      "titleText": "Secure Your Family's Future with Simple Term Life",
      "subtitleText": "The most straightforward and affordable way to protect your income and cover major expenses for the years they need it most.",
      "buttonsHtml": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  /* Contenedor principal centrado */\n  .boss-button-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 15px; \n    padding: 20px 10px;\n    width: 100%;\n    flex-wrap: wrap;\n    font-family: 'Arial', sans-serif;\n  }\n\n  .btn-boss-medium {\n    /* Fondo transparente y borde amarillo de 2px */\n    background-color: transparent;\n    border: 2px solid #FFD700;\n    color: #FFD700;\n    \n    /* Tamaño MEDIO */\n    padding: 12px 28px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    \n    /* Estética y suavidad */\n    border-radius: 6px;\n    transition: all 0.3s ease;\n    cursor: pointer;\n    min-width: 200px;\n  }\n\n  /* Efecto al pasar el mouse */\n  .btn-boss-medium:hover {\n    background-color: #FFD700;\n    color: #000000;\n    transform: translateY(-2px);\n    box-shadow: 0px 4px 10px rgba(255, 215, 0, 0.3);\n  }\n\n  /* Ajuste para móviles */\n  @media (max-width: 480px) {\n    .btn-boss-medium {\n      width: 90%;\n      min-width: unset;\n    }\n  }\n</style>\n</head>\n<body>\n\n  <div class=\"boss-button-container\">\n    <a href=\"https://theinsuranceboss.com/contact/\" class=\"btn-boss-medium\">\n      Speak with the boss\n    </a>\n\n    <a href=\"https://app.back9ins.com/apply/ChristopherUccio\" class=\"btn-boss-medium\">\n      Get a Quote\n    </a>\n  </div>\n\n</body>\n</html>",
      "bottomHeight": "1200px"
    },
    "Mortgage Protection": {
      "topBannerUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781119362965_hy5lb2sc8wp.png",
      "bottomBannerUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781042283596_1jgyzpp46b3.jpeg",
      "topHeight": "1200px",
      "titleText": "Keep your family in the home they love",
      "subtitleText": "Protect what matters most with coverage that pays off your mortgage when your family needs it.",
      "buttonsHtml": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  /* Contenedor principal centrado */\n  .boss-button-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 15px; \n    padding: 20px 10px;\n    width: 100%;\n    flex-wrap: wrap;\n    font-family: 'Arial', sans-serif;\n  }\n\n  .btn-boss-medium {\n    /* Fondo transparente y borde amarillo de 2px */\n    background-color: transparent;\n    border: 2px solid #FFD700;\n    color: #FFD700;\n    \n    /* Tamaño MEDIO */\n    padding: 12px 28px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    \n    /* Estética y suavidad */\n    border-radius: 6px;\n    transition: all 0.3s ease;\n    cursor: pointer;\n    min-width: 200px;\n  }\n\n  /* Efecto al pasar el mouse */\n  .btn-boss-medium:hover {\n    background-color: #FFD700;\n    color: #000000;\n    transform: translateY(-2px);\n    box-shadow: 0px 4px 10px rgba(255, 215, 0, 0.3);\n  }\n\n  /* Ajuste para móviles */\n  @media (max-width: 480px) {\n    .btn-boss-medium {\n      width: 90%;\n      min-width: unset;\n    }\n  }\n</style>\n</head>\n<body>\n\n  <div class=\"boss-button-container\">\n    <a href=\"https://theinsuranceboss.com/contact/\" class=\"btn-boss-medium\">\n      Speak with the boss\n    </a>\n\n    <a href=\"https://app.back9ins.com/apply/ChristopherUccio\" class=\"btn-boss-medium\">\n      Get a Quote\n    </a>\n  </div>\n\n</body>\n</html>",
      "topFit": "fill",
      "bottomHeight": "1200px"
    },
    "Disability": {
      "topBannerUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781119394509_l05nmywbgb.png",
      "bottomBannerUrl": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
      "titleText": "Protect your paycheck Protect your future",
      "subtitleText": "Disability insurance replaces your income if illness or injury prevents you from working, ensuring you can pay bills, maintain your lifestyle, and protect your financial goals even when you can't work.",
      "topHeight": "1200px",
      "bottomHeight": "1200px",
      "topFit": "fill",
      "buttonsHtml": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  /* Contenedor principal centrado */\n  .boss-button-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 15px; \n    padding: 20px 10px;\n    width: 100%;\n    flex-wrap: wrap;\n    font-family: 'Arial', sans-serif;\n  }\n\n  .btn-boss-medium {\n    /* Fondo transparente y borde amarillo de 2px */\n    background-color: transparent;\n    border: 2px solid #FFD700;\n    color: #FFD700;\n    \n    /* Tamaño MEDIO */\n    padding: 12px 28px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    \n    /* Estética y suavidad */\n    border-radius: 6px;\n    transition: all 0.3s ease;\n    cursor: pointer;\n    min-width: 200px;\n  }\n\n  /* Efecto al pasar el mouse */\n  .btn-boss-medium:hover {\n    background-color: #FFD700;\n    color: #000000;\n    transform: translateY(-2px);\n    box-shadow: 0px 4px 10px rgba(255, 215, 0, 0.3);\n  }\n\n  /* Ajuste para móviles */\n  @media (max-width: 480px) {\n    .btn-boss-medium {\n      width: 90%;\n      min-width: unset;\n    }\n  }\n</style>\n</head>\n<body>\n\n  <div class=\"boss-button-container\">\n    <a href=\"https://theinsuranceboss.com/contact/\" class=\"btn-boss-medium\">\n      Speak with the boss\n    </a>\n\n    <a href=\"https://app.back9ins.com/apply/ChristopherUccio\" class=\"btn-boss-medium\">\n      Get a Quote\n    </a>\n  </div>\n\n</body>\n</html>"
    },
    "Retirement & Investment Main": {
      "topBannerUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781119277049_shhhjagoxbb.png",
      "bottomBannerUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781040757779_vdiuq3p5fdk.jpeg",
      "topHeight": "1200px",
      "buttonsHtml": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  /* Contenedor principal centrado */\n  .boss-button-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 15px; /* Espacio moderado entre botones */\n    padding: 20px 10px;\n    width: 100%;\n    flex-wrap: wrap;\n    font-family: 'Arial', sans-serif;\n  }\n\n  .btn-boss-medium {\n    /* Fondo transparente y borde amarillo de 2px */\n    background-color: transparent;\n    border: 2px solid #FFD700;\n    color: #FFD700;\n    \n    /* Tamaño MEDIO */\n    padding: 12px 28px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px; /* Tamaño de fuente estándar pero claro */\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    \n    /* Estética y suavidad */\n    border-radius: 6px;\n    transition: all 0.3s ease;\n    cursor: pointer;\n    min-width: 200px; /* Ancho consistente para ambos */\n  }\n\n  /* Efecto al pasar el mouse */\n  .btn-boss-medium:hover {\n    background-color: #FFD700;\n    color: #000000;\n    transform: translateY(-2px);\n    box-shadow: 0px 4px 10px rgba(255, 215, 0, 0.3);\n  }\n\n  /* Ajuste para móviles */\n  @media (max-width: 480px) {\n    .btn-boss-medium {\n      width: 90%;\n      min-width: unset;\n    }\n  }\n</style>\n</head>\n<body>\n\n  <div class=\"boss-button-container\">\n    <a href=\"https://theinsuranceboss.com/contact/\" class=\"btn-boss-medium\">\n      Speak with the boss\n    </a>\n\n    <a href=\"https://theinsuranceboss.com/get-a-commercial-quote/\" class=\"btn-boss-medium\">\n      Get a Quote\n    </a>\n  </div>\n\n</body>\n</html>",
      "bottomHeight": "1200px",
      "titleText": "Retirement & Investment Solutions",
      "subtitleText": "Build Wealth, Save for Education, and Secure Your Financial Future"
    },
    "IRAs": {
      "topBannerUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781119746413_udevx6in0j.png",
      "bottomBannerUrl": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
      "titleText": "Secure Your Future with Tax Advantaged Retirement Savings",
      "subtitleText": "Take control of your retirement with an IRA. Enjoy tax-deferred or tax-free growth while building wealth for your golden years.",
      "topHeight": "1200px",
      "buttonsHtml": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  /* Contenedor principal centrado */\n  .boss-button-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 15px; \n    padding: 20px 10px;\n    width: 100%;\n    flex-wrap: wrap;\n    font-family: 'Arial', sans-serif;\n  }\n\n  .btn-boss-medium {\n    /* Fondo transparente y borde amarillo de 2px */\n    background-color: transparent;\n    border: 2px solid #FFD700;\n    color: #FFD700;\n    \n    /* Tamaño MEDIO */\n    padding: 12px 28px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    \n    /* Estética y suavidad */\n    border-radius: 6px;\n    transition: all 0.3s ease;\n    cursor: pointer;\n    min-width: 200px;\n  }\n\n  /* Efecto al pasar el mouse */\n  .btn-boss-medium:hover {\n    background-color: #FFD700;\n    color: #000000;\n    transform: translateY(-2px);\n    box-shadow: 0px 4px 10px rgba(255, 215, 0, 0.3);\n  }\n\n  /* Ajuste para móviles */\n  @media (max-width: 480px) {\n    .btn-boss-medium {\n      width: 90%;\n      min-width: unset;\n    }\n  }\n</style>\n</head>\n<body>\n\n  <div class=\"boss-button-container\">\n    <a href=\"https://theinsuranceboss.com/contact/\" class=\"btn-boss-medium\">\n      Speak with the boss\n    </a>\n\n    <a href=\"https://theinsuranceboss.com/get-a-quote/\" class=\"btn-boss-medium\">\n      Get a Quote\n    </a>\n  </div>\n\n</body>\n</html>",
      "bottomHeight": "1200px"
    },
    "College Savings": {
      "topBannerUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781119778286_vbatf9jmh3e.png",
      "bottomBannerUrl": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
      "titleText": "Invest in Your Child’s Future",
      "subtitleText": "Build wealth through tax-advantaged 529 college savings plans. Start today and watch your education fund grow tax-free.",
      "buttonsHtml": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  /* Contenedor principal centrado */\n  .boss-button-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 15px; \n    padding: 20px 10px;\n    width: 100%;\n    flex-wrap: wrap;\n    font-family: 'Arial', sans-serif;\n  }\n\n  .btn-boss-medium {\n    /* Fondo transparente y borde amarillo de 2px */\n    background-color: transparent;\n    border: 2px solid #FFD700;\n    color: #FFD700;\n    \n    /* Tamaño MEDIO */\n    padding: 12px 28px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    \n    /* Estética y suavidad */\n    border-radius: 6px;\n    transition: all 0.3s ease;\n    cursor: pointer;\n    min-width: 200px;\n  }\n\n  /* Efecto al pasar el mouse */\n  .btn-boss-medium:hover {\n    background-color: #FFD700;\n    color: #000000;\n    transform: translateY(-2px);\n    box-shadow: 0px 4px 10px rgba(255, 215, 0, 0.3);\n  }\n\n  /* Ajuste para móviles */\n  @media (max-width: 480px) {\n    .btn-boss-medium {\n      width: 90%;\n      min-width: unset;\n    }\n  }\n</style>\n</head>\n<body>\n\n  <div class=\"boss-button-container\">\n    <a href=\"https://theinsuranceboss.com/contact/\" class=\"btn-boss-medium\">\n      Speak with the boss\n    </a>\n\n    <a href=\"https://theinsuranceboss.com/get-a-quote/\" class=\"btn-boss-medium\">\n      Get a Quote\n    </a>\n  </div>\n\n</body>\n</html>",
      "topHeight": "1200px",
      "bottomHeight": "1200px"
    },
    "Annuities": {
      "topBannerUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781119832607_j2cknn5soth.png",
      "bottomBannerUrl": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
      "titleText": "Never Worry About Outliving Your Money",
      "subtitleText": "Imagine receiving a paycheck every month in retirement guaranteed for as long as you live, no matter what happens in the stock market.",
      "topHeight": "1200px",
      "bottomHeight": "1200px",
      "buttonsHtml": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  /* Contenedor principal centrado */\n  .boss-button-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 15px; \n    padding: 20px 10px;\n    width: 100%;\n    flex-wrap: wrap;\n    font-family: 'Arial', sans-serif;\n  }\n\n  .btn-boss-medium {\n    /* Fondo transparente y borde amarillo de 2px */\n    background-color: transparent;\n    border: 2px solid #FFD700;\n    color: #FFD700;\n    \n    /* Tamaño MEDIO */\n    padding: 12px 28px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    \n    /* Estética y suavidad */\n    border-radius: 6px;\n    transition: all 0.3s ease;\n    cursor: pointer;\n    min-width: 200px;\n  }\n\n  /* Efecto al pasar el mouse */\n  .btn-boss-medium:hover {\n    background-color: #FFD700;\n    color: #000000;\n    transform: translateY(-2px);\n    box-shadow: 0px 4px 10px rgba(255, 215, 0, 0.3);\n  }\n\n  /* Ajuste para móviles */\n  @media (max-width: 480px) {\n    .btn-boss-medium {\n      width: 90%;\n      min-width: unset;\n    }\n  }\n</style>\n</head>\n<body>\n\n  <div class=\"boss-button-container\">\n    <a href=\"https://theinsuranceboss.com/contact/\" class=\"btn-boss-medium\">\n      Speak with the boss\n    </a>\n\n    <a href=\"https://theinsuranceboss.com/get-a-quote/\" class=\"btn-boss-medium\">\n      Get a Quote\n    </a>\n  </div>\n\n</body>\n</html>"
    },
    "401k Rollovers": {
      "topBannerUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781119847814_v3eazmbl5mg.png",
      "bottomBannerUrl": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
      "titleText": "Take Control of Your Retirement Funds",
      "subtitleText": "A 401(k) rollover can help you consolidate your retirement savings, gain more investment options, and maintain tax advantages.",
      "topHeight": "1200px",
      "bottomHeight": "1200px",
      "buttonsHtml": "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  /* Contenedor principal centrado */\n  .boss-button-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 15px; \n    padding: 20px 10px;\n    width: 100%;\n    flex-wrap: wrap;\n    font-family: 'Arial', sans-serif;\n  }\n\n  .btn-boss-medium {\n    /* Fondo transparente y borde amarillo de 2px */\n    background-color: transparent;\n    border: 2px solid #FFD700;\n    color: #FFD700;\n    \n    /* Tamaño MEDIO */\n    padding: 12px 28px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    \n    /* Estética y suavidad */\n    border-radius: 6px;\n    transition: all 0.3s ease;\n    cursor: pointer;\n    min-width: 200px;\n  }\n\n  /* Efecto al pasar el mouse */\n  .btn-boss-medium:hover {\n    background-color: #FFD700;\n    color: #000000;\n    transform: translateY(-2px);\n    box-shadow: 0px 4px 10px rgba(255, 215, 0, 0.3);\n  }\n\n  /* Ajuste para móviles */\n  @media (max-width: 480px) {\n    .btn-boss-medium {\n      width: 90%;\n      min-width: unset;\n    }\n  }\n</style>\n</head>\n<body>\n\n  <div class=\"boss-button-container\">\n    <a href=\"https://theinsuranceboss.com/contact/\" class=\"btn-boss-medium\">\n      Speak with the boss\n    </a>\n\n    <a href=\"https://theinsuranceboss.com/get-a-quote/\" class=\"btn-boss-medium\">\n      Get a Quote\n    </a>\n  </div>\n\n</body>\n</html>"
    },
    "Policy Review": {
      "topBannerUrl": "",
      "bottomBannerUrl": "",
      "showBottomBanner": false
    },
    "Inner Circle": {
      "topBannerUrl": "",
      "bottomBannerUrl": "",
      "showBottomBanner": false
    }
  },
  "hero": {
    "titleWhite": "PROTECT WHAT YOU BUILD.",
    "titleYellow": "GROW WHAT YOU OWN.",
    "subtitle": "Whether you're looking for insurance coverage, agency growth, or referral opportunities, The Insurance Boss connects protection with opportunity.",
    "keywords": "INSURANCE SOLUTIONS • AGENCY GROWTH • REFERRAL PARTNERSHIPS",
    "supportingText": "Serving families, business owners, insurance professionals, and strategic partners nationwide.",
    "btnReviewText": "REVIEW MY POLICY",
    "btnReviewUrl": "#subpage-Policy%20Review",
    "btnGrowText": "GROW MY AGENCY",
    "btnGrowUrl": "#for-agents",
    "bgUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781044012468_8ob372cygqj.png",
    "titleSize": 56,
    "subtitleSize": 18,
    "align": "left",
    "layout": "full",
    "splitImageSide": "right",
    "showMetrics": true
  },
  "pillars": {
    "coverage": {
      "title": "COVERAGE SOLUTIONS",
      "description": "Personal and commercial insurance designed to protect what matters most.",
      "items": [
        "Auto",
        "Home",
        "Life",
        "Business",
        "Specialty"
      ],
      "btnText": "GET COVERED",
      "btnUrl": "#coverage-solutions"
    },
    "agents": {
      "title": "INSURANCE AGENTS",
      "description": "Lead generation, automation, dashboards, recruiting systems, and agency growth solutions.",
      "btnText": "GROW MY AGENCY",
      "btnUrl": "#for-agents"
    },
    "partners": {
      "title": "REFERRAL PARTNERS",
      "description": "Mortgage brokers, real estate agents, financial advisors, dealers, and business professionals.",
      "btnText": "JOIN INNER CIRCLE",
      "btnUrl": "#inner-circle"
    }
  },
  "valueProps": {
    "tagline": "WHY THE INSURANCE BOSS?",
    "title": "ONE BRAND. THREE WAYS TO WIN.",
    "items": [
      "MULTIPLE STATES SERVED",
      "PERSONAL & COMMERCIAL COVERAGE",
      "AGENCY GROWTH SOLUTIONS",
      "STRATEGIC REFERRAL NETWORK",
      "POLICY REVIEW TECHNOLOGY",
      "AI-POWERED RESOURCES"
    ]
  },
  "policyReview": {
    "title": "ARE YOU COVERED?",
    "body": "Upload your declarations pages and receive a personalized coverage review.",
    "btnText": "UPLOAD POLICY",
    "bgUrl": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800",
    "externalUrl": "#subpage-Policy%20Review"
  },
  "biggerAgency": {
    "label": "FOR INSURANCE AGENTS",
    "title": "BUILD A BIGGER AGENCY WITHOUT GUESSWORK",
    "items": [
      "Agency Dashboard",
      "Lead Generation",
      "Social Media Management",
      "Automation Systems",
      "Web Design",
      "Consulting",
      "Recruiting"
    ],
    "btnText": "SEE AGENT SERVICES",
    "btnUrl": "#for-agents",
    "bgUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  },
  "innerCircle": {
    "label": "INNER CIRCLE",
    "title": "TURN RELATIONSHIPS INTO REVENUE",
    "body": "Our referral network helps professionals create additional income opportunities while delivering value to their clients.",
    "items": [
      "MORTGAGE PROFESSIONALS",
      "REAL ESTATE AGENTS",
      "AUTO DEALERS",
      "FINANCIAL ADVISORS",
      "BUSINESS BROKERS",
      "CPAS"
    ],
    "btnText": "BECOME A PARTNER",
    "btnUrl": "#subpage-Inner%20Circle",
    "bgUrl": "https://images.unsplash.com/photo-1521791136364-728647415313?auto=format&fit=crop&q=80&w=800"
  },
  "aboutBoss": {
    "label": "ABOUT THE INSURANCE BOSS",
    "title": "BUILT BY INSURANCE PROFESSIONALS. DESIGNED FOR GROWTH.",
    "body": "Insurance agency owner. Independent brokerage experience. Multi-business entrepreneur. We believe in protecting what matters, creating opportunities, and helping others win.",
    "btnText": "JOIN THE INNER CIRCLE",
    "btnUrl": "#subpage-Inner%20Circle",
    "bgUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
  },
  "subwebsites": [
    {
      "category": "Life Insurance",
      "items": [
        {
          "label": "Whole Life",
          "url": "#subpage-Whole%20Life"
        },
        {
          "label": "Universal Life",
          "url": "#subpage-Universal%20Life"
        },
        {
          "label": "Term Life",
          "url": "#subpage-Term%20Life"
        },
        {
          "label": "Mortgage Protection",
          "url": "#subpage-Mortgage%20Protection"
        },
        {
          "label": "Disability",
          "url": "#subpage-Disability"
        }
      ]
    },
    {
      "category": "Commercial Lines",
      "items": [
        {
          "label": "General Liability",
          "url": "#subpage-General%20Liability"
        },
        {
          "label": "Commercial Property",
          "url": "#subpage-Commercial%20Property"
        },
        {
          "label": "Workers' Compensation",
          "url": "#subpage-Workers'%20Compensation"
        },
        {
          "label": "Business Owner's Policy (BOP)",
          "url": "#subpage-Business%20Owner's%20Policy%20(BOP)"
        },
        {
          "label": "Commercial Auto",
          "url": "#subpage-Commercial%20Auto"
        },
        {
          "label": "Cyber Liability",
          "url": "#subpage-Cyber%20Liability"
        },
        {
          "label": "Employee Benefits",
          "url": "#subpage-Employee%20Benefits"
        }
      ]
    },
    {
      "category": "Personal Lines",
      "items": [
        {
          "label": "Auto Insurance",
          "url": "#subpage-Auto%20Insurance"
        },
        {
          "label": "Landlord Dwelling",
          "url": "#subpage-Landlord%20Dwelling"
        },
        {
          "label": "Flood",
          "url": "#subpage-Flood"
        },
        {
          "label": "Specialty Vehicles",
          "url": "#subpage-Specialty%20Vehicles"
        }
      ]
    },
    {
      "category": "Retirement & Investment",
      "items": [
        {
          "label": "IRAs",
          "url": "#subpage-IRAs"
        },
        {
          "label": "College Savings",
          "url": "#subpage-College%20Savings"
        },
        {
          "label": "Annuities",
          "url": "#subpage-Annuities"
        },
        {
          "label": "401k Rollovers",
          "url": "#subpage-401k%20Rollovers"
        }
      ]
    },
    {
      "category": "Agent Services",
      "items": [
        {
          "label": "For Agents",
          "url": "#subpage-For%20Agents"
        }
      ]
    },
    {
      "category": "Tools",
      "items": [
        {
          "label": "Policy Review",
          "url": "#subpage-Policy%20Review"
        },
        {
          "label": "Inner Circle",
          "url": "#subpage-Inner%20Circle"
        }
      ]
    }
  ],
  "insuranceBanners": [
    {
      "id": "life",
      "title": "Life Insurance",
      "subtitle": "Secure your family’s future with financial protection that lasts a lifetime.",
      "mediaUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781034284220_qsw2jahaikt.mp4",
      "mediaType": "video",
      "btnUrl": "#subpage-Life%20Insurance"
    },
    {
      "id": "commercial",
      "title": "Commercial Insurance",
      "subtitle": "Protect your business, employees, and assets so you can focus on growth.",
      "mediaUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781034320795_29lhehgg5ci.mp4",
      "mediaType": "video",
      "btnUrl": "#subpage-Commercial%20Lines"
    },
    {
      "id": "homeowners",
      "title": "Homeowners Insurance",
      "subtitle": "Keep your home and everything in it safe from damage, theft, and disasters.",
      "mediaUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781034330912_qhzfw34hwvd.mp4",
      "mediaType": "video",
      "btnUrl": "#subpage-Personal%20Lines"
    },
    {
      "id": "auto",
      "title": "Auto Insurance",
      "subtitle": "Stay protected on the road with coverage for accidents, repairs, and roadside help.",
      "mediaUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781034349963_1iokm3pakm6.mp4",
      "mediaType": "video",
      "btnUrl": "#subpage-Personal%20Lines"
    },
    {
      "id": "umbrella",
      "title": "Umbrella Insurance",
      "subtitle": "Get extra protection that goes beyond your standard insurance limits.",
      "mediaUrl": "https://cbtzxyyaukurziljqjuz.supabase.co/storage/v1/object/public/banners/1781034362226_drwpxqyldne.mp4",
      "mediaType": "video",
      "btnUrl": "#subpage-Personal%20Lines"
    }
  ],
  "faqs": [
    {
      "question": "What is The Insurance Boss?",
      "answer": "The Insurance Boss is a national insurance marketing and consulting platform designed to help individuals and businesses understand, optimize, and protect their insurance coverage. Powered by our affiliate licensed agents, we focus on smarter coverage, better pricing, and long-term risk strategy not just selling policies."
    },
    {
      "question": "Is The Insurance Boss an insurance company?",
      "answer": "No. The Insurance Boss is not an insurance carrier. We are a marketing and consulting engine that analyzes coverage and connects clients with licensed insurance professionals and agencies who place policies through top-rated carriers."
    },
    {
      "question": "How does the free policy review work?",
      "answer": "Simply upload your current insurance policy through our secure platform. Our AI-powered review tool and licensed professionals analyze your coverage for gaps, overpricing, and missed opportunities. You receive clear recommendations at no cost and with no obligation."
    },
    {
      "question": "Is my personal and policy information secure?",
      "answer": "Yes. All information is encrypted and handled securely. Your data is only reviewed by licensed professionals and protected systems. We never sell or share your information."
    },
    {
      "question": "What types of insurance does The Insurance Boss review and offer?",
      "answer": "We specialize in analyzing and marketing personal insurance (auto, home, umbrella), life insurance, commercial and business insurance, and insurance-based retirement and wealth protection strategies. All policies are placed through licensed partners when appropriate."
    },
    {
      "question": "How do I get quotes from multiple carriers?",
      "answer": "After your review, we leverage our licensed agency network to compare options across multiple carriers. This allows us to identify better pricing or coverage without you having to shop around or contact multiple agents."
    },
    {
      "question": "Am I required to switch insurance after a review?",
      "answer": "No. Our role is to educate and advise. You are never obligated to switch policies. Many clients use our insights simply to confirm they are properly covered."
    },
    {
      "question": "How is The Insurance Boss different from a traditional insurance agent?",
      "answer": "Traditional agents represent one company or sell policies directly. The Insurance Boss focuses on strategy, analysis, and leverage helping you understand coverage, pricing, and risk before any policy decision is made."
    },
    {
      "question": "What is the Insurance Boss Inner Circle Affiliate Program?",
      "answer": "The Inner Circle is our referral and affiliate program that allows business owners, professionals, and creators to earn income by connecting people with smarter insurance solutions all handled through licensed, compliant partners."
    },
    {
      "question": "What happens after I submit my information?",
      "answer": "Your submission is reviewed and routed to the best-fit licensed partner. You'll receive recommendations, options, and next steps without pressure or spam."
    }
  ],
  "testimonials": {
    "show": true,
    "title": "Testimonials",
    "subtitle": "Trusted by Professionals. Built for Families.",
    "agentReviews": [
      {
        "quote": "An absolute game-changer for my independent agency. Navigating complex Commercial Lines like Workers' Comp and complex Business Owner’s Policies used to take days of back-and-forth. Partnering with this team has completely streamlined our consulting workflow.",
        "name": "Marcus Vance",
        "role": "Principal Agent",
        "location": "Chicago, IL",
        "rating": 5
      },
      {
        "quote": "The ultimate resource for policy strategy. As an agent, my clients look to me for bulletproof advice on Retirement and Investment scaling. The high-level support and consulting provided here have given me the tools to confidently build out complex 401k rollovers.",
        "name": "Sarah Jenkins",
        "role": "Insurance Consultant",
        "location": "Atlanta, GA",
        "rating": 5
      }
    ],
    "clientReviews": [
      {
        "category": "Life Insurance",
        "quote": "Secured our family's financial future without the headache. We needed a comprehensive approach to Term Life and Mortgage Protection. The consulting we received was completely transparent and highly professional.",
        "name": "David & Amanda Collins",
        "role": "Homeowners",
        "location": "Austin, TX",
        "rating": 5
      },
      {
        "category": "Commercial Lines",
        "quote": "They took the guesswork out of our commercial coverage. Setting up our General Liability and Commercial Property coverage for our new retail location felt overwhelming. They broke down every clause clearly.",
        "name": "Robert Harrison",
        "role": "Owner, Harrison Logistics",
        "location": "Columbus, OH",
        "rating": 5
      },
      {
        "category": "Personal Lines",
        "quote": "Fast, efficient, and genuinely comprehensive. I originally reached out just to bundle my Auto Insurance and Landlord Dwelling policies, but they went above and beyond to audit my gaps—including adding Flood coverage.",
        "name": "Megan Bradley",
        "role": "Property Owner",
        "location": "Tampa, FL",
        "rating": 5
      }
    ]
  },
  "subpageHtmlOverrides": {
    "Life Insurance Main": {
      "title": "Life Insurance Solutions - Protect Your Future | The Insurance Boss",
      "description": "Complete life insurance solutions. Term Life, Whole Life, Universal Life, Disability, Mortgage Protection, and Long-Term Care coverage.",
      "css": "\n        .subpage-content * {\n            margin: 0;\n            padding: 0;\n            box-sizing: border-box;\n        }\n\n        .subpage-content {\n            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;\n            line-height: 1.6;\n            color: #ffffff;\n            background: transparent;\n        }\n\n        .subpage-content .container {\n            max-width: 1200px;\n            margin: 0 auto;\n            padding: 0 20px;\n        }\n\n        \n        .subpage-content .content-section {\n            padding: 60px 0;\n        }\n\n        .subpage-content .section-title {\n            color: #ffd700;\n            font-size: 3em;\n            margin-bottom: 30px;\n            text-align: center;\n            font-weight: 700;\n            position: relative;\n            padding-bottom: 20px;\n        }\n\n        .subpage-content .section-intro {\n            text-align: center;\n            font-size: 1.3em;\n            color: #ffffff;\n            margin-bottom: 60px;\n            max-width: 900px;\n            margin-left: auto;\n            margin-right: auto;\n            line-height: 1.6;\n        }\n\n        \n        .subpage-content .insurance-grid {\n            display: grid;\n            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));\n            gap: 40px;\n            margin: 60px 0;\n        }\n\n        \n        .subpage-content .insurance-card {\n            background: #363636;\n            border-radius: 20px;\n            padding: 40px;\n            border: 1px solid #ffd700;\n            transition: all 0.4s ease;\n            position: relative;\n            overflow: hidden;\n            box-shadow: 0 4px 15px rgba(0,0,0,0.3);\n            height: 100%;\n        }\n\n        .subpage-content .insurance-card:hover {\n            transform: translateY(-10px) scale(1.02);\n            background: #404040;\n            box-shadow: 0 15px 40px rgba(255, 215, 0, 0.15);\n        }\n\n        .subpage-content .insurance-card h3 {\n            color: #ffd700;\n            font-size: 2em;\n            margin-bottom: 20px;\n            font-weight: 700;\n        }\n\n        .subpage-content .insurance-card p {\n            color: #ffffff;\n            font-size: 1.1em;\n            line-height: 1.8;\n            margin-bottom: 25px;\n        }\n\n        .subpage-content .insurance-card ul {\n            list-style: none;\n            padding: 0;\n            margin: 25px 0;\n        }\n\n        .subpage-content .insurance-card ul li {\n            color: #ffffff;\n            padding: 10px 0;\n            padding-left: 30px;\n            position: relative;\n            font-size: 1.05em;\n        }\n\n        .subpage-content .insurance-card ul li::before {\n            content: '✓';\n            color: #ffd700;\n            font-weight: bold;\n            position: absolute;\n            left: 0;\n            font-size: 1.3em;\n        }\n\n        .subpage-content .insurance-card strong {\n            color: #ffd700;\n        }\n\n        \n        .subpage-content .stats-section {\n            background: #363636;\n            padding: 70px 40px;\n            border-radius: 25px;\n            margin: 80px 0;\n            border: 1px solid #ffd700;\n            box-shadow: 0 4px 15px rgba(0,0,0,0.3);\n        }\n\n        .subpage-content .stats-grid {\n            display: grid;\n            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n            gap: 50px;\n            margin-top: 40px;\n        }\n\n        .subpage-content .stat-item {\n            text-align: center;\n            padding: 30px 20px;\n        }\n\n        .subpage-content .stat-number {\n            color: #ffd700;\n            font-size: 3.5em;\n            font-weight: 700;\n            display: block;\n            margin-bottom: 15px;\n            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);\n        }\n\n        .subpage-content .stat-label {\n            color: #ffffff;\n            font-size: 1.2em;\n            line-height: 1.4;\n        }\n\n        \n        .subpage-content .comparison-wrapper {\n            overflow-x: auto;\n            margin: 40px 0;\n        }\n\n        .subpage-content .comparison-table {\n            width: 100%;\n            border-collapse: collapse;\n            background: #363636;\n            border-radius: 15px;\n            border: 1px solid #ffd700;\n            overflow: hidden;\n            box-shadow: 0 4px 15px rgba(0,0,0,0.3);\n        }\n\n        .subpage-content .comparison-table thead {\n            background: rgba(255, 215, 0, 0.1);\n        }\n\n        .subpage-content .comparison-table th {\n            color: #ffd700;\n            padding: 20px;\n            text-align: left;\n            font-weight: 600;\n            font-size: 1.2em;\n            border-bottom: 2px solid #ffd700;\n        }\n\n        .subpage-content .comparison-table td {\n            padding: 18px 20px;\n            border-bottom: 1px solid rgba(255, 215, 0, 0.1);\n            color: #ffffff;\n        }\n\n        .subpage-content .comparison-table tr:hover {\n            background: #404040;\n        }\n\n        \n        .subpage-content .faq-section {\n            margin: 80px 0;\n        }\n\n        .subpage-content .faq-item {\n            background: #363636;\n            margin-bottom: 20px;\n            border-radius: 15px;\n            border: none;\n            overflow: hidden;\n            transition: all 0.3s ease;\n            box-shadow: 0 4px 6px rgba(0,0,0,0.2);\n        }\n\n        .subpage-content .faq-item:hover {\n            background: #404040;\n        }\n\n        .subpage-content .faq-question {\n            padding: 30px;\n            cursor: pointer;\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n            user-select: none;\n        }\n\n        .subpage-content .faq-question h3 {\n            color: #ffd700;\n            margin: 0;\n            font-size: 1.4em;\n            flex: 1;\n            font-weight: 700;\n        }\n\n        .subpage-content .faq-toggle {\n            width: auto;\n            height: auto;\n            background: transparent;\n            color: #ffd700;\n            font-size: 2em;\n            font-weight: 400;\n            display: block;\n            margin-left: 20px;\n            line-height: 0.5;\n            transition: transform 0.3s ease;\n        }\n\n        .subpage-content .faq-toggle:hover {\n            transform: scale(1.1);\n        }\n\n        .subpage-content .faq-answer {\n            max-height: 0;\n            overflow: hidden;\n            transition: max-height 0.4s ease, padding 0.4s ease;\n            padding: 0 30px;\n            background: inherit;\n        }\n\n        .subpage-content .faq-item.active .faq-answer {\n            max-height: 1000px;\n            padding: 0 30px 30px 30px;\n            border-top: 1px solid rgba(255, 255, 255, 0.1);\n        }\n\n        .subpage-content .faq-item.active .faq-toggle {\n            transform: rotate(45deg);\n        }\n\n        .subpage-content .faq-answer p {\n            color: #ffffff;\n            line-height: 1.9;\n            font-size: 1.1em;\n        }\n\n        \n        .subpage-content .process-steps {\n            display: grid;\n            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n            gap: 40px;\n            margin-top: 50px;\n        }\n\n        .subpage-content .process-step {\n            text-align: center;\n            padding: 40px 25px;\n            background: #363636;\n            border-radius: 15px;\n            border: 1px solid #ffd700;\n            transition: all 0.3s ease;\n            position: relative;\n            box-shadow: 0 4px 15px rgba(0,0,0,0.3);\n        }\n\n        .subpage-content .process-step:hover {\n            transform: translateY(-10px);\n            background: #404040;\n            box-shadow: 0 10px 30px rgba(255, 215, 0, 0.15);\n        }\n\n        .subpage-content .step-number {\n            width: 70px;\n            height: 70px;\n            background: linear-gradient(135deg, #ffd700, #fadc2f);\n            color: #000000;\n            border-radius: 50%;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            font-size: 2em;\n            font-weight: 700;\n            margin: 0 auto 25px;\n            box-shadow: 0 5px 20px rgba(255, 215, 0, 0.5);\n        }\n\n        .subpage-content .process-step h4 {\n            color: #ffd700;\n            font-size: 1.5em;\n            margin-bottom: 15px;\n        }\n\n        .subpage-content .process-step p {\n            color: #ffffff;\n            line-height: 1.7;\n            font-size: 1.05em;\n        }\n\n        \n        @media (max-width: 768px) {\n            .subpage-content .insurance-grid { grid-template-columns: 1fr; }\n            .subpage-content .section-title { font-size: 2.2em; }\n        }\n\n        \n        .subpage-content .animate-on-scroll { opacity: 0; transform: translateY(30px); transition: opacity 0.8s ease-out, transform 0.8s ease-out; }\n        .subpage-content .animate-on-scroll.animated { opacity: 1; transform: translateY(0); }\n        .subpage-content .animate-fade { opacity: 0; transition: opacity 1s ease-out; }\n        .subpage-content .animate-fade.animated { opacity: 1; }\n        .subpage-content .animate-scale { opacity: 0; transform: scale(0.9); transition: opacity 0.8s ease-out, transform 0.8s ease-out; }\n        .subpage-content .animate-scale.animated { opacity: 1; transform: scale(1); }\n\n        .subpage-content { scroll-behavior: smooth; }\n    ",
      "html": "<section class=\"content-section\">\n        <div class=\"container\">\n            <h2 class=\"section-title\">Secure Your Family's Financial Future</h2>\n            <p class=\"section-intro\">Life insurance provides essential financial protection for you and your loved ones. Whether you're looking to replace lost income, pay off debts, fund education, or protect against disability, we help connect you with trusted insurance professionals who can provide complete coverage options tailored to your unique needs and budget.</p>\n\n            <div class=\"stats-section\">\n                <h3 style=\"text-align: center; color: #ffd700; font-size: 2em; margin-bottom: 20px;\">Why Life Insurance Matters</h3>\n                <div class=\"stats-grid\">\n                    <div class=\"stat-item\">\n                        <span class=\"stat-number\">52%</span>\n                        <span class=\"stat-label\">Of Americans Have Life Insurance Coverage</span>\n                    </div>\n                    <div class=\"stat-item\">\n                        <span class=\"stat-number\">$46,000</span>\n                        <span class=\"stat-label\">Average Funeral & Final Expenses</span>\n                    </div>\n                    <div class=\"stat-item\">\n                        <span class=\"stat-number\">1 in 4</span>\n                        <span class=\"stat-label\">Workers Will Become Disabled Before Retirement</span>\n                    </div>\n                    <div class=\"stat-item\">\n                        <span class=\"stat-number\">60%</span>\n                        <span class=\"stat-label\">Of Americans Live Paycheck to Paycheck</span>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>\n\n    <section class=\"content-section\">\n        <div class=\"container\">\n            <h2 class=\"section-title\">Life Insurance Options We Can Connect You With</h2>\n            <p class=\"section-intro\">We work with licensed insurance partners to help you explore six complete coverage options designed to protect your family's financial security and provide peace of mind.</p>\n\n            <div class=\"insurance-grid\">\n                <div class=\"insurance-card\">\n                    <h3>Term Life Insurance</h3>\n                    <p>Affordable, straightforward coverage for a specific period (10, 20, or 30 years). Provides a death benefit to your beneficiaries if you pass away during the term.</p>\n                    \n                    <ul>\n                        <li>Most affordable life insurance option</li>\n                        <li>Coverage periods: 10, 15, 20, or 30 years</li>\n                        <li>Level premiums throughout the term</li>\n                        <li>Death benefit paid tax-free to beneficiaries</li>\n                        <li>Convertible to permanent coverage</li>\n                        <li>No cash value accumulation</li>\n                    </ul>\n\n                    <p><strong>Best For:</strong> Young families, mortgage protection, income replacement, debt coverage, and those seeking maximum coverage at lowest cost.</p>\n                </div>\n\n                <div class=\"insurance-card\">\n                    <h3>Whole Life Insurance</h3>\n                    <p>Permanent coverage that lasts your entire lifetime with guaranteed death benefit and cash value accumulation. Premiums never increase.</p>\n                    \n                    <ul>\n                        <li>Lifetime coverage (never expires)</li>\n                        <li>Guaranteed level premiums</li>\n                        <li>Cash value grows tax-deferred</li>\n                        <li>Borrow against cash value</li>\n                        <li>Guaranteed death benefit</li>\n                        <li>Potential dividend payments</li>\n                        <li>Estate planning benefits</li>\n                    </ul>\n\n                    <p><strong>Best For:</strong> Estate planning, leaving a legacy, long-term financial planning, supplemental retirement income, and those wanting permanent protection.</p>\n                </div>\n\n                <div class=\"insurance-card\">\n                    <h3>Universal Life Insurance</h3>\n                    <p>Flexible permanent life insurance with adjustable premiums and death benefits. Cash value grows based on current interest rates.</p>\n                    \n                    <ul>\n                        <li>Flexible premium payments</li>\n                        <li>Adjustable death benefit</li>\n                        <li>Cash value accumulation</li>\n                        <li>Tax-deferred growth</li>\n                        <li>Policy loans available</li>\n                        <li>Interest-sensitive crediting</li>\n                        <li>Lower cost than whole life</li>\n                    </ul>\n\n                    <p><strong>Best For:</strong> Those wanting permanent coverage with flexibility, supplemental retirement savings, and estate planning with adjustable premiums.</p>\n                </div>\n\n                <div class=\"insurance-card\">\n                    <h3>Mortgage Protection Insurance</h3>\n                    <p>Specialized term life insurance designed to pay off your mortgage if you pass away, ensuring your family keeps the home.</p>\n                    \n                    <ul>\n                        <li>Coverage matches mortgage balance</li>\n                        <li>Decreasing or level death benefit options</li>\n                        <li>Beneficiaries receive payment directly</li>\n                        <li>Protects family from losing home</li>\n                        <li>Affordable term life alternative</li>\n                        <li>No medical exam options available</li>\n                        <li>Optional disability and critical illness riders</li>\n                    </ul>\n\n                    <p><strong>Best For:</strong> Homeowners with mortgages, families dependent on one income, ensuring home remains in the family, and those with limited life insurance.</p>\n                </div>\n\n                <div class=\"insurance-card\">\n                    <h3>Disability Insurance</h3>\n                    <p>Replaces 50-70% of your income if you become disabled and unable to work due to illness or injury. Critical income protection.</p>\n                    \n                    <ul>\n                        <li>Replaces 50-70% of income</li>\n                        <li>Short-term (3-6 months) or long-term coverage</li>\n                        <li>Own occupation vs. any occupation</li>\n                        <li>Benefits paid tax-free (if you pay premiums)</li>\n                        <li>Covers illness and injury</li>\n                        <li>Waiting periods: 30-180 days</li>\n                        <li>Benefit periods: 2 years to age 65</li>\n                    </ul>\n\n                    <p><strong>Best For:</strong> Primary income earners, self-employed professionals, families with limited savings, and anyone dependent on their income to pay bills.</p>\n                </div>\n\n                <div class=\"insurance-card\">\n                    <h3>Long-Term Care Insurance</h3>\n                    <p>Covers the cost of long-term care services that regular health insurance and Medicare don't cover, protecting your savings from the high cost of extended care.</p>\n                    \n                    <ul>\n                        <li>Nursing home care coverage</li>\n                        <li>Assisted living facility costs</li>\n                        <li>In-home care and personal assistance</li>\n                        <li>Adult day care services</li>\n                        <li>Care coordination and planning</li>\n                        <li>Respite care for family caregivers</li>\n                    </ul>\n\n                    <p><strong>Best For:</strong> Individuals planning for retirement, those wanting to protect assets from depletion due to care costs, and anyone who wants to avoid burdening family members.</p>\n                </div>\n            </div>\n        </div>\n    </section>\n\n    <section class=\"content-section\">\n        <div class=\"container\">\n            <h2 class=\"section-title\">Term vs. Whole vs. Universal Life Comparison</h2>\n            <p class=\"section-intro\">Understanding the differences helps you make an informed decision when exploring life insurance options with a licensed professional.</p>\n\n            <div class=\"comparison-wrapper\">\n                <table class=\"comparison-table\">\n                    <thead>\n                        <tr>\n                            <th>Feature</th>\n                            <th>Term Life</th>\n                            <th>Whole Life</th>\n                            <th>Universal Life</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr>\n                            <td><strong>Coverage Duration</strong></td>\n                            <td>10-30 years (specified term)</td>\n                            <td>Lifetime (permanent)</td>\n                            <td>Lifetime (permanent)</td>\n                        </tr>\n                        <tr>\n                            <td><strong>Premium Cost</strong></td>\n                            <td>Lowest (most affordable)</td>\n                            <td>Highest (but guaranteed)</td>\n                            <td>Moderate (flexible)</td>\n                        </tr>\n                        <tr>\n                            <td><strong>Premium Flexibility</strong></td>\n                            <td>Fixed level premiums</td>\n                            <td>Fixed level premiums</td>\n                            <td>Adjustable premiums</td>\n                        </tr>\n                        <tr>\n                            <td><strong>Cash Value</strong></td>\n                            <td>None</td>\n                            <td>Yes, guaranteed growth</td>\n                            <td>Yes, interest-sensitive</td>\n                        </tr>\n                        <tr>\n                            <td><strong>Death Benefit</strong></td>\n                            <td>Fixed amount</td>\n                            <td>Guaranteed, can increase with dividends</td>\n                            <td>Adjustable amount</td>\n                        </tr>\n                        <tr>\n                            <td><strong>Policy Loans</strong></td>\n                            <td>Not available</td>\n                            <td>Yes, against cash value</td>\n                            <td>Yes, against cash value</td>\n                        </tr>\n                        <tr>\n                            <td><strong>Best For</strong></td>\n                            <td>Temporary needs, affordability</td>\n                            <td>Estate planning, guaranteed returns</td>\n                            <td>Flexibility, moderate cost</td>\n                        </tr>\n                        <tr>\n                            <td><strong>Tax Benefits</strong></td>\n                            <td>Death benefit tax-free</td>\n                            <td>Tax-deferred growth, tax-free death benefit</td>\n                            <td>Tax-deferred growth, tax-free death benefit</td>\n                        </tr>\n                        <tr>\n                            <td><strong>Investment Risk</strong></td>\n                            <td>None</td>\n                            <td>None (guaranteed)</td>\n                            <td>Some (interest rate sensitive)</td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    </section>\n\n    <section class=\"content-section process-section\">\n        <div class=\"container\">\n            <h2 class=\"section-title\">How to Get Coverage</h2>\n            <p class=\"section-intro\">Getting life insurance is straightforward with our expert guidance.</p>\n\n            <div class=\"process-steps\">\n                <div class=\"process-step\">\n                    <div class=\"step-number\">1</div>\n                    <h4>Assess Your Needs</h4>\n                    <p>We evaluate your financial situation, family needs, debts, income replacement needs, and long-term goals.</p>\n                </div>\n\n                <div class=\"process-step\">\n                    <div class=\"step-number\">2</div>\n                    <h4>Compare Options</h4>\n                    <p>We present multiple quotes from top-rated carriers, explaining coverage differences and costs clearly.</p>\n                </div>\n\n                <div class=\"process-step\">\n                    <div class=\"step-number\">3</div>\n                    <h4>Complete Application</h4>\n                    <p>Simple application process, often with instant decisions. Medical exams may be required for larger policies.</p>\n                </div>\n\n                <div class=\"process-step\">\n                    <div class=\"step-number\">4</div>\n                    <h4>Get Protected</h4>\n                    <p>Once approved, coverage typically begins within days. You receive your policy documents and certificates.</p>\n                </div>\n            </div>\n        </div>\n    </section>\n\n    <section class=\"content-section faq-section\">\n        <div class=\"container\">\n            <h2 class=\"section-title\">Frequently Asked Questions</h2>\n\n            <!-- NEW FAQ 1 -->\n            <div class=\"faq-item\">\n                <div class=\"faq-question\">\n                    <h3>Do I Actually Need Life Insurance?</h3>\n                    <div class=\"faq-toggle\">+</div>\n                </div>\n                <div class=\"faq-answer\">\n                    <p>If anyone depends on your income — a spouse, children, aging parents — the answer is yes. Life insurance exists to fill the financial gap your absence would create. Without it, your family could be left managing mortgage payments, outstanding debts, daily living expenses, and future costs like education, all without the income they relied on. Beyond protecting dependents, life insurance also shields your estate from being depleted by final expenses, which can reach $46,000 or more. Even if you're single, if you carry student loans with a co-signer or have a parent who depends on you financially, a policy ensures your obligations don't become someone else's burden. The real question isn't whether you need life insurance — it's whether the people who depend on you can afford for you not to have it.</p>\n                </div>\n            </div>\n\n            <!-- NEW FAQ 2 -->\n            <div class=\"faq-item\">\n                <div class=\"faq-question\">\n                    <h3>How Much Life Insurance Coverage Do I Really Need?</h3>\n                    <div class=\"faq-toggle\">+</div>\n                </div>\n                <div class=\"faq-answer\">\n                    <p>A widely used starting point is 10 to 12 times your annual income — but that's a baseline, not a complete answer. A more accurate calculation accounts for four key factors: your current debts (mortgage balance, car loans, credit cards), future education costs for your children, the number of years your income would need to be replaced, and any final expenses your family would face. For example, a household earning $80,000 annually, carrying a $350,000 mortgage, with two children and 20 years until the youngest is independent, may need $1,000,000 or more in coverage to truly protect their financial future. Our licensed partners can walk you through a personalized needs analysis so your coverage amount reflects your actual life — not just a rule of thumb.</p>\n                </div>\n            </div>\n\n            <!-- NEW FAQ 3 -->\n            <div class=\"faq-item\">\n                <div class=\"faq-question\">\n                    <h3>Term vs. Whole Life Insurance: Which Should I Choose?</h3>\n                    <div class=\"faq-toggle\">+</div>\n                </div>\n                <div class=\"faq-answer\">\n                    <p>The right choice depends on what you need your policy to do. Term life insurance covers you for a set period — typically 10, 20, or 30 years — and offers the highest death benefit at the lowest cost. It's ideal for covering a mortgage, replacing income while children are young, or protecting against debt during a defined window of time. Whole life insurance is permanent coverage that never expires, and it does something term cannot: it builds cash value. A portion of every premium goes into a tax-deferred reserve that grows over time and can be borrowed against for any purpose — a business investment, education, or supplemental retirement income. This is the wealth protection element of permanent coverage, where your policy functions as both a safety net and a long-term financial asset. Many people benefit from a layered strategy — term for immediate, high-coverage needs and whole life for lifetime protection and legacy building.</p>\n                </div>\n            </div>\n\n            <!-- EXISTING FAQs -->\n            <div class=\"faq-item\">\n                <div class=\"faq-question\">\n                    <h3>Why do I need disability insurance?</h3>\n                    <div class=\"faq-toggle\">+</div>\n                </div>\n                <div class=\"faq-answer\">\n                    <p>Your ability to earn income is your most valuable asset. One in four 20-year-olds will become disabled before retirement. Disability insurance replaces 50-70% of your income if you can't work due to illness or injury. Without it, you'd drain savings, accumulate debt, or lose your home. Social Security disability is difficult to qualify for and provides minimal benefits. If you depend on your income to pay bills, disability insurance is essential – it's more likely you'll become disabled than die prematurely.</p>\n                </div>\n            </div>\n\n            <div class=\"faq-item\">\n                <div class=\"faq-question\">\n                    <h3>Can I get life insurance with pre-existing conditions?</h3>\n                    <div class=\"faq-toggle\">+</div>\n                </div>\n                <div class=\"faq-answer\">\n                    <p>Yes! While pre-existing conditions may affect your rates or require special underwriting, coverage is often available. Common conditions like high blood pressure, diabetes, or past cancer can be insured – you'll just pay higher premiums. Some insurers specialize in high-risk cases. Guaranteed issue policies accept everyone regardless of health (no medical questions) but have lower coverage limits and higher costs. Don't assume you can't get coverage – many people with health issues successfully obtain life insurance.</p>\n                </div>\n            </div>\n\n            <div class=\"faq-item\">\n                <div class=\"faq-question\">\n                    <h3>What's the difference between own occupation and any occupation disability insurance?</h3>\n                    <div class=\"faq-toggle\">+</div>\n                </div>\n                <div class=\"faq-answer\">\n                    <p>\"Own occupation\" pays benefits if you can't perform your specific job, even if you could work elsewhere. A surgeon who loses hand dexterity receives benefits even if they could teach. \"Any occupation\" only pays if you can't perform ANY job you're qualified for by education and experience. Own occupation is more expensive but provides better protection, especially for highly skilled professionals. Most group disability through employers is \"any occupation\" – consider supplemental own occupation coverage.</p>\n                </div>\n            </div>\n\n            <div class=\"faq-item\">\n                <div class=\"faq-question\">\n                    <h3>Should I get life insurance through my employer or buy my own?</h3>\n                    <div class=\"faq-toggle\">+</div>\n                </div>\n                <div class=\"faq-answer\">\n                    <p>Both! Employer-provided life insurance (typically 1-2x salary) is a great benefit but rarely sufficient. Major limitations: coverage is usually inadequate, it ends if you leave the job, rates increase with age, and you can't take it with you. Individual policies you own provide: portability (keeps coverage regardless of employment), guaranteed rates that don't increase, adequate coverage amounts, and you control the policy. Use employer coverage as a base and supplement with individual coverage for complete protection.</p>\n                </div>\n            </div>\n\n            <div class=\"faq-item\">\n                <div class=\"faq-question\">\n                    <h3>When should I buy life insurance?</h3>\n                    <div class=\"faq-toggle\">+</div>\n                </div>\n                <div class=\"faq-answer\">\n                    <p>The best time is NOW when you're younger and healthier. Life insurance costs significantly less when you're young – a 25-year-old pays half what a 40-year-old pays for the same coverage. Buy when: you get married, have children, buy a home, start a business, or anyone depends on your income. Even single people with student loans or aging parents should consider coverage. Don't wait until health issues arise – pre-existing conditions increase rates or limit coverage options.</p>\n                </div>\n            </div>\n\n            <div class=\"faq-item\">\n                <div class=\"faq-question\">\n                    <h3>Can I have multiple life insurance policies?</h3>\n                    <div class=\"faq-toggle\">+</div>\n                </div>\n                <div class=\"faq-answer\">\n                    <p>Absolutely! Many people have multiple policies for different needs: term life for mortgage protection, whole life for estate planning, employer coverage as a base. Layering policies is smart planning – you can drop term coverage once the mortgage is paid while keeping permanent coverage. Having policies with different companies also diversifies risk. Just ensure your total coverage is justified by your insurable interest (income, debts, dependents) – insurers won't approve excessive amounts.</p>\n                </div>\n            </div>\n\n            <div class=\"faq-item\">\n                <div class=\"faq-question\">\n                    <h3>What happens if I stop paying premiums?</h3>\n                    <div class=\"faq-toggle\">+</div>\n                </div>\n                <div class=\"faq-answer\">\n                    <p>For term life: most policies have a 30-31 day grace period. If you don't pay within this period, the policy lapses and coverage ends. You'll need to reapply for new coverage (likely at higher rates due to age). For permanent life (whole/universal): you have more options due to cash value. The insurer may use cash value to cover premiums, or you can surrender the policy for cash value, convert to paid-up insurance with lower death benefit, or take a policy loan. Never let a permanent policy lapse without exploring options – you lose years of cash value accumulation.</p>\n                </div>\n            </div>\n\n        </div>\n    </section>"
    },
    "Policy Review": {
      "title": "Policy Review Tool",
      "description": "Free AI-Powered Policy Review by The Insurance Boss",
      "css": ".tool-page-iframe { width: 100%; min-height: 100vh; border: none; }",
      "html": "https://insurance-decoder-pro.lovable.app/"
    },
    "Inner Circle": {
      "title": "Inner Circle Portal",
      "description": "The Insurance Boss Inner Circle Affiliate Portal",
      "css": ".tool-page-iframe { width: 100%; min-height: 100vh; border: none; }",
      "html": "https://theinsurancebossinnercircle.vercel.app/#/affiliate"
    }
  }
};
