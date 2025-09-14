# 🏢 Mazarina Trade Company - Website Clone

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-18%2B-green" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-4.18%2B-blue" alt="Express">
  <img src="https://img.shields.io/badge/EJS-3.1%2B-red" alt="EJS">
  <img src="https://img.shields.io/badge/SQLite3-5.1%2B-yellow" alt="SQLite3">
  <img src="https://img.shields.io/badge/License-ISC-lightgrey" alt="License">
</div>

---

Bu layihə [mazarina.az](https://mazarina.az/) saytının **təlimat məqsədli** olaraq Express + EJS + SQLite3 istifadə edərək hazırlanmış peşəkar klonudur.

## 🚀 Xüsusiyyətlər

### 🌐 Frontend
- **Template Engine**: EJS (Embedded JavaScript) v3.1+
- **Responsive Design**: Mobile-first approach
- **CSS Framework**: Custom CSS with CSS Variables
- **Icons**: Boxicons (CDN)
- **Fonts**: Ubuntu (Google Fonts)
- **JavaScript**: Vanilla ES6+ with modern features

### ⚙️ Backend
- **Runtime**: Node.js 18.0+
- **Framework**: Express.js 4.18+
- **Database**: SQLite3 with Knex.js ORM
- **Authentication**: Session-based auth with bcrypt
- **Middleware**: Helmet, CORS, Compression, Morgan
- **File Upload**: Multer with size limits

### 🌍 Internationalization (i18n)
- **Languages**: Azerbaijani (default), English, Russian
- **Library**: i18next with filesystem backend
- **Features**: Dynamic language switching, fallback support
- **Format**: Dot notation keys (e.g., `home.title`)

### 🔒 Güvenlik
- **Password Hashing**: bcrypt with 12 rounds
- **Session Management**: Secure HTTP-only cookies
- **Input Validation**: express-validator
- **Security Headers**: Helmet middleware
- **CORS Protection**: Configured for development and production
- **SQL Injection**: Parameterized queries via Knex

### 📊 Admin Panel
- **Brand Management**: CRUD operations with logo upload
- **Partner Management**: Company partnerships with links
- **Content Management**: Dynamic page content
- **Settings**: Site configuration and contact information
- **File Upload**: Image handling with validation

### 🚀 Performance
- **Compression**: Gzip compression enabled
- **Static Assets**: Efficient serving with Express.static
- **Database**: SQLite with optimized queries
- **Caching**: Template caching in production

## 📋 Tələblər

- Node.js 18.0.0 və ya daha yüksək versiya
- npm 8.0.0 və ya daha yüksək versiya

## 🛠 Quraşdırma

1. **Layihəni klonlayın**
   ```bash
   cd MazarinaClone
   ```

2. **Asılılıqları quraşdırın**
   ```bash
   npm install
   ```

3. **Environment faylını yaradın**
   ```bash
   cp .env.example .env
   ```

4. **.env faylını konfiqurasiya edin**
   ```bash
   # Lazım olan parametrləri dəyişdirin
   nano .env
   ```

5. **Veritabanı migration-larını icra edin**
   ```bash
   npm run migrate
   ```

6. **Seed məlumatları yükləyin** 
   ```bash
   npm run seed
   ```

7. **Tətbiqi başladın**
   ```bash
   # Development rejimi
   npm run dev
   
   # Production rejimi  
   npm start
   ```

## 🗄 Veritabanı Əməliyyatları

```bash
# Migration-ları icra et
npm run migrate

# Son migration-ı geri al
npm run rollback

# Seed məlumatları yüklə
npm run seed
```

## 🔐 Admin Girişi

**Default admin məlumatları:**
- İstifadəçi adı: `admin`
- Parol: `Admin5225`

Admin panelinə giriş üçün: `http://localhost:3000/admin/login`

## 📁 Layihə Strukturu

```
MazarinaClone/
├── src/
│   ├── routes/           # URL yönlendirmələri
│   ├── controllers/      # HTTP isteği idarə ediciləri  
│   ├── services/         # Biznes məntiqi
│   ├── repos/           # Veritabanı əlaqələri
│   ├── middleware/      # Express middleware-ləri
│   ├── views/           # EJS template-ləri
│   │   └── partials/    # Header/footer kimi parçalar
│   ├── public/          # Static fayllar (CSS, JS, şəkillər)
│   ├── utils/           # Yardımçı modullar
│   ├── app.js           # Express tətbiqi konfiqurasiyası
│   └── server.js        # Server başladıcı
├── locales/             # Çoxdilli tərcümələr
│   ├── az.json         # Azərbaycan dili
│   ├── en.json         # İngilis dili
│   └── ru.json         # Rus dili
├── db/                  # Veritabanı faylları
│   ├── migrations/     # Veritabanı migration-ları
│   ├── seeds/         # Başlanğıc məlumatları
│   └── knexfile.js    # Knex konfiqurasiyası
└── Rules/             # Layihə qaydaları (git-də yoxdur)
```

## 🌍 Çoxdilli Dəstək

Sayt 3 dildə mövcuddur:
- **az** - Azərbaycan dili (default)
- **en** - İngilis dili  
- **ru** - Rus dili

Dil dəyişmə URL formatı:
- Default: `http://localhost:3000/`
- İngilis: `http://localhost:3000/en/`
- Rus: `http://localhost:3000/ru/`

## 🎨 Dizayn və Rənglər

Layihədə original Mazarina saytının rəng paleti istifadə edilir:

```css
/* Əsas rənglər */
--primary-color: #1a1a2e;    /* Tünd mavi */
--secondary-color: #16213e;   /* Daha açıq mavi */
--accent-color: #e74c3c;      /* Qırmızı */
--background: #f8f9fa;        /* Açıq boz */
```

## 🔧 Konfiqurasiya

### Environment Dəyişənləri (.env)

```bash
# Server
PORT=3000
NODE_ENV=development

# Veritabanı
DB_PATH=./db/mazarina.sqlite3

# Session
SESSION_SECRET=your-secret-key-here

# Upload
UPLOAD_PATH=./src/public/uploads
MAX_FILE_SIZE=2097152

# Güvenlik
BCRYPT_ROUNDS=12

# Dil
DEFAULT_LANGUAGE=az
SUPPORTED_LANGUAGES=az,en,ru
```

## 🧪 Test

```bash
# Unit testləri işə sal
npm test

# Linting yoxlaması
npm run lint

# Kod formatlama
npm run format
```

## 📦 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
# Production environment-i təyin et
export NODE_ENV=production

# Tətbiqi başlat
npm start

# PM2 ilə (tövsiyə edilir)
npm install -g pm2
pm2 start src/server.js --name mazarina
```

## 🏗️ Arxitektura

### MVC Pattern (Model-View-Controller)
Layihə klassik MVC arxitektura patterninlə qurulub:

```
Request Flow:
Client → Routes → Controllers → Services → Repositories → Database
                     │
                     ↓
Client ← Views (EJS) ← Controllers (with data)
```

### Layered Architecture
- **Presentation Layer**: EJS templates və static assets
- **Controller Layer**: HTTP request handling və routing
- **Service Layer**: Business logic və data processing
- **Repository Layer**: Database access və data persistence
- **Middleware Layer**: Authentication, validation, error handling

### Design Patterns
- **Singleton**: Database connection instance
- **Factory**: Error response factory
- **Strategy**: Multi-language content delivery
- **Observer**: Event-driven logging system

## 📚 Istifadə Edilmiş Texnologiyalar

### Core Dependencies
```json
{
  "express": "^4.18.2",           // Web framework
  "ejs": "^3.1.9",                // Template engine
  "knex": "^3.0.1",               // SQL query builder
  "sqlite3": "^5.1.6",            // Database
  "bcrypt": "^5.1.1",             // Password hashing
  "express-session": "^1.17.3",   // Session management
  "i18next": "^23.7.6",           // Internationalization
  "express-validator": "^7.0.1",  // Input validation
  "helmet": "^7.1.0",             // Security headers
  "cors": "^2.8.5",               // Cross-origin resource sharing
  "compression": "^1.7.4",        // Gzip compression
  "morgan": "^1.10.0",            // HTTP request logging
  "multer": "^1.4.5-lts.1"        // File upload handling
}
```

### Development Dependencies
```json
{
  "nodemon": "^3.0.2",      // Development server
  "jest": "^29.7.0",        // Testing framework
  "supertest": "^6.3.3",    // HTTP testing
  "eslint": "^8.55.0",      // Linting
  "prettier": "^3.1.1"      // Code formatting
}
```

## 🔒 Güvenlik Xüsusiyyətləri

### Authentication & Authorization
- **Session-based authentication**: Express-session middleware
- **Password security**: bcrypt with 12 salt rounds
- **Session security**: HTTPOnly, Secure cookies
- **CSRF protection**: Anti-forgery tokens (plan)

### Input Validation & Sanitization
- **express-validator**: Server-side validation
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: EJS auto-escaping enabled
- **File Upload Security**: Type and size validation

### Security Headers
```javascript
// Helmet configuration
helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
      scriptSrc: ["'self'", "unpkg.com"],
      fontSrc: ["'self'", "fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "*.jsdelivr.net"]
    }
  }
})
```

### Data Protection
- **Environment variables**: Sensitive data in .env
- **Database security**: SQLite with file permissions
- **Error handling**: No sensitive info in error responses
- **Logging**: Structured logging without sensitive data

## 📝 API Endpoints

### Public Routes
```
GET  /                    # Ana səhifə
GET  /about              # Haqqında
GET  /brands             # Brendlər
GET  /distribution       # Distribüsiya
GET  /career             # Karyera  
GET  /contact            # Əlaqə
```

### Admin Routes  
```
GET  /admin/login        # Admin giriş səhifəsi
POST /admin/login        # Admin authentication
GET  /admin/dashboard    # Admin paneli
GET  /admin/brands       # Brendlər idarəetməsi
GET  /admin/partners     # Tərəfdaşlar idarəetməsi
GET  /admin/settings     # Sayt parametrləri
```

## 🛠️ Inkishaf Qaydaları

### Kod Yazma Qaydaları
- **Yorumlar**: Əzaydəmi bütün yorumlar Azərbaycan dilində
- **Identifier-lar**: Bütün dəyişən, funksiya və sinif adları İngilis dilində
- **i18n Format**: Dot notation (məs. `home.title`)
- **Error Handling**: Global error handler middleware istifadəsi
- **Single Responsibility**: Hər modul tək məsəliyyyət daşır

### Fayl Strukturu Qaydaları
```
✔️ Correct Structure:
src/
  controllers/    # HTTP request handlers
  services/       # Business logic
  repos/          # Database operations
  middleware/     # Express middleware
  utils/          # Helper functions
  views/          # EJS templates
