/**
 * Centralized Site Configuration
 * Change branding, domain, VAT rates, and advertising settings here.
 */

export const SITE_CONFIG = {
  // Website Identity
  name: "أدوات المتاجر",
  nameEn: "Store Tools",
  tagline: "أدوات مجانية تساعدك على إدارة متجرك الإلكتروني بذكاء",
  headline: "كل الأدوات التي تحتاجها لحساب أرباح متجرك الإلكتروني",
  description:
    "احسب أسعار البيع، وهوامش الربح، والعمولات، والضريبة بسهولة باستخدام أدوات مجانية وسريعة، دون تسجيل أو مشاركة بياناتك.",
  
  // Production Domain (Update this when deploying to your custom domain)
  url: "https://example.com",
  
  // Currency & Tax Defaults
  currency: "ر.س",
  currencyCode: "SAR",
  defaultVatRate: 15, // 15% standard Saudi VAT rate

  // AdSense Preparation (Kept false until your account is approved)
  ads: {
    enabled: false, // Set to true after getting approved by Google AdSense
    clientId: "",   // Example: "ca-pub-XXXXXXXXXXXXXXXX"
    slots: {
      homepageBanner: "",
      afterCalculators: "",
      inArticle: "",
    },
  },

  // Contact / Operator Information (Placeholder for transparency, no fake corporate entity)
  operator: {
    name: "منصة أدوات المتاجر",
    contactEmail: "info@example.com",
  },
};
