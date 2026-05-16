document.addEventListener('DOMContentLoaded', () => {
    
    // Вставка текущего года в футере
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Intersection Observer для анимации появления элементов при скролле (fade-up)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Прекращаем наблюдение после того, как элемент появился
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => observer.observe(el));

    // Легкий параллакс эффект для контента первого экрана (Hero)
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        // Применяем эффект только если мы находимся на первом экране
        if (heroContent && scrolled < window.innerHeight) {
            // Сдвигаем контент вниз медленнее, чем скорость скролла
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            // Плавно уменьшаем непрозрачность
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 1.2;
        }
    });

    // Плавный скролл для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Универсальная функция для создания случайных вспыхивающих звезд (Sparkles)
    const createSparkles = (containerSelector, maxConcurrent, intervalMs) => {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        const createSparkle = () => {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            
            const width = container.offsetWidth;
            const height = container.offsetHeight;
            const x = Math.random() * width;
            const y = Math.random() * height;
            
            const duration = 2 + Math.random() * 3;
            
            sparkle.style.left = `${x}px`;
            sparkle.style.top = `${y}px`;
            sparkle.style.animationDuration = `${duration}s`;
            
            container.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, duration * 1000);
        };

        // Создаем стартовый объем частиц
        for(let i = 0; i < maxConcurrent / 2; i++) {
            setTimeout(createSparkle, Math.random() * 3000);
        }

        // Генерируем новые с заданным интервалом
        setInterval(createSparkle, intervalMs);
    };

    // Для шара (до 20 частиц одновременно, интервал генерации ~180мс)
    createSparkles('.glowing-orb-container', 20, 180);

    // Для первого экрана Hero (распределяем по всему экрану, до 50 частиц)
    createSparkles('.hero', 50, 80);

});
