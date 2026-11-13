import { useState, useId } from 'react';
import { Layers, RotateCcw, Info, PieChart } from 'lucide-react';
import { safeNumber, formatSAR, formatPercent } from '../../utils/formatters';
import { usePreferences } from '../../context/PreferencesContext';

export function OrderCostCalculator() {
  const formId = useId();
  const { lang } = usePreferences();
  const isEn = lang === 'en';

  const [productCost, setProductCost] = useState('65');
  const [shippingCost, setShippingCost] = useState('24');
  const [packagingCost, setPackagingCost] = useState('6');
  const [paymentFees, setPaymentFees] = useState('4');
  const [marketingCost, setMarketingCost] = useState('35');
  const [additionalCost, setAdditionalCost] = useState('5');

  const handleReset = () => {
    setProductCost('');
    setShippingCost('');
    setPackagingCost('');
    setPaymentFees('');
    setMarketingCost('');
    setAdditionalCost('');
  };

  const items = [
    { name: isEn ? 'Base Product' : 'المنتج الأساسي', amount: safeNumber(productCost), color: 'bg-teal-600' },
    { name: isEn ? 'Shipping & Delivery' : 'الشحن والتوصيل', amount: safeNumber(shippingCost), color: 'bg-emerald-500' },
    { name: isEn ? 'Marketing & Ads' : 'التسويق والإعلانات', amount: safeNumber(marketingCost), color: 'bg-amber-500' },
    { name: isEn ? 'Packaging & Prep' : 'التغليف والتجهيز', amount: safeNumber(packagingCost), color: 'bg-sky-500' },
    { name: isEn ? 'Payment Gateway Fees' : 'رسوم بوابة الدفع', amount: safeNumber(paymentFees), color: 'bg-indigo-500' },
    { name: isEn ? 'Additional Expenses' : 'مصاريف إضافية', amount: safeNumber(additionalCost), color: 'bg-slate-400' },
  ];

  const totalCost = items.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <section id="order-cost" className="scroll-mt-24 pt-6">
      <div className="print-card bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-8 transition-all hover:border-slate-300 dark:hover:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200/60 dark:border-teal-800/60 flex items-center justify-center text-teal-700 dark:text-teal-400">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {isEn ? 'Order Cost & Expense Breakdown Calculator' : 'حاسبة تكلفة الطلب وتوزيع المصاريف'}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {isEn
                  ? 'Analyze each order cost item and view the percentage share of every expense.'
                  : 'حلل بنود تكاليف الطلب الواحد واعرف النسبة المئوية التي يستحوذ عليها كل بند من ميزانيتك.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="print:hidden self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {isEn ? 'Reset' : 'إعادة تعيين'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          {/* Inputs */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`${formId}-product`} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Product Cost (SAR) *' : 'تكلفة المنتج (ريال) *'}
                </label>
                <input
                  id={`${formId}-product`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  placeholder="65"
                  value={productCost}
                  onChange={(e) => setProductCost(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                />
              </div>

              <div>
                <label htmlFor={`${formId}-shipping`} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Shipping & Delivery (SAR)' : 'الشحن والتوصيل (ريال)'}
                </label>
                <input
                  id={`${formId}-shipping`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  placeholder="24"
                  value={shippingCost}
                  onChange={(e) => setShippingCost(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                />
              </div>

              <div>
                <label htmlFor={`${formId}-packaging`} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Packaging Materials (SAR)' : 'التغليف ومواد الشحن (ريال)'}
                </label>
                <input
                  id={`${formId}-packaging`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  placeholder="6"
                  value={packagingCost}
                  onChange={(e) => setPackagingCost(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                />
              </div>

              <div>
                <label htmlFor={`${formId}-payment`} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Payment Gateway Fees (SAR)' : 'رسوم الدفع الإلكتروني (ريال)'}
                </label>
                <input
                  id={`${formId}-payment`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  placeholder="4"
                  value={paymentFees}
                  onChange={(e) => setPaymentFees(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                />
              </div>

              <div>
                <label htmlFor={`${formId}-marketing`} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Marketing & Ads per Order (SAR)' : 'التسويق والإعلانات للطلب (ريال)'}
                </label>
                <input
                  id={`${formId}-marketing`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  placeholder="35"
                  value={marketingCost}
                  onChange={(e) => setMarketingCost(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                />
              </div>

              <div>
                <label htmlFor={`${formId}-extra`} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Additional Operating Costs (SAR)' : 'مصاريف تشغيلية إضافية (ريال)'}
                </label>
                <input
                  id={`${formId}-extra`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  placeholder="5"
                  value={additionalCost}
                  onChange={(e) => setAdditionalCost(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                />
              </div>
            </div>

            <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1.5 pt-2">
              <Info className="w-3.5 h-3.5 shrink-0" />
              {isEn
                ? 'Cost distribution helps identify which expense items drain your margins the most.'
                : 'توزيع التكاليف يساعدك على تحديد البنود الأكثر استنزافاً للأرباح والتفاوض لتخفيضها.'}
            </p>
          </div>

          {/* Results & Visual CSS Breakdown */}
          <div className="lg:col-span-5 bg-slate-50/80 dark:bg-slate-950/60 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {isEn ? 'Order Cost Analysis' : 'تحليل تكلفة الطلب'}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-200/80 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                  <PieChart className="w-3 h-3" /> {isEn ? 'Visual Breakdown' : 'رسم بياني خفيف'}
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    {isEn ? 'Total Cost per Order' : 'إجمالي تكلفة الطلب الواحد'}
                  </span>
                  <div className="text-3xl font-extrabold text-teal-700 dark:text-teal-400">
                    {formatSAR(totalCost, lang)}
                  </div>
                </div>

                {totalCost > 0 && (
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                    <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {isEn ? 'Expense Share Distribution:' : 'توزيع النسب المئوية للمصاريف:'}
                    </span>
                    <div className="w-full h-3.5 rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-800">
                      {items.map((it) => {
                        const pct = (it.amount / totalCost) * 100;
                        if (pct <= 0) return null;
                        return (
                          <div
                            key={it.name}
                            style={{ width: `${pct}%` }}
                            className={`${it.color} h-full transition-all`}
                            title={`${it.name}: ${pct.toFixed(1)}%`}
                          />
                        );
                      })}
                    </div>

                    <div className="space-y-1.5 pt-1 text-xs">
                      {items.map((it) => {
                        const pct = totalCost > 0 ? (it.amount / totalCost) * 100 : 0;
                        return (
                          <div key={it.name} className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                            <div className="flex items-center gap-2">
                              <span className={`w-2.5 h-2.5 rounded-sm ${it.color}`} />
                              <span>{it.name}</span>
                            </div>
                            <div className="flex items-center gap-2 font-mono font-semibold">
                              <span>{formatSAR(it.amount, lang)}</span>
                              <span className="text-slate-400 dark:text-slate-500">({formatPercent(pct, lang)})</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                {isEn ? 'Formula:' : 'المعادلة:'}
              </span>
              {isEn
                ? 'Total Order Cost = Sum of all direct and operating expenses allocated per order.'
                : 'إجمالي تكلفة الطلب = مجموع كافة المصاريف المباشرة والتشغيلية المخصصة للطلب.'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
