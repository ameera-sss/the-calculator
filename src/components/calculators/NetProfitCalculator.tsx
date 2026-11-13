import { useState, useId } from 'react';
import { DollarSign, RotateCcw, TrendingUp, TrendingDown, Info } from 'lucide-react';
import { safeNumber, formatSAR, formatPercent } from '../../utils/formatters';
import { usePreferences } from '../../context/PreferencesContext';

export function NetProfitCalculator() {
  const formId = useId();
  const { lang } = usePreferences();
  const isEn = lang === 'en';

  const [sellingPrice, setSellingPrice] = useState('200');
  const [productCost, setProductCost] = useState('70');
  const [shippingCost, setShippingCost] = useState('28');
  const [packagingCost, setPackagingCost] = useState('5');
  const [paymentFees, setPaymentFees] = useState('4.5');
  const [platformCommission, setPlatformCommission] = useState('0');
  const [adCost, setAdCost] = useState('40');
  const [otherCost, setOtherCost] = useState('0');

  const handleReset = () => {
    setSellingPrice('');
    setProductCost('');
    setShippingCost('');
    setPackagingCost('');
    setPaymentFees('');
    setPlatformCommission('');
    setAdCost('');
    setOtherCost('');
  };

  const revenue = safeNumber(sellingPrice);
  const totalExpenses =
    safeNumber(productCost) +
    safeNumber(shippingCost) +
    safeNumber(packagingCost) +
    safeNumber(paymentFees) +
    safeNumber(platformCommission) +
    safeNumber(adCost) +
    safeNumber(otherCost);

  const netProfit = revenue - totalExpenses;
  const margin = revenue > 0 ? (netProfit / revenue) * 100 : 0;
  const isProfitable = netProfit > 0;
  const isLoss = netProfit < 0;

  return (
    <section id="net-profit" className="scroll-mt-24 pt-6">
      <div className="print-card bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-8 transition-all hover:border-slate-300 dark:hover:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200/60 dark:border-teal-800/60 flex items-center justify-center text-teal-700 dark:text-teal-400">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {isEn ? 'Net Profit Calculator' : 'حاسبة صافي الربح'}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {isEn
                  ? 'Calculate true net profit per order after deducting product cost, shipping, packaging, gateway fees, and ads.'
                  : 'احسب صافي الربح الحقيقي لكل طلب بعد خصم كافة التكاليف التشغيلية والتسويقية والعمولات.'}
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
          {/* Inputs Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`${formId}-selling`} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Selling Price (SAR) *' : 'سعر بيع المنتج (ريال) *'}
                </label>
                <input
                  id={`${formId}-selling`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  placeholder={isEn ? 'e.g. 200' : 'مثال: 200'}
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                />
              </div>

              <div>
                <label htmlFor={`${formId}-product`} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Product Cost (SAR) *' : 'تكلفة شراء/تصنيع المنتج (ريال) *'}
                </label>
                <input
                  id={`${formId}-product`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  placeholder={isEn ? 'e.g. 70' : 'مثال: 70'}
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
                  placeholder={isEn ? 'e.g. 28' : 'مثال: 28'}
                  value={shippingCost}
                  onChange={(e) => setShippingCost(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                />
              </div>

              <div>
                <label htmlFor={`${formId}-packaging`} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Packaging Cost (SAR)' : 'التغليف ومواد الشحن (ريال)'}
                </label>
                <input
                  id={`${formId}-packaging`}
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
                <label htmlFor={`${formId}-payment`} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Payment Processing Fees (SAR)' : 'رسوم بوابة الدفع الإلكتروني (ريال)'}
                </label>
                <input
                  id={`${formId}-payment`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  placeholder={isEn ? 'e.g. 4.5' : 'مثال: 4.5'}
                  value={paymentFees}
                  onChange={(e) => setPaymentFees(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                />
              </div>

              <div>
                <label htmlFor={`${formId}-platform`} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Platform / Marketplace Fee (SAR)' : 'عمولة المنصة / وسيط البيع (ريال)'}
                </label>
                <input
                  id={`${formId}-platform`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  placeholder={isEn ? '0 if none' : '0 إذا كانت المنصة بدون عمولة'}
                  value={platformCommission}
                  onChange={(e) => setPlatformCommission(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                />
              </div>

              <div>
                <label htmlFor={`${formId}-ads`} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Ad Spend per Order (SAR)' : 'تكلفة الإعلانات المقدرة للطلب (ريال)'}
                </label>
                <input
                  id={`${formId}-ads`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  placeholder={isEn ? 'e.g. 40' : 'مثال: 40'}
                  value={adCost}
                  onChange={(e) => setAdCost(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                />
              </div>

              <div>
                <label htmlFor={`${formId}-other`} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Other Order Expenses (SAR)' : 'مصاريف أخرى للطلب (ريال)'}
                </label>
                <input
                  id={`${formId}-other`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  placeholder="0"
                  value={otherCost}
                  onChange={(e) => setOtherCost(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                />
              </div>
            </div>

            <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1.5 pt-2">
              <Info className="w-3.5 h-3.5 shrink-0" />
              {isEn
                ? 'Ensure all amounts are consistently entered either VAT-inclusive or VAT-exclusive for accurate results.'
                : 'تأكد من إدخال جميع المبالغ إما شاملة الضريبة أو غير شاملة لها لتحقيق دقة حسابية متسقة.'}
            </p>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 bg-slate-50/80 dark:bg-slate-950/60 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {isEn ? 'Calculation Results' : 'نتائج الحساب'}
                </span>
                {revenue > 0 && (
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                      isProfitable
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                        : isLoss
                        ? 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {isProfitable ? (
                      <>
                        <TrendingUp className="w-3.5 h-3.5" /> {isEn ? 'Profitable' : 'رابح'}
                      </>
                    ) : isLoss ? (
                      <>
                        <TrendingDown className="w-3.5 h-3.5" /> {isEn ? 'Loss' : 'خسارة'}
                      </>
                    ) : isEn ? (
                      'Break-Even'
                    ) : (
                      'تعادل'
                    )}
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    {isEn ? 'Net Profit per Order' : 'صافي الربح للطلب'}
                  </span>
                  <div
                    className={`text-2xl sm:text-3xl font-extrabold ${
                      isProfitable
                        ? 'text-teal-700 dark:text-teal-400'
                        : isLoss
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {formatSAR(netProfit, lang)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                      {isEn ? 'Total Expenses' : 'إجمالي المصاريف'}
                    </span>
                    <span className="text-base font-bold text-slate-800 dark:text-slate-100">
                      {formatSAR(totalExpenses, lang)}
                    </span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                      {isEn ? 'Net Profit Margin' : 'هامش صافي الربح'}
                    </span>
                    <span
                      className={`text-base font-bold ${
                        isProfitable
                          ? 'text-emerald-700 dark:text-emerald-400'
                          : isLoss
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-slate-800 dark:text-slate-100'
                      }`}
                    >
                      {formatPercent(margin, lang)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                {isEn ? 'Formula:' : 'معادلة الحساب:'}
              </span>
              {isEn ? (
                <>
                  Net Profit = Revenue - Total Expenses
                  <br />
                  Net Profit Margin = (Net Profit ÷ Revenue) × 100
                </>
              ) : (
                <>
                  صافي الربح = سعر البيع - إجمالي التكاليف
                  <br />
                  هامش صافي الربح = (صافي الربح ÷ سعر البيع) × 100
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
