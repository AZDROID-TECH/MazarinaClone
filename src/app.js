const express = require('express');
const path = require('path');
const session = require('express-session');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');

// Lokal modullar
const config = require('./utils/config');
const { initializeDatabase } = require('./utils/database');
const i18nMiddleware = require('./middleware/i18nMiddleware');
const { errorHandler } = require('./middleware/errorHandler');

// Route-ları import et (hələlik placeholder)
// const publicRoutes = require('./routes/publicRoutes');
// const adminRoutes = require('./routes/adminRoutes');

// Express tətbiqini yarat
const App = express();

// Veritabanını başlat
initializeDatabase().catch((error) => {
  console.error('❌ Veritabanı başlanğıc xətası:', error);
  process.exit(1);
});

// Güvenlik middleware-ı
App.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com", "unpkg.com"],
      scriptSrc: ["'self'", "unpkg.com"],
      fontSrc: ["'self'", "fonts.gstatic.com", "fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "*.jsdelivr.net"],
      connectSrc: ["'self'"]
    }
  }
}));

// CORS konfiqurasiyası
App.use(cors({
  origin: config.isDevelopment() ? true : ['https://mazarina.az'], // Production-da domain specify et
  credentials: true
}));

// Sıxışdırma middleware-ı
App.use(compression());

// Request logging (development də daha ətraflı)
App.use(morgan(config.isDevelopment() ? 'dev' : 'combined'));

// Body parsing middleware-ı
App.use(express.json({ limit: '10mb' }));
App.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static fayllar (images, CSS, JS)
App.use(express.static(path.join(__dirname, 'public')));

// Session konfiqurasiyası
App.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: config.isProduction(), // HTTPS-də secure cookies
    httpOnly: true, // XSS protection
    maxAge: 1000 * 60 * 60 * 24 // 24 saat
  }
}));

// View engine konfiqurasiyası (EJS)
App.set('view engine', 'ejs');
App.set('views', path.join(__dirname, 'views'));

// i18n middleware-ını əlavə et
App.use(i18nMiddleware);

// Lokal dəyişənlər - bütün template-lərdə istifadə üçün
App.use((req, res, next) => {
  res.locals.currentUrl = req.originalUrl;
  res.locals.currentLanguage = req.language || config.defaultLanguage;
  res.locals.supportedLanguages = config.supportedLanguages;
  res.locals.isAdmin = req.session && req.session.isAdmin;
  res.locals.config = config;
  next();
});

// Route-ları bağla (hələlik placeholder)
App.get('/', (req, res) => {
  res.render('home', { 
    title: req.t('site.title'),
    description: req.t('site.description'),
    req: req // req objesini template'e geçir
  });
});

// 404 - səhifə tapılmadı
App.use('*', (req, res) => {
  res.status(404).render('error', {
    title: req.t('errors.not_found'),
    error: {
      status: 404,
      message: req.t('errors.not_found')
    }
  });
});

// Global xəta idarə edici middleware
App.use(errorHandler);

module.exports = App;