```

### Git Qaydaları
- **Rules/**: Bu qovluq .gitignore-dadır
- **node_modules/**: Asılılıqlar ignore edilir
- **Commit Messages**: İngilis dilində və açıqlayıcı
- **.env**: Production dəyərləri heç vaxt commit edilmir

## 📜 Qaydalar Uyumluğu

### Ümumi Qaydalar (Rules/Ümumi.md)
✅ **Tətbiqlənən qaydalar:**
- Yorumlar Azərbaycan dilində yazılıb
- Identifier-lar İngilis dilində adlandırılıb
- Dot notation format i18n üçün istifadə edilib
- .gitignore-da Rules/ və node_modules/ əlavə edilib

### ExpressEJS Qaydaları (Rules/ExpressEJS.md)
✅ **Tətbiqlənən qaydalar:**
- Single Responsibility prinsipində modul ayrımı
- Controller/Service/Repository bölgüsü
- Middleware-lərin təmiz ayrımı
- Global error handler middleware
- EJS template engine istifadəsi
- SQLite3 və Knex ORM quraşdırılması

## 🧪 Test Coverage

### Unit Tests
```bash
# Service layer testləri
npm run test:unit

# Utility functions testləri 
npm run test:utils
```

### Integration Tests
```bash
# Route testləri
npm run test:routes

