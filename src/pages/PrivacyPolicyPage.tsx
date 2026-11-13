import { ShieldCheck, Lock, EyeOff, ServerOff, ExternalLink } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { SITE_CONFIG } from '../config/site';
import { usePreferences } from '../context/PreferencesContext';

export function PrivacyPolicyPage() {
  const adsEnabled = SITE_CONFIG.ads.enabled;
  const { lang } = usePreferences();
  const isEn = lang === 'en';

  return (
    <>
      <SEOHead
        title={isEn ? 'Privacy Policy | Saudi E-commerce Tools' : 'سياسة الخصوصية | أدوات المتاجر الإلكترونية'}
        description={
          isEn
            ? 'Transparent privacy policy: zero registration, zero server uploads, and 100% local browser calculation processing.'
            : 'سياسة خصوصية شفافة: لا نجمع أو نخزن أي مدخلات حسابية أو بيانات شخصية، وجميع العمليات الحسابية تتم محلياً في متصفحك.'
        }
        canonicalPath="/privacy-policy/"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-xs font-bold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isEn ? 'Privacy-First & Local Processing' : 'خصوصية تامة ومعالجة محلية'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {isEn ? 'Privacy Policy' : 'سياسة الخصوصية'}
          </h1>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {isEn
              ? 'Last updated: October 13, 2026. Your privacy and business data security are our top priority.'
              : 'تاريخ آخر تحديث: 13 أكتوبر 2026. خصوصيتك وأمان بياناتك التجارية هما الأولوية القصوى في منصتنا.'}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          {/* Section 1 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ServerOff className="w-5 h-5 text-teal-700 dark:text-teal-400" />
              {isEn ? '1. Local Calculation Data Processing' : '1. معالجة البيانات الحسابية (محلياً بالكامل)'}
            </h2>
            <p>
              {isEn ? (
                <>
                  <strong>{SITE_CONFIG.nameEn}</strong> is built as a client-side calculator platform. Every price, cost, discount, and tax rate you enter is processed locally inside your browser using JavaScript.
                </>
              ) : (
                <>
                  صُممت منصة <strong>{SITE_CONFIG.name}</strong> كأداة حاسبة محلية من جانب المتصفح (Client-Side). جميع الأرقام والأسعار والتكاليف ونسب الخصم والضرائب التي تقوم بإدخالها تُعالج فورياً عبر كود JavaScript يعمل على جهازك فقط.
                </>
              )}
            </p>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm space-y-1">
              {isEn ? (
                <>
                  <p className="font-bold">Calculator Privacy Guarantees:</p>
                  <p>• No account registration, name, email, or phone number required.</p>
                  <p>• Zero transmission of calculation inputs to external servers.</p>
                  <p>• No storage in localStorage, sessionStorage, Cookies, or IndexedDB.</p>
                  <p>• Values disappear as soon as you close the page or click Reset.</p>
                </>
              ) : (
                <>
                  <p className="font-bold">ضمانات الخصوصية للحاسبات:</p>
                  <p>• لا نطلب أي تسجيل حساب أو اسم أو بريد إلكتروني أو رقم جوال.</p>
                  <p>• لا نقوم برفع أو إرسال قيم الحسابات إلى أي خادم (Server) خارجي.</p>
                  <p>• لا نقوم بحفظ مدخلاتك في الذاكرة التخزينية للمتصفح (localStorage أو sessionStorage أو Cookies أو IndexedDB).</p>
                  <p>• تختفي جميع البيانات بمجرد إغلاق نافذة المتصفح أو الضغط على زر إعادة التعيين.</p>
                </>
              )}
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-teal-700 dark:text-teal-400" />
              {isEn ? '2. Personal Data Collection' : '2. جمع البيانات الشخصية'}
            </h2>
            <p>
              {isEn
                ? 'This website does not collect, request, or store any of the following:'
                : 'لا يقوم الموقع بجمع أو طلب أو تسجيل أي من البيانات التالية:'}
            </p>
            <ul className="list-disc list-inside mr-2 space-y-1 text-slate-600 dark:text-slate-400 text-sm">
              {isEn ? (
                <>
                  <li>Personal names, IDs, or commercial registration numbers.</li>
                  <li>Email addresses or phone numbers.</li>
                  <li>Bank account or credit card details.</li>
                  <li>Actual store sales histories or customer records.</li>
                </>
              ) : (
                <>
                  <li>الأسماء أو الهويات أو السجلات التجارية.</li>
                  <li>عناوين البريد الإلكتروني أو أرقام الهواتف.</li>
                  <li>تفاصيل الحسابات البنكية أو أرقام البطاقات الائتمانية.</li>
                  <li>بيانات مبيعات المتاجر الحقيقية أو سجلات العملاء.</li>
                </>
              )}
            </ul>
          </div>

          {/* Section 3: AdSense Transparency */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-teal-700 dark:text-teal-400" />
              {isEn
                ? '3. Third-Party Advertising Services (Google AdSense)'
                : '3. الإعلانات والخدمات الإعلانية لطرف ثالث (Google AdSense)'}
            </h2>
            <p>
              {isEn
                ? 'For complete transparency, we distinguish between local calculator data and third-party advertising technologies if enabled:'
                : 'للشفافية التامة، نوضح الفارق الجوهري بين بيانات الحاسبات المحلية وبين أي خدمات إعلانية قد يتم تفعيلها مستقبلاً:'}
            </p>

            {adsEnabled ? (
              <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm">
                <p className="font-bold text-slate-900 dark:text-white">
                  {isEn ? 'Current Ad Status: Enabled' : 'حالة الإعلانات الحالية: مفعلة'}
                </p>
                <p>
                  {isEn
                    ? 'This site uses Google AdSense. Google and its partners may use cookies or similar technologies to serve ads based on prior visits.'
                    : 'يستخدم هذا الموقع خدمة Google AdSense لعرض الإعلانات. قد تستخدم شركة Google وشركاؤها الإعلانيون ملفات تعريف الارتباط (Cookies) أو تقنيات تعريف الأجهزة لعرض إعلانات ملائمة للمستخدمين استناداً إلى زياراتهم السابقة لهذا الموقع أو لمواقع أخرى على شبكة الإنترنت.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm">
                <p className="font-bold text-slate-900 dark:text-white">
                  {isEn ? 'Current Ad Status: Disabled' : 'حالة الإعلانات الحالية: غير مفعلة'}
                </p>
                <p>
                  {isEn
                    ? 'The website currently does not load any Google AdSense scripts and does not place advertising cookies on your device.'
                    : 'الموقع حالياً لا يقوم بتحميل أي أكواد إعلانية تابعة لـ Google AdSense ولا يزرع أي ملفات تعريف ارتباط (Cookies) إعلانية على جهازك.'}
                </p>
                <p>
                  {isEn ? (
                    <>
                      If Google AdSense is enabled in the future, Google and its partners may use cookies according to their policies. Review{' '}
                      <a
                        href="https://policies.google.com/technologies/ads"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-700 dark:text-teal-400 font-bold underline inline-flex items-center gap-1"
                      >
                        Google Advertising Privacy Policies
                        <ExternalLink className="w-3 h-3" />
                      </a>.
                    </>
                  ) : (
                    <>
                      في حال تم تفعيل خدمات Google AdSense الإعلانية مستقبلاً، قد تقوم Google وشركاؤها باستخدام ملفات تعريف الارتباط وتقنيات القياس وفق سياسات Google الإعلانية المعتمدة. يمكنك الاطلاع على مزيد من التفاصيل عبر صفحة{' '}
                      <a
                        href="https://policies.google.com/technologies/ads"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-700 dark:text-teal-400 font-bold underline inline-flex items-center gap-1"
                      >
                        سياسة Google الإعلانية وكيفية استخدام البيانات
                        <ExternalLink className="w-3 h-3" />
                      </a>.
                    </>
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Section 4 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {isEn ? '4. Operator Information' : '4. جهة تشغيل الموقع والتواصل'}
            </h2>
            <p className="text-sm">
              {isEn ? (
                <>
                  Operated by: <strong>{SITE_CONFIG.nameEn}</strong> ({SITE_CONFIG.operator.contactEmail}).
                </>
              ) : (
                <>
                  يتم تشغيل المنصة بواسطة: <strong>{SITE_CONFIG.operator.name}</strong> ({SITE_CONFIG.operator.contactEmail}).
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
