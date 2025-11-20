(function() {
    // 7 минут = 420 секунд
    const TOTAL_SECONDS = 7 * 60; // 420 секунд
    
    // Функция для получения оставшегося времени
    function getRemainingTime(storageKey) {
        const savedTime = localStorage.getItem(storageKey);
        if (savedTime) {
            const endTime = parseInt(savedTime);
            const now = Date.now();
            const remaining = Math.floor((endTime - now) / 1000);
            return Math.max(0, remaining);
        }
        // Если нет сохраненного времени, устанавливаем новое
        const endTime = Date.now() + (TOTAL_SECONDS * 1000);
        localStorage.setItem(storageKey, endTime.toString());
        return TOTAL_SECONDS;
    }
    
    // Функция для форматирования времени
    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        return {
            hours: String(hours).padStart(2, '0'),
            minutes: String(minutes).padStart(2, '0'),
            seconds: String(secs).padStart(2, '0')
        };
    }
    
    // Функция для инициализации таймера
    function initTimer(selector, storageKey) {
        const timerValues = document.querySelectorAll(selector);
        
        if (timerValues.length < 3) {
            return; // Если элементы не найдены, выходим
        }
        
        const hoursElement = timerValues[0];
        const minutesElement = timerValues[1];
        const secondsElement = timerValues[2];
        
        // Функция для обновления таймера
        function updateTimer() {
            let remainingSeconds = getRemainingTime(storageKey);
            
            if (remainingSeconds <= 0) {
                // Таймер истек, сбрасываем
                const endTime = Date.now() + (TOTAL_SECONDS * 1000);
                localStorage.setItem(storageKey, endTime.toString());
                remainingSeconds = TOTAL_SECONDS;
            }
            
            const time = formatTime(remainingSeconds);
            
            hoursElement.textContent = time.hours;
            minutesElement.textContent = time.minutes;
            secondsElement.textContent = time.seconds;
        }
        
        // Обновляем таймер каждую секунду
        updateTimer(); // Сразу обновляем при загрузке
        setInterval(updateTimer, 1000);
    }
    
    // Инициализируем таймеры для header и tariff
    initTimer('.header__timer-value', 'headerTimerEndTime');
    initTimer('.tariff__timer-value', 'tariffTimerEndTime');
})();