# Database testləri
npm run test:db
```

### E2E Tests 
```bash
# Admin panel testləri
npm run test:admin

# Public pages testləri
npm run test:pages
```

## 🌐 Production Hazirliği

### Environment Konfiqurasiyasi
```bash
# Production .env nümunəsi
NODE_ENV=production
PORT=3000
SESSION_SECRET=ultra-secure-secret-key-256-chars
DB_PATH=/var/lib/mazarina/mazarina.sqlite3
UPLOAD_PATH=/var/lib/mazarina/uploads
```

### Server Konfiqurasiyasi
```bash
# Nginx reverse proxy
server {
    listen 80;
    server_name example.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### PM2 Konfiqurasiyasi
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'mazarina-clone',
    script: 'src/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

## 🐛 Xəta Həlli və Debuging

### Ümumi Problemlər

1. **Veritabanı xətası**
   ```bash
   # Migration-ları yenidən icra et
   npm run migrate
   
   # Database fayının permissions yoxla
   chmod 664 db/mazarina.sqlite3
   ```

2. **Port artıq istifadədədir**
   ```bash
   # İstifadədə olan portları yoxla
   lsof -i :3000
   
   # .env faylında PORT dəyişənini dəyişdir
   PORT=3001
   ```

3. **i18n tərcümələr yüklənmir**
   ```bash
   # locales/ qovluğunun mövcudluğunu yoxla
   ls -la locales/
   
   # JSON fayllarının valid olduğunu yoxla
   node -e "console.log(JSON.parse(require('fs').readFileSync('locales/az.json')))"
   ```

4. **File upload xətaları**
   ```bash
   # Upload qovluğunun yaradılması
   mkdir -p src/public/uploads
   chmod 755 src/public/uploads
   ```

5. **Session xətaları**
   ```bash
   # SESSION_SECRET dəyişənini yoxla
   grep SESSION_SECRET .env
   ```

### Debug Mode
```bash
# Debug rejimində işə sal
DEBUG=app:* npm run dev

# Database debug
DEBUG=knex:* npm run dev

# i18n debug
NODE_DEBUG=i18n npm run dev
```

### Logging
```bash
# Log fayllarnı yoxla
tail -f logs/app.log
tail -f logs/error.log

# PM2 logs
pm2 logs mazarina-clone
```

## 🤝 Töhfə vermək

1. Fork edin
2. Feature branch yaradın (`git checkout -b feature/amazing-feature`)
3. Dəyişikliklərinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch-i push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisenziya

Bu layihə ISC lisenziyası altında paylaşılır.

## 👥 Əlaqə

Layihə haqqında suallar üçün əlaqə saxlayın:
- Email: azdroid.tech@hotmail.com
- Phone: +994 70 997 26 06

---

**Qeyd**: Bu layihə [mazarina.az](https://mazarina.az/) saytının təlimat məqsədli klonudur və kommersiya məqsədlərə malik deyil.
