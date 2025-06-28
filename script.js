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

// Состояние модальных окон
let currentModal = null;
let currentSlide = 0;
let totalSlides = 0;
let isModalOpen = false;

// Данные для модальных окон
const modalData = {
    modal1: {
        title: "Современная квартира",
        images: [
            "images/house-main.png",
            "images/house-2.png", 
            "images/house-3.png",
            "images/house-4.png"
        ],
        description: "Стильный дизайн 2-комнатной квартиры в современном стиле с элементами лофта. Проект включает в себя полную перепланировку пространства, создание открытой кухни-гостиной, оптимизацию хранения и использование современных материалов.",
        details: {
            area: "65 м²",
            duration: "3 месяца", 
            features: "Открытая планировка, панорамные окна, встроенная мебель"
        }
    },
    modal2: {
        title: "Уютный дом",
        images: [
            "images/house-main.png",
            "images/house-2.png",
            "images/house-3.png", 
            "images/house-4.png"
        ],
        description: "Загородный дом в скандинавском стиле с натуральными материалами и светлыми тонами. Акцент на функциональность, уют и связь с природой.",
        details: {
            area: "120 м²",
            duration: "4 месяца",
            features: "Натуральные материалы, большие окна, камин"
        }
    },
    modal3: {
        title: "Классическая спальня",
        images: [
            "images/placeholder1.jpg",
            "images/placeholder2.jpg",
            "images/placeholder3.jpg",
            "images/placeholder4.jpg"
        ],
        description: "Элегантная спальня в классическом стиле с роскошными материалами и теплой цветовой гаммой. Создана атмосфера уюта и роскоши.",
        details: {
            features: "Классическая мебель, текстиль премиум-класса, авторские элементы декора"
        }
    },
    modal4: {
        title: "Минималистичная кухня", 
        images: [
            "images/placeholder1.jpg",
            "images/placeholder2.jpg",
            "images/placeholder3.jpg",
            "images/placeholder4.jpg"
        ],
        description: "Функциональная кухня в стиле минимализм с акцентом на практичность и чистые линии. Максимум функциональности при минимуме декора.",
        details: {
            features: "Скрытые системы хранения, современная техника, лаконичный дизайн"
        }
    },
    modal5: {
        title: "Детская комната",
        images: [
            "images/placeholder1.jpg",
            "images/placeholder2.jpg", 
            "images/placeholder3.jpg",
            "images/placeholder4.jpg"
        ],
        description: "Яркая и безопасная детская комната с четким зонированием для игр, учебы и отдыха. Использованы экологически чистые материалы.",
        details: {
            features: "Безопасные материалы, функциональные зоны, яркие акценты"
        }
    },
    modal6: {
        title: "Офисное пространство",
        images: [
            "images/placeholder1.jpg",
            "images/placeholder2.jpg",
            "images/placeholder3.jpg", 
            "images/placeholder4.jpg"
        ],
        description: "Современный офис с эргономичной планировкой и комфортной рабочей атмосферой. Создано пространство, способствующее продуктивной работе.",
        details: {
            features: "Эргономичная мебель, зонирование пространства, современные технологии"
        }
    }
};

// Функция создания модального окна
function createModal(modalId) {
    const data = modalData[modalId];
    if (!data) return;

    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close" onclick="closeModal('${modalId}')">&times;</span>
            
            <div class="modal-header">
                <h3 class="modal-title">${data.title}</h3>
            </div>
            
            <div class="modal-gallery">
                <div class="modal-slider" id="slider-${modalId}">
                    ${data.images.map((img, index) => `
                        <div class="modal-slide ${index === 0 ? 'active' : ''}">
                            <img src="${img}" alt="${data.title} - Фото ${index + 1}" 
                                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                                 onload="this.nextElementSibling.style.display='none';">
                            <div class="modal-image-placeholder" style="display: none;">
                                <span>📸</span>
                                <p>Фото ${index + 1}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="modal-nav prev" onclick="changeSlide(-1)">‹</div>
                <div class="modal-nav next" onclick="changeSlide(1)">›</div>
                
                <div class="modal-indicators">
                    ${data.images.map((_, index) => `
                        <div class="modal-indicator ${index === 0 ? 'active' : ''}" 
                             onclick="goToSlide(${index})"></div>
                    `).join('')}
                </div>
            </div>
            
            <div class="modal-info">
                <p class="modal-description">${data.description}</p>
                <div class="modal-details">
                    ${data.details.area ? `<div><strong>Площадь:</strong> ${data.details.area}</div>` : ''}
                    ${data.details.duration ? `<div><strong>Срок реализации:</strong> ${data.details.duration}</div>` : ''}
                    ${data.details.features ? `<div><strong>Особенности:</strong> ${data.details.features}</div>` : ''}
                </div>
            </div>
        </div>
    `;
}

// Функция открытия модального окна
function openModal(modalId) {
    createModal(modalId);
    
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    currentModal = modalId;
    currentSlide = 0;
    totalSlides = modalData[modalId].images.length;
    isModalOpen = true;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Добавляем анимацию появления
    setTimeout(() => {
        modal.classList.add('modal-open');
    }, 10);
    
    updateSlider();
}

// Функция закрытия модального окна
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    modal.classList.remove('modal-open');
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        isModalOpen = false;
        currentModal = null;
    }, 300);
}

