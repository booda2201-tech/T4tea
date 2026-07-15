# T4 Tea — Angular 16

متجر شاي T4 Tea مبني بـ **Angular 16** مع **SCSS**، **Bootstrap 5**، **Tailwind CSS**، و **GSAP** للأنيميشن.

## التقنيات

- Angular 16 (NgModules + RxJS — بدون Signals)
- SCSS للستايلات
- Bootstrap 5 + Bootstrap Icons
- Tailwind CSS (ألوان وخطوط مخصصة)
- GSAP + ScrollTrigger للأنيميشن

## الصفحات

| المسار | الصفحة |
|--------|--------|
| `/` | الرئيسية |
| `/shop` | مجموعة الشاي |
| `/product/:id` | تفاصيل المنتج |
| `/teawares` | أدوات الشاي |
| `/checkout` | الدفع |
| `/about` | من نحن |

## التشغيل

```bash
npm install
npm start
```

يفتح على `http://localhost:4200`

## البناء للإنتاج

```bash
npm run build
```

الملفات في `dist/t4-tea-angular/`

## هيكل المشروع

```
src/app/
├── core/services/cart.service.ts   # سلة التسوق (BehaviorSubject)
├── data/products.ts                # بيانات المنتجات
├── models/                         # الواجهات
├── shared/
│   ├── components/                 # Navbar, Footer, CartDrawer
│   └── directives/gsap-animate     # أنيميشن GSAP عند السكرول
└── pages/                          # كل الصفحات
```
