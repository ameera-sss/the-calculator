import { Calculator, Shield } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { Link } from '../utils/router';
import { usePreferences } from '../context/PreferencesContext';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { lang } = usePreferences();
  const isEn = lang === 'en';

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 border-t border-slate-800 mt-20 print:hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center text-white">
                <Calculator className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white">
                {isEn ? SITE_CONFIG.nameEn : SITE_CONFIG.name}
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
              {isEn
                ? 'Free practical tools helping Saudi e-commerce store owners calculate profits, costs, taxes, and pricing with ease.'
                : 'أدوات مجانية تساعد أصحاب المتاجر الإلكترونية على حساب الأرباح والتكاليف وإدارة عمليات التسعير بسهولة.'}
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <Shield className="w-4 h-4 text-teal-400 shrink-0" />
              <span>
                {isEn
                  ? 'Full Privacy: All calculations run locally on your device without uploading any data to external servers.'
                  : 'خصوصية تامة: جميع العمليات الحسابية تُنفذ محلياً داخل جهازك دون رفع أي بيانات إلى خوادم خارجية.'}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">
              {isEn ? 'Quick Links' : 'روابط سريعة'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-teal-400 transition-colors">
                  {isEn ? 'Home' : 'الرئيسية'}
                </Link>
              </li>
              <li>
                <Link href="/blog/" className="hover:text-teal-400 transition-colors">
                  {isEn ? 'Blog' : 'المدونة'}
                </Link>
              </li>
              <li>
                <Link href="/user-guide/" className="hover:text-teal-400 transition-colors">
                  {isEn ? 'User Guide' : 'دليل الاستخدام'}
                </Link>
              </li>
              <li>
                <Link href="/faq/" className="hover:text-teal-400 transition-colors">
                  {isEn ? 'FAQ' : 'الأسئلة الشائعة'}
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy/" className="hover:text-teal-400 transition-colors">
                  {isEn ? 'Privacy Policy' : 'سياسة الخصوصية'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center md:text-start">
          <p className="leading-relaxed">
            {isEn
              ? 'Results are estimates based on your inputs and do not constitute specialized financial or tax advice.'
              : 'النتائج تقديرية وتعتمد على البيانات المدخلة، ولا تُعد استشارة مالية أو ضريبية متخصصة.'}
          </p>
          <p>
            © {currentYear} {isEn ? SITE_CONFIG.nameEn : SITE_CONFIG.name}.{' '}
            {isEn ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
