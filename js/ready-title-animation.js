document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger);
    
    const readyTitle = document.querySelector('.ready__title');
    
    if (!readyTitle) return;
    
    // Сохраняем оригинальный HTML
    const originalHTML = readyTitle.innerHTML;
    
    // Создаем временный контейнер для обработки
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = originalHTML;
    
    // Функция для обертывания текстовых узлов в спаны
    function wrapTextNodes(node) {
        const childNodes = Array.from(node.childNodes);
        
        childNodes.forEach(child => {
            if (child.nodeType === 3) { // Text node
                const text = child.textContent;
                // Разбиваем текст на слова, сохраняя пробелы и переносы строк
                const parts = text.split(/(\s+)/);
                
                parts.forEach(part => {
                    if (part.trim()) {
                        // Это слово, оборачиваем в span
                        const span = document.createElement('span');
                        span.className = 'ready__title-word';
                        span.textContent = part;
                        node.insertBefore(span, child);
                    } else if (part) {
                        // Это пробел или перенос строки, добавляем как есть
                        const textNode = document.createTextNode(part);
                        node.insertBefore(textNode, child);
                    }
                });
                
                node.removeChild(child);
            } else if (child.nodeType === 1 && !child.classList.contains('ready__title-green')) {
                // Рекурсивно обрабатываем дочерние элементы (кроме зеленых спанов)
                wrapTextNodes(child);
            }
        });
    }
    
    // Обрабатываем все текстовые узлы
    wrapTextNodes(tempDiv);
    
    // Заменяем содержимое заголовка
    readyTitle.innerHTML = tempDiv.innerHTML;
    
    const wordSpans = readyTitle.querySelectorAll('.ready__title-word');
    
    if (wordSpans.length === 0) return;
    
    // Устанавливаем начальный цвет серым
    gsap.set(wordSpans, { color: "#A3A3A3" });
    
    // Анимация заливки при скролле
    ScrollTrigger.create({
        trigger: readyTitle,
        start: "top 80%",
        end: "bottom 50%",
        scrub: 1,
        onUpdate: self => {
            const progress = self.progress;
            const totalWords = wordSpans.length;
            const activeWordIndex = Math.floor(progress * totalWords);
            
            wordSpans.forEach((word, index) => {
                if (index < activeWordIndex) {
                    gsap.set(word, { color: "#FFFFFF" });
                } else if (index === activeWordIndex) {
                    const wordProgress = (progress * totalWords) - activeWordIndex;
                    const grayValue = 163; // #A3A3A3 = rgb(163, 163, 163)
                    const whiteValue = 255;
                    const currentValue = Math.round(grayValue + (whiteValue - grayValue) * wordProgress);
                    gsap.set(word, { 
                        color: `rgb(${currentValue}, ${currentValue}, ${currentValue})`
                    });
                } else {
                    gsap.set(word, { color: "#A3A3A3" });
                }
            });
        }
    });
});

