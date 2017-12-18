'use strict';
(function () {

  document.addEventListener('DOMContentLoaded', function () {
    var ESC_KEYCODE = 27;
    var ENTER_KEYCODE = 13;
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
