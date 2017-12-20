'use strict';
(function () {
  var CHECK_IN_TIMES = ['12:00', '13:00', '14:00'];
  var CHECK_OUT_TIMES = ['12:00', '13:00', '14:00'];
  var PRICE_NIGHT = ['1000', '0', '5000', '10000'];
  var APARTMENT_TYPE = ['flat', 'bungalo', 'house', 'palace'];

  // var QUANTITY_GUESTS = {
  //   one: '1',
  //   two: '2',
  //   three: '3',
  //   zero: '0'
  // };

  // var QUANTITY_ROOMS = {
  //   one: '1',
  //   two: '2',
  //   three: '3',
  //   hundred: '100'
  // };
  var a = ['1', '2', '3', '100'];
  var b = ['1', ['1', '2'], ['1', '2', '3'], '0'];

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
  // for (var i =0; i < a.length; i++) {
  //   if (a[i] === '1') {
  //     console.log(b[i])
  //   } else if (a[i] === '2') {
  //     console.log(b[i], b[i-1])
  //   } else if (a[i] === '3') {
  //     console.log(b[i], b[i-1], b[i-2])
  //   } else if (a[i] === '100') {
  //     console.log(b[i]);
  //   }
  // }
  var syncQuantityRoomsGuests = function (element, value) {
    var minRange = 1;
    if (value.length > minRange) {
      for (var i = 0; i < element.length; i++) {
        element[i].removeAttribute('hidden');
        if (element[i].value === value[i]) {
          element[i].selected = true;
        }
      }
    } else {
      element.value = value;
    }
  };

  window.synchronizeFields(timein, timeout, CHECK_IN_TIMES, CHECK_OUT_TIMES, syncValues);
  window.synchronizeFields(timeout, timein, CHECK_OUT_TIMES, CHECK_IN_TIMES, syncValues);
  window.synchronizeFields(type, price, APARTMENT_TYPE, PRICE_NIGHT, syncValueWithMin);
  window.synchronizeFieldsFromQuantity(quantityRooms, capacity, a, b, syncQuantityRoomsGuests);

  var hideCapacity = function () {
    for (var i = 0; i < noticeForm.elements['capacity'].length; i++) {
      noticeForm.elements['capacity'].options[i].setAttribute('hidden', true);
    }
  };

  // var syncQuantityRoomsGuests = function (quantityRooms) {
  //   var capacity = noticeForm.elements['capacity'];

  //   for (var i = 0; i < capacity.options.length; i++) {
  //     var guests = capacity.options[i].value;
  //     capacity.options[i].setAttribute('hidden', true);

  //     if (quantityRooms === QUANTITY_ROOMS.one && guests === QUANTITY_GUESTS.one) {
  //       capacity.options[i].selected = true;
  //     }
  //     if (quantityRooms === QUANTITY_ROOMS.hundred && guests === QUANTITY_GUESTS.zero) {
  //       capacity.options[i].selected = true;
  //     }
  //     if (quantityRooms === QUANTITY_ROOMS.two && guests === QUANTITY_GUESTS.one || quantityRooms === QUANTITY_ROOMS.two && guests === QUANTITY_GUESTS.two) {
  //       capacity.options[i].removeAttribute('hidden');
  //       capacity.options[i].selected = true;
  //     }
  //     if (quantityRooms === QUANTITY_ROOMS.three && guests === QUANTITY_GUESTS.one || quantityRooms === QUANTITY_ROOMS.three && guests === QUANTITY_GUESTS.two || quantityRooms === QUANTITY_ROOMS.three && guests === QUANTITY_GUESTS.three) {
  //       capacity.options[i].removeAttribute('hidden');
  //       capacity.options[i].selected = true;
  //     }
  //   }
  // };

  var publishSubmitClickHandler = function () {
    var inputs = noticeForm.querySelectorAll('input');
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].checkValidity() === false) {
        inputs[i].style.borderColor = 'red';
      }
    }
  };

  // noticeForm.elements['room_number'].addEventListener('change', function (evt) {
  //   syncQuantityRoomsGuests(evt.target.value);
  // });

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
    var price = noticeForm.elements['price'];
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


  // for (var i =0; i < a.length; i++) {
  //   if (a[i] === '1') {
  //     console.log(b[i])
  //   } else if (a[i] === '2') {
  //     console.log(b[i], b[i-1])
  //   } else if (a[i] === '3') {
  //     console.log(b[i], b[i-1], b[i-2])
  //   } else if (a[i] === '100') {
  //     console.log(b[i]);
  //   }
  // }
})();
