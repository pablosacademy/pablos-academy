$(document).ready(function() {

    const scriptURL = 'https://script.google.com/macros/s/AKfycbwqMATxhad1JWvz1TfEO4J_P4mdIWe6FnIdmnuQwNB8jQdBRbJV668rv9LPMG3Obe6y/exec';
    const form = $('.contact__form');
    const checkbox = $('.contact__checkbox');
    const submitBtn = $('.contact__form-btn');

    // --- UTM Метки ---
    function getUrlParams() {
        const params = {};
        const query = window.location.search.substring(1);
        const pairs = query.split("&");

        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i].split("=");
            const key = decodeURIComponent(pair[0]);
            const value = decodeURIComponent(pair[1] || "");
            if (key) {
                params[key] = value;
            }
        }

        return params;
    }

    const utmParams = getUrlParams();

    // Записываем значения в скрытые поля, если они есть
    if (utmParams.utm_source)    $('#utm_source').val(utmParams.utm_source);
    if (utmParams.utm_medium)    $('#utm_medium').val(utmParams.utm_medium);
    if (utmParams.utm_campaign)  $('#utm_campaign').val(utmParams.utm_campaign);
    if (utmParams.utm_content)   $('#utm_content').val(utmParams.utm_content);


    // --- Отправка формы ---
    if (form.length && checkbox.length && submitBtn.length) {
        form.on('submit', function(e) {
            e.preventDefault(); // Останавливаем отправку, пока не проверим чекбокс

            if (!checkbox.prop('checked')) {
                checkbox.parent().addClass('error');
                showErrorMessage('Будь ласка, підтвердіть згоду на обробку даних');
                return;
            }

            // Убираем ошибку, если чекбокс отмечен
            checkbox.parent().removeClass('error');
            hideErrorMessage();

            // Отправка данных в Google Sheets
            const formData = new FormData(this);

            $('#thankYouPopup').fadeIn();
            
            fetch(scriptURL, { method: 'POST', body: formData })
                .then(response => {
                    form[0].reset(); // очищаем форму после отправки
                    fbq('track', 'CompleteRegistration')
                })
                .catch(error => {
                    alert('Помилка при відправці. Спробуйте ще раз.');
                    console.error('Error!', error.message);
                });
        });

        // Убираем ошибку при изменении чекбокса
        checkbox.on('change', function() {
            if ($(this).prop('checked')) {
                $(this).parent().removeClass('error');
                hideErrorMessage();
            }
        });
    }

    // --- Показ сообщения об ошибке ---
    function showErrorMessage(message) {
        hideErrorMessage(); // Удалить старое сообщение

        const errorDiv = $('<div>', {
            class: 'contact__form-error',
            text: message,
            css: {
                color: '#ff4444',
                fontSize: '14px',
                textAlign: 'center',
                fontFamily: 'var(--font-space-grotesk)',
                position: 'absolute',
                bottom: '-25px',
                left: 0,
                right: 0,
                zIndex: 10
            }
        });

        const checkboxLabel = $('.contact__checkbox-label');
        if (checkboxLabel.length) {
            checkboxLabel.css('position', 'relative');
            checkboxLabel.append(errorDiv);
        }
    }

    function hideErrorMessage() {
        $('.contact__form-error').remove();
    }

    // --- Закрытие попапа ---
    function closePopup() {
        $('#thankYouPopup').fadeOut();
    }

    // Закрытие по клику вне попапа
    $(document).on('click', function(e) {
        const popup = $('#thankYouPopup');
        const content = $('#thankYouPopup .popup-content');

        if (popup.is(':visible') && !content.is(e.target) && content.has(e.target).length === 0) {
            closePopup();
        }
    });

    // Кнопка закрытия попапа
    $('#thankYouPopup .popup-close').on('click', function() {
        closePopup();
    });

    

    $('.footer__social-link, .header__mobile-social-link').click(function() {
        fbq('trackCustom', 'ClickTelegramZnaty')
    })

});