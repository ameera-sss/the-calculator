import { useState, useId } from 'react';
import { CreditCard, RotateCcw, Info, Wallet } from 'lucide-react';
import { safeNumber, formatSAR } from '../../utils/formatters';
import { usePreferences } from '../../context/PreferencesContext';

export function SalesCommissionCalculator() {
  const formId = useId();
  const { lang } = usePreferences();
  const isEn = lang === 'en';

  const [orderValue, setOrderValue] = useState('300');
  const [commissionRate, setCommissionRate] = useState('2.5');
  const [fixedFee, setFixedFee] = useState('1');

  const handleReset = () => {
    setOrderValue('');
    setCommissionRate('');
    setFixedFee('');
  };

  const order = safeNumber(orderValue);
  const rate = safeNumber(commissionRate) / 100;
  const fixed = safeNumber(fixedFee);

  const percentageAmount = order * rate;
  const totalCommission = percentageAmount + fixed;
  const netRemaining = Math.max(0, order - totalCommission);

  return (
    <section id="sales-commission" className="scroll-mt-24 pt-6">
      <div className="print-card bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-8 transition-all hover:border-slate-300 dark:hover:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200/60 dark:border-teal-800/60 flex items-center justify-center text-teal-700 dark:text-teal-400">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {isEn ? 'Sales Commission & Payment Fees Calculator' : 'حاسبة عمولات البيع وبوابات الدفع'}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {isEn
                  ? 'Calculate payment gateway/platform deductions and remaining payout transferred to your bank.'
                  : 'احسب بدقة الرسوم المقتطعة من بوابات الدفع والمنصات وصافي المبلغ المحوّل لحسابك البنكي.'}
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor={`${formId}-val`} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Order Value (SAR) *' : 'قيمة الطلب الإجمالية (ريال) *'}
                </label>
                <input
                  id={`${formId}-val`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  placeholder="300"
                  value={orderValue}
                  onChange={(e) => setOrderValue(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                />
              </div>

              <div>
                <label htmlFor={`${formId}-rate`} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Commission Rate (%)' : 'نسبة العمولة (%)'}
                </label>
                <div className="relative">
                  <input
                    id={`${formId}-rate`}
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="any"
                    placeholder="2.5"
                    value={commissionRate}
                    onChange={(e) => setCommissionRate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                  />
                  <span className={`absolute ${isEn ? 'right-3' : 'left-3'} top-2.5 text-slate-400 text-sm font-bold`}>%</span>
                </div>
              </div>

              <div>
                <label htmlFor={`${formId}-fixed`} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Fixed Transaction Fee (SAR)' : 'الرسم الثابت للعملية (ريال)'}
                </label>
                <input
                  id={`${formId}-fixed`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  placeholder="1"
                  value={fixedFee}
                  onChange={(e) => setFixedFee(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                />
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1.5 pt-2 leading-relaxed">
              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
              <span>
                {isEn
                  ? 'Note: Rates vary by payment provider and method (Mada, Credit Cards, Apple Pay, Tabby, Tamara). Enter your exact agreed rates manually.'
                  : 'ملاحظة: تختلف الرسوم حسب مزود الخدمة ونوع البطاقة المستخدمة (مدى، بطاقة ائتمانية، آبل باي، تابي، تمارا)؛ يرجى إدخال النسب المحددة في لوحة تحكم متجرك.'}
              </span>
            </p>
          </div>

          {/* Results */}
          <div className="lg:col-span-5 bg-slate-50/80 dark:bg-slate-950/60 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {isEn ? 'Payout Details' : 'تفاصيل المستحقات'}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-200/80 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                  <Wallet className="w-3 h-3" /> {isEn ? 'Instant Calc' : 'تسوية فورية'}
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    {isEn ? 'Remaining Revenue After Fees' : 'صافي المبلغ المتبقي لمتجرك'}
                  </span>
                  <div className="text-3xl font-extrabold text-teal-700 dark:text-teal-400">
                    {formatSAR(netRemaining, lang)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                      {isEn ? 'Total Commission' : 'إجمالي العمولة والرسوم'}
                    </span>
                    <span className="text-base font-bold text-rose-600 dark:text-rose-400">
                      {formatSAR(totalCommission, lang)}
                    </span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                      {isEn ? 'Percentage Fee' : 'العمولة المئوية'}
                    </span>
                    <span className="text-base font-bold text-slate-800 dark:text-slate-100">
                      {formatSAR(percentageAmount, lang)}
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
                  Total Fees = (Order Value × Commission Rate) + Fixed Fee
                  <br />
                  Remaining = Order Value - Total Fees
                </>
              ) : (
                <>
                  إجمالي الرسوم = (قيمة الطلب × نسبة العمولة) + الرسم الثابت
                  <br />
                  صافي المتبقي = قيمة الطلب - إجمالي الرسوم
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
