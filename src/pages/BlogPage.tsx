import { Calendar, User, ArrowLeft, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Link } from '../utils/router';
import articlesData from '../data/articles.json';
import { ARTICLES_EN } from '../data/articlesEn';
import { SITE_CONFIG } from '../config/site';
import { usePreferences } from '../context/PreferencesContext';

export function BlogPage() {
  const { lang } = usePreferences();
  const isEn = lang === 'en';
  const ArrowIcon = isEn ? ArrowRight : ArrowLeft;

  const articles = articlesData.articles || [];
  const featuredArticle = articles.find((a) => a.featured);
  const regularArticles = articles.filter((a) => a.id !== featuredArticle?.id);

  const getLocalized = (article: (typeof articles)[number]) => {
    if (isEn && ARTICLES_EN[article.slug]) {
      return {
        ...article,
        ...ARTICLES_EN[article.slug],
      };
    }
    return article;
  };

  const localizedFeatured = featuredArticle ? getLocalized(featuredArticle) : null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: isEn ? `${SITE_CONFIG.nameEn} Blog` : `مدونة ${SITE_CONFIG.name}`,
    description: isEn
      ? 'Practical articles helping Saudi e-commerce store owners optimize pricing, calculate profits, and manage store costs.'
      : 'مقالات عملية تساعد أصحاب المتاجر الإلكترونية على تحسين التسعير، وحساب الأرباح، وفهم تكاليف البيع وإدارة متاجرهم.',
    url: `${SITE_CONFIG.url}/blog/`,
    inLanguage: lang,
  };

  return (
    <>
      <SEOHead
        title={
          isEn
            ? 'Blog | E-commerce Pricing & Profit Guides'
            : 'المدونة | نصائح وأدوات للتجارة الإلكترونية'
        }
        description={
          isEn
            ? 'Practical articles helping Saudi e-commerce store owners optimize pricing, calculate profits, and manage store costs.'
            : 'مقالات عملية تساعد أصحاب المتاجر الإلكترونية على تحسين التسعير، وحساب الأرباح، وفهم تكاليف البيع وإدارة متاجرهم.'
        }
        canonicalPath="/blog/"
        schema={schema}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-xs font-bold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isEn ? 'E-commerce Guides & Insights' : 'مقالات ومعرفة التجارة الإلكترونية'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isEn
              ? 'Blog | E-commerce Tips & Financial Guides'
              : 'المدونة | نصائح وأدوات للتجارة الإلكترونية'}
          </h1>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {isEn
              ? 'Practical articles helping Saudi e-commerce merchants improve product pricing, calculate net profits, and understand selling costs.'
              : 'مقالات عملية تساعد أصحاب المتاجر الإلكترونية على تحسين التسعير، وحساب الأرباح، وفهم تكاليف البيع وإدارة متاجرهم.'}
          </p>
        </div>

        {/* Featured Article Banner */}
        {localizedFeatured && (
          <div className="mb-14">
            <div className="bg-gradient-to-br from-teal-900 via-slate-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-lg overflow-hidden relative border border-teal-800/50">
              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3 py-1 rounded-full">
                    <Sparkles className="w-3 h-3" /> {isEn ? 'Featured Article' : 'مقال مميز'}
                  </span>
                  <span className="text-xs text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-full">
                    {localizedFeatured.category}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                  <Link
                    href={`/blog/${localizedFeatured.slug}/`}
                    className="hover:text-teal-300 transition-colors"
                  >
                    {localizedFeatured.title}
                  </Link>
                </h2>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {localizedFeatured.excerpt}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {localizedFeatured.publishedAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {localizedFeatured.author}
                  </span>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/blog/${localizedFeatured.slug}/`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm transition"
                  >
                    <span>{isEn ? 'Read Full Article' : 'اقرأ المقال بالكامل'}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(featuredArticle ? regularArticles : articles).map((rawArticle) => {
            const article = getLocalized(rawArticle);
            return (
              <article
                key={article.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-teal-500/50 dark:hover:border-teal-500/60 transition-all flex flex-col justify-between overflow-hidden"
              >
                <div className="h-32 bg-gradient-to-br from-slate-100 to-teal-50/60 dark:from-slate-800 dark:to-teal-950/50 p-5 flex flex-col justify-between border-b border-slate-100 dark:border-slate-800">
                  <span className="self-start text-[11px] font-bold text-teal-800 dark:text-teal-300 bg-teal-100/70 dark:bg-teal-950 border border-teal-200/80 dark:border-teal-800 px-2.5 py-0.5 rounded-md">
                    {article.category}
                  </span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {article.publishedAt}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug hover:text-teal-700 dark:hover:text-teal-400 transition">
                      <Link href={`/blog/${article.slug}/`}>
                        {article.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 dark:text-slate-500">
                      {article.author}
                    </span>
                    <Link
                      href={`/blog/${article.slug}/`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition"
                    >
                      <span>{isEn ? 'Read Article' : 'اقرأ المقال'}</span>
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}
