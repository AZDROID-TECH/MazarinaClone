const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');
const path = require('path');
const config = require('../utils/config');

// i18next konfiqurasiyası
i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    // Dil ayarları
    lng: config.defaultLanguage, // Default dil
    fallbackLng: config.defaultLanguage, // Fallback dili
    supportedLngs: config.supportedLanguages, // Dəstəklənən dillər
    
    // Backend konfiqurasiyası (fayl sistem)
    backend: {
      loadPath: path.join(__dirname, '../../locales/{{lng}}.json'),
      addPath: path.join(__dirname, '../../locales/{{lng}}.missing.json')
    },
    
    // Dil aşkarlamaq üçün strategiyalar
    detection: {
      order: ['querystring', 'cookie', 'header', 'path', 'subdomain'],
      lookupQuerystring: 'lng',
      lookupCookie: 'lng',
      lookupPath: 'lng',
      lookupFromPathIndex: 0,
      caches: ['cookie'], // Dili cookie-də saxla
      cookieMaxAge: 1000 * 60 * 60 * 24 * 365 // 1 il
    },
    
    // Namespace və key separator
    defaultNS: 'translation',
    keySeparator: '.', // dot notation üçün
    nsSeparator: ':', // namespace separator
    
    // İnterpolasiya ayarları
    interpolation: {
      escapeValue: true, // XSS protection üçün escape et
      format: function(value, format, lng) {
        // Özelleştirilmiş format funksiyası
        if (format === 'uppercase') return value.toUpperCase();
        if (format === 'lowercase') return value.toLowerCase();
        return value;
      }
    },
    
    // Development konfiqurasiyası
    debug: config.isDevelopment(),
    
    // Yüklənmə davranışı
    load: 'languageOnly', // 'az-AZ' yerinə sadəcə 'az' istifadə et
    preload: config.supportedLanguages, // Bütün dilləri əvvəlcədən yükləyin
    
    // Çeviri eksiklikləri
    saveMissing: config.isDevelopment(), // Development-də eksik tərcümələri saxla
    missingKeyHandler: function(lng, ns, key, fallbackValue) {
      // Silent missing key handling - log only in debug mode with NODE_DEBUG=i18n
      if (config.isDevelopment() && process.env.NODE_DEBUG?.includes('i18n')) {
        console.warn(`🏷️  Eksik tərcümə açarı: [${lng}] ${key}`);
      }
    }
  });

// Express middleware yaradılması
const i18nHandler = middleware.handle(i18next, {
  // Dil dəyişdirmə route-ları avtomatik yaradılması
  removeLngFromUrl: false
});

// Özelleştirilmiş middleware - əlavə funksionallıq üçün
const customI18nMiddleware = (req, res, next) => {
  // i18next middleware-ını çalıştır
  i18nHandler(req, res, () => {
    // Hazırkı dilin URL-də olub olmadığını yoxla
    const urlParts = req.originalUrl.split('/');
    const firstPart = urlParts[1];
    
    // URL-də dil kodu varsa onu çıxar və dili təyin et
    if (config.supportedLanguages.includes(firstPart)) {
      req.language = firstPart;
      req.baseUrl = '/' + firstPart;
      
      // Dili dəyiş
      if (req.i18n.language !== firstPart) {
        req.i18n.changeLanguage(firstPart);
      }
    } else {
      req.language = config.defaultLanguage;
      req.baseUrl = '';
    }
    
    // Template helper funksiyaları əlavə et
    res.locals.t = req.t.bind(req);
    res.locals.changeLanguageUrl = (newLang) => {
      const currentPath = req.originalUrl;
      const currentLang = req.language;
      
      // Mövcud dili yeni dillə əvəz et
      if (config.supportedLanguages.includes(req.originalUrl.split('/')[1])) {
        return currentPath.replace(`/${currentLang}`, `/${newLang}`);
      } else {
        return `/${newLang}${currentPath}`;
      }
    };
    
    next();
  });
};

module.exports = customI18nMiddleware;
