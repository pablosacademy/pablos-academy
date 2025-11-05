// Questionnaire cards animation with GSAP
document.addEventListener('DOMContentLoaded', function() {
    // Регистрируем ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    const lessonCards = gsap.utils.toArray('.questionnaire-lesson-card');
    const headerTitle = document.querySelector('.questionnaire-header__title');
    const headerSubtitle = document.querySelector('.questionnaire-header__subtitle');
    const headerYear = document.querySelector('.questionnaire-header__year');
    const heroTitle = document.querySelector('.questionnaire-hero__title');
    const heroSubtitle = document.querySelector('.questionnaire-hero__subtitle');
    
    // Анимация заголовков хедера анкеты
    if (headerTitle) {
        gsap.fromTo(headerTitle, 
            {
                opacity: 0,
                y: 30,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.2
            }
        );
    }
    
    if (headerSubtitle) {
        gsap.fromTo(headerSubtitle, 
            {
                opacity: 0,
                y: 20,
                scale: 0.95
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "power2.out",
                delay: 0.4
            }
        );
    }
    
    if (headerYear) {
        gsap.fromTo(headerYear, 
            {
                opacity: 0,
                y: 15,
                scale: 0.95
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "power2.out",
                delay: 0.6
            }
        );
    }
    
    // Анимация заголовка и подзаголовка hero секции
    if (heroTitle) {
        gsap.fromTo(heroTitle, 
            {
                opacity: 0,
                y: 50,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: "power2.out",
                delay: 0.2
            }
        );
    }
    
    if (heroSubtitle) {
        gsap.fromTo(heroSubtitle, 
            {
                opacity: 0,
                y: 30,
                scale: 0.95
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.5
            }
        );
    }
    
    // Анимация заливки текста белым цветом при скролле
    if (heroSubtitle) {
        gsap.to(heroSubtitle, {
            color: "#FFFFFF",
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: heroSubtitle,
                start: "top 80%",
                end: "top 60%",
                toggleActions: "play none none reverse"
            }
        });
    }
    
    // Функция для создания анимации карточек уроков (отключена)
    function animateLessonCards(cards) {
        if (cards.length === 0) return;
        
        // Устанавливаем финальное состояние без анимации
        cards.forEach((card, index) => {
            gsap.set(card, {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationY: 0
            });
            
            // Hover эффекты отключены
        });
    }
    
    // Применяем анимации
    animateLessonCards(lessonCards);
    
    // Анимация появления секции уроков (отключена)
    const lessonsSection = document.querySelector('.questionnaire-lessons');
    if (lessonsSection) {
        gsap.set(lessonsSection, {
            opacity: 1,
            y: 0
        });
    }
    
    // Анимация формы контактов (отключена)
    const contactSection = document.querySelector('.contact');
    if (contactSection) {
        gsap.set(contactSection, {
            opacity: 1,
            y: 0
        });
    }
});
