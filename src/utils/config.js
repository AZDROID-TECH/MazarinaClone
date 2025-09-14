require('dotenv').config();

// Konfigürasiya obyekti - environment variable-ları təmizlə və təsdiqli şəkildə saxla
const Config = {
  // Server konfigürasiyası
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Veritabanı konfigürasiyası
  dbPath: process.env.DB_PATH || './db/mazarina.sqlite3',
  
  // Session konfigürasiyası
  sessionSecret: process.env.SESSION_SECRET || 'default-secret-change-this',
  
  // Upload konfigürasiyası
  uploadPath: process.env.UPLOAD_PATH || './src/public/uploads',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 2097152, // 2MB default
  
  // Güvenlik konfigürasiyası
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS, 10) || 12,
  
  // Dil konfigürasiyası
  defaultLanguage: process.env.DEFAULT_LANGUAGE || 'az',
  supportedLanguages: (process.env.SUPPORTED_LANGUAGES || 'az,en,ru').split(','),
  
  // Əlaqə məlumatları (default dəyərlər)
  contact: {
    phone: process.env.CONTACT_PHONE || '+994 12 567 45 13',
    email: process.env.CONTACT_EMAIL || 'info@mazarina.az',
    address: process.env.CONTACT_ADDRESS || 'AZ1029, Azerbaijan Republic, Baku, Str. Alaskar Gaibov, 1222/12'
  },
  
  // Development/production fərqləri
  isDevelopment: () => Config.nodeEnv === 'development',
  isProduction: () => Config.nodeEnv === 'production'
};

// Məcburi parametrlərin yoxlanılması
const validateConfig = () => {
  const requiredVars = ['SESSION_SECRET'];
  
  if (Config.isProduction()) {
    for (const variable of requiredVars) {
      if (!process.env[variable] || process.env[variable] === 'default-secret-change-this') {
        throw new Error(`🚨 Production mühitində ${variable} parametri təyin edilməlidir`);
      }
    }
  }
  
  if (!Config.supportedLanguages.includes(Config.defaultLanguage)) {
    throw new Error(`🚨 Default dil (${Config.defaultLanguage}) dəstəklənən dillər arasında olmalıdır`);
  }
};

// Başlanğıcda konfiqurasiyanı yoxla
validateConfig();

module.exports = Config;
