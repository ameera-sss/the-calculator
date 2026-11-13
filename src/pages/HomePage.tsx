import { useState, useEffect } from 'react';
import { EyeOff, Eye, FileDown, SlidersHorizontal, CheckCircle2, AlertCircle } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { HeroSection } from '../components/HeroSection';
import { ToolsOverview } from '../components/ToolsOverview';
import { CalculatorReportSection, CalculatorMeta } from '../components/CalculatorReportSection';
import { ExternalLinksSection } from '../components/ExternalLinksSection';
import { EducationalSection } from '../components/EducationalSection';
import { AdSlot } from '../components/AdSlot';
import { NetProfitCalculator } from '../components/calculators/NetProfitCalculator';
import { SellingPriceCalculator } from '../components/calculators/SellingPriceCalculator';
import { ProfitMarginCalculator } from '../components/calculators/ProfitMarginCalculator';
import { DiscountCalculator } from '../components/calculators/DiscountCalculator';
import { VatCalculator } from '../components/calculators/VatCalculator';
import { BreakEvenCalculator } from '../components/calculators/BreakEvenCalculator';
import { SalesCommissionCalculator } from '../components/calculators/SalesCommissionCalculator';
import { OrderCostCalculator } from '../components/calculators/OrderCostCalculator';
import { SITE_CONFIG } from '../config/site';
import { usePreferences } from '../context/PreferencesContext';
import { generateCalculatorsPdfReport } from '../utils/pdfReportGenerator';

interface CalculatorEntry extends CalculatorMeta {
  Component: React.ComponentType;
}

const CALCULATOR_LIST: CalculatorEntry[] = [
  {
    id: 'net-profit',
    name: 'حاسبة صافي الربح',
    nameEn: 'Net Profit Calculator',
    shortDesc: 'حساب صافي الربح والهامش لكل طلب',
    Component: NetProfitCalculator,
  },
  {
    id: 'selling-price',
    name: 'حاسبة سعر البيع',
    nameEn: 'Selling Price Calculator',
    shortDesc: 'تحديد سعر البيع المثالي بالمعادلة الجبرية',
    Component: SellingPriceCalculator,
  },
  {
    id: 'profit-margin',
    name: 'حاسبة هامش الربح ونسبة الزيادة',
    nameEn: 'Profit Margin & Markup Calculator',
    shortDesc: 'المقارنة بين Margin و Markup',
    Component: ProfitMarginCalculator,
  },
  {
    id: 'discount',
    name: 'حاسبة الخصومات والعروض',
    nameEn: 'Discount Calculator',
    shortDesc: 'حساب السعر النهائي وقيمة التوفير',
    Component: DiscountCalculator,
  },
  {
    id: 'vat',
    name: 'حاسبة ضريبة القيمة المضافة (VAT)',
    nameEn: 'VAT Calculator (15%)',
    shortDesc: 'إضافة واستخراج ضريبة 15%',
    Component: VatCalculator,
  },
  {
    id: 'break-even',
    name: 'حاسبة نقطة التعادل',
    nameEn: 'Break-Even Point Calculator',
    shortDesc: 'تحديد حجم المبيعات لتغطية التكاليف',
    Component: BreakEvenCalculator,
  },
  {
    id: 'sales-commission',
    name: 'حاسبة عمولات البيع وبوابات الدفع',
    nameEn: 'Sales Commission Calculator',
    shortDesc: 'حساب رسوم البوابات وصافي المحوّل',
    Component: SalesCommissionCalculator,
  },
  {
    id: 'order-cost',
    name: 'حاسبة تكلفة الطلب وتوزيع المصاريف',
    nameEn: 'Order Cost Calculator',
    shortDesc: 'تحليل توزيع تكاليف الطلب الواحد',
    Component: OrderCostCalculator,
  },
];

