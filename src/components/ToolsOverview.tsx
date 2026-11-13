import {
  DollarSign,
  Tag,
  Percent,
  BadgePercent,
  Receipt,
  Target,
  CreditCard,
  Layers,
  ArrowDownLeft,
  ArrowDownRight,
} from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';

interface ToolItem {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
}

interface ToolsOverviewProps {
  onSelectTool?: (id: string) => void;
}

export function ToolsOverview({ onSelectTool }: ToolsOverviewProps) {
  const { lang } = usePreferences();
  const isEn = lang === 'en';

  const tools: ToolItem[] = [
    {
      id: 'net-profit',
      name: isEn ? 'Net Profit Calculator' : 'حاسبة صافي الربح',
      description: isEn
        ? 'Calculate real remaining profit after deducting product cost, shipping, packaging, gateway fees, and ad spend.'
        : 'احسب الأرباح الفعلية المتبقية بعد خصم تكلفة المنتج، الشحن، التغليف، وبوابات الدفع والتسويق.',
      icon: DollarSign,
      badge: isEn ? 'Most Popular' : 'الأكثر استخداماً',
    },
    {
      id: 'selling-price',
      name: isEn ? 'Selling Price Calculator' : 'حاسبة سعر البيع',
      description: isEn
        ? 'Find the ideal selling price that covers all variable fees and secures your exact target profit margin.'
        : 'حدد سعر البيع المثالي الذي يغطي كافة الرسوم المتغيرة ويضمن هامش الربح الذي تستهدفه بدقة جبرية.',
      icon: Tag,
      badge: isEn ? 'Smart Pricing' : 'تسعير ذكي',
    },
    {
      id: 'profit-margin',
      name: isEn ? 'Profit Margin Calculator' : 'حاسبة هامش الربح',
      description: isEn
        ? 'Compare Profit Margin vs. Markup percentage and avoid common e-commerce pricing mistakes.'
        : 'قارن بين هامش الربح المئوي (Margin) ونسبة الزيادة على التكلفة (Markup) وتجنب الأخطاء المحاسبية.',
      icon: Percent,
      badge: isEn ? 'Financial Analysis' : 'تحليل مالي',
    },
    {
      id: 'discount',
      name: isEn ? 'Discount Calculator' : 'حاسبة الخصومات',
      description: isEn
        ? 'Calculate final discounted prices and savings amounts accurately for seasonal sales and promo codes.'
        : 'احسب السعر النهائي وقيمة التوفير المالي لحملاتك الترويجية ومواسم التخفيضات بدقة.',
      icon: BadgePercent,
      badge: isEn ? 'Promos & Offers' : 'عروض وتخفيضات',
    },
    {
      id: 'vat',
      name: isEn ? 'VAT Calculator' : 'حاسبة ضريبة القيمة المضافة',
      description: isEn
        ? 'Add 15% Saudi VAT to a base price or extract VAT cleanly from a tax-inclusive total price.'
        : 'أضف ضريبة 15% على السعر الأساسي أو استخرج مبلغ الضريبة بسهولة من السعر الشامل.',
      icon: Receipt,
      badge: isEn ? '15% VAT' : 'ضريبة 15%',
    },
    {
      id: 'break-even',
      name: isEn ? 'Break-Even Calculator' : 'حاسبة نقطة التعادل',
      description: isEn
        ? 'Discover the monthly units and sales revenue required to cover your fixed store costs.'
        : 'اعرف عدد الطلبات والمبيعات الشهرية المطلوبة لتغطية تكاليفك الثابتة والبدء في جني الأرباح.',
      icon: Target,
      badge: isEn ? 'Operations' : 'تخطيط تشغيلي',
    },
    {
      id: 'sales-commission',
      name: isEn ? 'Sales Commission Calculator' : 'حاسبة عمولات البيع',
      description: isEn
        ? 'Calculate payment gateway & platform fees (Mada, Visa, Apple Pay) and your net bank payout.'
        : 'احسب رسوم بوابات الدفع والمنصات (مدى، فيزا، آبل باي) وصافي المبالغ المحولة لحسابك.',
      icon: CreditCard,
      badge: isEn ? 'Payment Gateways' : 'بوابات الدفع',
    },
    {
      id: 'order-cost',
      name: isEn ? 'Order Cost Calculator' : 'حاسبة تكلفة الطلب',
      description: isEn
        ? 'Analyze order expense items and view each cost share in a lightweight visual breakdown.'
        : 'حلل توزيع تكاليف الطلب واكتشف البنود الأكثر استهلاكاً لميزانيتك برسم بياني خفيف.',
      icon: Layers,
      badge: isEn ? 'Cost Structure' : 'هيكل التكاليف',
    },
  ];

  const handleScrollToTool = (id: string) => {
    if (onSelectTool) {
      onSelectTool(id);
    }
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${id}`);
      }
    }, 30);
  };

  const ArrowIcon = isEn ? ArrowDownRight : ArrowDownLeft;

  return (
    <section id="tools" className="scroll-mt-20 py-12 sm:py-16 print:hidden">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-block text-xs font-bold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 border border-teal-200/80 dark:border-teal-800 px-3 py-1 rounded-full mb-3">
          {isEn ? '8 Completely Free Calculators' : '8 حاسبات مجانية بالكامل'}
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {isEn ? 'Choose the Right Tool for Your Store' : 'اختر الأداة المناسبة لمتجرك'}
        </h2>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {isEn
            ? 'All tools run instantly in your browser without uploading or storing any data, tailored for Saudi e-commerce.'
            : 'جميع الأدوات تعمل مباشرة وسريعاً داخل متصفحك دون إرسال أو تخزين أي بيانات، ومصممة خصيصاً للتجارة الإلكترونية في السعودية.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.id}
              className="group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/90 dark:border-slate-800 hover:border-teal-500/50 dark:hover:border-teal-500/60 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center group-hover:bg-teal-700 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md">
                    {tool.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  {tool.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleScrollToTool(tool.id)}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-50/80 dark:bg-teal-950/60 hover:bg-teal-700 dark:hover:bg-teal-700 hover:text-white dark:hover:text-white transition-all group-hover:shadow-xs cursor-pointer"
              >
                <span>{isEn ? 'Use Tool' : 'استخدم الأداة'}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
