export interface EnArticleContentBlock {
  type: 'paragraph' | 'heading' | 'list' | 'ordered-list' | 'quote' | 'table';
  text?: string;
  level?: number;
  items?: string[];
  headers?: string[];
  rows?: string[][];
}

export interface EnArticleTranslation {
  title: string;
  description: string;
  excerpt: string;
  category: string;
  author: string;
  content: EnArticleContentBlock[];
}

export const ARTICLES_EN: Record<string, EnArticleTranslation> = {
  'how-to-calculate-online-store-profit': {
    title: 'How to Calculate Online Store Net Profit Accurately',
    description:
      'A practical guide to calculating your Saudi online store net profit after deducting product costs, shipping, payment gateway fees, and ad spend.',
    excerpt:
      'Learn the exact financial formula for net profit and avoid hidden losses caused by overlooking payment commissions, shipping, and ad costs.',
    category: 'Store Management',
    author: 'Store Tools Editorial Team',
    content: [
      {
        type: 'paragraph',
        text: 'Many new e-commerce merchants confuse gross revenue with actual net profit. Generating 50,000 SAR in monthly sales does not guarantee profitability if operating costs, commissions, and ad spend exceed your gross margin.',
      },
      {
        type: 'heading',
        level: 2,
        text: '1. Gross Profit vs. Net Profit',
      },
      {
        type: 'list',
        items: [
          'Gross Profit: Selling price minus direct product purchase/manufacturing cost.',
          'Net Profit: What remains after deducting every cost — product, shipping, packaging, payment gateway fees, platform fees, ad spend, and return costs.',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: '2. Commonly Overlooked Order Costs',
      },
      {
        type: 'list',
        items: [
          'Payment Gateway Fees: Such as Mada, Visa/Mastercard, Apple Pay, and BNPL providers like Tabby or Tamara.',
          'Shipping & Non-Delivery Risks: Courier fees plus potential return-to-origin charges on refused COD shipments.',
          'Packaging & Labels: Boxes, protective wrap, thank-you cards, and thermal waybills.',
          'Customer Acquisition Cost (CAC): Total ad budget divided by fulfilled orders.',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: '3. Practical SAR Example',
      },
      {
        type: 'table',
        headers: ['Cost Item', 'Amount (SAR)', 'Notes'],
        rows: [
          ['Selling Price', '200.00', 'Total revenue collected'],
          ['Product Purchase Cost', '70.00', 'Base supplier cost'],
          ['Shipping Fee', '28.00', 'Courier waybill average'],
          ['Packaging & Materials', '5.00', 'Box and protective wrap'],
          ['Payment Gateway Fee', '4.50', 'Card processing fee'],
          ['Ad Spend per Order', '40.00', 'Marketing cost per order'],
          ['Total Direct Costs', '147.50', 'Sum of order expenses'],
          ['Actual Net Profit', '52.50', '26.25% net profit margin'],
        ],
      },
      {
        type: 'quote',
        text: 'Even though the gap between selling price (200 SAR) and supplier cost (70 SAR) is 130 SAR, true net profit is 52.50 SAR (26.25% net margin).',
      },
    ],
  },
  'how-to-price-ecommerce-products-correctly': {
    title: 'How to Price Your E-commerce Products Correctly',
    description:
      'Learn the exact algebraic formula for pricing e-commerce products while accounting for percentage-based payment fees and target net margin.',
    excerpt:
      'Master the algebraic pricing formula so payment gateway commissions and shipping never shrink your expected net profit margin.',
    category: 'Pricing & Finance',
    author: 'Store Tools Editorial Team',
    content: [
      {
        type: 'paragraph',
        text: 'Pricing is the single most important decision for online store sustainability. Underpricing drives volume with zero profit, while uncalculated overpricing lowers conversion rates and inflates ad costs.',
      },
      {
        type: 'heading',
        level: 2,
        text: '1. The Common Cost-Plus Pricing Mistake',
      },
      {
        type: 'paragraph',
        text: 'Adding a flat percentage onto product cost calculates Markup, not Profit Margin—and fails to account for payment fees that are charged as a percentage of the final selling price.',
      },
      {
        type: 'heading',
        level: 2,
        text: '2. The Exact Algebraic Pricing Formula',
      },
      {
        type: 'quote',
        text: 'Selling Price = Fixed Order Costs ÷ (1 - Target Margin Rate - Variable Fee Rate)',
      },
      {
        type: 'paragraph',
        text: 'Fixed order costs include product cost, shipping, packaging, and any flat gateway transaction fee. Variable fees include percentage-based gateway or marketplace commissions.',
      },
      {
        type: 'heading',
        level: 2,
        text: '3. Practical Calculation in SAR',
      },
      {
        type: 'list',
        items: [
          'Product + packaging + shipping = 80 SAR, plus 1 SAR flat fee = 81 SAR fixed costs.',
          'Variable gateway fee = 2.5% (0.025), Target net margin = 25% (0.25).',
          'Selling Price = 81 ÷ (1 - 0.25 - 0.025) = 81 ÷ 0.725 = 111.72 SAR.',
        ],
      },
    ],
  },
  'difference-between-profit-margin-and-markup': {
    title: 'Profit Margin vs. Markup: Understanding the Difference',
    description:
      'A clear breakdown of Profit Margin versus Markup with practical SAR tables showing how confusing the two causes losses during discounts.',
    excerpt:
      'Avoid the most common pricing mistake in e-commerce by understanding how Margin and Markup behave differently during sales.',
    category: 'Financial Concepts',
    author: 'Store Tools Editorial Team',
    content: [
      {
        type: 'paragraph',
        text: 'Confusing Profit Margin with Markup is one of the most frequent accounting mistakes in online retail. Both measure profit, but against completely different bases.',
      },
      {
        type: 'heading',
        level: 2,
        text: '1. What Is Profit Margin?',
      },
      {
        type: 'quote',
        text: 'Profit Margin % = (Profit ÷ Selling Price) × 100',
      },
      {
        type: 'heading',
        level: 2,
        text: '2. What Is Markup?',
      },
      {
        type: 'quote',
        text: 'Markup % = (Profit ÷ Cost) × 100',
      },
      {
        type: 'heading',
        level: 2,
        text: '3. Comparison Table (100 SAR Product Cost)',
      },
      {
        type: 'table',
        headers: ['Cost', 'Selling Price', 'Profit', 'Markup %', 'Profit Margin %'],
        rows: [
          ['100 SAR', '125 SAR', '25 SAR', '25%', '20%'],
          ['100 SAR', '150 SAR', '50 SAR', '50%', '33.3%'],
          ['100 SAR', '200 SAR', '100 SAR', '100%', '50%'],
          ['100 SAR', '300 SAR', '200 SAR', '200%', '66.7%'],
        ],
      },
    ],
  },
  'vat-guide-for-saudi-online-stores': {
    title: '15% VAT Guide for Saudi E-commerce Stores',
    description:
      'Practical guide explaining how to add 15% VAT and accurately extract VAT from tax-inclusive prices in Saudi Riyals.',
    excerpt:
      'Learn the exact math behind adding and extracting 15% Saudi VAT on product prices, shipping, and gateway fees.',
    category: 'Taxes & Compliance',
    author: 'Store Tools Editorial Team',
    content: [
      {
        type: 'paragraph',
        text: 'Understanding how 15% Value Added Tax (VAT) works is essential for managing online stores in Saudi Arabia. Miscomputing tax-inclusive prices can erode margins or create discrepancies during accounting reviews.',
      },
      {
        type: 'heading',
        level: 2,
        text: '1. Base Price vs. Tax-Inclusive Price',
      },
      {
        type: 'list',
        items: [
          'Base Price (Before VAT): Your net store revenue excluding tax.',
          'VAT Amount (15%): Base price multiplied by 0.15.',
          'Tax-Inclusive Price: Final amount paid by the customer.',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: '2. The Common Mistake When Extracting VAT',
      },
      {
        type: 'quote',
        text: 'Correct Formula: Base Price = Tax-Inclusive Price ÷ 1.15',
      },
      {
        type: 'table',
        headers: ['Scenario', 'Base Price', 'VAT (15%)', 'Inclusive Price'],
        rows: [
          ['Adding 15% VAT to 100 SAR base', '100.00 SAR', '15.00 SAR', '115.00 SAR'],
          ['Extracting VAT from 230 SAR total', '200.00 SAR', '30.00 SAR', '230.00 SAR'],
          ['Psychological price of 199 SAR', '173.04 SAR', '25.96 SAR', '199.00 SAR'],
        ],
      },
    ],
  },
  'break-even-and-payment-fees-saudi-ecommerce': {
    title: 'Break-Even Point & Payment Gateway Fees in Saudi E-commerce',
    description:
      'Learn how to calculate your monthly break-even order volume and factor Mada, credit card, and BNPL fees into variable unit costs.',
    excerpt:
      'Discover how many orders your store needs each month to cover fixed expenses and turn profitable after payment gateway fees.',
    category: 'Financial Planning',
    author: 'Store Tools Editorial Team',
    content: [
      {
        type: 'paragraph',
        text: 'Every merchant asks: "How many orders do I need per month to cover all my expenses and start making profit?" The Break-Even Point provides the exact answer.',
      },
      {
        type: 'heading',
        level: 2,
        text: '1. Fixed vs. Variable Store Costs',
      },
      {
        type: 'list',
        items: [
          'Monthly Fixed Costs: Platform subscriptions, warehouse rent, salaries, and software tools.',
          'Variable Cost per Order: Product cost, packaging, shipping, payment gateway fees, and ad spend per order.',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: '2. Break-Even Formula & SAR Example',
      },
      {
        type: 'quote',
        text: 'Break-Even Units = Monthly Fixed Costs ÷ (Selling Price per Unit - Variable Cost per Unit)',
      },
      {
        type: 'table',
        headers: ['Metric', 'Value', 'Calculation Note'],
        rows: [
          ['Monthly Fixed Costs', '4,500.00 SAR', 'Subscriptions + operations'],
          ['Unit Selling Price', '180.00 SAR', 'Customer payment'],
          ['Unit Variable Cost', '105.00 SAR', 'Product + shipping + gateway fee'],
          ['Contribution Margin', '75.00 SAR', '180 - 105 per unit'],
          ['Break-Even Orders', '60 orders', '4,500 ÷ 75 = 60 orders/month'],
          ['Break-Even Revenue', '10,800.00 SAR', '60 × 180 SAR'],
        ],
      },
    ],
  },
  'smart-discount-campaigns-without-losing-profit': {
    title: 'Managing Seasonal Discounts & Promotions Without Losing Store Profit',
    description:
      'A practical guide for Saudi online stores on calculating safe discount thresholds during White Friday, National Day, and Ramadan without eroding profit margins.',
    excerpt:
      'Learn how to calculate your safe maximum discount based on real profit margins and use smarter promotion structures to grow revenue profitably.',
    category: 'Pricing Strategy',
    author: 'Store Tools Editorial Team',
    content: [
      {
        type: 'paragraph',
        text: 'Saudi e-commerce stores see peak order volume during Founding Day, Saudi National Day, Ramadan, and White Friday. While promotions attract new buyers, offering arbitrary 20% or 30% sitewide discounts without checking unit economics can turn high sales days into net losses.',
      },
      {
        type: 'heading',
        level: 2,
        text: '1. Why Discounts Cut Deeper Than Expected',
      },
      {
        type: 'paragraph',
        text: 'Discounts are deducted from the full selling price while product cost, shipping, and packaging remain fixed. If your pre-discount profit margin is 25% and you offer 20% off, you lose roughly 80% of your net profit before even counting ad spend.',
      },
      {
        type: 'quote',
        text: 'Your maximum safe discount must always stay below your contribution margin after product cost, shipping, and gateway commissions.',
      },
      {
        type: 'heading',
        level: 2,
        text: '2. Practical SAR Impact Table (250 SAR Base Price, 165 SAR Cost)',
      },
      {
        type: 'table',
        headers: ['Discount Rate', 'Final Price', 'Customer Savings', 'Profit Before Ads', 'Remaining Margin'],
        rows: [
          ['0% (Original)', '250.00 SAR', '0.00 SAR', '85.00 SAR', '34.0%'],
          ['10% Off', '225.00 SAR', '25.00 SAR', '60.00 SAR', '26.7%'],
          ['20% Off', '200.00 SAR', '50.00 SAR', '35.00 SAR', '17.5%'],
          ['30% Off', '175.00 SAR', '75.00 SAR', '10.00 SAR', '5.7%'],
          ['40% Off', '150.00 SAR', '100.00 SAR', '-15.00 SAR (Loss)', '-10.0%'],
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: '3. Smarter Alternatives to Flat Discounts',
      },
      {
        type: 'list',
        items: [
          'Tiered Cart Discounts: e.g., 10% off above 250 SAR and 15% off above 400 SAR to raise Average Order Value.',
          'Product Bundles: Pair core items with high-margin accessories instead of discounting individual SKUs.',
          'Conditional Free Shipping: Set a minimum order threshold so additional margin covers courier charges.',
        ],
      },
    ],
  },
  'reduce-order-cost-and-cod-returns-saudi-stores': {
    title: 'Strategies to Reduce Per-Order Costs and COD Returns in Saudi Stores',
    description:
      'Break down every SAR in order fulfillment costs, understand the true financial impact of Cash-on-Delivery (COD) returns, and optimize store unit economics.',
    excerpt:
      'Analyze where every Riyal goes in order fulfillment and discover practical tactics to reduce COD return losses and shipping expenses.',
    category: 'Operations & Logistics',
    author: 'Store Tools Editorial Team',
    content: [
      {
        type: 'paragraph',
        text: 'In many online stores, profitability challenges come not from low order volume, but from hidden fulfillment costs across supplier pricing, shipping waybills, packaging, gateway fees, and ad spend.',
      },
      {
        type: 'heading',
        level: 2,
        text: '1. Order Cost Breakdown in SAR',
      },
      {
        type: 'table',
        headers: ['Cost Item', 'Amount (SAR)', 'Share of Cost', 'Optimization Lever'],
        rows: [
          ['Base Product Cost', '65.00 SAR', '46.8%', 'Negotiate bulk supplier tiers'],
          ['Marketing & Ads per Order', '35.00 SAR', '25.2%', 'Improve landing page conversion'],
          ['Shipping & Delivery', '24.00 SAR', '17.3%', 'Use consolidated courier contracts'],
          ['Packaging Materials', '6.00 SAR', '4.3%', 'Buy cartons and labels in bulk'],
          ['Payment Gateway Fees', '4.00 SAR', '2.9%', 'Encourage prepaid Mada & Apple Pay'],
          ['Additional Operating Costs', '5.00 SAR', '3.6%', 'Automate order confirmation flows'],
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: '2. Financial Impact of COD Non-Delivery Returns',
      },
      {
        type: 'quote',
        text: 'Lowering Cash-on-Delivery refusal rates from 20% to 8% often boosts monthly net profit more than increasing ad spend.',
      },
      {
        type: 'ordered-list',
        items: [
          'Incentivize Prepaid Orders: Offer priority dispatch or waive COD surcharge fees for Mada, card, and Apple Pay checkouts.',
          'Confirm Addresses Before Dispatch: Automated WhatsApp address verification cuts failed delivery attempts significantly.',
          'Audit Cost Shares Weekly: Use the Order Cost Calculator to spot sudden spikes in ad or courier ratios early.',
        ],
      },
    ],
  },
};
