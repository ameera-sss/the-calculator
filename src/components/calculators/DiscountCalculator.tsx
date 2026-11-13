import { useState, useId } from 'react';
import { BadgePercent, RotateCcw, AlertCircle, Sparkles } from 'lucide-react';
import { safeNumber, formatSAR } from '../../utils/formatters';
import { usePreferences } from '../../context/PreferencesContext';

export function DiscountCalculator() {
  const formId = useId();
  const { lang } = usePreferences();
  const isEn = lang === 'en';

  const [originalPrice, setOriginalPrice] = useState('250');
  const [discountPercent, setDiscountPercent] = useState('20');

  const handleReset = () => {
    setOriginalPrice('');
    setDiscountPercent('');
  };

  const price = safeNumber(originalPrice);
  const discountRate = safeNumber(discountPercent);

  const isInvalidPercent = discountRate < 0 || discountRate > 100;

  let discountAmount = 0;
  let finalPrice = price;

  if (!isInvalidPercent && price >= 0) {
    discountAmount = price * (discountRate / 100);
    finalPrice = Math.max(0, price - discountAmount);
  }

  return (
    <section id="discount" className="scroll-mt-24 pt-6">
      <div className="print-card bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-8 transition-all hover:border-slate-300 dark:hover:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200/60 dark:border-teal-800/60 flex items-center justify-center text-teal-700 dark:text-teal-400">
              <BadgePercent className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {isEn ? 'Discount Calculator' : 'حاسبة الخصومات والعروض'}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {isEn
                  ? 'Calculate the final selling price after discount and total savings for promotional campaigns.'
                  : 'احسب السعر النهائي بعد الخصم وقيمة التوفير المالي لحملاتك الترويجية ومواسم التخفيضات.'}
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
                <label htmlFor={`${formId}-original`} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Original Price (SAR) *' : 'السعر الأصلي قبل الخصم (ريال) *'}
                </label>
                <input
                  id={`${formId}-original`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  placeholder={isEn ? 'e.g. 250' : 'مثال: 250'}
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                />
              </div>

              <div>
                <label htmlFor={`${formId}-rate`} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Discount Percentage (%) *' : 'نسبة الخصم (%) *'}
                </label>
                <div className="relative">
                  <input
                    id={`${formId}-rate`}
                    type="number"
                    inputMode="decimal"
                    min="0"
                    max="100"
                    step="any"
                    placeholder="20"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                  />
                  <span className={`absolute ${isEn ? 'right-3' : 'left-3'} top-2.5 text-slate-400 text-sm font-bold`}>%</span>
                </div>
              </div>
            </div>

            {/* Quick Preset Buttons */}
            <div className="print:hidden">
              <span className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                {isEn ? 'Quick Discount Presets:' : 'نسب خصم شائعة:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {['10', '15', '20', '25', '30', '50'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setDiscountPercent(preset)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                      discountPercent === preset
                        ? 'bg-teal-700 text-white border-teal-700'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    {isEn ? `${preset}% off` : `خصم ${preset}%`}
                  </button>
                ))}
              </div>
            </div>

            {isInvalidPercent && (
              <div className="p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-2 text-xs text-red-700 dark:text-red-300">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>
                  {isEn
                    ? 'Please enter a valid discount percentage between 0% and 100%.'
                    : 'يرجى إدخال نسبة خصم صحيحة بين 0% و 100%.'}
                </span>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="lg:col-span-5 bg-slate-50/80 dark:bg-slate-950/60 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {isEn ? 'Price Breakdown' : 'تفاصيل السعر'}
                </span>
                {discountRate > 0 && !isInvalidPercent && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                    <Sparkles className="w-3 h-3" /> {isEn ? `Save ${discountRate}%` : `وفّر ${discountRate}%`}
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    {isEn ? 'Final Price After Discount' : 'السعر النهائي بعد الخصم'}
                  </span>
                  <div className="text-3xl font-extrabold text-teal-700 dark:text-teal-400">
                    {formatSAR(finalPrice, lang)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                      {isEn ? 'Discount Amount' : 'قيمة الخصم'}
                    </span>
                    <span className="text-base font-bold text-emerald-700 dark:text-emerald-400">
                      {formatSAR(discountAmount, lang)}
                    </span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                      {isEn ? 'Amount Saved' : 'المبلغ الموفر'}
                    </span>
                    <span className="text-base font-bold text-slate-800 dark:text-slate-100">
                      {formatSAR(discountAmount, lang)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                {isEn ? 'Formula:' : 'المعادلة:'}
              </span>
              {isEn ? (
                <>
                  Final Price = Original Price × (1 - Discount ÷ 100)
                  <br />
                  Discount Amount = Original Price - Final Price
                </>
              ) : (
                <>
                  السعر النهائي = السعر الأصلي × (1 - نسبة الخصم ÷ 100)
                  <br />
                  قيمة الخصم = السعر الأصلي - السعر النهائي
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
