import { useState, useId } from 'react';
import { Receipt, RotateCcw, Info, ArrowDownUp } from 'lucide-react';
import { safeNumber, formatSAR } from '../../utils/formatters';
import { SITE_CONFIG } from '../../config/site';
import { usePreferences } from '../../context/PreferencesContext';

export function VatCalculator() {
  const formId = useId();
  const { lang } = usePreferences();
  const isEn = lang === 'en';

  const [mode, setMode] = useState<'add' | 'extract'>('extract');
  const [inputAmount, setInputAmount] = useState('115');
  const [vatRate, setVatRate] = useState(String(SITE_CONFIG.defaultVatRate));

  const handleReset = () => {
    setInputAmount('');
    setVatRate(String(SITE_CONFIG.defaultVatRate));
  };

  const amount = safeNumber(inputAmount);
  const rate = safeNumber(vatRate) / 100;

  let priceBeforeTax = 0;
  let taxAmount = 0;
  let priceAfterTax = 0;

  if (amount > 0 && rate >= 0) {
    if (mode === 'add') {
      priceBeforeTax = amount;
      taxAmount = priceBeforeTax * rate;
      priceAfterTax = priceBeforeTax + taxAmount;
    } else {
      priceAfterTax = amount;
      priceBeforeTax = priceAfterTax / (1 + rate);
      taxAmount = priceAfterTax - priceBeforeTax;
    }
  }

  return (
    <section id="vat" className="scroll-mt-24 pt-6">
      <div className="print-card bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-8 transition-all hover:border-slate-300 dark:hover:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200/60 dark:border-teal-800/60 flex items-center justify-center text-teal-700 dark:text-teal-400">
              <Receipt className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {isEn ? 'VAT Calculator (15%)' : 'حاسبة ضريبة القيمة المضافة (VAT)'}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {isEn
                  ? 'Add 15% VAT to a base price or extract VAT from a tax-inclusive price.'
                  : 'أضف الضريبة (15%) على السعر الأساسي أو استخرج مبلغ الضريبة من السعر الإجمالي الشامل.'}
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

        {/* Mode Selector Tabs */}
        <div className="pt-6 pb-2">
          <div className="inline-flex flex-wrap p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 gap-1">
            <button
              type="button"
              onClick={() => {
                setMode('extract');
                if (inputAmount === '100') setInputAmount('115');
              }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                mode === 'extract'
                  ? 'bg-white dark:bg-slate-900 text-teal-800 dark:text-teal-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ArrowDownUp className="w-3.5 h-3.5" />
              {isEn ? 'Extract VAT from Inclusive Price' : 'استخراج الضريبة من السعر الشامل'}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('add');
                if (inputAmount === '115') setInputAmount('100');
              }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                mode === 'add'
                  ? 'bg-white dark:bg-slate-900 text-teal-800 dark:text-teal-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Receipt className="w-3.5 h-3.5" />
              {isEn ? 'Add VAT to Base Price' : 'إضافة الضريبة إلى السعر قبل الضريبة'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          {/* Inputs */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`${formId}-amount`} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {mode === 'extract'
                    ? isEn
                      ? 'Tax-Inclusive Total Price (SAR) *'
                      : 'السعر الإجمالي شامل الضريبة (ريال) *'
                    : isEn
                    ? 'Base Price Before Tax (SAR) *'
                    : 'السعر الأساسي قبل الضريبة (ريال) *'}
                </label>
                <input
                  id={`${formId}-amount`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  placeholder={mode === 'extract' ? '115' : '100'}
                  value={inputAmount}
                  onChange={(e) => setInputAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                />
              </div>

              <div>
                <label htmlFor={`${formId}-rate`} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'VAT Rate (%) *' : 'نسبة الضريبة (%) *'}
                </label>
                <div className="relative">
                  <input
                    id={`${formId}-rate`}
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="any"
                    placeholder="15"
                    value={vatRate}
                    onChange={(e) => setVatRate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
                  />
                  <span className={`absolute ${isEn ? 'right-3' : 'left-3'} top-2.5 text-slate-400 text-sm font-bold`}>%</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1.5 pt-2 leading-relaxed">
              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
              <span>
                {isEn
                  ? 'Note: This tool provides mathematical calculations only and does not replace professional tax advice or ZATCA regulations.'
                  : 'تنبيه: هذه الحاسبة توفر عمليات حسابية رياضية ولا تُعد استشارة ضريبية متخصصة أو بديلاً عن اللوائح الصادرة عن هيئة الزكاة والضريبة والجمارك (ZATCA).'}
              </span>
            </p>
          </div>

          {/* Results */}
          <div className="lg:col-span-5 bg-slate-50/80 dark:bg-slate-950/60 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-4">
                {isEn ? 'Tax Breakdown' : 'تفاصيل الفاتورة الضريبية'}
              </span>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    {mode === 'extract'
                      ? isEn
                        ? 'Net Price (Before VAT)'
                        : 'السعر الصافي (قبل الضريبة)'
                      : isEn
                      ? 'Total Price (VAT Inclusive)'
                      : 'السعر الإجمالي (شامل الضريبة)'}
                  </span>
                  <div className="text-3xl font-extrabold text-teal-700 dark:text-teal-400">
                    {mode === 'extract' ? formatSAR(priceBeforeTax, lang) : formatSAR(priceAfterTax, lang)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                      {isEn ? `VAT Amount (${vatRate}%)` : `مبلغ الضريبة (${vatRate}%)`}
                    </span>
                    <span className="text-base font-bold text-amber-700 dark:text-amber-400">
                      {formatSAR(taxAmount, lang)}
                    </span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                      {mode === 'extract'
                        ? isEn
                          ? 'Inclusive Input'
                          : 'السعر الشامل المدخل'
                        : isEn
                        ? 'Base Price'
                        : 'السعر الأساسي'}
                    </span>
                    <span className="text-base font-bold text-slate-800 dark:text-slate-100">
                      {formatSAR(amount, lang)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 leading-relaxed space-y-1">
              {isEn ? (
                <>
                  <div>• Inclusive Price = Base Price × (1 + VAT Rate)</div>
                  <div>• Base Price = Inclusive Price ÷ (1 + VAT Rate)</div>
                </>
              ) : (
                <>
                  <div>• السعر شامل الضريبة = السعر الأساسي × (1 + نسبة الضريبة)</div>
                  <div>• السعر غير شامل الضريبة = السعر الشامل ÷ (1 + نسبة الضريبة)</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
