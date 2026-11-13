import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from '../utils/router';
import { usePreferences } from '../context/PreferencesContext';

export function EducationalSection() {
  const { lang } = usePreferences();
  const isEn = lang === 'en';
  const ArrowIcon = isEn ? ArrowRight : ArrowLeft;

  return (
    <section className="py-14 sm:py-20 border-t border-slate-200 dark:border-slate-800 mt-16 print:hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 px-3 py-1 rounded-full mb-3">
            {isEn ? 'Merchant Financial Guide' : 'دليل إرشادي لأصحاب المتاجر'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isEn
              ? 'How Do These Tools Help You Manage Your Store?'
              : 'كيف تساعدك هذه الأدوات في إدارة متجرك؟'}
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {isEn
              ? 'Understanding e-commerce unit economics is what separates sustainably profitable stores from those facing unexpected cash-flow pressure.'
              : 'فهم الجوانب المالية للتجارة الإلكترونية هو الفارق الحقيقي بين المتاجر التي تحقق نمواً مستداماً وتلك التي تواجه صعوبات نقدية مفاجئة.'}
          </p>
        </div>

        <div className="space-y-8">
          {/* Item 1 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center text-sm font-extrabold shrink-0">
                1
              </span>
              {isEn
                ? 'Why Calculating Net Profit Is Critical to Store Success'
                : 'لماذا يُعد حساب صافي الربح حاسماً لنجاح متجرك؟'}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              {isEn
                ? 'Many store owners focus only on daily gross sales. However, generating 100,000 SAR in monthly revenue can still result in a net loss if product costs, express shipping, return policies, and paid ads exceed total revenue.'
                : 'العديد من أصحاب المتاجر الإلكترونية يركزون على مؤشر واحد فقط: رقم المبيعات اليومي. لكن البيع بمبلغ 100,000 ريال شهرياً قد ينتهي بخسارة فعلية إذا كانت التكاليف التشغيلية (تكلفة شراء المنتجات، الشحن السريع، بوليصات الإرجاع، والتسويق) تلتهم أكثر من 100,000 ريال.'}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isEn ? (
                <>
                  Our <a href="#net-profit" className="text-teal-700 dark:text-teal-400 font-semibold underline hover:text-teal-800">Net Profit Calculator</a> shows your true remaining profit per order so you can scale winning products confidently.
                </>
              ) : (
                <>
                  تساعدك <a href="#net-profit" className="text-teal-700 dark:text-teal-400 font-semibold underline hover:text-teal-800">حاسبة صافي الربح</a> على معرفة الرقم الحقيقي المتبقي في حسابك البنكي بعد كل طلب، مما يمكنك من إيقاف المنتجات الخاسرة فوراً ومضاعفة الاستثمار في المنتجات ذات الربحية العالية.
                </>
              )}
            </p>
          </div>

          {/* Item 2 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center text-sm font-extrabold shrink-0">
                2
              </span>
              {isEn
                ? 'Why Selling Price Differs From Simple Cost Markup'
                : 'لماذا يختلف سعر البيع جذرياً عن مجرد إضافة نسبة فوق التكلفة؟'}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              {isEn
                ? 'Adding 20% onto a 100 SAR product gives a 120 SAR price—that is a 20% markup, but only a 16.6% profit margin on revenue. Once payment fees and discounts are deducted, profits can vanish.'
                : 'من أكثر الأخطاء انتشاراً الاعتقاد بأن إضافة 20% فوق تكلفة شراء المنتج يحقق هامش ربح 20%. في الواقع، إذا اشتريت منتجاً بـ 100 ريال وبعته بـ 120 ريالاً، فإن نسبة الربح على التكلفة (Markup) هي 20%، لكن هامش الربح من سعر البيع (Margin) هو 16.6% فقط.'}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isEn ? (
                <>
                  Use our <a href="#selling-price" className="text-teal-700 dark:text-teal-400 font-semibold underline hover:text-teal-800">Selling Price Calculator</a> to solve algebraically for your exact target margin after percentage-based fees.
                </>
              ) : (
                <>
                  إذا قامت بوابة الدفع باقتطاع 2.5% + 1 ريال، وقدمت خصماً ترويجياً، ستجد أنك تبيع بدون أي أرباح. باستخدام <a href="#selling-price" className="text-teal-700 dark:text-teal-400 font-semibold underline hover:text-teal-800">حاسبة سعر البيع</a>، يتم استخدام معادلة جبرية تحتسب التكاليف المتغيرة ونسبة العمولة من سعر البيع النهائي.
                </>
              )}
            </p>
          </div>

          {/* Item 3 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center text-sm font-extrabold shrink-0">
                3
              </span>
              {isEn
                ? 'Accounting for Shipping & Hidden Payment Gateway Fees'
                : 'أهمية احتساب تكاليف الشحن وعمولات الدفع الخفية'}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              {isEn
                ? 'In the Saudi market, payment options span Mada, credit cards, Apple Pay, and Buy-Now-Pay-Later providers like Tabby and Tamara—each carrying distinct fee structures.'
                : 'في السوق السعودي، تتعدد وسائل الدفع بين بطاقات مدى، البطاقات الائتمانية، آبل باي، وحلول التقسيط مثل تابي وتمارا. كل وسيلة لها هيكل تسعير مختلف؛ فرسوم مدى تختلف عن رسوم البطاقات الدولية، وحلول التقسيط تقتطع عمولة تتراوح غالباً بين 5% إلى 7%.'}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isEn ? (
                <>
                  Use the <a href="#sales-commission" className="text-teal-700 dark:text-teal-400 font-semibold underline hover:text-teal-800">Sales Commission Calculator</a> and <a href="#order-cost" className="text-teal-700 dark:text-teal-400 font-semibold underline hover:text-teal-800">Order Cost Calculator</a> to inspect every fee clearly.
                </>
              ) : (
                <>
                  عدم احتساب هذه النسب بدقة في سعر المنتج يقلص أرباحك الصافية. استخدم <a href="#sales-commission" className="text-teal-700 dark:text-teal-400 font-semibold underline hover:text-teal-800">حاسبة عمولات البيع</a> و<a href="#order-cost" className="text-teal-700 dark:text-teal-400 font-semibold underline hover:text-teal-800">حاسبة تكلفة الطلب</a> لمعرفة تكلفة كل وسيلة دفع بالتفصيل.
                </>
              )}
            </p>
          </div>

          {/* Item 4 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center text-sm font-extrabold shrink-0">
                4
              </span>
              {isEn
                ? 'How Unplanned Discounts Erode Profit Margins'
                : 'كيف تؤثر الخصومات غير المدروسة على هوامش الربح؟'}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              {isEn
                ? 'A 15% discount on selling price does not cut your profit by 15%—it can wipe out 75% or more of your actual net profit.'
                : 'تقديم خصم بنسبة 20% على سعر البيع لا يعني تقليص أرباحك بنسبة 20% فقط، بل قد يعني القضاء على 80% أو 100% من صافي ربحك!'}
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/70 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1 my-3">
              {isEn ? (
                <>
                  <p className="font-bold text-slate-900 dark:text-white">Practical SAR Example:</p>
                  <p>• Selling price: 200 SAR | Direct costs: 160 SAR | Initial profit: 40 SAR.</p>
                  <p>• With a 15% discount (30 SAR off): New selling price = 170 SAR.</p>
                  <p>• Remaining profit: 170 - 160 = 10 SAR only! (Profit dropped by 75% from just a 15% discount).</p>
                </>
              ) : (
                <>
                  <p className="font-bold text-slate-900 dark:text-white">مثال عملي بالريال السعودي:</p>
                  <p>• سعر البيع: 200 ريال | إجمالي التكاليف المباشرة: 160 ريالاً | الربح الأولي: 40 ريالاً.</p>
                  <p>• إذا قدمت خصماً 15% (30 ريالاً): يصبح سعر البيع الجديد 170 ريالاً.</p>
                  <p>• الربح المتبقي: 170 - 160 = 10 ريالات فقط! (انخفض ربحك بنسبة 75% بسبب خصم 15% فقط على السعر الإجمالي).</p>
                </>
              )}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isEn ? (
                <>
                  Always verify promotional offers using our <a href="#discount" className="text-teal-700 dark:text-teal-400 font-semibold underline hover:text-teal-800">Discount Calculator</a> before launching campaigns.
                </>
              ) : (
                <>
                  لذلك يجب عليك دائماً مراجعة <a href="#discount" className="text-teal-700 dark:text-teal-400 font-semibold underline hover:text-teal-800">حاسبة الخصومات</a> قبل تفعيل كوبونات التخفيض أو العروض الترويجية.
                </>
              )}
            </p>
          </div>

          {/* Item 5 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center text-sm font-extrabold shrink-0">
                5
              </span>
              {isEn
                ? 'The Core Difference Between Revenue and Profit'
                : 'الفرق الجوهري بين الإيرادات والأرباح'}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isEn
                ? 'Revenue measures total incoming cash flow, whereas profit is what remains after paying suppliers, shipping carriers, ad platforms, payment gateways, and fixed overhead. Optimizing net profit is the true key to sustainable growth.'
                : 'الإيرادات تعبر عن حجم التدفق النقدي الوارد لمتجرك، بينما الأرباح هي ما يبقى بعد سداد كافة الالتزامات للموردين، وشركات الشحن، ومنصات الإعلانات، وبوابات الدفع، والتكاليف الثابتة. التركيز على نمو الأرباح الصافية هو المعيار الأهم لاستدامة الأعمال وتوسيعها.'}
            </p>
          </div>
        </div>

        {/* Read More in Blog CTA Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-teal-900 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">
              {isEn
                ? 'Want to Dive Deeper Into Pricing & Store Finance?'
                : 'تريد التعمق أكثر في استراتيجيات تسعير وإدارة المتاجر؟'}
            </h3>
            <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
              {isEn
                ? 'Browse our specialized educational articles on product pricing, VAT, and e-commerce unit economics.'
                : 'تصفح مقالاتنا التعليمية المتخصصة لتتعلم أسرار تسعير المنتجات وحساب تكاليف التجارة الإلكترونية.'}
            </p>
          </div>
          <Link
            href="/blog/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm shrink-0 transition"
          >
            <span>{isEn ? 'Visit Blog' : 'زيارة المدونة'}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
