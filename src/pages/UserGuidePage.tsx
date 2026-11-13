import { BookOpen, ShieldCheck, ArrowLeft, ArrowRight, RotateCcw, Calculator } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Link } from '../utils/router';
import { SITE_CONFIG } from '../config/site';
import { usePreferences } from '../context/PreferencesContext';

export function UserGuidePage() {
  const { lang } = usePreferences();
  const isEn = lang === 'en';
  const ForwardArrow = isEn ? ArrowRight : ArrowLeft;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: isEn ? 'E-commerce Tools User Guide' : 'دليل استخدام أدوات المتاجر الإلكترونية',
    description: isEn
      ? 'A practical step-by-step guide explaining how to use the financial calculators for Saudi e-commerce stores.'
      : 'دليل عملي يشرح كيفية استخدام الحاسبات المالية لتقدير الأرباح والتكاليف والضرائب لمتاجرك الإلكترونية.',
    url: `${SITE_CONFIG.url}/user-guide/`,
    inLanguage: lang,
  };

  return (
    <>
      <SEOHead
        title={isEn ? 'User Guide | E-commerce Tools' : 'دليل استخدام أدوات المتاجر الإلكترونية'}
        description={
          isEn
            ? 'Step-by-step guide to using our profit, selling price, 15% VAT, and break-even calculators for your online store.'
            : 'دليل عملي خطوة بخطوة لاستخدام حاسبات الأرباح، والتسعير، وضريبة القيمة المضافة، ونقطة التعادل لمتاجرك الإلكترونية.'
        }
        canonicalPath="/user-guide/"
        schema={schema}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-xs font-bold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isEn ? 'Practical Instructions' : 'إرشادات وخطوات عملية'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {isEn ? 'E-commerce Tools User Guide' : 'دليل استخدام أدوات المتاجر الإلكترونية'}
          </h1>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {isEn
              ? 'Your complete guide to getting maximum value from our free financial calculators for profitable pricing and accurate cost analysis.'
              : 'دليلك الشامل لتحقيق أقصى استفادة من حاسبات المنصة المجانية لاتخاذ قرارات تسعير مربحة وحساب تكاليف متجرك بدقة.'}
          </p>
        </div>

        <div className="space-y-12">
          {/* Section 1 */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center text-sm font-bold shrink-0">
                1
              </span>
              {isEn ? 'Introduction & Purpose' : 'مقدمة الدليل والهدف من المنصة'}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isEn
                ? 'This platform is built to give online store owners in Saudi Arabia (using platforms like Salla, Zid, and others) instant, free calculators to avoid underpricing and calculate true profit margins without complex accounting software or account sign-ups.'
                : 'تم تصميم هذه المنصة بهدف واحد: تزويد أصحاب المتاجر الإلكترونية في المملكة العربية السعودية (على منصات مثل سلة، زد، وغيرها) بأدوات حسابية فورية ومجانية تساعدهم على تجنب التسعير الخاسر وحساب هوامش الربح الحقيقية دون أي تعقيد محاسبي أو تسجيل حسابات.'}
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center text-sm font-bold shrink-0">
                2
              </span>
              {isEn ? 'How to Choose the Right Calculator' : 'كيف تختار الحاسبة المناسبة لقرارك التجاري؟'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">
                  {isEn ? 'Pricing a new product?' : 'تريد تسعير منتج جديد؟'}
                </span>
                <p className="text-slate-500 dark:text-slate-400 mb-2">
                  {isEn
                    ? 'Use the Selling Price Calculator to cover all costs and lock in your target margin.'
                    : 'استخدم حاسبة سعر البيع لتحديد السعر الذي يغطي كافة التكاليف ويحقق الربح المستهدف.'}
                </p>
                <Link href="/#selling-price" className="text-teal-700 dark:text-teal-400 font-bold hover:underline inline-flex items-center gap-1">
                  <span>{isEn ? 'Open Selling Price Calculator' : 'فتح حاسبة سعر البيع'}</span>
                  <ForwardArrow className="w-3 h-3" />
                </Link>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">
                  {isEn ? 'Reviewing actual order profit?' : 'تريد مراجعة أرباح طلب فعلي؟'}
                </span>
                <p className="text-slate-500 dark:text-slate-400 mb-2">
                  {isEn
                    ? 'Use the Net Profit Calculator after deducting shipping, packaging, and commissions.'
                    : 'استخدم حاسبة صافي الربح بعد خصم التكاليف المتغيرة والشحن والعمولات.'}
                </p>
                <Link href="/#net-profit" className="text-teal-700 dark:text-teal-400 font-bold hover:underline inline-flex items-center gap-1">
                  <span>{isEn ? 'Open Net Profit Calculator' : 'فتح حاسبة صافي الربح'}</span>
                  <ForwardArrow className="w-3 h-3" />
                </Link>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">
                  {isEn ? 'Planning monthly sales targets?' : 'تريد معرفة متى يغطي متجرك مصاريفه؟'}
                </span>
                <p className="text-slate-500 dark:text-slate-400 mb-2">
                  {isEn
                    ? 'Use the Break-Even Calculator to find your required monthly unit volume.'
                    : 'استخدم حاسبة نقطة التعادل لتحديد عدد الوحدات الشهرية المطلوبة.'}
                </p>
                <Link href="/#break-even" className="text-teal-700 dark:text-teal-400 font-bold hover:underline inline-flex items-center gap-1">
                  <span>{isEn ? 'Open Break-Even Calculator' : 'فتح حاسبة نقطة التعادل'}</span>
                  <ForwardArrow className="w-3 h-3" />
                </Link>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">
                  {isEn ? 'Adding or extracting 15% VAT?' : 'تريد استخراج أو إضافة الضريبة؟'}
                </span>
                <p className="text-slate-500 dark:text-slate-400 mb-2">
                  {isEn
                    ? 'Use the VAT Calculator to calculate 15% tax and separate base amounts.'
                    : 'استخدم حاسبة ضريبة القيمة المضافة لحساب نسبة 15% وفصل المبالغ.'}
                </p>
                <Link href="/#vat" className="text-teal-700 dark:text-teal-400 font-bold hover:underline inline-flex items-center gap-1">
                  <span>{isEn ? 'Open VAT Calculator' : 'فتح حاسبة ضريبة القيمة المضافة'}</span>
                  <ForwardArrow className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center text-sm font-bold shrink-0">
                3
              </span>
              {isEn ? 'Entering Costs & Data Accurately' : 'طريقة إدخال البيانات والتكاليف بدقة'}
            </h2>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed list-disc list-inside">
              {isEn ? (
                <>
                  <li><strong>Tax Consistency:</strong> Enter all amounts either VAT-inclusive or VAT-exclusive to avoid skewed profit calculations.</li>
                  <li><strong>Variable Order Costs:</strong> Include per-order supplier cost, courier shipping, packaging, and gateway fees.</li>
                  <li><strong>Decimal Precision:</strong> Decimals (e.g., 4.5 or 28.75 SAR) are supported with real-time updates.</li>
                </>
              ) : (
                <>
                  <li><strong>الاتساق في الضريبة:</strong> تأكد من إدخال كافة التكاليف إما شاملة الضريبة أو غير شاملة لها لتجنب الازدواج الضريبي أو نقص التقدير.</li>
                  <li><strong>التكاليف المتغيرة:</strong> أدخل التكلفة المخصصة للطلب الواحد (شراء المنتج، الشحن، التغليف، عمولة البوابة).</li>
                  <li><strong>استخدام الفاصلة العشرية:</strong> يمكنك إدخال كسور الريال بدقة (مثل 4.5 ريال أو 28.75 ريال) وستقوم الحاسبة بالتحديث فورياً.</li>
                </>
              )}
            </ul>
          </section>

          {/* Section 4 */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center text-sm font-bold shrink-0">
                4
              </span>
              {isEn ? 'Resetting & Exporting PDF Reports' : 'إعادة التعيين وطباعة تقارير PDF'}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isEn ? (
                <>
                  Every calculator includes a <span className="inline-flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-xs"><RotateCcw className="w-3 h-3" /> Reset</span> button to clear inputs instantly, as well as hide/show controls and direct PDF export buttons so you can print clean reports without clutter.
                </>
              ) : (
                <>
                  تحتوي كل حاسبة على زر <span className="inline-flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-xs"><RotateCcw className="w-3 h-3" /> إعادة تعيين</span> لتفريغ الحقول فوراً، بالإضافة إلى أزرار إخفاء الحاسبات غير المطلوبة وتصدير تقارير PDF بشكل نظيف ومرتب.
                </>
              )}
            </p>
          </section>

          {/* Section 5 */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center text-sm font-bold shrink-0">
                5
              </span>
              {isEn ? 'How Your Privacy Is Protected' : 'كيف نضمن حماية خصوصية بياناتك؟'}
            </h2>
            <div className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <ShieldCheck className="w-6 h-6 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <p>
                {isEn
                  ? 'All tools run locally via client-side JavaScript. Your sales figures, prices, and cost data are never sent to external servers or stored in browser storage, and disappear as soon as you close the tab.'
                  : 'تمت برمجة جميع الأدوات لتعمل بتقنية المعالجة المحلية من جانب العميل (Client-side JavaScript). لا يتم إرسال أرقام مبيعاتك أو أسعارك أو تكاليفك إلى أي خادم، ولا يتم حفظها في سجلات التصفح أو قواعد البيانات، وتختفي الأرقام بمجرد إغلاق المتصفح.'}
              </p>
            </div>
          </section>
        </div>

        {/* Back to Home CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/#tools"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-sm transition"
          >
            <Calculator className="w-4 h-4" />
            <span>{isEn ? 'Go Try the Tools on the Homepage' : 'الانتقال لتجربة الأدوات على الصفحة الرئيسية'}</span>
          </Link>
        </div>
      </div>
    </>
  );
}
