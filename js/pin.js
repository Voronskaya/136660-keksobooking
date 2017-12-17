'use strict';
(function () {
  var mapPins = document.querySelector('.map__pins');
  var template = document.querySelector('template').content;
  var descriptions = window.data.createDescription(8);

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
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < descriptions.length; i++) {
        fragment.appendChild(renderMapPin(descriptions[i].location.x,
            descriptions[i].location.y, descriptions[i].author.avatar));
      }
      mapPins.appendChild(fragment);
    },
    openPopup: function (pin, src) {
      deactivatePin();
      activatePin(pin);
      window.card.takeMapCard(src);
    },
    closePopup: function (popup) {
      popup.remove();
      deactivatePin();
    }
  };
})();
