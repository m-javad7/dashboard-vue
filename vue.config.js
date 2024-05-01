// vue.config.js
module.exports = {
    pwa: {
      name: 'نام اپلیکیشن شما',
      themeColor: '#4DBA87',
      msTileColor: '#000000',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: 'black-translucent',
      manifestOptions: {
        background_color: '#ffffff', // رنگ پس‌زمینه اپلیکیشن
      },
      workboxPluginMode: 'GenerateSW', // استفاده از Workbox برای ایجاد سرویس‌ورکر
      workboxOptions: {
        // Workbox options
      },
    },
  };
  