'use strict';
(function () {
  var COST_APARTMENT = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };
  var noticeForm = document.querySelector('.notice__form');
  var publishSubmit = noticeForm.querySelector('.form__submit');

  var timeinChangeHandler = function () {
    noticeForm.elements['timeout'].selectedIndex = noticeForm.elements['timein'].selectedIndex;
  };

  var timeoutChangeHandler = function () {
    noticeForm.elements['timein'].selectedIndex = noticeForm.elements['timeout'].selectedIndex;
  };

  var syncTypeHousePrice = function (typeHouse) {
    var minPrice = noticeForm.elements['price'];
    if (typeHouse === 'bungalo') {
      minPrice.setAttribute('min', COST_APARTMENT.bungalo);
    } else if (typeHouse === 'flat') {
      minPrice.setAttribute('min', COST_APARTMENT.flat);
    } else if (typeHouse === 'house') {
      minPrice.setAttribute('min', COST_APARTMENT.house);
    } else {
      minPrice.setAttribute('min', COST_APARTMENT.palace);
    }
  };

  var hideCapacity = function () {
    for (var i = 0; i < noticeForm.elements['capacity'].length; i++) {
      noticeForm.elements['capacity'].options[i].setAttribute('hidden', true);
    }
  };

  var syncQuantityRoomsGuests = function (quantityRooms) {
    var capacity = noticeForm.elements['capacity'];

    for (var i = 0; i < capacity.options.length; i++) {
      var guests = capacity.options[i].value;
      capacity.options[i].setAttribute('hidden', true);

      if (quantityRooms === '1' && guests === '1') {
        capacity.options[i].selected = true;
      }
      if (quantityRooms === '100' && guests === '0') {
        capacity.options[i].selected = true;
      }
      if (quantityRooms === '2' && guests === '1' || quantityRooms === '2' && guests === '2') {
        capacity.options[i].removeAttribute('hidden');
        capacity.options[i].selected = true;
      }
      if (quantityRooms === '3' && guests === '1' || quantityRooms === '3' && guests === '2' || quantityRooms === '3' && guests === '3') {
        capacity.options[i].removeAttribute('hidden');
        capacity.options[i].selected = true;
      }
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

  noticeForm.elements['timein'].addEventListener('change', timeinChangeHandler);
  noticeForm.elements['timeout'].addEventListener('change', timeoutChangeHandler);

  noticeForm.elements['type'].addEventListener('change', function () {
    syncTypeHousePrice(noticeForm.elements['type'].value);
  });
  noticeForm.elements['room_number'].addEventListener('change', function (evt) {
    syncQuantityRoomsGuests(evt.target.value);
  });

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
})();
