import { useState, useId } from 'react';
import { Tag, RotateCcw, AlertCircle, Info, Sparkles } from 'lucide-react';
import { safeNumber, formatSAR, formatPercent } from '../../utils/formatters';
import { usePreferences } from '../../context/PreferencesContext';

export function SellingPriceCalculator() {
  const formId = useId();
  const { lang } = usePreferences();
  const isEn = lang === 'en';

  const [productCost, setProductCost] = useState('80');
  const [shippingCost, setShippingCost] = useState('25');
  const [packagingCost, setPackagingCost] = useState('5');
  const [fixedFee, setFixedFee] = useState('1');
  const [feeRate, setFeeRate] = useState('2.5');
  const [targetMargin, setTargetMargin] = useState('25');

  const handleReset = () => {
    setProductCost('');
    setShippingCost('');
    setPackagingCost('');
    setFixedFee('');
    setFeeRate('');
    setTargetMargin('');
  };

  const fixedCosts =
    safeNumber(productCost) +
    safeNumber(shippingCost) +
    safeNumber(packagingCost) +
    safeNumber(fixedFee);

  const desiredMarginDecimal = safeNumber(targetMargin) / 100;
  const feeRateDecimal = safeNumber(feeRate) / 100;
  const denominator = 1 - desiredMarginDecimal - feeRateDecimal;

  const isInvalidRates = desiredMarginDecimal + feeRateDecimal >= 1;

  let suggestedPrice = 0;
  let expectedProfit = 0;
  let realizedMargin = 0;

  if (!isInvalidRates && denominator > 0 && fixedCosts > 0) {
    suggestedPrice = fixedCosts / denominator;
    const variableFees = suggestedPrice * feeRateDecimal;
    expectedProfit = suggestedPrice - (fixedCosts + variableFees);
    realizedMargin = (expectedProfit / suggestedPrice) * 100;
  }

  return (
    <section id="selling-price" className="scroll-mt-24 pt-6">
      <div className="print-card bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-8 transition-all hover:border-slate-300 dark:hover:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200/60 dark:border-teal-800/60 flex items-center justify-center text-teal-700 dark:text-teal-400">
              <Tag className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {isEn ? 'Selling Price Calculator' : 'حاسبة سعر البيع'}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {isEn
                  ? 'Determine the optimal selling price to cover all fixed and percentage fees while securing your target margin.'
                  : 'حدد سعر البيع المثالي لمنتجك لتغطية التكاليف وعمولات الدفع وضمان هامش الربح المستهدف.'}
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
                  {isEn ? 'Product Cost (SAR) *' : 'تكلفة شراء المنتج (ريال) *'}
                </label>
                <input
                  id={`${formId}-product`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  placeholder={isEn ? 'e.g. 80' : 'مثال: 80'}
                  value={productCost}
                  onChange={(e) => setProductCost(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                />
              </div>

              <div>
                <label htmlFor={`${formId}-shipping`} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Shipping Cost (SAR)' : 'تكلفة الشحن والتوصيل (ريال)'}
                </label>
                <input
                  id={`${formId}-shipping`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  placeholder={isEn ? 'e.g. 25' : 'مثال: 25'}
                  value={shippingCost}
                  onChange={(e) => setShippingCost(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                />
              </div>

              <div>
                <label htmlFor={`${formId}-pack`} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Packaging Cost (SAR)' : 'التغليف ومواد الشحن (ريال)'}
                </label>
                <input
                  id={`${formId}-pack`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  placeholder={isEn ? 'e.g. 5' : 'مثال: 5'}
                  value={packagingCost}
                  onChange={(e) => setPackagingCost(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                />
              </div>

              <div>
                <label htmlFor={`${formId}-fixed`} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Fixed Payment Fee (SAR)' : 'رسوم دفع ثابتة لكل طلب (ريال)'}
                </label>
                <input
                  id={`${formId}-fixed`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  placeholder={isEn ? 'e.g. 1' : 'مثال: 1 (رسم مدى الثابت)'}
                  value={fixedFee}
                  onChange={(e) => setFixedFee(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                />
              </div>

              <div>
                <label htmlFor={`${formId}-fee-rate`} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Variable Commission Rate (%)' : 'نسبة عمولة بوابة الدفع أو المنصة (%)'}
                </label>
                <input
                  id={`${formId}-fee-rate`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  max="99"
                  step="any"
                  placeholder="2.5"
                  value={feeRate}
                  onChange={(e) => setFeeRate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                />
              </div>

              <div>
                <label htmlFor={`${formId}-margin`} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Desired Profit Margin (%) *' : 'هامش صافي الربح المطلوب (%) *'}
                </label>
                <input
                  id={`${formId}-margin`}
                  type="number"
                  inputMode="decimal"
                  min="1"
                  max="99"
                  step="any"
                  placeholder="25"
                  value={targetMargin}
                  onChange={(e) => setTargetMargin(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                />
              </div>
            </div>

            {isInvalidRates && (
              <div className="p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-2 text-xs text-red-700 dark:text-red-300">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  {isEn
                    ? `Alert: The sum of desired profit margin and variable fees (${((desiredMarginDecimal + feeRateDecimal) * 100).toFixed(1)}%) must be below 100%.`
                    : `تنبيه: مجموع هامش الربح والرسوم المتغيرة (${((desiredMarginDecimal + feeRateDecimal) * 100).toFixed(1)}%) يجب أن يكون أقل من 100% ليصبح حساب سعر البيع ممكناً رياضياً.`}
                </span>
              </div>
            )}

            <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1.5 pt-2">
              <Info className="w-3.5 h-3.5 shrink-0" />
              {isEn
                ? 'This formula calculates both target margin and percentage fees based on the final selling price (revenue).'
                : 'تعتمد هذه المعادلة على حساب هامش الربح والعمولة كنسبة من سعر البيع النهائي وليس كنسبة زيادة على التكلفة.'}
            </p>
          </div>

          {/* Result Card */}
          <div className="lg:col-span-5 bg-slate-50/80 dark:bg-slate-950/60 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {isEn ? 'Suggested Price' : 'سعر البيع الموصى به'}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-800 dark:text-teal-300 bg-teal-100/70 dark:bg-teal-950 px-2.5 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3" /> {isEn ? 'Exact Formula' : 'تسعير جبري دقيق'}
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    {isEn ? 'Recommended Selling Price' : 'سعر البيع المقترح'}
                  </span>
                  <div className="text-3xl font-extrabold text-teal-700 dark:text-teal-400">
                    {suggestedPrice > 0 ? formatSAR(suggestedPrice, lang) : formatSAR(0, lang)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                      {isEn ? 'Expected Net Profit' : 'صافي الربح المتوقع'}
                    </span>
                    <span className="text-base font-bold text-emerald-700 dark:text-emerald-400">
                      {expectedProfit > 0 ? formatSAR(expectedProfit, lang) : formatSAR(0, lang)}
                    </span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                      {isEn ? 'Realized Margin' : 'الهامش المحقق'}
                    </span>
                    <span className="text-base font-bold text-slate-800 dark:text-slate-100">
                      {realizedMargin > 0 ? formatPercent(realizedMargin, lang) : '0%'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-white/70 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex justify-between items-center">
                  <span>{isEn ? 'Total Fixed Order Costs:' : 'إجمالي التكاليف الثابتة للطلب:'}</span>
                  <span className="font-bold text-slate-800 dark:text-white">{formatSAR(fixedCosts, lang)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                {isEn ? 'Formula:' : 'المعادلة المستخدمة:'}
              </span>
              {isEn
                ? 'Selling Price = Fixed Costs ÷ (1 - Target Margin - Variable Fee Rate)'
                : 'سعر البيع = التكاليف الثابتة ÷ (1 - هامش الربح المستهدف - نسبة العمولات)'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
