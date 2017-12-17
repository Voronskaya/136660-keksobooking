'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var template = document.querySelector('template').content;

  var takeMapCard = function (src) {
    for (var i = 0; i < descriptions.length; i++) {
      if (src === descriptions[i].author.avatar) {
        var index = i;
        renderMapCardList(index);
      }
    }
  };

  var activatePin = function (pin) {
    pin.classList.add('map__pin--active');
  };

  var deactivatePin = function () {
    var activePin = map.querySelector('.map__pin--active');
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
      takeMapCard(src);
    },
    closePopup: function (popup) {
      popup.remove();
      deactivatePin();
    }
  };

  var renderMapCardList = function (index) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(window.card.renderMapCard(descriptions[index].offer, descriptions[index].author.avatar));
    map.appendChild(fragment);
  };
  var descriptions = window.data.createDescription(8);
})();
