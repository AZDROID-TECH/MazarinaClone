const knex = require('knex');
const config = require('./config');

// Veritabanı konfiqurasiyası
const dbConfig = {
  client: 'sqlite3',
  connection: {
    filename: config.dbPath
  },
  useNullAsDefault: true, // SQLite3 üçün lazım
  pool: {
    afterCreate: (conn, cb) => {
      // SQLite3 üçün foreign key constraint-ləri aktiv et
      conn.run('PRAGMA foreign_keys = ON', cb);
    }
  },
  // Debug rejimində SQL sorğularını göstər
  debug: config.isDevelopment()
};

// Knex instance yaradılması
const Database = knex(dbConfig);

// Veritabanı bağlantısını yoxla
const testConnection = async () => {
  try {
    await Database.raw('SELECT 1+1 as result');
    if (config.isDevelopment()) {
      console.log('✅ Veritabanı bağlantısı uğurludur');
    }
  } catch (error) {
    console.error('Veritabanı bağlantı xətası:', error.message);
    throw error;
  }
};

// Migration status yoxla
const checkMigrations = async () => {
  try {
    const [batchNo] = await Database.migrate.currentVersion();
    if (config.isDevelopment()) {
      console.log(`📋 Migration versiyası: ${batchNo || 'none'}`);
    }
    
    // Əgər migration edilməmişsə xəbərdarlıq et
    if (!batchNo) {
      console.warn('Migration-lar həyata keçirilməyib. `npm run migrate` əmrini icra edin');
    }
  } catch (error) {
    if (config.isDevelopment()) {
      console.warn('Migration status yoxlanılarkən xəta:', error.message);
    }
  }
};

// Başlanğıcda veritabanı yoxlaması
const initializeDatabase = async () => {
  try {
    await testConnection();
    await checkMigrations();
  } catch (error) {
    console.error('💥 Veritabanı başlanğıcında xəta:', error);
    throw error;
  }
};

// Graceful shutdown üçün bağlantını bağla
const closeConnection = async () => {
  try {
    await Database.destroy();
    console.log('🔌 Veritabanı bağlantısı bağlandı');
  } catch (error) {
    console.error('❌ Veritabanı bağlantısı bağlanarkən xəta:', error);
  }
};

module.exports = {
  db: Database,
  initializeDatabase,
  closeConnection,
  testConnection,
  checkMigrations
};
