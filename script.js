// Прогресс скролла
window.addEventListener('scroll', function() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    document.getElementById('scrollProgress').style.width = scrolled + '%';
});

// Плавная прокрутка к секциям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Функции для модальных окон
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.body.style.overflow = 'hidden'; // Предотвращаем прокрутку фона
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto'; // Возвращаем прокрутку
}

// Закрытие модального окна при клике вне его
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Закрытие модального окна по ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// Мобильное меню
document.querySelector('.mobile-menu').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks.style.display === 'none' || navLinks.style.display === '') {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'rgba(255, 255, 255, 0.95)';
        navLinks.style.backdropFilter = 'blur(20px)';
        navLinks.style.padding = '1rem';
        navLinks.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        navLinks.style.zIndex = '1000';
    } else {
        navLinks.style.display = 'none';
    }
});

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Применяем анимацию к элементам портфолио
document.addEventListener('DOMContentLoaded', function() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
});

// Улучшенная адаптивность для мобильных устройств
function handleResize() {
    const width = window.innerWidth;
    const navLinks = document.querySelector('.nav-links');
    
    if (width > 768) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'row';
        navLinks.style.position = 'static';
        navLinks.style.background = 'none';
        navLinks.style.backdropFilter = 'none';
        navLinks.style.padding = '0';
        navLinks.style.boxShadow = 'none';
    } else {
        navLinks.style.display = 'none';
    }
}

window.addEventListener('resize', handleResize);
document.addEventListener('DOMContentLoaded', handleResize);

// Параллакс эффект для героя
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Добавляем пульсацию к кнопкам при загрузке
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.cta-button, .hero-contact-link');
    buttons.forEach((button, index) => {
        setTimeout(() => {
            button.style.animation = 'pulse 2s infinite';
        }, index * 200);
    });
});

// Добавляем CSS для пульсации
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.4); }
        70% { box-shadow: 0 0 0 10px rgba(102, 126, 234, 0); }
        100% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0); }
    }
`;
document.head.appendChild(style);

// Добавляем дополнительные стили для улучшения мобильной адаптивности
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
    @media (max-width: 480px) {
        .hero-text {
            margin-bottom: 2rem;
        }
        
        .hero h1 {
            font-size: 2rem;
            line-height: 1.2;
        }
        
        .hero p {
            font-size: 1rem;
            margin-bottom: 1.5rem;
        }
        
        .portfolio-content {
            padding: 1.5rem;
        }
        
        .portfolio-title {
            font-size: 1.2rem;
        }
        
        .portfolio-description {
            font-size: 0.9rem;
        }
        
        .modal-content {
            padding: 1rem;
            max-height: 90vh;
        }
        
        .modal-close {
            top: 0.5rem;
            right: 1rem;
            font-size: 1.5rem;
        }
        
        .section-title {
            font-size: 2rem;
            margin-bottom: 2rem;
        }
        
        .portfolio-section {
            padding: 3rem 0;
        }
        
        .nav-links {
            gap: 1rem;
        }
        
        .nav-links a {
            padding: 0.5rem 0;
            text-align: center;
        }
    }
    
    @media (max-width: 320px) {
        .container {
            padding: 0 10px;
        }
        
        .hero h1 {
            font-size: 1.8rem;
        }
        
        .hero-contact-link {
            padding: 0.7rem 1.2rem;
            font-size: 0.85rem;
        }
        
        .portfolio-image {
            height: 200px;
            font-size: 1rem;
        }
    }
`;
document.head.appendChild(mobileStyles);

// Обработчик формы контакта
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const message = e.target[2].value;
    
    window.location.href = `pasha_viarenich@mail.ru?subject=Заявка от ${name}&body=От: ${email}%0D%0A%0D%0A${message}`;
});

// Скролл эффект для хедера
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    
    if (window.scrollY > 50) { // когда прокрутили больше 50px
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Прогрессивная загрузка изображений
function loadImageProgressively() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                
                // Создаем новое изображение для предзагрузки
                const newImg = new Image();
                newImg.onload = function() {
                    img.src = src;
                    img.classList.add('loaded');
                    img.removeAttribute('data-src');
                };
                newImg.src = src;
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Сжатие изображений на лету (если браузер поддерживает)
function compressImage(file, quality = 0.8) {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            
            canvas.toBlob(resolve, 'image/jpeg', quality);
        };
        
        img.src = URL.createObjectURL(file);
    });
}

// Функция для создания WebP версий
function createWebPVersion(imagePath) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            
            // Попытаемся создать WebP
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(URL.createObjectURL(blob));
                } else {
                    reject('WebP не поддерживается');
                }
            }, 'image/webp', 0.8);
        };
        
        img.onerror = reject;
        img.src = imagePath;
    });
}

// Ленивая загрузка с улучшенной производительностью
function enhancedLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Добавляем placeholder во время загрузки
                    if (!img.complete) {
                        img.style.backgroundColor = '#f0f0f0';
                        img.style.backgroundImage = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                        
                        img.onload = function() {
                            img.style.backgroundColor = 'transparent';
                            img.style.backgroundImage = 'none';
                            img.classList.add('loaded');
                        };
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Предзагрузка критически важных изображений
function preloadCriticalImages() {
    const criticalImages = [
        'images/maria-photo.jpg',
        'images/house-main.png'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = src;
        link.as = 'image';
        document.head.appendChild(link);
    });
}

// Запускаем все функции при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    preloadCriticalImages();
    loadImageProgressively();
    enhancedLazyLoading();
});

// Добавляем обработчик ошибок для изображений
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        e.target.style.color = 'white';
        e.target.style.display = 'flex';
        e.target.style.alignItems = 'center';
        e.target.style.justifyContent = 'center';
        e.target.innerHTML = '📸 Изображение не загружено';
    }
}, true);