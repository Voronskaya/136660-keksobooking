'use strict';
(function () {
  var mapPins = document.querySelector('.map__pins');
  var template = document.querySelector('template').content;
  var mapFilters = document.querySelector('.map__filters');

  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');

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
    var mapPinElement = templateElement.querySelector('.map__pin');
    var mapPinAvatar = mapPinElement.querySelector('img');
    var sizePinWidth = 46;
    var sisePinHeight = 64;
    var centerPinWidth = sizePinWidth / 2;
    mapPinElement.style.left = (coordinateX - centerPinWidth) + 'px';
    mapPinElement.style.top = (coordinateY - sisePinHeight) + 'px';
    mapPinAvatar.src = imgAvatar;

    return mapPinElement;
  };

  window.pin = {
    renderMapPinList: function () {
      var oldPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var j = 0; j < oldPins.length; j++) {
        oldPins[j].remove();
      }
      var pins = window.data.descriptions;

      if (housingType.value !== 'any') {
        pins = pins.filter(function (pin) {
          return pin.offer.type === housingType.value;
        });
      }

      if (housingPrice.value !== 'any') {
        pins = pins.filter(function (pin) {
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
      }

      if (housingRooms.value !== 'any') {
        pins = pins.filter(function (pin) {
          return pin.offer.rooms === Number(housingRooms.value);
        });
      }

      if (housingGuests.value !== 'any') {
        pins = pins.filter(function (pin) {
          return pin.offer.guests > Number(housingGuests.value);
        });
      }

      for (var z = 0; z < housingFeatures.children.length; z++) {
        if (housingFeatures.children[z].checked) {
          pins = pins.filter(function (pin) {
            return pin.offer.features.includes(housingFeatures.children[z].value);
          });
        }
      }

      var fragment = document.createDocumentFragment();
      var limitPins;
      if (pins.length > 5) {
        limitPins = 5;
      } else {
        limitPins = pins.length;
      }

      for (var i = 0; i < limitPins; i++) {
        fragment.appendChild(renderMapPin(pins[i].location.x,
            pins[i].location.y, pins[i].author.avatar));
      }

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
    window.pin.renderMapPinList();
  });
})();
