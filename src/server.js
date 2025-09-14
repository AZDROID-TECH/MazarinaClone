const app = require('./app');
const config = require('./utils/config');

// Port konfigürasiyası - .env faylından və ya default olaraq 3000
const Port = config.port || 3000;

// Server başlat
const Server = app.listen(Port, () => {
  if (config.isDevelopment()) {
    console.log(`🚀 Mazarina server ${Port} portunda işə başladı`);
    console.log(`🌍 ${config.nodeEnv} mühitində çalışır`);
    console.log(`📊 Veritabanı: ${config.dbPath}`);
  }
});

// Graceful shutdown - proqram bağlanarkən təmizlik işləri
process.on('SIGTERM', () => {
  console.log('SIGTERM siqnalı alındı, server bağlanır...');
  Server.close(() => {
    console.log('Server uğurla bağlandı');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT siqnalı alındı, server bağlanır...');
  Server.close(() => {
    console.log('Server uğurla bağlandı');
    process.exit(0);
  });
});

// Unhandled promise rejection - idarə olunmamış promise xətaları
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Kritik xəta - serveri bağla
  Server.close(() => {
    process.exit(1);
  });
});

// Uncaught Exception - idarə olunmamış xətalar
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Kritik xəta - dərhal çıxış
  process.exit(1);
});
