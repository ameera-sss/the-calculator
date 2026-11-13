import { useEffect } from 'react';
import { SITE_CONFIG } from '../config/site';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  type?: 'website' | 'article';
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  schema?: Record<string, unknown> | Record<string, unknown>[];
}

export function SEOHead({
  title,
  description,
  canonicalPath = '',
  type = 'website',
  keywords,
  publishedTime,
  modifiedTime,
  section,
  schema,
}: SEOHeadProps) {
  useEffect(() => {
    // 1. Title
    const fullTitle = title.includes(SITE_CONFIG.name)
      ? title
      : `${title} | ${SITE_CONFIG.name}`;
    document.title = fullTitle;

    // Helper for meta tags
    const setMeta = (nameOrProperty: 'name' | 'property', key: string, content: string) => {
      let meta = document.querySelector(`meta[${nameOrProperty}="${key}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(nameOrProperty, key);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const removeMeta = (nameOrProperty: 'name' | 'property', key: string) => {
      const meta = document.querySelector(`meta[${nameOrProperty}="${key}"]`);
      if (meta) meta.remove();
    };

    // 2. Standard Meta
    setMeta('name', 'description', description);
    if (keywords && keywords.length > 0) {
      setMeta('name', 'keywords', keywords.join('، '));
    } else {
      removeMeta('name', 'keywords');
    }

    // 3. Open Graph
    setMeta('property', 'og:locale', 'ar_SA');
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', type);
    const fullCanonical = `${SITE_CONFIG.url}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;
    setMeta('property', 'og:url', fullCanonical);
    setMeta('property', 'og:site_name', SITE_CONFIG.name);

    if (type === 'article' && publishedTime) {
      setMeta('property', 'article:published_time', publishedTime);
      setMeta('property', 'article:modified_time', modifiedTime || publishedTime);
      if (section) setMeta('property', 'article:section', section);
    } else {
      removeMeta('property', 'article:published_time');
      removeMeta('property', 'article:modified_time');
      removeMeta('property', 'article:section');
    }

    // 4. Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);

    // 5. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = fullCanonical;

    // 6. JSON-LD Schema
    const existingSchemaScript = document.getElementById('dynamic-jsonld');
    if (existingSchemaScript) {
      existingSchemaScript.remove();
    }

    if (schema) {
      const script = document.createElement('script');
      script.id = 'dynamic-jsonld';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      const script = document.getElementById('dynamic-jsonld');
      if (script) script.remove();
    };
  }, [title, description, canonicalPath, type, keywords, publishedTime, modifiedTime, section, schema]);

  return null;
}
