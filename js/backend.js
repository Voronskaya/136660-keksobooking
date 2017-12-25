'use strict';
(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';

  window.backend = {
    download: function (loadHandler, errorHandler) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          loadHandler(xhr.response);
        } else if (xhr.status === 404) {
          errorHandler('Ресурс не найден. Ошибка: ' + xhr.status + '' + xhr.statusText);
        } else {
          errorHandler('Неизвестный статус. Ошибка: ' + xhr.status + '' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        errorHandler('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000;
      xhr.open('GET', URL_LOAD);
      xhr.send();
    },
    upload: function (data, loadHandler, errorHandler) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          loadHandler(xhr.response);
        } else if (xhr.status === 400) {
          errorHandler('Руки-крюки - адрес не выбрали. Ошибка: ' + xhr.status + '' + xhr.statusText);
        } else if (xhr.status === 500) {
          errorHandler('Не удалось загрузить ресурс. Ошибка: ' + xhr.status + '' + xhr.statusText + '. Идите спать.');
        } else {
          errorHandler('Неизвестный статус. Ошибка: ' + xhr.status + '' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        errorHandler('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000;
      xhr.open('POST', URL_UPLOAD);
      xhr.send(data);
    },
    errorHandler: function (errorMessage) {
      var errorPopup = document.createElement('div');
      var closeButton = document.createElement('button');
      var message = document.createElement('p');
      errorPopup.style.position = 'fixed';
      errorPopup.style.top = '30%';
      errorPopup.style.left = '50%';
      errorPopup.style.width = '350px';
      errorPopup.style.marginLeft = '-225px';
      errorPopup.style.backgroundColor = 'white';
      errorPopup.style.color = 'tomato';
      errorPopup.style.fontSize = '20px';
      errorPopup.style.padding = '50px';
      errorPopup.style.border = '1px solid tomato';
      errorPopup.style.zIndex = '10';
      errorPopup.style.textAlign = 'center';
      message.textContent = errorMessage;
      errorPopup.appendChild(message);
      document.body.appendChild(errorPopup);

      closeButton.style.marginTop = '20px';
      closeButton.style.padding = '8px';
      closeButton.style.border = 'none';
      closeButton.style.backgroundColor = 'tomato';
      closeButton.style.color = 'white';
      closeButton.style.fontSize = '16px';
      closeButton.textContent = 'Закрыть';
      closeButton.addEventListener('click', function () {
        errorPopup.remove();
      });
      errorPopup.appendChild(closeButton);
    }
  };
})();
