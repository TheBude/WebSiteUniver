# Samarqand davlat universiteti sayti

React va Vite’da yaratilgan statik sayt. Build natijasi `dist/` papkasiga yoziladi va oddiy static hosting’ga joylanadi.

## Talablar

- Node.js 20.19+ yoki 22.12+
- npm

## Ishga tushirish

```sh
npm ci
npm run dev
```

## Release tekshiruvi

```sh
npm run check
```

Bu buyruq testlarni va production build’ni bajaradi. Faqat build uchun `npm run build` ishlatiladi. Build’ni local tekshirish:

```sh
npm run preview
```

## Deploy

`npm run build` muvaffaqiyatli tugagach, hosting’ga `dist/` ichidagi fayllarni joylang. Vite `base: './'` ishlatadi, shuning uchun asset’lar root domenida ham, subpath’da joylanganda ham nisbiy yo‘l bilan topiladi.

Saytda backend API yoki maxfiy environment variable talab qilinmaydi. Tanlangan til brauzerning `localStorage` xotirasida saqlanadi. Navbar’dagi ijtimoiy tarmoq ikonlari hozircha placeholder havolalarsiz ko‘rsatiladi; release’dan oldin rasmiy ijtimoiy URL’lar berilsa, ularni ulash kerak.