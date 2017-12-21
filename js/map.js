'use strict';
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var ESC_KEYCODE = 27;
    var ENTER_KEYCODE = 13;
    var TOP_RANGE_Y = 100;
    var BOTTOM_RANGE_Y = 500;

    var noticeForm = document.querySelector('.notice__form');
    var map = document.querySelector('.map');
    var mapPinMain = map.querySelector('.map__pin--main');
    var fieldsets = document.querySelectorAll('fieldset');

    var disableForm = function (boolean) {
      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].disabled = boolean;
      }
    };

    var showMap = function () {
      map.classList.remove('map--faded');
      window.pin.renderMapPinList();
      noticeForm.classList.remove('notice__form--disabled');
      disableForm(false);
    };

    disableForm(true);

    mapPinMain.addEventListener('mouseup', function () {
      showMap();
    });

    mapPinMain.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        showMap();
      }
    });

    var getBorderCoordinateY = function (coordinateY, height) {
      var topRange = TOP_RANGE_Y - height;
      var bottomRange = BOTTOM_RANGE_Y - height;

      if (coordinateY < topRange) {
        coordinateY = topRange;
      } else if (coordinateY > bottomRange) {
        coordinateY = bottomRange;
      }
      return coordinateY;
    };

    mapPinMain.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var sizeMapPinHeight = 62;
      var sizeMapPinAngleHeight = 22;
      var partPinHeight = (sizeMapPinHeight / 2) + sizeMapPinAngleHeight;

      var startCoords = {
        x: evt.pageX,
        y: evt.pageY
      };

      var mapPinMainMousemoveHandler = function (moveEvt) {
        var shift = {
          x: startCoords.x - moveEvt.pageX,
          y: startCoords.y - moveEvt.pageY
        };

        var pinMainCoords = {
          x: mapPinMain.offsetLeft - shift.x,
          y: mapPinMain.offsetTop - shift.y
        };

        startCoords = {
          x: moveEvt.pageX,
          y: moveEvt.pageY
        };

        mapPinMain.style.left = pinMainCoords.x + 'px';
        mapPinMain.style.top = getBorderCoordinateY(pinMainCoords.y, partPinHeight) + 'px';
      };

      var mapPinMainMouseupHandler = function () {
        var pinMainCoords = {
          x: mapPinMain.offsetLeft,
          y: mapPinMain.offsetTop + partPinHeight
        };

        noticeForm.elements['address'].value = 'x: ' + pinMainCoords.x + ', y: ' + pinMainCoords.y;
        document.removeEventListener('mousemove', mapPinMainMousemoveHandler);
        document.removeEventListener('mouseup', mapPinMainMouseupHandler);
      };

      document.addEventListener('mousemove', mapPinMainMousemoveHandler);
      document.addEventListener('mouseup', mapPinMainMouseupHandler);
    });

    map.addEventListener('click', function (evt) {
      var target = evt.target;
      if (target.classList.contains('popup__close')) {
        window.pin.closePopup(target.parentNode);
      } else {
        if (target.tagName === 'IMG') {
          target = target.parentNode;
        }
        if (target.classList.contains('map__pin') && !target.classList.contains('map__pin--main')) {
          var imgElement = target.querySelector('img');
          window.pin.openPopup(target, imgElement .getAttribute('src'));
        }
      }
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        var popup = map.querySelector('.popup');
        if (popup) {
          window.pin.closePopup(popup);
        }
      }
    });
  });
})();
