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

});
