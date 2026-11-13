import { useState, useId } from 'react';
import { Percent, RotateCcw, ArrowRightLeft } from 'lucide-react';
import { safeNumber, formatSAR, formatPercent } from '../../utils/formatters';
import { usePreferences } from '../../context/PreferencesContext';

export function ProfitMarginCalculator() {
  const formId = useId();
  const { lang } = usePreferences();
  const isEn = lang === 'en';

  const [sellingPrice, setSellingPrice] = useState('150');
  const [cost, setCost] = useState('100');

  const handleReset = () => {
    setSellingPrice('');
    setCost('');
  };

  const revenue = safeNumber(sellingPrice);
  const totalCost = safeNumber(cost);

  const profit = revenue - totalCost;
  const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
  const markup = totalCost > 0 ? (profit / totalCost) * 100 : 0;

  return (
    <section id="profit-margin" className="scroll-mt-24 pt-6">
      <div className="print-card bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-8 transition-all hover:border-slate-300 dark:hover:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200/60 dark:border-teal-800/60 flex items-center justify-center text-teal-700 dark:text-teal-400">
              <Percent className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {isEn ? 'Profit Margin & Markup Calculator' : 'حاسبة هامش الربح ونسبة الزيادة'}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {isEn
                  ? 'Compare Profit Margin vs. Markup percentage accurately for every product.'
                  : 'قارن بدقة بين هامش الربح المئوي (Margin) ونسبة الربح على التكلفة (Markup) لكل منتج.'}
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
                <label htmlFor={`${formId}-selling`} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Selling Price (SAR) *' : 'سعر البيع (ريال) *'}
                </label>
                <input
                  id={`${formId}-selling`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  placeholder={isEn ? 'e.g. 150' : 'مثال: 150'}
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                />
              </div>

              <div>
                <label htmlFor={`${formId}-cost`} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Total Product Cost (SAR) *' : 'إجمالي تكلفة المنتج (ريال) *'}
                </label>
                <input
                  id={`${formId}-cost`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  placeholder={isEn ? 'e.g. 100' : 'مثال: 100'}
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                />
              </div>
            </div>

            <div className="p-4 bg-teal-50/70 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900 rounded-xl space-y-2 text-xs text-teal-950 dark:text-teal-100">
              <div className="flex items-center gap-2 font-bold text-teal-900 dark:text-teal-300">
                <ArrowRightLeft className="w-4 h-4 text-teal-700 dark:text-teal-400 shrink-0" />
                <span>
                  {isEn
                    ? 'Key Difference Between Margin and Markup:'
                    : 'الفرق المالي بين الهامش (Margin) والزيادة (Markup):'}
                </span>
              </div>
              {isEn ? (
                <>
                  <p className="leading-relaxed">
                    • <strong>Profit Margin:</strong> Percentage of profit relative to the <strong>selling price</strong> (never exceeds 100%).
                  </p>
                  <p className="leading-relaxed">
                    • <strong>Markup:</strong> Percentage added above the <strong>base cost</strong> (can exceed 100%).
                  </p>
                </>
              ) : (
                <>
                  <p className="leading-relaxed">
                    • <strong>هامش الربح (Margin):</strong> يُحسب كنسبة من <strong>سعر البيع</strong>، ولا يتجاوز 100%.
                  </p>
                  <p className="leading-relaxed">
                    • <strong>الزيادة على التكلفة (Markup):</strong> تُحسب كنسبة فوق <strong>التكلفة الأساسية</strong>، ويمكن أن تتجاوز 100% بكثير.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-5 bg-slate-50/80 dark:bg-slate-950/60 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-4">
                {isEn ? 'Comparison Results' : 'المقارنة الحسابية'}
              </span>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    {isEn ? 'Net Profit Amount' : 'مقدار الربح المالي'}
                  </span>
                  <div
                    className={`text-3xl font-extrabold ${
                      profit > 0
                        ? 'text-teal-700 dark:text-teal-400'
                        : profit < 0
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {formatSAR(profit, lang)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                      {isEn ? 'Profit Margin' : 'هامش الربح (Margin)'}
                    </span>
                    <span className="text-xl font-bold text-teal-700 dark:text-teal-400">
                      {formatPercent(margin, lang)}
                    </span>
                    <span className="block text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                      {isEn ? 'of selling price' : 'من سعر البيع'}
                    </span>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                      {isEn ? 'Markup' : 'الزيادة (Markup)'}
                    </span>
                    <span className="text-xl font-bold text-slate-800 dark:text-slate-100">
                      {formatPercent(markup, lang)}
                    </span>
                    <span className="block text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                      {isEn ? 'above cost' : 'فوق التكلفة'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 leading-relaxed space-y-1">
              {isEn ? (
                <>
                  <div>• Margin % = (Profit ÷ Selling Price) × 100</div>
                  <div>• Markup % = (Profit ÷ Cost) × 100</div>
                </>
              ) : (
                <>
                  <div>• الهامش % = (الربح ÷ سعر البيع) × 100</div>
                  <div>• الزيادة % = (الربح ÷ التكلفة) × 100</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
