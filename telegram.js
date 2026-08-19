// تهيئة تطبيق تيليجرام المصغر (Telegram Mini App)
(function initTelegram() {
  const tg = window.Telegram && window.Telegram.WebApp;
  if (!tg) return; // يشتغل عادي بالمتصفح العادي إذا مو مفتوح من تيليجرام

  try {
    tg.ready();
    tg.expand();

    // مزامنة الألوان مع ثيم تيليجرام إذا متوفرة
    const root = document.documentElement.style;
    if (tg.themeParams) {
      if (tg.themeParams.bg_color) root.setProperty('--bg', tg.themeParams.bg_color);
    }

    tg.setHeaderColor && tg.setHeaderColor('secondary_bg_color');
    tg.enableClosingConfirmation && tg.enableClosingConfirmation();
  } catch (e) {
    console.warn('Telegram WebApp init skipped:', e);
  }
})();
