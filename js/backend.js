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
          console(xhr.responseText);
        } else {
          showError('Неизвестный статус: ' + xhr.status + '' + xhr.statusText);
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
      var URL_POST = 'https://js.dump.academy/keksobookinggg';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status == 200) {
          onLoad(xhr.response);
          console.log(xhr.response);
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
    errorHandler: function(error) {
      console.log(error);
    }
  };
})();
