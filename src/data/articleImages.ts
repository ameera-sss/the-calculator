import profitCalcImg from '../assets/images/article_profit_calc_1794596602811.jpg';
import pricingTagImg from '../assets/images/article_pricing_tag_1794596604004.jpg';
import marginMarkupImg from '../assets/images/article_margin_markup_1794596604408.jpg';
import vatTaxImg from '../assets/images/article_vat_tax_1794596604137.jpg';
import breakevenFeesImg from '../assets/images/article_breakeven_fees_1794596605455.jpg';
import discountPromoImg from '../assets/images/article_discount_promo_1794596605714.jpg';
import orderCostImg from '../assets/images/article_order_cost_1794596605917.jpg';

export const ARTICLE_COVER_IMAGES: Record<string, string> = {
  'how-to-calculate-online-store-profit': profitCalcImg,
  'how-to-price-ecommerce-products-correctly': pricingTagImg,
  'difference-between-profit-margin-and-markup': marginMarkupImg,
  'vat-guide-for-saudi-online-stores': vatTaxImg,
  'break-even-and-payment-fees-saudi-ecommerce': breakevenFeesImg,
  'smart-discount-campaigns-without-losing-profit': discountPromoImg,
  'reduce-order-cost-and-cod-returns-saudi-stores': orderCostImg,
};

export function getArticleCoverImage(slug: string, fallback?: string): string {
  return ARTICLE_COVER_IMAGES[slug] || fallback || '';
}
