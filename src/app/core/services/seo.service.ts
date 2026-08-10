import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export type SeoLang = 'ar' | 'en';

interface SeoCopy {
  title: string;
  description: string;
  keywords: string;
  ogLocale: string;
}

const SEO_COPY: Record<SeoLang, SeoCopy> = {
  en: {
    title: 'T4 Tea — Premium Turkish Tea',
    description:
      'Shop premium Turkish tea blends, herbal infusions, and teawares at T4 Tea. Discover black, green, and herbal collections for every moment.',
    keywords:
      'T4 Tea, t4tea.shop, Turkish tea, black tea, green tea, herbal tea, teaware, premium tea blends, tea shop Turkey',
    ogLocale: 'en_US',
  },
  ar: {
    title: 'تي فور تي — شاي تركي فاخر',
    description:
      'تسوّق أجود خلطات الشاي التركي والمشروبات العشبية وأدوات الشاي من تي فور تي. اكتشف مجموعات الشاي الأسود والأخضر والعشبي لكل لحظة.',
    keywords:
      'تي فور تي, T4 Tea, t4tea.shop, شاي تركي, شاي أسود, شاي أخضر, شاي أعشاب, أدوات شاي, شاي فاخر',
    ogLocale: 'ar_EG',
  },
};

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly siteUrl = 'https://t4tea.shop/';
  private readonly ogImage = 'https://t4tea.shop/assets/imges/logo.png';

  constructor(
    private title: Title,
    private meta: Meta
  ) {}

  /** Apply SEO tags for the visitor's browser language (Arabic or English). */
  initFromBrowser(): SeoLang {
    const lang = this.detectLang();
    this.apply(lang);
    return lang;
  }

  apply(lang: SeoLang): void {
    const copy = SEO_COPY[lang];

    document.documentElement.lang = lang;

    this.title.setTitle(copy.title);

    this.updateTag('name="title"', 'name', 'title', copy.title);
    this.updateTag('name="description"', 'name', 'description', copy.description);
    this.updateTag('name="keywords"', 'name', 'keywords', copy.keywords);
    this.updateTag('name="robots"', 'name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1');
    this.updateTag('name="author"', 'name', 'author', 'T4 Tea');

    this.updateTag('property="og:type"', 'property', 'og:type', 'website');
    this.updateTag('property="og:url"', 'property', 'og:url', this.siteUrl);
    this.updateTag('property="og:title"', 'property', 'og:title', copy.title);
    this.updateTag('property="og:description"', 'property', 'og:description', copy.description);
    this.updateTag('property="og:image"', 'property', 'og:image', this.ogImage);
    this.updateTag('property="og:site_name"', 'property', 'og:site_name', 'T4 Tea');
    this.updateTag('property="og:locale"', 'property', 'og:locale', copy.ogLocale);
    this.updateTag(
      'property="og:locale:alternate"',
      'property',
      'og:locale:alternate',
      lang === 'ar' ? 'en_US' : 'ar_EG'
    );

    this.updateTag('name="twitter:card"', 'name', 'twitter:card', 'summary_large_image');
    this.updateTag('name="twitter:url"', 'name', 'twitter:url', this.siteUrl);
    this.updateTag('name="twitter:title"', 'name', 'twitter:title', copy.title);
    this.updateTag('name="twitter:description"', 'name', 'twitter:description', copy.description);
    this.updateTag('name="twitter:image"', 'name', 'twitter:image', this.ogImage);
  }

  detectLang(): SeoLang {
    const candidates = [
      ...(navigator.languages ?? []),
      navigator.language,
      document.documentElement.lang,
    ]
      .filter(Boolean)
      .map(v => String(v).toLowerCase());

    return candidates.some(v => v.startsWith('ar')) ? 'ar' : 'en';
  }

  private updateTag(
    selector: string,
    attr: 'name' | 'property',
    key: string,
    content: string
  ): void {
    if (this.meta.getTag(selector)) {
      this.meta.updateTag({ [attr]: key, content });
    } else {
      this.meta.addTag({ [attr]: key, content });
    }
  }
}