// Функция смены слайда
function changeSlide(direction) {
    if (!isModalOpen || !currentModal) return;
    
    currentSlide += direction;
    
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    updateSlider();
}

// Функция перехода к конкретному слайду
function goToSlide(index) {
    if (!isModalOpen || !currentModal) return;
    
    currentSlide = index;
    updateSlider();
}

// Функция обновления слайдера
function updateSlider() {
    if (!currentModal) return;
    
    const slider = document.getElementById(`slider-${currentModal}`);
    const indicators = document.querySelectorAll(`#${currentModal} .modal-indicator`);
    const slides = document.querySelectorAll(`#${currentModal} .modal-slide`);
    
    if (!slider) return;
    
    // Обновляем позицию слайдера
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Обновляем индикаторы
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
    
    // Обновляем активный слайд
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
}

// Обработка клавиш
document.addEventListener('keydown', function(event) {
    if (!isModalOpen) return;
    
    switch(event.key) {
        case 'Escape':
            closeModal(currentModal);
            break;
        case 'ArrowLeft':
            changeSlide(-1);
            break;
        case 'ArrowRight':
            changeSlide(1);
            break;
    }
});

// Закрытие модального окна при клике вне его
window.addEventListener('click', function(event) {
    if (!isModalOpen) return;
    
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            closeModal(modal.id);
        }
    });
});

// Поддержка свайпов для мобильных устройств
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    if (!isModalOpen) return;
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(event) {
    if (!isModalOpen) return;
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            changeSlide(1); // Свайп влево - следующий слайд
        } else {
            changeSlide(-1); // Свайп вправо - предыдущий слайд
        }
    }
}

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

// Скролл эффект для хедера
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Обработчик формы контакта
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = e.target[0].value;
            const email = e.target[1].value;
            const message = e.target[2].value;
            
            window.location.href = `mailto:pasha_viarenich@mail.ru?subject=Заявка от ${name}&body=От: ${email}%0D%0A%0D%0A${message}`;
        });
    }
});

// Добавляем дополнительные стили для модальных окон
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .modal {
        transition: opacity 0.3s ease;
        opacity: 0;
    }
    
    .modal.modal-open {
        opacity: 1;
    }
    
    .modal-slider {
        display: flex;
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        height: 100%;
    }
    
    .modal-slide {
        min-width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    
    .modal-slide img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        transition: opacity 0.3s ease;
    }
    
    .modal-image-placeholder {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.2rem;
        gap: 1rem;
    }
    
    .modal-image-placeholder span {
        font-size: 3rem;
    }
    
    .modal-nav {
        transition: all 0.3s ease;
        user-select: none;
    }
    
    .modal-nav:hover {
        background: rgba(255, 255, 255, 0.2);
        color: #667eea;
    }
    
    .modal-indicators {
        position: absolute;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 0.5rem;
        z-index: 10;
    }
    
    .modal-indicator {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .modal-indicator.active {
        background: white;
        transform: scale(1.2);
    }
    
    .modal-indicator:hover {
        background: rgba(255, 255, 255, 0.7);
        transform: scale(1.1);
    }
    
    @media (max-width: 768px) {
        .modal-nav {
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
        }
        
        .modal-nav.prev {
            left: 1rem;
        }
        
        .modal-nav.next {
            right: 1rem;
        }
        
        .modal-indicators {
            bottom: 1rem;
        }
        
        .modal-indicator {
            width: 10px;
            height: 10px;
        }
        
        .modal-info {
            padding: 2rem 1rem 1rem;
        }
        
        .modal-description {
            font-size: 1rem;
        }
    }
    
    @media (max-width: 480px) {
        .modal-nav {
            width: 40px;
            height: 40px;
            font-size: 1rem;
        }
        
        .modal-nav.prev {
            left: 0.5rem;
        }
        
        .modal-nav.next {
            right: 0.5rem;
        }
        
        .modal-close {
            top: 0.5rem;
            right: 0.5rem;
            width: 35px;
            height: 35px;
            font-size: 1rem;
        }
        
        .modal-indicators {
            bottom: 0.5rem;
        }
        
        .modal-indicator {
            width: 8px;
            height: 8px;
        }
    }
`;
document.head.appendChild(modalStyles);

// Предзагрузка изображений для лучшей производительности
function preloadImages() {
    Object.values(modalData).forEach(data => {
        data.images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    });
}

// Запускаем предзагрузку при загрузке страницы
document.addEventListener('DOMContentLoaded', preloadImages);

// Автоматическое воспроизведение слайдов (опционально)
let autoplayInterval;

function startAutoplay() {
    if (!isModalOpen) return;
    
    autoplayInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function stopAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }
}

// Запуск автопроигрывания при открытии модального окна (по желанию)
// Раскомментируйте следующие строки, если хотите автопроигрывание
/*
document.addEventListener('click', function(e) {
    if (e.target.closest('.portfolio-item')) {
        setTimeout(startAutoplay, 1000);
    }
});

document.addEventListener('keydown', function(e) {
    if (isModalOpen && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        stopAutoplay();
    }
});
*/
