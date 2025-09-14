const config = require('../utils/config');

/**
 * Global xəta idarə edici middleware
 * ExpressEJS qaydalarına uyğun olaraq bütün xətaları idarə edir
 */
const errorHandler = (err, req, res, next) => {
  // Xəta məlumatlarını log et
  const Error_Log = {
    timestamp: new Date().toISOString(),
    error: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    user: req.session?.user?.username || 'anonymous'
  };

  // Production mühitində sadəcə vacib məlumatları log et
  if (config.isDevelopment()) {
    // Development mühitində ətraflı məlumat
    console.error('🚨 Express xəta idarə edici:', Error_Log);
  } else {
    // Production mühitində minimal logging
    console.error('Server xətası:', {
      message: err.message,
      status: err.status || 500,
      url: req.originalUrl,
      method: req.method,
      timestamp: Error_Log.timestamp,
      ip: req.ip
    });
  }

  // HTTP status kodunu təyin et
  const Status_Code = err.statusCode || err.status || 500;
  
  // Xəta mesajını təyin et - istifadəçi dostu
  let Error_Message;
  let Error_Key;

  // Status koduna görə xəta mesajını seç
  switch (Status_Code) {
    case 400:
      Error_Key = 'errors.validation_error';
      break;
    case 401:
      Error_Key = 'errors.unauthorized';
      break;
    case 403:
      Error_Key = 'errors.forbidden';
      break;
    case 404:
      Error_Key = 'errors.not_found';
      break;
    case 429:
      Error_Key = 'errors.too_many_requests';
      break;
    case 500:
    default:
      Error_Key = 'errors.server_error';
  }

  // i18n funksiyası mövcuddursa tərcümə et
  if (req.t) {
    Error_Message = req.t(Error_Key);
  } else {
    // Fallback mesajlar (i18n yüklənməmişsə)
    const Fallback_Messages = {
      400: 'Doğrulama xətası',
      401: 'İcazəsiz giriş',
      403: 'Qadağan edilmiş',
      404: 'Səhifə tapılmadı',
      429: 'Çox sayda sorğu',
      500: 'Server xətası'
    };
    Error_Message = Fallback_Messages[Status_Code] || 'Naməlum xəta';
  }

  // JSON API sorğularını yoxla
  if (req.xhr || req.get('Content-Type') === 'application/json' || req.path.startsWith('/api/')) {
    // JSON cavab qaytır
    return res.status(Status_Code).json({
      success: false,
      error: {
        message: Error_Message,
        code: Status_Code,
        timestamp: Error_Log.timestamp
      },
      // Development mühitində əlavə məlumat
      ...(config.isDevelopment() && {
        debug: {
          stack: err.stack,
          originalError: err.message
        }
      })
    });
  }

  // HTML səhifə render et
  res.status(Status_Code).render('error', {
    title: Error_Message,
    error: {
      status: Status_Code,
      message: Error_Message,
      // Development mühitində stack trace göstər
      stack: config.isDevelopment() ? err.stack : null
    }
  });
};

/**
 * Async funksiyaları wrap edən helper
 * Promise rejection-ları avtomatik olaraq error handler-ə yönləndirir
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * 404 Not Found handler
 * Middleware chain-də ən sonda çağırılır
 */
const notFoundHandler = (req, res, next) => {
  const error = new Error(`Səhifə tapılmadı: ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

module.exports = {
  errorHandler,
  asyncHandler,
  notFoundHandler
};
