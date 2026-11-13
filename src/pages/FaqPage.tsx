import { useState } from 'react';
import { HelpCircle, ChevronDown, ShieldCheck, ArrowLeft, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Link } from '../utils/router';
import { usePreferences } from '../context/PreferencesContext';

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { lang } = usePreferences();
  const isEn = lang === 'en';
  const ForwardArrow = isEn ? ArrowRight : ArrowLeft;

  const faqs: FaqItem[] = isEn
    ? [
        {
          question: '1. Are all calculators free to use?',
          answer:
            'Yes, every calculator and financial tool on the platform is 100% free with unlimited access and no monthly subscriptions.',
        },
        {
          question: '2. Do I need to create an account?',
          answer:
            'No. None of the tools require registration, login, or entering an email address. You can start calculating immediately.',
        },
        {
          question: '3. Are my calculation inputs stored anywhere?',
          answer:
            'No. All calculations execute locally inside your browser. Your prices, margins, and costs are never sent to external servers or stored in databases.',
        },
        {
          question: '4. Do the tools work on mobile devices?',
          answer:
            'Yes, the entire interface is mobile-first and fully responsive across smartphones, tablets, and desktop screens.',
        },
        {
          question: '5. How do I calculate online store net profit?',
          answer:
            'Subtract all direct and operating expenses (product cost, shipping, packaging, payment gateway fees, platform fees, and ad spend) from your selling price.',
        },
        {
          question: '6. Can these tools be used for Salla and Zid stores?',
          answer:
            'Yes, the calculators are built specifically for Saudi e-commerce merchants on Salla, Zid, Shopify, Noon, and Amazon, allowing full manual fee customization.',
        },
        {
          question: '7. Are payment commission rates hardcoded?',
          answer:
            'No. Gateway fees differ across Mada, Visa/Mastercard, Apple Pay, Tabby, and Tamara depending on your merchant plan, so all fee fields are editable.',
        },
        {
          question: '8. Is the VAT calculator suitable for Saudi Arabia?',
          answer:
            'Yes, it defaults to the 15% Saudi VAT rate and supports both adding VAT and extracting VAT from tax-inclusive prices, while allowing custom tax rates.',
        },
        {
          question: '9. What is the difference between Profit Margin and Markup?',
          answer:
            'Profit Margin is profit divided by selling price (max 100%), whereas Markup is profit divided by product cost (can exceed 100%).',
        },
        {
          question: '10. Do the calculators require an active internet connection?',
          answer:
            'An initial connection is needed to load the website files, after which all calculations run locally inside your browser without network requests.',
        },
      ]
    : [
        {
          question: '1. هل استخدام الأدوات مجاني؟',
          answer:
            'نعم، جميع الأدوات والحاسبات المتاحة على المنصة مجانية بنسبة 100% ولا تتطلب أي رسوم أو اشتراكات شهرية، ومتاحة للاستخدام غير المحدود لجميع التجار.',
        },
        {
          question: '2. هل أحتاج إلى إنشاء حساب؟',
          answer:
            'لا، لا يتطلب استخدام أي من الأدوات إنشاء حساب أو تسجيل دخول أو إدخال بريد إلكتروني. يمكنك الدخول واستخدام الحاسبات مباشرة وبشكل فوري.',
        },
        {
          question: '3. هل يتم حفظ بيانات الحسابات التي أدخلها؟',
          answer:
            'لا يتم حفظ أي أرقام أو أسعار أو تكاليف تُدخلها في الحاسبات؛ كل العمليات الحسابية تُنفذ محلياً داخل متصفحك ولا تُرسل إطلاقاً لأي خوادم خارجية أو قواعد بيانات، وتُحذف تلقائياً بمجرد إغلاق الصفحة.',
        },
        {
          question: '4. هل تعمل الأدوات على الجوال؟',
          answer:
            'نعم، تم تصميم المنصة بالكامل لتكون متوافقة تماماً مع شاشات الهواتف الذكية والأجهزة اللوحية والحواسيب المكتبية، مع واجهات لمسية مريحة وتصميم متجاوب.',
        },
        {
          question: '5. كيف أحسب صافي ربح المتجر الإلكتروني؟',
          answer:
            'يُحسب صافي الربح بطرح إجمالي التكاليف المباشرة والتشغيلية (تكلفة المنتج، الشحن، التغليف، رسوم بوابات الدفع، عمولة المنصة، وتكلفة الإعلانات) من إجمالي سعر البيع المحصل من العميل.',
        },
        {
          question: '6. هل يمكن استخدام الأدوات لمتاجر سلة وزد؟',
          answer:
            'نعم، صُممت الأدوات خصيصاً لمساعدة أصحاب المتاجر في السعودية، بما في ذلك المتاجر التي تعمل على منصات سلة وزد وشوبيفاي ونون وأمازون، حيث تتيح لك تخصيص نسب العمولات والرسوم حسب باقتك.',
        },
        {
          question: '7. هل نسب العمولات ثابتة؟',
          answer:
            'لا، تختلف نسب العمولات ورسوم بوابات الدفع بحسب وسيلة الدفع (مدى، فيزا/ماستركارد، آبل باي، تابي، تمارا) وبحسب الاتفاقية مع مزود الخدمة؛ لذلك تتيح لك حاسباتنا إدخال النسب الخاصة بك يدوياً لدقة تامة.',
        },
        {
          question: '8. هل حاسبة الضريبة مناسبة للسعودية؟',
          answer:
            'نعم، تعتمد حاسبة ضريبة القيمة المضافة افتراضياً نسبة 15% المعمول بها في المملكة العربية السعودية، وتدعم كلاً من إضافة الضريبة واستخراجها من السعر الشامل، مع إمكانية تعديل النسبة لأي متطلبات أخرى.',
        },
        {
          question: '9. ما الفرق بين هامش الربح والربح على التكلفة؟',
          answer:
            'هامش الربح (Margin) هو نسبة الربح مقسومة على سعر البيع الإجمالي (ولا يتجاوز 100%)، بينما نسبة الزيادة على التكلفة (Markup) هي نسبة الربح مقسومة على تكلفة شراء المنتج فقط (ويمكن أن تتجاوز 100%).',
        },
        {
          question: '10. هل تحتاج الأدوات إلى اتصال بالإنترنت؟',
          answer:
            'تحتاج للاتصال بالإنترنت لتحميل صفحة الموقع في المرة الأولى، لكن بمجرد تحميل الصفحة في المتصفح، تعمل جميع الحاسبات محلياً دون الحاجة لإرسال أي طلبات شبكة أو استهلاك بيانات إضافية.',
        },
      ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <SEOHead
        title={isEn ? 'FAQ | Saudi E-commerce Tools' : 'الأسئلة الشائعة | أدوات المتاجر الإلكترونية'}
        description={
          isEn
            ? 'Clear answers to frequently asked questions about our free e-commerce calculators, privacy, pricing, and Saudi VAT.'
            : 'إجابات واضحة وشاملة على أكثر الأسئلة شيوعاً حول استخدام حاسبات الأرباح والتسعير والخصوصية والضرائب.'
        }
        canonicalPath="/faq/"
        schema={schema}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-xs font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{isEn ? 'Clear & Direct Answers' : 'إجابات واضحة ومباشرة'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {isEn ? 'Frequently Asked Questions' : 'الأسئلة الشائعة'}
          </h1>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {isEn
              ? 'Everything you need to know about how the calculators work, privacy protection, pricing, and VAT.'
              : 'كل ما تود معرفته عن طريقة عمل الحاسبات، والخصوصية، والتسعير، وحساب الأرباح في المتاجر الإلكترونية.'}
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className={`w-full ${isEn ? 'text-left' : 'text-right'} p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none focus:bg-slate-50 dark:focus:bg-slate-800/70 transition cursor-pointer`}
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform ${
                      isOpen
                        ? 'bg-teal-700 text-white rotate-180'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-6 sm:p-8 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-teal-700 dark:text-teal-400 shrink-0" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {isEn ? 'Ready to Try the Tools Yourself?' : 'جاهز لتجربة الأدوات بنفسك؟'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isEn
                  ? 'All calculators are available immediately with zero sign-up.'
                  : 'الحاسبات متاحة للاستخدام المباشر دون الحاجة لأي تسجيل.'}
              </p>
            </div>
          </div>
          <Link
            href="/#tools"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shrink-0 transition"
          >
            <span>{isEn ? 'Start Calculating Now' : 'ابدأ الحساب الآن'}</span>
            <ForwardArrow className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </>
  );
}
