// Дождаться полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {

    // ==================== Мобильное меню (бургер) ====================
    const burgerMenu = document.getElementById('burgerMenu');
    const navList = document.querySelector('.nav-list');

    if(burgerMenu) {
        burgerMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navList.classList.toggle('active');
            document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
        });

        // Закрыть меню при клике на ссылку
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                burgerMenu.classList.remove('active');
                navList.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ==================== Анимированный счетчик в статистике ====================
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = { threshold: 0.5 };

    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const finalValue = parseInt(element.getAttribute('data-count'));
                const duration = 1500;
                const step = finalValue / (duration / 16); // 60fps
                let current = 0;

                const timer = setInterval(() => {
                    current += step;
                    if (current >= finalValue) {
                        element.textContent = finalValue.toLocaleString('ru-RU');
                        clearInterval(timer);
                    } else {
                        element.textContent = Math.floor(current).toLocaleString('ru-RU');
                    }
                }, 16);

                numberObserver.unobserve(element);
            }
        });
    }, observerOptions);

    statNumbers.forEach(number => numberObserver.observe(number));

    // ==================== Аккордеон для FAQ ====================
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Закрыть все открытые элементы
            document.querySelectorAll('.faq-item.active').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });

            // Переключить текущий элемент
            faqItem.classList.toggle('active', !isActive);
        });
    });

    // ==================== Обновление года в футере ====================
    const currentYearSpan = document.getElementById('currentYear');
    if(currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // ==================== Плавный скролл для всех внутренних ссылок ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== Простой эффект появления элементов при скролле ====================
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    // Наблюдаем за карточками и секциями
    document.querySelectorAll('.about-card, .benefit-card, .training-card').forEach(el => {
        scrollObserver.observe(el);
    });

    // Добавим класс для анимации (необходимо дописать CSS)
    const style = document.createElement('style');
    style.textContent = `
        .about-card, .benefit-card, .training-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .about-card.animated, .benefit-card.animated, .training-card.animated {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});