export function HomePage() {
  const { lang } = usePreferences();
  const isEn = lang === 'en';

  const [visibleCalculators, setVisibleCalculators] = useState<Record<string, boolean>>(() =>
    CALCULATOR_LIST.reduce((acc, item) => ({ ...acc, [item.id]: true }), {})
  );
  const [printTargetId, setPrintTargetId] = useState<string | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfSuccessMsg, setPdfSuccessMsg] = useState<string | null>(null);
  const [pdfErrorMsg, setPdfErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const handleAfterPrint = () => {
      setPrintTargetId(null);
    };
    window.addEventListener('afterprint', handleAfterPrint);
    return () => window.removeEventListener('afterprint', handleAfterPrint);
  }, []);

  const toggleCalculatorVisibility = (id: string) => {
    setVisibleCalculators((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const showCalculator = (id: string) => {
    setVisibleCalculators((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const showAllCalculators = () => {
    setVisibleCalculators(
      CALCULATOR_LIST.reduce((acc, item) => ({ ...acc, [item.id]: true }), {})
    );
  };

  const hideAllCalculators = () => {
    setVisibleCalculators(
      CALCULATOR_LIST.reduce((acc, item) => ({ ...acc, [item.id]: false }), {})
    );
  };

  const handleDownloadPdf = async (targetIds: string[], singleTitle?: string) => {
    if (targetIds.length === 0 || isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    setPdfSuccessMsg(null);
    setPdfErrorMsg(null);
    try {
      const ok = await generateCalculatorsPdfReport(targetIds, lang, singleTitle);
      if (ok) {
        setPdfSuccessMsg(
          isEn
            ? 'PDF report generated and downloaded successfully!'
            : 'تم إنشاء وتحميل ملف تقرير PDF بنجاح!'
        );
        setTimeout(() => setPdfSuccessMsg(null), 5000);
      } else {
        setPdfErrorMsg(
          isEn
            ? 'Unable to read calculator values. Please make sure at least one calculator is visible.'
            : 'تعذر قراءة بيانات الحاسبة. يرجى التأكد من إظهار حاسبة واحدة على الأقل.'
        );
      }
    } catch (err) {
      console.error('PDF generation failed:', err);
      setPdfErrorMsg(
        isEn
          ? 'Could not generate the PDF file. Please try again or use Direct Print.'
          : 'تعذر إنشاء ملف PDF في المتصفح. يرجى المحاولة مرة أخرى أو استخدام زر الطباعة المباشرة.'
      );
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const triggerPrint = (targetId: string | null) => {
    setPrintTargetId(targetId);
    setTimeout(() => {
      window.print();
    }, 80);
  };

  const selectedIds = CALCULATOR_LIST.filter((c) => visibleCalculators[c.id]).map((c) => c.id);
  const hiddenCount = CALCULATOR_LIST.length - selectedIds.length;
  const activePrintCalculator = printTargetId
    ? CALCULATOR_LIST.find((c) => c.id === printTargetId)
    : null;

  const formattedToday = new Date().toLocaleDateString(isEn ? 'en-US' : 'ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: isEn ? SITE_CONFIG.nameEn : SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    inLanguage: lang,
  };

  return (
    <>
      <SEOHead
        title={
          isEn
            ? `${SITE_CONFIG.nameEn} | Free Saudi E-commerce Financial Calculators`
            : `${SITE_CONFIG.name} | ${SITE_CONFIG.headline}`
        }
        description={
          isEn
            ? 'Calculate selling prices, net profit margins, gateway commissions, break-even points, and 15% VAT locally with zero registration.'
            : SITE_CONFIG.description
        }
        canonicalPath="/"
        schema={schema}
      />

      {/* Print-Only Report Header */}
      <div className="hidden print:block mb-6 pb-4 border-b-2 border-teal-700">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">
              {activePrintCalculator
                ? isEn
                  ? `${activePrintCalculator.nameEn} Report`
                  : `تقرير ${activePrintCalculator.name}`
                : isEn
                ? 'Comprehensive Store Financial Report'
                : 'التقرير المالي الشامل لمتجرك الإلكتروني'}
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              {isEn
                ? `Generated via ${SITE_CONFIG.nameEn} — Saudi E-commerce Calculators`
                : `صادر عبر منصة ${SITE_CONFIG.name} — حاسبات التجارة الإلكترونية في السعودية`}
            </p>
          </div>
          <div className={`${isEn ? 'text-right' : 'text-left'} text-xs text-slate-600`}>
            <span className="block font-bold text-slate-800">
              {isEn ? 'Report Date:' : 'تاريخ التقرير:'}
            </span>
            <span>{formattedToday}</span>
          </div>
        </div>
      </div>

      <HeroSection />

      {/* Optional AdSlot 1 (Disabled by default) */}
      <div className="print:hidden">
        <AdSlot slotId={SITE_CONFIG.ads.slots.homepageBanner} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 print:space-y-6 print:px-0">
        <ToolsOverview onSelectTool={showCalculator} />

        <div className="pt-4 pb-2 border-t border-slate-200 dark:border-slate-800 print:hidden">
          <div className="text-center max-w-2xl mx-auto my-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {isEn ? 'Live Financial Calculators' : 'الحاسبات المالية المباشرة'}
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {isEn
                ? 'Enter your values below for instant results, hide calculators you do not need, or download PDF reports.'
                : 'أدخل قيمتك أدناه واحصل على النتائج فورياً، ويمكنك إخفاء أي حاسبة لا تحتاجها أو تحميل تقرير PDF لها.'}
            </p>
          </div>

          {pdfSuccessMsg && (
            <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{pdfSuccessMsg}</span>
            </div>
          )}
          {pdfErrorMsg && (
            <div className="mb-4 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-900 dark:text-red-200 text-xs sm:text-sm font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
              <span>{pdfErrorMsg}</span>
            </div>
          )}

          {/* Hidden Calculators Quick Restore Bar */}
          {hiddenCount > 0 && (
            <div className="mb-4 p-4 rounded-2xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-900 dark:text-amber-200 font-semibold">
                <SlidersHorizontal className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
                <span>
                  {isEn
                    ? `${hiddenCount} calculator(s) currently hidden and excluded from PDF reports.`
                    : `يوجد حالياً ${hiddenCount} ${hiddenCount === 1 ? 'حاسبة مخفية' : 'حاسبات مخفية'} ولن تظهر في تقرير PDF.`}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="#pdf-reports"
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-amber-900 dark:text-amber-200 bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-slate-800 transition"
                >
                  {isEn ? 'Manage Reports' : 'إدارة الحاسبات والتقارير'}
                </a>
                <button
                  type="button"
                  onClick={showAllCalculators}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 transition cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  {isEn ? 'Show All' : 'إظهار الكل'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Empty State if all calculators are hidden */}
        {hiddenCount === CALCULATOR_LIST.length && (
          <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 text-center print:hidden">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
              {isEn
                ? 'All calculators are currently hidden.'
                : 'قمت بإخفاء جميع الحاسبات حالياً.'}
            </p>
            <button
              type="button"
              onClick={showAllCalculators}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>{isEn ? 'Show All Calculators' : 'إعادة إظهار جميع الحاسبات'}</span>
            </button>
          </div>
        )}

        {/* The 8 Dedicated Calculator Sections */}
        <div className="space-y-12 print:space-y-6">
          {CALCULATOR_LIST.map(({ id, name, nameEn, Component }) => {
            const isVisible = Boolean(visibleCalculators[id]);
            const isExcludedFromSinglePrint = printTargetId !== null && printTargetId !== id;
            const displayName = isEn ? nameEn : name;

            return (
              <div
                key={id}
                className={
                  !isVisible
                    ? 'hidden print:hidden'
                    : isExcludedFromSinglePrint
                    ? 'print:hidden'
                    : 'print-avoid-break'
                }
              >
                {/* Per-Calculator Quick Visibility & PDF Controls */}
                <div className="flex items-center justify-end gap-2 -mb-3 px-2 print:hidden">
                  <button
                    type="button"
                    disabled={isGeneratingPdf}
                    onClick={() => handleDownloadPdf([id], displayName)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-t-xl text-xs font-bold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/80 hover:bg-teal-700 dark:hover:bg-teal-700 hover:text-white dark:hover:text-white border border-b-0 border-teal-200 dark:border-teal-800 transition cursor-pointer disabled:opacity-50"
                    title={isEn ? `Download PDF for ${displayName}` : `تحميل تقرير PDF لـ ${displayName}`}
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Download PDF' : 'تحميل PDF'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleCalculatorVisibility(id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-t-xl text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-b-0 border-slate-200 dark:border-slate-700 transition cursor-pointer"
                    title={isEn ? `Hide ${displayName}` : `إخفاء ${displayName}`}
                  >
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Hide Calculator' : 'إخفاء الحاسبة'}</span>
                  </button>
                </div>

                <Component />
              </div>
            );
          })}
        </div>

        {/* PDF Report Export & Visibility Management Section */}
        <CalculatorReportSection
          calculators={CALCULATOR_LIST}
          visibleCalculators={visibleCalculators}
          onToggleVisibility={toggleCalculatorVisibility}
          onShowAll={showAllCalculators}
          onHideAll={hideAllCalculators}
          onDownloadSinglePdf={(id) => {
            const found = CALCULATOR_LIST.find((c) => c.id === id);
            handleDownloadPdf([id], found ? (isEn ? found.nameEn : found.name) : undefined);
          }}
          onDownloadSelectedPdf={() => handleDownloadPdf(selectedIds)}
          onPrintSelected={() => triggerPrint(null)}
          isGeneratingPdf={isGeneratingPdf}
          pdfSuccessMsg={pdfSuccessMsg}
          pdfErrorMsg={pdfErrorMsg}
        />

        {/* External Links Section for Saudi E-commerce Platforms */}
        <ExternalLinksSection />

        {/* Optional AdSlot 2 (Disabled by default) */}
        <div className="print:hidden">
          <AdSlot slotId={SITE_CONFIG.ads.slots.afterCalculators} />
        </div>

        {/* Educational Content Section */}
        <EducationalSection />
      </div>

      {/* Print-Only Report Footer */}
      <div className="hidden print:block mt-8 pt-4 border-t border-slate-300 text-[11px] text-slate-500 text-center">
        {isEn
          ? 'Results shown in this report are estimates based on user inputs and do not constitute specialized financial or tax advice. Generated locally with zero server data transmission.'
          : 'النتائج الموضحة في هذا التقرير تقديرية وتعتمد على البيانات المدخلة من قِبل المستخدم، ولا تُعد استشارة مالية أو ضريبية متخصصة. تم إنشاء التقرير محلياً دون إرسال بياناتك إلى أي خادم.'}
      </div>
    </>
  );
}
