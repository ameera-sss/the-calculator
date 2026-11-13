import { useState, useId } from 'react';
import { Target, RotateCcw, AlertTriangle, Info, PackageCheck } from 'lucide-react';
import { safeNumber, formatSAR } from '../../utils/formatters';
import { usePreferences } from '../../context/PreferencesContext';

export function BreakEvenCalculator() {
  const formId = useId();
  const { lang } = usePreferences();
  const isEn = lang === 'en';

  const [fixedCosts, setFixedCosts] = useState('6000');
  const [sellingPrice, setSellingPrice] = useState('180');
  const [variableCost, setVariableCost] = useState('100');

  const handleReset = () => {
    setFixedCosts('');
    setSellingPrice('');
    setVariableCost('');
  };

  const fixed = safeNumber(fixedCosts);
  const price = safeNumber(sellingPrice);
  const variable = safeNumber(variableCost);

  const contributionMargin = price - variable;
  const isLossPerUnit = contributionMargin <= 0 && price > 0;

  let breakEvenUnits = 0;
  let breakEvenRevenue = 0;

  if (contributionMargin > 0 && fixed > 0) {
    breakEvenUnits = Math.ceil(fixed / contributionMargin);
    breakEvenRevenue = breakEvenUnits * price;
  }

  return (
    <section id="break-even" className="scroll-mt-24 pt-6">
      <div className="print-card bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-8 transition-all hover:border-slate-300 dark:hover:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200/60 dark:border-teal-800/60 flex items-center justify-center text-teal-700 dark:text-teal-400">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {isEn ? 'Break-Even Point Calculator' : 'حاسبة نقطة التعادل (Break-Even)'}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {isEn
                  ? 'Find the minimum monthly units and sales revenue required to cover your fixed store expenses.'
                  : 'اكتشف عدد القطع وقيمة المبيعات الشهرية المطلوبة لتغطية كافة تكاليف متجرك والبدء في تحقيق الأرباح.'}
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
            <div className="space-y-4">
              <div>
                <label htmlFor={`${formId}-fixed`} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Monthly Fixed Expenses (SAR) *' : 'التكاليف الثابتة الشهرية (ريال) *'}
                </label>
                <input
                  id={`${formId}-fixed`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  placeholder={isEn ? 'e.g. 6000 (subscriptions, rent, salaries)' : 'مثال: 6000 (اشتراك المنصة، المستودع، الرواتب، الأدوات)'}
                  value={fixedCosts}
                  onChange={(e) => setFixedCosts(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                />
                <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">
                  {isEn
                    ? 'Expenses paid every month regardless of order volume.'
                    : 'المصاريف التي تدفعها شهرياً سواء قمت بالبيع أو لم تبع.'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`${formId}-price`} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {isEn ? 'Selling Price per Unit (SAR) *' : 'سعر بيع القطعة الواحدة (ريال) *'}
                  </label>
                  <input
                    id={`${formId}-price`}
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="any"
                    placeholder="180"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                  />
                </div>

                <div>
                  <label htmlFor={`${formId}-var`} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {isEn ? 'Variable Cost per Unit (SAR) *' : 'التكلفة المتغيرة للقطعة (ريال) *'}
                  </label>
                  <input
                    id={`${formId}-var`}
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="any"
                    placeholder="100"
                    value={variableCost}
                    onChange={(e) => setVariableCost(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                  />
                </div>
              </div>
            </div>

            {isLossPerUnit && (
              <div className="p-3.5 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-xl flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-300">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                <span>
                  {isEn
                    ? `Alert: Variable cost per unit (${formatSAR(variable, lang)}) is greater than or equal to selling price (${formatSAR(price, lang)}). Break-even cannot be reached.`
                    : `تنبيه: التكلفة المتغيرة للقطعة (${formatSAR(variable, lang)}) أعلى من أو تساوي سعر البيع (${formatSAR(price, lang)}). لا يمكن الوصول إلى نقطة التعادل ما لم يكن سعر البيع أعلى من التكلفة المتغيرة.`}
                </span>
              </div>
            )}

            <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1.5 pt-2">
              <Info className="w-3.5 h-3.5 shrink-0" />
              {isEn
                ? 'Unit count is rounded up to the nearest whole unit to ensure full cost coverage.'
                : 'يتم تقريب عدد الوحدات تلقائياً لأقرب عدد صحيح للأعلى لضمان تغطية كامل التكاليف.'}
            </p>
          </div>

          {/* Results */}
          <div className="lg:col-span-5 bg-slate-50/80 dark:bg-slate-950/60 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {isEn ? 'Break-Even Target' : 'مستهدف نقطة التعادل'}
                </span>
                {breakEvenUnits > 0 && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                    <PackageCheck className="w-3 h-3" /> {isEn ? 'Monthly Goal' : 'مطلوب شهرياً'}
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    {isEn ? 'Minimum Units Required Monthly' : 'عدد القطع المطلوبة شهرياً'}
                  </span>
                  <div className="text-3xl font-extrabold text-teal-700 dark:text-teal-400">
                    {breakEvenUnits.toLocaleString(isEn ? 'en-US' : 'ar-SA')}{' '}
                    <span className="text-lg font-bold text-slate-600 dark:text-slate-400">
                      {isEn ? 'units' : 'قطعة'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                      {isEn ? 'Break-Even Revenue' : 'مبيعات التعادل'}
                    </span>
                    <span className="text-base font-bold text-slate-800 dark:text-slate-100">
                      {formatSAR(breakEvenRevenue, lang)}
                    </span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                      {isEn ? 'Contribution Margin' : 'هامش المساهمة للقطعة'}
                    </span>
                    <span
                      className={`text-base font-bold ${
                        contributionMargin > 0
                          ? 'text-emerald-700 dark:text-emerald-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {formatSAR(contributionMargin, lang)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                {isEn ? 'Formula:' : 'معادلة نقطة التعادل:'}
              </span>
              {isEn ? (
                <>
                  Contribution Margin = Selling Price - Variable Cost
                  <br />
                  Break-Even Units = Fixed Costs ÷ Contribution Margin
                </>
              ) : (
                <>
                  هامش المساهمة = سعر بيع الوحدة - التكلفة المتغيرة للوحدة
                  <br />
                  وحدات التعادل = التكاليف الثابتة ÷ هامش المساهمة للوحدة
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
