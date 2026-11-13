import { useState } from 'react';
import { Calculator, Menu, X, ShieldCheck, Sun, Moon, Languages } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { Link, useRouter } from '../utils/router';
import { usePreferences } from '../context/PreferencesContext';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { path } = useRouter();
  const { isDark, toggleTheme, lang, toggleLang } = usePreferences();

  const isEn = lang === 'en';

  const navLinks = [
    { label: isEn ? 'Home' : 'الرئيسية', href: '/' },
    { label: isEn ? 'Tools' : 'الأدوات', href: '/#tools' },
    { label: isEn ? 'Blog' : 'المدونة', href: '/blog/' },
    { label: isEn ? 'User Guide' : 'دليل الاستخدام', href: '/user-guide/' },
    { label: isEn ? 'FAQ' : 'الأسئلة الشائعة', href: '/faq/' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return path === '/' || path === '';
    if (href.startsWith('/#')) return false;
    return path.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 print:hidden transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-teal-600 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-700 flex items-center justify-center text-white shadow-sm shadow-teal-700/20 group-hover:bg-teal-800 transition-colors">
              <Calculator className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                {isEn ? SITE_CONFIG.nameEn : SITE_CONFIG.name}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {isEn ? 'Saudi E-commerce Calculators' : 'حاسبات التجارة الإلكترونية'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label={isEn ? 'Main Navigation' : 'التنقل الرئيسي'}>
            {navLinks.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    active
                      ? 'text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Theme + Language Controls + Privacy Badge */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button
              type="button"
              onClick={toggleLang}
              className="inline-flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
              aria-label={isEn ? 'التحويل إلى اللغة العربية' : 'Switch to English'}
              title={isEn ? 'التحويل إلى اللغة العربية' : 'Switch to English'}
            >
              <Languages className="w-4 h-4 text-teal-700 dark:text-teal-400" />
              <span>{isEn ? 'عربي' : 'EN'}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-slate-700 dark:text-amber-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
              aria-label={
                isDark
                  ? isEn
                    ? 'Switch to Light Mode'
                    : 'التبديل إلى الوضع النهاري'
                  : isEn
                  ? 'Switch to Dark Mode'
                  : 'التبديل إلى الوضع الليلي'
              }
              title={
                isDark
                  ? isEn
                    ? 'Light Mode'
                    : 'الوضع النهاري'
                  : isEn
                  ? 'Dark Mode'
                  : 'الوضع الليلي'
              }
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Privacy Badge (XL screens) */}
            <div className="hidden xl:flex items-center gap-1.5 text-xs text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800/70">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="font-medium">
                {isEn ? 'Free & Private' : 'مجاني وبدون حفظ بيانات'}
              </span>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600"
              aria-expanded={mobileMenuOpen}
              aria-label={isEn ? 'Toggle Navigation Menu' : 'تبديل القائمة الرئيسية'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-5 shadow-lg">
          <nav className="flex flex-col gap-1" aria-label={isEn ? 'Mobile Menu' : 'قائمة الجوال'}>
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-base font-semibold text-slate-700 dark:text-slate-200 hover:text-teal-700 dark:hover:text-teal-300 hover:bg-teal-50 dark:hover:bg-slate-800 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-2 rounded-lg">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>
              {isEn
                ? '100% local browser calculations with complete privacy'
                : 'حسابات محلية 100% في المتصفح مع ضمان الخصوصية الكاملة'}
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
