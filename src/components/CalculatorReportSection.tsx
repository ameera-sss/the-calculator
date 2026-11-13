import { FileDown, Eye, EyeOff, Printer, CheckSquare, Square, Info, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';

export interface CalculatorMeta {
  id: string;
  name: string;
  nameEn: string;
  shortDesc: string;
}

interface CalculatorReportSectionProps {
  calculators: CalculatorMeta[];
  visibleCalculators: Record<string, boolean>;
  onToggleVisibility: (id: string) => void;
  onShowAll: () => void;
  onHideAll: () => void;
  onDownloadSinglePdf: (id: string) => void;
  onDownloadSelectedPdf: () => void;
  onPrintSelected: () => void;
  isGeneratingPdf?: boolean;
  pdfSuccessMsg?: string | null;
  pdfErrorMsg?: string | null;
}

export function CalculatorReportSection({
  calculators,
  visibleCalculators,
  onToggleVisibility,
  onShowAll,
  onHideAll,
  onDownloadSinglePdf,
  onDownloadSelectedPdf,
  onPrintSelected,
  isGeneratingPdf = false,
  pdfSuccessMsg = null,
  pdfErrorMsg = null,
}: CalculatorReportSectionProps) {
  const { lang } = usePreferences();
  const isEn = lang === 'en';

  const selectedCalculators = calculators.filter((c) => visibleCalculators[c.id]);
  const selectedCount = selectedCalculators.length;

  return (
    <section id="pdf-reports" className="scroll-mt-24 pt-4 print:hidden">
      <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 px-3 py-1 rounded-full mb-2.5">
              <FileDown className="w-3.5 h-3.5" />
              <span>{isEn ? 'Direct PDF Financial Reports' : 'تقارير مالية بصيغة PDF'}</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              {isEn
                ? 'Download PDF Reports & Customize Visible Calculators'
                : 'تحميل تقرير PDF وتخصيص الحاسبات الظاهرة'}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              {isEn
                ? 'Hide calculators you do not need to avoid overlap, then download an instant PDF report for each selected calculator or all selected calculators together.'
                : 'قم بإخفاء الحاسبات التي لا تحتاجها لتجنب التداخل، ثم حمّل ملف PDF مباشرة لكل حاسبة مختارة أو احفظ التقرير الشامل لجميع الحاسبات المختارة.'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onShowAll}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900/60 border border-teal-200 dark:border-teal-800 transition cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              {isEn ? 'Show All' : 'إظهار الكل'}
            </button>
            <button
              type="button"
              onClick={onHideAll}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
            >
              <EyeOff className="w-3.5 h-3.5" />
              {isEn ? 'Hide All' : 'إخفاء الكل'}
            </button>
          </div>
        </div>

        {/* Success & Error Toast Banners */}
        {pdfSuccessMsg && (
          <div className="mt-5 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{pdfSuccessMsg}</span>
          </div>
        )}
        {pdfErrorMsg && (
          <div className="mt-5 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-900 dark:text-red-200 text-xs sm:text-sm font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
            <span>{pdfErrorMsg}</span>
          </div>
        )}

        {/* Calculator Selection & Individual PDF Export Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-6">
          {calculators.map((calc) => {
            const isSelected = Boolean(visibleCalculators[calc.id]);
            const displayName = isEn ? calc.nameEn : calc.name;
            return (
              <div
                key={calc.id}
                className={`flex items-center justify-between gap-3 p-4 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-white dark:bg-slate-800/80 border-teal-200 dark:border-teal-800/70 shadow-xs'
                    : 'bg-slate-100/70 dark:bg-slate-950/50 border-slate-200/80 dark:border-slate-800 opacity-75'
                }`}
              >
                <button
                  type="button"
                  onClick={() => onToggleVisibility(calc.id)}
                  className={`flex items-center gap-3 ${isEn ? 'text-left' : 'text-right'} flex-1 min-w-0 cursor-pointer focus:outline-none`}
                  aria-pressed={isSelected}
                >
                  {isSelected ? (
                    <CheckSquare className="w-5 h-5 text-teal-700 dark:text-teal-400 shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" />
                  )}
                  <div className="min-w-0">
                    <span className="block text-sm font-bold text-slate-900 dark:text-white truncate">
                      {displayName}
                    </span>
                    <span className="block text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {isSelected
                        ? isEn
                          ? 'Visible & included in report'
                          : 'ظاهرة ومدرجة في التقرير'
                        : isEn
                        ? 'Hidden from display & report'
                        : 'مخفية من العرض والتقرير'}
                    </span>
                  </div>
                </button>

                {isSelected ? (
                  <button
                    type="button"
                    disabled={isGeneratingPdf}
                    onClick={() => onDownloadSinglePdf(calc.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-700 dark:hover:bg-teal-700 hover:text-white dark:hover:text-white border border-teal-200 dark:border-teal-800 transition shrink-0 cursor-pointer disabled:opacity-50"
                    title={isEn ? `Download PDF for ${displayName}` : `تحميل تقرير PDF لـ ${displayName}`}
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Download PDF' : 'تحميل PDF'}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onToggleVisibility(calc.id)}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition shrink-0 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Show' : 'إظهار'}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Combined Download & Print Action Bar */}
        <div className="pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            <Info className="w-4 h-4 text-teal-700 dark:text-teal-400 shrink-0 mt-0.5" />
            <span>
              {isEn
                ? 'PDF files are generated locally inside your browser with your exact entered numbers—zero data is uploaded.'
                : 'يتم توليد وتنزيل ملفات PDF محلياً داخل متصفحك بأرقامك المدخلة دون إرسال أي بيانات لخوادم خارجية.'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              disabled={selectedCount === 0 || isGeneratingPdf}
              onClick={onPrintSelected}
              className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition border ${
                selectedCount > 0 && !isGeneratingPdf
                  ? 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 cursor-pointer'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border-slate-200 dark:border-slate-800 cursor-not-allowed'
              }`}
            >
              <Printer className="w-4 h-4" />
              <span>{isEn ? 'Print View' : 'طباعة مباشرة'}</span>
            </button>

            <button
              type="button"
              disabled={selectedCount === 0 || isGeneratingPdf}
              onClick={onDownloadSelectedPdf}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition ${
                selectedCount > 0 && !isGeneratingPdf
                  ? 'bg-teal-700 hover:bg-teal-800 text-white shadow-sm shadow-teal-700/20 cursor-pointer'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
              }`}
            >
              {isGeneratingPdf ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <FileDown className="w-4 h-4" />
              )}
              <span>
                {isGeneratingPdf
                  ? isEn
                    ? 'Generating PDF...'
                    : 'جاري تجهيز الملف...'
                  : isEn
                  ? `Download Combined PDF (${selectedCount})`
                  : `تحميل تقرير PDF للمختارة (${selectedCount})`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
