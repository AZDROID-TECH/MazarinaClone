// Mazarina Trade Company - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Səhifə yüklənəndə işə başlayan funksiyalar
    
    // Yumuşaq scroll animasiyası
    initializeSmoothScroll();
    
    // Navbar mobil menu
    initializeMobileMenu();
    
    // Stats animasiyası
    initializeStatsAnimation();
    
    // Language selector
    initializeLanguageSelector();
});

/**
 * Yumuşaq scroll animasiyası - internal linkler üçün
 */
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Mobil menu funksionallığı (gələcəkdə istifadə üçün)
 */
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-active');
            this.classList.toggle('active');
        });
    }
}

/**
 * Statistik rəqəmlər animasiyası
 */
function initializeStatsAnimation() {
    const statsSection = document.querySelector('.stats');
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (!statsSection || statNumbers.length === 0) return;
    
    // Intersection Observer - görünəndə animasiya başlasın
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
    
    function animateStats() {
        statNumbers.forEach(statNumber => {
            const finalValue = statNumber.textContent.replace(/[^0-9]/g, '');
            if (finalValue) {
                animateValue(statNumber, 0, parseInt(finalValue), 2000);
            }
        });
    }
    
    function animateValue(element, start, end, duration) {
        const originalText = element.textContent;
        const suffix = originalText.replace(/[0-9]/g, '');
        
        let current = start;
        const increment = end / (duration / 16);
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current) + suffix;
            
            if (current >= end) {
                element.textContent = originalText;
                clearInterval(timer);
            }
        }, 16);
    }
}

/**
 * Dil seçici funksionallığı
 */
function initializeLanguageSelector() {
    const languageLinks = document.querySelectorAll('.language-selector a');
    
    languageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Aktiv dil cookie-də saxlanacaq (i18n middleware tərəfindən idarə olunur)
            const newLang = this.textContent.toLowerCase();
            
            // Loading göstəricisi (opsiyonel)
            showLoadingIndicator();
        });
    });
}

/**
 * Loading göstəricisi (dil dəyişdirmə zamanı)
 */
function showLoadingIndicator() {
    // Sadə loading overlay
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.innerHTML = `
        <div class="loading-spinner">
            <i class='bx bx-loader-alt bx-spin'></i>
            <span>Yüklənir...</span>
        </div>
    `;
    
    // CSS stilləri
    const style = document.createElement('style');
    style.textContent = `
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(26, 26, 46, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }
        
        .loading-spinner {
            color: white;
            text-align: center;
            font-size: 1.2rem;
        }
        
        .loading-spinner i {
            font-size: 2rem;
            margin-bottom: 0.5rem;
            display: block;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(overlay);
    
    // 3 saniyə sonra loading-i gizlət (əgər səhifə yenidən yüklənməzsə)
    setTimeout(() => {
        if (overlay.parentNode) {
            overlay.remove();
        }
    }, 3000);
}

/**
 * Səhifə yüklənmə performansını yoxla (development üçün)
 * Aktivləşdirmek üçün console.log sətirinə uncomment edin
 */
if (window.performance && localStorage.getItem('debug') === 'true') {
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        // console.log(`📊 Səhifə yüklənmə müddəti: ${loadTime}ms`);
    });
}
