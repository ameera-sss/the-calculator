import { Calendar, User, ArrowRight, ArrowLeft, Calculator, Tag } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Link } from '../utils/router';
import { AdSlot } from '../components/AdSlot';
import articlesData from '../data/articles.json';
import { ARTICLES_EN } from '../data/articlesEn';
import { getArticleCoverImage } from '../data/articleImages';
import { SITE_CONFIG } from '../config/site';
import { usePreferences } from '../context/PreferencesContext';

interface ContentBlock {
  type: 'paragraph' | 'heading' | 'list' | 'ordered-list' | 'quote' | 'table' | 'image';
  text?: string;
  level?: number;
  items?: string[];
  headers?: string[];
  rows?: string[][];
  src?: string;
  alt?: string;
}

export function ArticlePage({ slug }: { slug: string }) {
  const { lang } = usePreferences();
  const isEn = lang === 'en';
  const ForwardArrow = isEn ? ArrowRight : ArrowLeft;
  const BackArrow = isEn ? ArrowLeft : ArrowRight;

  const articles = articlesData.articles || [];
  const rawArticle = articles.find((a) => a.slug === slug);

  if (!rawArticle) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          {isEn ? 'Article Not Found' : 'المقال غير موجود'}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          {isEn
            ? 'Sorry, we could not find the requested article.'
            : 'عذراً، لم نتمكن من العثور على المقال المطلوب.'}
        </p>
        <Link
          href="/blog/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 text-white font-bold text-sm"
        >
          <BackArrow className="w-4 h-4" />
          {isEn ? 'Back to Blog' : 'العودة إلى المدونة'}
        </Link>
      </div>
    );
  }

  const enTranslation = isEn ? ARTICLES_EN[rawArticle.slug] : undefined;
  const article = enTranslation
    ? {
        ...rawArticle,
        ...enTranslation,
      }
    : rawArticle;

  const coverImg = getArticleCoverImage(rawArticle.slug, rawArticle.coverImage);
  const coverAlt = isEn ? article.title : rawArticle.coverAlt || article.title;
  const relatedArticles = articles.filter((a) => a.slug !== slug).slice(0, 2);

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.description,
      image: coverImg,
      keywords: (rawArticle.keywords || []).join('، '),
      articleSection: article.category,
      inLanguage: lang,
      author: {
        '@type': 'Organization',
        name: article.author,
      },
      datePublished: rawArticle.publishedAt,
      dateModified: rawArticle.updatedAt || rawArticle.publishedAt,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${SITE_CONFIG.url}/blog/${rawArticle.slug}/`,
      },
      publisher: {
        '@type': 'Organization',
        name: isEn ? SITE_CONFIG.nameEn : SITE_CONFIG.name,
        url: SITE_CONFIG.url,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: isEn ? 'Home' : 'الرئيسية',
          item: `${SITE_CONFIG.url}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: isEn ? 'Blog' : 'المدونة',
          item: `${SITE_CONFIG.url}/blog/`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: article.title,
          item: `${SITE_CONFIG.url}/blog/${rawArticle.slug}/`,
        },
      ],
    },
  ];

  const renderContentBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p key={index} className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
            {block.text}
          </p>
        );

      case 'heading': {
        const HeadingTag = block.level === 3 ? 'h3' : 'h2';
        return (
          <HeadingTag
            key={index}
            className={`font-extrabold text-slate-900 dark:text-white tracking-tight mt-10 mb-4 ${
              block.level === 3 ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'
            }`}
          >
            {block.text}
          </HeadingTag>
        );
      }

      case 'list':
        return (
          <ul
            key={index}
            className={`space-y-3 mb-6 ${isEn ? 'ml-4' : 'mr-4'} list-disc list-outside text-slate-700 dark:text-slate-300 text-base leading-relaxed`}
          >
            {block.items?.map((item, i) => (
              <li key={i} className={isEn ? 'pl-2' : 'pr-2'}>
                {item}
              </li>
            ))}
          </ul>
        );

      case 'ordered-list':
        return (
          <ol
            key={index}
            className={`space-y-3 mb-6 ${isEn ? 'ml-4' : 'mr-4'} list-decimal list-outside text-slate-700 dark:text-slate-300 text-base leading-relaxed`}
          >
            {block.items?.map((item, i) => (
              <li key={i} className={isEn ? 'pl-2' : 'pr-2'}>
                {item}
              </li>
            ))}
          </ol>
        );

      case 'quote':
        return (
          <blockquote
            key={index}
            className={`my-8 p-5 sm:p-6 bg-teal-50/70 dark:bg-teal-950/50 ${
              isEn ? 'border-l-4 rounded-l-xl' : 'border-r-4 rounded-r-xl'
            } border-teal-600 text-teal-950 dark:text-teal-100 text-base sm:text-lg font-medium leading-relaxed italic`}
          >
            "{block.text}"
          </blockquote>
        );

      case 'table':
        return (
          <div key={index} className="my-8 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className={`w-full ${isEn ? 'text-left' : 'text-right'} text-xs sm:text-sm`}>
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  {block.headers?.map((h, i) => (
                    <th key={i} className="p-3.5">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {block.rows?.map((row, rIndex) => (
                  <tr
                    key={rIndex}
                    className={
                      rIndex % 2 === 0
                        ? 'bg-white dark:bg-slate-900'
                        : 'bg-slate-50/50 dark:bg-slate-950/40'
                    }
                  >
                    {row.map((cell, cIndex) => (
                      <td key={cIndex} className="p-3.5 text-slate-700 dark:text-slate-300 font-medium">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'image':
        return block.src ? (
          <figure key={index} className="my-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <img
              src={block.src}
              alt={block.alt || article.title}
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover"
            />
          </figure>
        ) : null;

      default:
        return null;
    }
  };

  const toolLinkMap: Record<string, { labelAr: string; labelEn: string; href: string }> = {
    'how-to-calculate-online-store-profit': {
      labelAr: 'افتح حاسبة صافي الربح',
      labelEn: 'Open Net Profit Calculator',
      href: '/#net-profit',
    },
    'how-to-price-ecommerce-products-correctly': {
      labelAr: 'افتح حاسبة سعر البيع',
      labelEn: 'Open Selling Price Calculator',
      href: '/#selling-price',
    },
    'difference-between-profit-margin-and-markup': {
      labelAr: 'افتح حاسبة هامش الربح',
      labelEn: 'Open Profit Margin Calculator',
      href: '/#profit-margin',
    },
    'vat-guide-for-saudi-online-stores': {
      labelAr: 'افتح حاسبة ضريبة القيمة المضافة',
      labelEn: 'Open VAT Calculator',
      href: '/#vat',
    },
    'break-even-and-payment-fees-saudi-ecommerce': {
      labelAr: 'افتح حاسبة نقطة التعادل',
      labelEn: 'Open Break-Even Calculator',
      href: '/#break-even',
    },
    'smart-discount-campaigns-without-losing-profit': {
      labelAr: 'افتح حاسبة الخصومات والعروض',
      labelEn: 'Open Discount Calculator',
      href: '/#discount',
    },
    'reduce-order-cost-and-cod-returns-saudi-stores': {
      labelAr: 'افتح حاسبة تكلفة الطلب',
      labelEn: 'Open Order Cost Calculator',
      href: '/#order-cost',
    },
  };

  const targetTool = toolLinkMap[rawArticle.slug] || {
    labelAr: 'انتقل إلى الحاسبات',
    labelEn: 'Go to Calculators',
    href: '/#tools',
  };

  return (
    <>
      <SEOHead
        title={article.title}
        description={article.description}
        canonicalPath={`/blog/${rawArticle.slug}/`}
        type="article"
        keywords={rawArticle.keywords}
        image={coverImg}
        imageAlt={coverAlt}
        publishedTime={rawArticle.publishedAt}
        modifiedTime={rawArticle.updatedAt || rawArticle.publishedAt}
        section={article.category}
        schema={schema}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-8">
          <Link href="/" className="hover:text-teal-700 dark:hover:text-teal-400 transition">
            {isEn ? 'Home' : 'الرئيسية'}
          </Link>
          <span>/</span>
          <Link href="/blog/" className="hover:text-teal-700 dark:hover:text-teal-400 transition">
            {isEn ? 'Blog' : 'المدونة'}
          </Link>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-200 font-medium truncate max-w-xs sm:max-w-md">
            {article.title}
          </span>
        </nav>

        {/* Article Header */}
        <header className="mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 px-3 py-1 rounded-full">
              {article.category}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-5">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>
                {isEn ? `Published: ${rawArticle.publishedAt}` : `نُشر في: ${rawArticle.publishedAt}`}
              </span>
            </div>
            {rawArticle.updatedAt && rawArticle.updatedAt !== rawArticle.publishedAt && (
              <div className="flex items-center gap-1.5 text-slate-400">
                <span>
                  {isEn ? `(Updated: ${rawArticle.updatedAt})` : `(تم التحديث: ${rawArticle.updatedAt})`}
                </span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-slate-400" />
              <span>{isEn ? `By: ${article.author}` : `بواسطة: ${article.author}`}</span>
            </div>
          </div>
        </header>

        {/* Expressive Editorial Cover Image */}
        {coverImg && (
          <figure className="mb-10 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-100 dark:bg-slate-900">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={coverImg}
                alt={coverAlt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="px-5 py-3 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200/80 dark:border-slate-800">
              {coverAlt}
            </figcaption>
          </figure>
        )}

        {/* Article Body Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none">
          {((article.content || []) as ContentBlock[]).map((block, idx) =>
            renderContentBlock(block, idx)
          )}
        </div>

        {/* Keywords Pills for SEO Discoverability */}
        {rawArticle.keywords && rawArticle.keywords.length > 0 && !isEn && (
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 dark:text-slate-400 me-1">
              <Tag className="w-3.5 h-3.5" />
              كلمات مفتاحية:
            </span>
            {rawArticle.keywords.map((kw) => (
              <span
                key={kw}
                className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
              >
                {kw}
              </span>
            ))}
          </div>
        )}

        <AdSlot slotId={SITE_CONFIG.ads.slots.inArticle} />

        {/* Practical Callout */}
        <div className="my-12 p-6 rounded-2xl bg-teal-50/80 dark:bg-teal-950/50 border border-teal-200/80 dark:border-teal-800/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center shrink-0">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-teal-950 dark:text-teal-100">
                {isEn
                  ? 'Try Applying These Numbers in Our Free Calculators'
                  : 'جرّب تطبيق هذه الأرقام في حاسباتنا المجانية'}
              </h4>
              <p className="text-xs text-teal-800 dark:text-teal-300">
                {isEn
                  ? 'Calculate selling prices, margins, and net store profits instantly.'
                  : 'احسب سعر البيع وهامش الربح وصافي الأرباح لمتجرك الآن وبشكل فوري.'}
              </p>
            </div>
          </div>
          <Link
            href={targetTool.href}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shrink-0 transition"
          >
            <span>{isEn ? targetTool.labelEn : targetTool.labelAr}</span>
            <ForwardArrow className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Back to Blog */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <Link
            href="/blog/"
            className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition"
          >
            <BackArrow className="w-4 h-4" />
            <span>{isEn ? 'Back to All Blog Articles' : 'العودة إلى جميع مقالات المدونة'}</span>
          </Link>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-14 pt-10 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
              {isEn ? 'Related Articles' : 'مقالات ذات صلة'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {relatedArticles.map((rawRel) => {
                const rel = isEn && ARTICLES_EN[rawRel.slug] ? { ...rawRel, ...ARTICLES_EN[rawRel.slug] } : rawRel;
                const relImg = getArticleCoverImage(rawRel.slug, rawRel.coverImage);
                return (
                  <div
                    key={rel.id}
                    className="rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-400 transition flex flex-col justify-between overflow-hidden group"
                  >
                    {relImg && (
                      <Link href={`/blog/${rawRel.slug}/`} className="block aspect-video overflow-hidden bg-slate-200 dark:bg-slate-800">
                        <img
                          src={relImg}
                          alt={isEn ? rel.title : rawRel.coverAlt || rel.title}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                    )}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[11px] font-semibold text-teal-700 dark:text-teal-400 mb-1.5 block">
                          {rel.category}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                          <Link href={`/blog/${rawRel.slug}/`} className="hover:text-teal-700 dark:hover:text-teal-400 transition">
                            {rel.title}
                          </Link>
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {rel.excerpt}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
                        <span className="text-slate-400 text-[11px]">{rawRel.publishedAt}</span>
                        <Link
                          href={`/blog/${rawRel.slug}/`}
                          className="text-teal-700 dark:text-teal-400 font-bold hover:underline inline-flex items-center gap-1"
                        >
                          <span>{isEn ? 'Read Article' : 'اقرأ المقال'}</span>
                          <ForwardArrow className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
