'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500;
  var mapPins = document.querySelector('.map__pins');
  var template = document.querySelector('template').content;
  var mapFilters = document.querySelector('.map__filters');

  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');
  var lastTimeout;

  var debounce = function (fun) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(fun, DEBOUNCE_INTERVAL);
  };

  var activatePin = function (pin) {
    pin.classList.add('map__pin--active');
  };

  var deactivatePin = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  var renderMapPin = function (coordinateX, coordinateY, imgAvatar) {
    var templateElement = template.cloneNode(true);
    var mapPin = templateElement.querySelector('.map__pin');
    var mapPinAvatar = mapPin.querySelector('img');
    var siiePinWidth = 46;
    var sisePinHeight = 64;
    var centerPinWidth = siiePinWidth / 2;
    mapPin.style.left = (coordinateX - centerPinWidth) + 'px';
    mapPin.style.top = (coordinateY - sisePinHeight) + 'px';
    mapPinAvatar.src = imgAvatar;

    return mapPin;
  };

  var deleteOldPins = function () {
    var oldPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < oldPins.length; i++) {
      oldPins[i].remove();
    }
  };

  var filterHouseType = function (pins) {
    return pins.filter(function (pin) {
      return pin.offer.type === housingType.value;
    });
  };

  var filterHousingRooms = function (pins) {
    return pins.filter(function (pin) {
      return pin.offer.rooms === Number(housingRooms.value);
    });
  };

  var filterHousingGuests = function (pins) {
    return pins.filter(function (pin) {
      return pin.offer.guests > Number(housingGuests.value);
    });
  };

  var filterHousingPrice = function (pins) {
    return pins.filter(function (pin) {
      var price = pin.offer.price;
      var result;
      switch (housingPrice.value) {
        case 'low':
          result = price < 10000;
          break;
        case 'middle':
          result = price >= 10000 && price <= 50000;
          break;
        case 'high':
          result = price > 50000;
          break;
        default:
          result = false;
      }
      return result;
    });
  };

  var applyFilter = function (pins) {
    if (housingType.value !== 'any') {
      pins = filterHouseType(pins);
    }

    if (housingPrice.value !== 'any') {
      pins = filterHousingPrice(pins);
    }

    if (housingRooms.value !== 'any') {
      pins = filterHousingRooms(pins);
    }

    if (housingGuests.value !== 'any') {
      pins = filterHousingGuests(pins);
    }

    for (var i = 0; i < housingFeatures.children.length; i++) {
      if (housingFeatures.children[i].checked) {
        pins = pins.filter(function (pin) {
          return pin.offer.features.includes(housingFeatures.children[i].value);
        });
      }
    }
    return pins;
  };

  var getPinFragment = function (pins) {
    var fragment = document.createDocumentFragment();
    var limitPins = (pins.length > 5) ? 5 : pins.length;
    for (var i = 0; i < limitPins; i++) {
      fragment.appendChild(renderMapPin(pins[i].location.x,
          pins[i].location.y, pins[i].author.avatar));
    }
    return fragment;
  };

  window.pin = {
    renderFiltered: function () {
      var pins = window.data.descriptions;
      deleteOldPins();
      pins = applyFilter(pins);

      var fragment = getPinFragment(pins);
      mapPins.appendChild(fragment);
    },
    openPopup: function (pin, src) {
      deactivatePin();
      activatePin(pin);
      window.showCard.takeMapCard(src);
    },
    closePopup: function (popup) {
      popup.remove();
      deactivatePin();
    }
  };
  mapFilters.addEventListener('change', function () {
    debounce(window.pin.renderFiltered);
  });
})();
