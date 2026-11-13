import { ArrowDown, BookOpen, CheckCircle, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';
import { Link } from '../utils/router';
import { usePreferences } from '../context/PreferencesContext';

export function HeroSection() {
  const { lang } = usePreferences();
  const isEn = lang === 'en';

  const scrollToTools = () => {
    const el = document.getElementById('tools');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '#tools');
    }
  };

  return (
    <section className="pt-10 pb-16 sm:pt-16 sm:pb-20 print:hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className={`lg:col-span-7 space-y-6 text-center ${isEn ? 'lg:text-left' : 'lg:text-right'}`}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>
                {isEn
                  ? '100% Free Tools for Saudi E-commerce Store Owners'
                  : 'أدوات مجانية 100% لأصحاب المتاجر في السعودية'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {isEn
                ? 'Smart Tools to Manage Your Online Store Easily'
                : 'أدوات ذكية لإدارة متجرك الإلكتروني بسهولة'}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {isEn
                ? 'A suite of free financial calculators helping Saudi e-commerce merchants calculate profits, costs, VAT, and smarter pricing — with zero sign-up or data sharing.'
                : 'مجموعة من الحاسبات المجانية تساعد أصحاب المتاجر الإلكترونية في السعودية على حساب الأرباح والتكاليف والضرائب واتخاذ قرارات تسعير أفضل، دون تسجيل أو مشاركة بياناتك.'}
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
              <div className="flex items-center justify-center lg:justify-start gap-2 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{isEn ? 'Instant Local Calculations' : 'حسابات محلية وفورية'}</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>{isEn ? '100% Full Privacy' : 'خصوصية تامة 100%'}</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{isEn ? 'Accurate Financial Formulas' : 'معادلات مالية دقيقة'}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-4">
              <button
                type="button"
                onClick={scrollToTools}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-sm shadow-teal-700/25 transition cursor-pointer"
              >
                <span>{isEn ? 'Start Using the Tools' : 'ابدأ باستخدام الأدوات'}</span>
                <ArrowDown className="w-4 h-4" />
              </button>
              <Link
                href="/user-guide/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-sm border border-slate-200 dark:border-slate-700 transition"
              >
                <BookOpen className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                <span>{isEn ? 'How to Use the Tools' : 'تعرف على طريقة الاستخدام'}</span>
              </Link>
            </div>
          </div>

          {/* Clean Financial Calculator Mockup */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xl p-6 overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 font-mono">
                  {isEn ? 'Sample Calculation' : 'نموذج الحساب التقديري'}
                </span>
              </div>

              <div className="space-y-3.5">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">
                    {isEn ? 'Selling Price:' : 'سعر بيع المنتج:'}
                  </span>
                  <span className="font-bold font-mono text-slate-900 dark:text-white">
                    {isEn ? '200.00 SAR' : '200.00 ر.س'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">
                    {isEn ? 'Product Cost:' : 'تكلفة البضاعة المباعة:'}
                  </span>
                  <span className="font-bold font-mono text-slate-700 dark:text-slate-200">
                    {isEn ? '70.00 SAR' : '70.00 ر.س'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">
                    {isEn ? 'Shipping, Packaging & Fees:' : 'الشحن والتغليف والعمولات:'}
                  </span>
                  <span className="font-bold font-mono text-slate-700 dark:text-slate-200">
                    {isEn ? '37.50 SAR' : '37.50 ر.س'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">
                    {isEn ? 'Ad Spend per Order:' : 'الإعلانات المقدرة للطلب:'}
                  </span>
                  <span className="font-bold font-mono text-slate-700 dark:text-slate-200">
                    {isEn ? '40.00 SAR' : '40.00 ر.س'}
                  </span>
                </div>

                <div className="mt-4 p-4 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 flex items-center justify-between">
                  <div>
                    <span className="block text-[11px] font-semibold text-teal-800 dark:text-teal-300">
                      {isEn ? 'Net Profit' : 'صافي الربح الفعلي'}
                    </span>
                    <span className="text-2xl font-extrabold text-teal-900 dark:text-teal-200">
                      {isEn ? '52.50 SAR' : '52.50 ر.س'}
                    </span>
                  </div>
                  <div className={isEn ? 'text-right' : 'text-left'}>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                      <TrendingUp className="w-3 h-3" /> 26.3%
                    </span>
                    <span className="block text-[10px] text-teal-700/80 dark:text-teal-400 mt-1">
                      {isEn ? 'Net Margin' : 'هامش صافي ربح'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
