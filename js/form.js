'use strict';
(function () {
  var CHECK_IN_TIMES = ['12:00', '13:00', '14:00'];
  var CHECK_OUT_TIMES = ['12:00', '13:00', '14:00'];
  var PRICE_NIGHT = ['1000', '0', '5000', '10000'];
  var APARTMENT_TYPE = ['flat', 'bungalo', 'house', 'palace'];
  var ROOMS = ['1', '2', '3', '100'];
  var GUESTS = ['1', ['1', '2'], ['1', '2', '3'], '0'];

  var noticeForm = document.querySelector('.notice__form');
  var publishSubmit = noticeForm.querySelector('.form__submit');
  var timein = noticeForm.elements['timein'];
  var timeout = noticeForm.elements['timeout'];
  var type = noticeForm.elements['type'];
  var price = noticeForm.elements['price'];
  var capacity = noticeForm.elements['capacity'];
  var quantityRooms = noticeForm.elements['room_number'];

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  var getSyncValues = function (element, value) {
    for (var i = 0; i < element.length; i++) {
      if (element[i].value === value) {
        element[i].selected = true;
        element[i].removeAttribute('hidden');
      }
    }
  };

  var syncQuantityRoomsGuests = function (element, value) {
    if (Array.isArray(value)) {
      for (var i = 0; i < value.length; i++) {
        getSyncValues(element, value[i]);
        if (value.length < 3) {
          element[0].setAttribute('hidden', true);
        }
      }
    } else {
      for (var j = 0; j < element.length; j++) {
        element[j].setAttribute('hidden', true);
      }
      element.value = value;
    }
  };

  window.syncFields(timein, timeout, CHECK_IN_TIMES, CHECK_OUT_TIMES, syncValues);
  window.syncFields(timeout, timein, CHECK_OUT_TIMES, CHECK_IN_TIMES, syncValues);
  window.syncFields(type, price, APARTMENT_TYPE, PRICE_NIGHT, syncValueWithMin);
  window.syncFieldsFromQuantity(quantityRooms, capacity, ROOMS, GUESTS, syncQuantityRoomsGuests);

  var hideCapacity = function () {
    for (var i = 0; i < noticeForm.elements['capacity'].length; i++) {
      noticeForm.elements['capacity'].options[i].setAttribute('hidden', true);
    }
  };

  var publishSubmitClickHandler = function () {
    var inputs = noticeForm.querySelectorAll('input');
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].checkValidity() === false) {
        inputs[i].style.borderColor = 'red';
      }
    }
  };

  var resetDataForm = function () {
    noticeForm.reset();
  };

  noticeForm.elements['title'].addEventListener('invalid', function () {
    var title = noticeForm.elements['title'];
    var minValue = noticeForm.elements['title'].getAttribute('minlength');
    var maxValue = noticeForm.elements['title'].getAttribute('minlength');
    if (title.validity.tooShort) {
      title.setCustomValidity('Минимальная длина заголовка ' + minValue + ' символов.');
    } else if (title.validity.tooLong) {
      title.setCustomValidity('Максимальная длина заголовка ' + maxValue + ' символов.');
    } else if (title.validity.valueMissing) {
      title.setCustomValidity('Заполните поле!');
    } else {
      title.setCustomValidity('');
    }
  });

  noticeForm.elements['title'].addEventListener('input', function (evt) {
    var minlengthTitle = Number(noticeForm.elements['title'].getAttribute('minlength'));
    var target = evt.target;
    if (target.value.length < minlengthTitle) {
      target.setCustomValidity('Минимальная длина заголовка ' + minlengthTitle + ' символов.');
    } else {
      target.setCustomValidity('');
    }
  });

  noticeForm.elements['price'].addEventListener('invalid', function () {
    if (price.validity.rangeUnderflow) {
      price.setCustomValidity('Минимальная цена ' + price.getAttribute('min'));
    } else if (price.validity.rangeOverflow) {
      price.setCustomValidity('Максимальная цена ' + price.getAttribute('max'));
    } else if (price.validity.valueMissing) {
      price.setCustomValidity('Поле не должно быть пустым!');
    } else {
      price.setCustomValidity('');
    }
  });

  hideCapacity();
  publishSubmit.addEventListener('click', publishSubmitClickHandler);
  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(noticeForm), resetDataForm, window.backend.onError);
  });
})();
