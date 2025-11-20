// Sticky CTA button for header
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const ctaBottom = document.querySelector('.header__bottom-cta');
    
    if (!header || !ctaBottom) {
        return;
    }
    
    const ctaButton = ctaBottom.querySelector('.header__bottom-cta__button');
    if (!ctaButton) {
        return;
    }
    
    let isSticky = false;
    let hasBecomeSticky = false; // Флаг, чтобы кнопка оставалась sticky навсегда
    let ticking = false;
    
    function handleScroll() {
        const headerRect = header.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const scrollY = window.scrollY || window.pageYOffset;
        
        // Кнопка становится sticky когда нижняя часть хедера достигает низа viewport
        // После этого она остается sticky навсегда
        if (!hasBecomeSticky) {
            const headerBottomInViewport = headerRect.bottom;
            
            // Sticky когда нижняя часть хедера ушла за низ viewport
            if (headerBottomInViewport <= viewportHeight && scrollY > 0) {
                isSticky = true;
                hasBecomeSticky = true;
                ctaBottom.classList.add('header__bottom-cta--sticky');
            }
        } else {
            // Если уже стала sticky, оставляем её sticky навсегда
            if (!isSticky) {
                isSticky = true;
                ctaBottom.classList.add('header__bottom-cta--sticky');
            }
        }
        
        ticking = false;
    }
    
    // Оптимизированный обработчик скролла
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // Первоначальная проверка после загрузки
    handleScroll();
});

