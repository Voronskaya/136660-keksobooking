'use strict';
(function () {

  document.addEventListener('DOMContentLoaded', function () {
    var ESC_KEYCODE = 27;
    var ENTER_KEYCODE = 13;
    var TOP_RANGE_Y = 100;
    var BOTTOM_RANGE_Y = 500;
    var sizeMapPinAngleHeight = 21;
    var sizeMapPinWidth = 62;
    var sizeMapPinHeight = 62;
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

    mapPinMain.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var pinMainMousemoveHandler = function (moveEvt) {
        moveEvt.preventDefault();

        var startCoords = {
          x: moveEvt.pageX,
          y: moveEvt.pageY
        };

        var pinCoords = {
          x: startCoords.x - (sizeMapPinWidth / 2),
          y: startCoords.y - (sizeMapPinHeight / 2 - sizeMapPinAngleHeight)
        };

        if (pinCoords.y < TOP_RANGE_Y) {
          pinCoords.y = TOP_RANGE_Y;
        } else if (pinCoords.y > BOTTOM_RANGE_Y) {
          pinCoords.y = BOTTOM_RANGE_Y;
        }
        mapPinMain.style.left = pinCoords.x + 'px';
        mapPinMain.style.top = pinCoords.y + 'px';
        mapPinMain.style.zIndex = '2';
      };

      var pinMainMouseupHandler = function (upEvt) {
        upEvt.preventDefault();

        var pinMainCoords = {
          x: upEvt.clientX,
          y: upEvt.clientY
        };

        noticeForm.elements['address'].value = 'x: ' + pinMainCoords.x + ', y: ' + pinMainCoords.y;
        document.removeEventListener('mousemove', pinMainMousemoveHandler);
        document.removeEventListener('mouseup', pinMainMouseupHandler);
      };

      document.addEventListener('mousemove', pinMainMousemoveHandler);
      document.addEventListener('mouseup', pinMainMouseupHandler);
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
