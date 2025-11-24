document.addEventListener('DOMContentLoaded', function() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        return;
    }
    
    gsap.registerPlugin(ScrollTrigger);
    
    const mainTitle = document.querySelector('.main__title');
    if (!mainTitle) return;
    
    const paragraphs = mainTitle.querySelectorAll('p');
    if (paragraphs.length === 0) return;
    
    paragraphs.forEach((paragraph, index) => {
        const startProgress = index / paragraphs.length;
        const endProgress = (index + 1) / paragraphs.length;
        
        ScrollTrigger.create({
            trigger: mainTitle,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                let paragraphProgress = 0;
                
                if (progress >= startProgress) {
                    if (progress >= endProgress) {
                        paragraphProgress = 1;
                    } else {
                        paragraphProgress = (progress - startProgress) / (endProgress - startProgress);
                    }
                }
                
                // Интерполяция цвета от серого (#6C6C6C) к белому (#FFFFFF)
                const grayValue = 108;
                const whiteValue = 255;
                const currentValue = Math.round(grayValue + (whiteValue - grayValue) * paragraphProgress);
                paragraph.style.color = `rgb(${currentValue}, ${currentValue}, ${currentValue})`;
            }
        });
    });
});

