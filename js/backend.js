'use strict';
(function () {
  window.backend = {
    download: function (onLoad, errorHandler) {
      var URL_GET = 'https://js.dump.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else if (xhr.status === 404) {
          errorHandler('Ресурс не найден: ' + xhr.status + '' + xhr.statusText);
        } else {
          errorHandler('Неизвестный статус: ' + xhr.status + '' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        errorHandler('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000;
      xhr.open('GET', URL_GET);
      xhr.send();
    },
    upload: function (data, onLoad, errorHandler) {
      var URL_POST = 'https://js.dump.academy/keksobooking';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else if (xhr.status === 500) {
          errorHandler('Не удалось загрузить ресурс: ' + xhr.status + '' + xhr.statusText + '. Идите спать.');
        } else {
          errorHandler('Неизвестный статус: ' + xhr.status + '' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        errorHandler('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000;
      xhr.open('POST', URL_POST);
      xhr.send(data);
    },
    errorHandler: function (errorMessage) {
      var errorPopup = document.createElement('div');
      errorPopup.style.position = 'fixed';
      errorPopup.style.top = '30%';
      errorPopup.style.left = '40%';
      errorPopup.style.backgroundColor = 'white';
      errorPopup.style.color = 'tomato';
      errorPopup.style.fontSize = '18px';
      errorPopup.style.padding = '50px';
      errorPopup.style.border = '1px solid tomato';
      errorPopup.style.zIndex = '10';
      errorPopup.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', errorPopup);

      setTimeout(function () {
        errorPopup.remove();
      }, 3000);
    }
  };
})();
