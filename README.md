# منصة أدوات المتاجر الإلكترونية (Saudi E-commerce Tools)

منصة أدوات وحاسبات مالية مجانية لأصحاب المتاجر الإلكترونية ورواد الأعمال في المملكة العربية السعودية لحساب الأرباح، وأسعار البيع، وهوامش الربح، وضريبة القيمة المضافة، ونقطة التعادل، وعمولات بوابات الدفع.

---

## 1. تثبيت الاعتماديات (Dependencies)

تأكد من وجود بيئة Node.js (الإصدار 18 فما فوق)، ثم نفّذ الأمر التالي:

```bash
npm install
```

---

## 2. تشغيل الموقع محلياً (Local Development)

لتشغيل خادم التطوير المحلي مع التحديث الفوري:

```bash
npm run dev
```

افتح المتصفح على العنوان: `http://localhost:3000`

---

## 3. بناء المشروع للإنتاج (Production Build)

لتوليد ملفات الإنتاج الساكنة المحسّنة (Static Files):

```bash
npm run build
```

تُحفظ الملفات الناتجة في مجلد `dist/` وتكون جاهزة للرفع والنشر المباشر.

---

## 4. النشر على Cloudflare Pages أو Netlify

الموقع مبني بهندسة خفيفة وسريعة 100% Client-Side جاهزة للنشر على أي منصة استضافة ساكنة:

### النشر على Cloudflare Pages:
1. أنشئ مشروعاً جديداً في لوحة Cloudflare Pages من خلال الربط مع مستودع Git الخاص بك.
2. حدد إعدادات البناء كالتالي:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
3. اضغط **Save and Deploy**.

### النشر على Netlify:
- **Build command**: `npm run build`
- **Publish directory**: `dist`

---

## 5. تغيير اسم وهوية الموقع (Site Identity)

جميع إعدادات الهوية مجمعة مركزياً في الملف:
`/src/config/site.ts`

قم بتعديل الحقول:
```ts
export const SITE_CONFIG = {
  name: "اسم موقعك الجديد",
  tagline: "شعار الموقع",
  headline: "العنوان الرئيسي",
  description: "الوصف التعريفي للبحث",
  ...
};
```

---

## 6. ضبط النطاق الخاص بالإنتاج (Production Domain)

في نفس الملف `/src/config/site.ts`:
```ts
url: "https://your-custom-domain.com",
```
قم أيضاً بتحديث النطاق في:
- `public/robots.txt`
- `public/sitemap.xml`
- `index.html` (في وسم `link rel="canonical"`)

---

## 7. إضافة مقالات جديدة للمدونة عبر JSON

المدونة تعمل بنظام إدارة محتوى بسيط وخفيف عبر ملف JSON:
`/src/data/articles.json`

لإضافة مقال جديد، أضف عنصراً جديداً في مصفوفة `articles`:
```json
{
  "id": 4,
  "slug": "new-article-slug",
  "title": "عنوان المقال الجديد",
  "description": "وصف المقال لمحركات البحث",
  "excerpt": "مقتطف قصير يظهر في بطاقة المقال",
  "category": "إدارة المتاجر",
  "author": "فريق التحرير",
  "publishedAt": "2026-10-15",
  "updatedAt": "2026-10-15",
  "featured": false,
  "coverImage": "",
  "coverAlt": "",
  "keywords": ["كلمة 1", "كلمة 2"],
  "content": [
    {
      "type": "paragraph",
      "text": "نص الفقرة الأولى..."
    },
    {
      "type": "heading",
      "level": 2,
      "text": "عنوان رئيسي داخل المقال"
    },
    {
      "type": "list",
      "items": ["نقطة 1", "نقطة 2"]
    },
    {
      "type": "quote",
      "text": "اقتباس مميز"
    },
    {
      "type": "table",
      "headers": ["العمود 1", "العمود 2"],
      "rows": [["قيمة 1", "قيمة 2"]]
    }
  ]
}
```

بمجرد حفظ الملف وإعادة بناء الموقع (`npm run build`)، يتوفر المقال مباشرة على الرابط:
`/blog/new-article-slug/`

---

## 8. تحديث خريطة الموقع (Sitemap)

عند إضافة مقال جديد، أضف رابط المقال إلى الملف:
`/public/sitemap.xml`

مثال:
```xml
<url>
  <loc>https://your-custom-domain.com/blog/new-article-slug/</loc>
  <lastmod>2026-10-15</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

---

## 9. تفعيل إعلانات Google AdSense بعد الحصول على الموافقة

الموقع مجهز بالكامل للربط مع Google AdSense مع مراعاة الحفاظ على سرعة التصفح وتجربة المستخدم النظيفة:

1. افتح الملف `/src/config/site.ts`.
2. غيّر قيمة `enabled` إلى `true` وأدخل معرف الناشر الخاص بك:
```ts
ads: {
  enabled: true,
  clientId: "ca-pub-XXXXXXXXXXXXXXXX",
  slots: {
    homepageBanner: "1234567890",
    afterCalculators: "0987654321",
    inArticle: "1122334455",
  },
}
```
3. ستقوم مكوّنات `AdSlot` بتحميل السكربت الرسمي لـ Google وعرض الوحدات الإعلانية في الأماكن المحددة تلقائياً دون أي فراغات بيضاء مشوهة.

---

## 10. ضبط ملف ads.txt

بعد اعتماد حسابك في AdSense، افتح الملف:
`/public/ads.txt`

وأضف السطر المعتمد الخاص بك كبائع رقمي مرخص، مثال:
```txt
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

---

## الخصوصية والأمان

- لا يتم استخدام أي قواعد بيانات خارجية أو خوادم وسيطة.
- جميع العمليات الحسابية تتم محلياً 100% في متصفح الزائر (Client-Side).
- لا يتم حفظ مدخلات الحسابات في أي مساحات تخزين محلية أو خوادم.
