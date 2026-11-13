import { ExternalLink, Globe, Info } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';

interface ExternalPlatformLink {
  name: string;
  nameEn: string;
  url: string;
  description: string;
  descriptionEn: string;
  category: string;
  categoryEn: string;
  accentBg: string;
  accentText: string;
  icon: React.ReactNode;
}

export function ExternalLinksSection() {
  const { lang } = usePreferences();
  const isEn = lang === 'en';

  const platforms: ExternalPlatformLink[] = [
    {
      name: 'منصة سلة',
      nameEn: 'Salla Platform',
      url: 'https://salla.com',
      description: 'منصة سعودية لبناء وإدارة المتاجر الإلكترونية والربط مع بوابات الدفع وشركات الشحن.',
      descriptionEn: 'Leading Saudi platform for building and managing online stores with integrated payments & shipping.',
      category: 'منصات المتاجر',
      categoryEn: 'E-commerce Platforms',
      accentBg: 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200/80 dark:border-emerald-800/70',
      accentText: 'text-emerald-700 dark:text-emerald-300',
      icon: (
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" aria-hidden="true">
          <rect x="4" y="6" width="24" height="20" rx="5" fill="#004D5A" />
          <path d="M11 14C11 11.7909 12.7909 10 15 10H17C19.2091 10 21 11.7909 21 14" stroke="#BAF3E6" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M10 17H22L20.5 22H11.5L10 17Z" fill="#76E8CD" />
        </svg>
      ),
    },
    {
      name: 'منصة زد',
      nameEn: 'Zid Platform',
      url: 'https://zid.sa',
      description: 'منظومة متكاملة للتجارة الإلكترونية وتمكين قطاع التجزئة والمتاجر السعودية.',
      descriptionEn: 'Integrated Saudi e-commerce ecosystem empowering modern retail brands and online merchants.',
      category: 'منصات المتاجر',
      categoryEn: 'E-commerce Platforms',
      accentBg: 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200/80 dark:border-indigo-800/70',
      accentText: 'text-indigo-700 dark:text-indigo-300',
      icon: (
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="24" height="24" rx="6" fill="#4338CA" />
          <path d="M10 11H22L11 21H22" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      name: 'المركز السعودي للأعمال',
      nameEn: 'Saudi Business Center',
      url: 'https://business.sa',
      description: 'البوابة الرسمية لتوثيق المتاجر الإلكترونية وإصدار السجل التجاري وشهادة العمل الحر.',
      descriptionEn: 'Official portal for Saudi e-store verification, commercial registration, and freelance certificates.',
      category: 'جهات رسمية',
      categoryEn: 'Official Portal',
      accentBg: 'bg-teal-50 dark:bg-teal-950/60 border-teal-200/80 dark:border-teal-800/70',
      accentText: 'text-teal-700 dark:text-teal-300',
      icon: (
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="24" height="24" rx="6" fill="#0F766E" />
          <path d="M16 9L22 12.5V19.5L16 23L10 19.5V12.5L16 9Z" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="16" cy="16" r="2.2" fill="#99F6E4" />
        </svg>
      ),
    },
    {
      name: 'هيئة الزكاة والضريبة والجمارك',
      nameEn: 'ZATCA',
      url: 'https://zatca.gov.sa',
      description: 'المرجع الرسمي لأنظمة ضريبة القيمة المضافة (15%) ومتطلبات الفوترة الإلكترونية في المملكة.',
      descriptionEn: 'Official authority for 15% VAT regulations and e-invoicing compliance in Saudi Arabia.',
      category: 'الضرائب والفوترة',
      categoryEn: 'Tax & Compliance',
      accentBg: 'bg-green-50 dark:bg-green-950/60 border-green-200/80 dark:border-green-800/70',
      accentText: 'text-green-700 dark:text-green-300',
      icon: (
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="24" height="24" rx="6" fill="#15803D" />
          <path d="M10 20L14 16L17 18.5L22 12" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M19 12H22V15" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      name: 'وزارة التجارة السعودية',
      nameEn: 'Ministry of Commerce',
      url: 'https://mc.gov.sa',
      description: 'الاطلاع على اللوائح التنظيمية للتجارة الإلكترونية وحماية المستهلك وحقوق التاجر.',
      descriptionEn: 'Saudi e-commerce regulations, merchant guidelines, and consumer protection frameworks.',
      category: 'جهات تنظيمية',
      categoryEn: 'Regulations',
      accentBg: 'bg-sky-50 dark:bg-sky-950/60 border-sky-200/80 dark:border-sky-800/70',
      accentText: 'text-sky-700 dark:text-sky-300',
      icon: (
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="24" height="24" rx="6" fill="#0369A1" />
          <path d="M16 9V23M11 13H21M11 13L9.5 18H12.5L11 13ZM21 13L19.5 18H22.5L21 13Z" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      name: 'سبل (البريد السعودي)',
      nameEn: 'SPL (Saudi Post)',
      url: 'https://splonline.com.sa',
      description: 'خدمات الشحن اللوجستي، العنوان الوطني، وحلول التوصيل المحلية والدولية للمتاجر.',
      descriptionEn: 'National logistics, National Address services, and domestic/international shipping solutions.',
      category: 'الشحن واللوجستيات',
      categoryEn: 'Shipping & Logistics',
      accentBg: 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-200/80 dark:border-cyan-800/70',
      accentText: 'text-cyan-700 dark:text-cyan-300',
      icon: (
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="24" height="24" rx="6" fill="#0E7490" />
          <path d="M9 16H21M17 11L22 16L17 21" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <section id="saudi-platforms" className="scroll-mt-24 pt-4 print:hidden">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 px-3 py-1 rounded-full mb-2.5">
            <Globe className="w-3.5 h-3.5" />
            <span>{isEn ? 'External Directory' : 'دليل الروابط الخارجية'}</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            {isEn
              ? 'Essential Links for Saudi E-commerce Platforms & Services'
              : 'روابط هامة للمتاجر الإلكترونية والمنصات السعودية'}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            {isEn
              ? 'Quick access to major Saudi e-commerce platforms, regulatory authorities, and logistics services.'
              : 'وصول سريع إلى أبرز منصات التجارة الإلكترونية والجهات الحكومية والتنظيمية ذات الصلة بأعمال المتاجر في المملكة العربية السعودية.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {platforms.map((platform) => (
            <a
              key={platform.nameEn}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-teal-500/60 dark:hover:border-teal-500/60 bg-slate-50/40 dark:bg-slate-950/40 hover:bg-white dark:hover:bg-slate-800/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${platform.accentBg}`}>
                      {platform.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                        {isEn ? platform.nameEn : platform.name}
                      </h3>
                      <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                        {isEn ? platform.name : platform.nameEn}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors shrink-0 mt-1" />
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {isEn ? platform.descriptionEn : platform.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md border ${platform.accentBg} ${platform.accentText}`}>
                  {isEn ? platform.categoryEn : platform.category}
                </span>
                <span className="text-[11px] font-bold text-teal-700 dark:text-teal-400 group-hover:underline">
                  {isEn ? 'Visit Official Site' : 'زيارة الموقع الرسمي'}
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <span>
            {isEn
              ? 'Disclaimer: These external links are provided for reference only and do not imply any official partnership or affiliation with these platforms or entities.'
              : 'إخلاء مسؤولية: الروابط المذكورة أعلاه هي روابط خارجية مرجعية لمواقع رسمية مستقلة، ولا تعني وجود شراكة أو اعتماد رسمي بين هذه المنصة وأي من تلك الجهات أو المنصات.'}
          </span>
        </div>
      </div>
    </section>
  );
}
