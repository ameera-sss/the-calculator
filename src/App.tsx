import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BlogPage } from './pages/BlogPage';
import { ArticlePage } from './pages/ArticlePage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { UserGuidePage } from './pages/UserGuidePage';
import { FaqPage } from './pages/FaqPage';
import { RouterProvider, useRouter, Link } from './utils/router';
import { PreferencesProvider, usePreferences } from './context/PreferencesContext';

function AppContent() {
  const { path } = useRouter();
  const { lang } = usePreferences();

  // Normalize path (ensure trailing slash or consistent matching)
  const cleanPath = path.replace(/\/+$/, '') || '/';

  // Routing Logic
  let content = null;

  if (cleanPath === '/' || cleanPath === '') {
    content = <HomePage />;
  } else if (cleanPath === '/blog') {
    content = <BlogPage />;
  } else if (cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace(/^\/blog\//, '').replace(/\/$/, '');
    content = <ArticlePage slug={slug} />;
  } else if (cleanPath === '/privacy-policy') {
    content = <PrivacyPolicyPage />;
  } else if (cleanPath === '/user-guide') {
    content = <UserGuidePage />;
  } else if (cleanPath === '/faq') {
    content = <FaqPage />;
  } else {
    // Clean HTTP 404 handler
    content = (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <span className="text-4xl font-extrabold text-teal-700 dark:text-teal-400 font-mono block mb-3">404</span>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
          {lang === 'en' ? 'Page Not Found' : 'الصفحة غير موجودة'}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm">
          {lang === 'en'
            ? 'Sorry, the page you are looking for does not exist or has been moved.'
            : 'عذراً، الصفحة التي تحاول الوصول إليها غير متوفرة أو تم نقلها.'}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-sm transition"
        >
          {lang === 'en' ? 'Back to Homepage' : 'العودة إلى الصفحة الرئيسية'}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      <Header />
      <main className="flex-1">
        {content}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <PreferencesProvider>
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    </PreferencesProvider>
  );
}
