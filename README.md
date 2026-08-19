# RajFlix 🎬

موقع مشاهدة أفلام ومسلسلات، بدخول بالاسم:
- **Rajisma** → يدخل كـ "المؤسس التنفيذي"
- **ادمن** → يدخل كـ "أدمن"
- أي اسم غير هذول → يدخل كـ "صديق"

مبني بـ HTML/CSS/JS بسيط (بدون أي مكتبات ثقيلة) عشان يشتغل مباشرة على GitHub Pages
وكـ **Telegram Mini App**.

> ملاحظة: الموقع يعرض معلومات وبوسترات الأفلام/المسلسلات من TMDB فقط (بدون أي روابط بث أو تحميل).

---

## 1) خطوات الحصول على مفتاح TMDB API (مجاني)

1. روح لـ https://www.themoviedb.org وسوي حساب مجاني.
2. من الإعدادات: **Settings → API**.
3. اضغط **Create** واختار نوع الحساب **Developer**، وعبّي البيانات المطلوبة (تقدر تكتب "استخدام شخصي/تعليمي").
4. بعد الموافقة، رح تحصل على **API Key (v3 auth)**.
5. افتح ملف `assets/js/config.js` وبدّل هذا السطر:

```js
TMDB_API_KEY: "YOUR_TMDB_API_KEY",
```

بمفتاحك الحقيقي:

```js
TMDB_API_KEY: "1234567890abcdef1234567890abcdef",
```

6. احفظ الملف. بس هيك الموقع رح يبدأ يجيب بيانات حقيقية.

---

## 2) رفع الموقع على GitHub ونشره بـ GitHub Pages

```bash
cd rajflix
git init
git add .
git commit -m "RajFlix v1"
git branch -M main
git remote add origin https://github.com/USERNAME/rajflix.git
git push -u origin main
```

بعدين من إعدادات المستودع بـ GitHub:
1. **Settings → Pages**
2. تحت **Source** اختار **Branch: main** و **Folder: / (root)**
3. احفظ. رح يعطيك رابط شبيه بـ:
   `https://USERNAME.github.io/rajflix/`

هذا الرابط هو اللي رح تستخدمه بالخطوة الجاية مع تيليجرام.

---

## 3) ربط الموقع كـ Telegram Mini App

1. افتح تيليجرام وسوي محادثة مع **[@BotFather](https://t.me/BotFather)**.
2. أرسل الأمر `/newbot` واتبع الخطوات (اسم البوت + username ينتهي بـ `bot`).
3. بعد ما تسوي البوت، أرسل `/newapp` واختار البوت اللي سويته.
4. لما يطلب منك **Web App URL**، حط رابط GitHub Pages تبعك:
   `https://USERNAME.github.io/rajflix/`
5. عبّي اسم وصورة الـ Mini App حسب ما يطلب BotFather.
6. خلص! الـ Mini App رح يظهر داخل البوت، وأي شخص يفتحه رح يشوف صفحة الدخول
   (تذكرة RajFlix) أول شي.

الموقع أصلاً يتضمن `telegram-web-app.js` وسكربت `assets/js/telegram.js`
يتكفل بتهيئة التطبيق تلقائياً (توسيع الشاشة، تنسيق الألوان...) لما يفتح من جوا تيليجرام،
وبنفس الوقت يشتغل عادي بأي متصفح.

---

## هيكل المشروع

```
rajflix/
├── index.html          # صفحة الدخول (التذكرة)
├── home.html            # الصفحة الرئيسية (أفلام / مسلسلات / بحث)
├── movie.html            # صفحة تفاصيل فيلم أو مسلسل
├── README.md
└── assets/
    ├── css/style.css
    └── js/
        ├── config.js     # مفتاح TMDB + إعدادات عامة
        ├── auth.js       # نظام الدخول وتحديد الصلاحية
        ├── api.js        # الاتصال بـ TMDB
        ├── app.js         # منطق الصفحة الرئيسية
        ├── details.js     # منطق صفحة التفاصيل
        └── telegram.js    # تهيئة Telegram Mini App
```

## تخصيص لاحق

- لتغيير اسم المؤسس أو الأدمن: عدّل `FOUNDER_NAME` و `ADMIN_NAME` بملف `assets/js/config.js`.
- لإضافة قائمة أصدقاء محددة بدل "أي اسم = صديق"، عدّل الدالة `resolveRole` بملف `assets/js/auth.js`.
