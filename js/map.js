'use strict';
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var getAvatarList = function (range) {
      var avatars = [];
      var src = 'img/avatars/user0';
      for (var i = 1; i <= range; i++) {
        avatars.push(src + i + '.png');
      }
      return avatars;
    };

    var shuffle = function (list) {
      var element;
      var elements = list.slice();
      for (var i = 0; i < list.length; i++) {
        var random = Math.floor(Math.random() * (i + 1));
        element = elements[i];
        elements[i] = elements[random];
        elements[random] = element;
      }
      return elements;
    };

    var getRandomList = function (list) {
      var randomList = list.slice();
      var range = getRandomInteger(1, list.length);
      randomList = shuffle(randomList);
      randomList = randomList.splice(0, range);
      return randomList;
    };

    var getRandomUniqueElement = function (list) {
      var randomElement;
      var randomIndex = getRandomIndex(list.length);
      randomElement = list.splice(randomIndex, 1)[0];
      return randomElement;
    };

    var getRandomElement = function (list) {
      var randomIndex = getRandomIndex(list.length);
      return list[randomIndex];
    };

    var getRandomIndex = function (value) {
      var randomValue = Math.random() * value;
      randomValue = Math.floor(randomValue);
      return randomValue;
    };

    var getRandomInteger = function (min, max) {
      var randomValue = min + Math.random() * (max - min + 1);
      randomValue = Math.floor(randomValue);
      return randomValue;
    };

    var getLocation = function () {
      var coordinateX = getRandomInteger(300, 900);
      var coordinateY = getRandomInteger(100, 500);
      return {
        x: coordinateX,
        y: coordinateY
      };
    };

    var getAuthor = function (avatars) {
      var sourceAvatar = getRandomUniqueElement(avatars);
      return {
        avatar: sourceAvatar
      };
    };

    var getOffer = function (coordinateX, coordinateY, titles) {
      var minPrice = 1000;
      var maxPrice = 1000000;
      var minGuests = 1;
      var maxGuests = 10;
      var minRooms = 1;
      var maxRooms = 5;
      return {
        title: getRandomUniqueElement(titles),
        address: coordinateX + ', ' + coordinateY,
        price: getRandomInteger(minPrice, maxPrice),
        type: getRandomElement(TYPES),
        rooms: getRandomInteger(minRooms, maxRooms),
        guests: getRandomInteger(minGuests, maxGuests),
        checkin: getRandomElement(CHECK_IN_TIMES),
        checkout: getRandomElement(CHECK_OUT_TIMES),
        features: getRandomList(FEATURES),
        description: '',
        photos: []
      };
    };

    var getDescription = function (author, offer, location) {
      return {
        author: author,
        offer: offer,
        location: location
      };
    };

    var createDescription = function (range) {
      var descriptions = [];
      var copyAvatars = avatars.slice();
      var copyTitles = TITLES.slice();

      for (var i = 0; i < range; i++) {
        var author = getAuthor(copyAvatars);
        var location = getLocation();
        var offer = getOffer(location.x, location.y, copyTitles);
        descriptions.push(getDescription(author, offer, location));
      }
      return descriptions;
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

    var getDescriptionType = function (descriptionType) {
      var translationType;
      if (descriptionType === 'flat') {
        translationType = 'Квартира';
      } else if (descriptionType === 'bungalo') {
        translationType = 'Бунгало';
      } else if (descriptionType === 'house') {
        translationType = 'Дом';
      }
      return translationType;
    };

    var createFeatures = function (features) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < features.length; i++) {
        var featureElement = document.createElement('li');
        featureElement.className = 'feature feature--' + features[i];
        fragment.appendChild(featureElement);
      }
      return fragment;
    };

    var renderMapCard = function (descriptionOffer, imgAvatar) {
      var offerElement = template.cloneNode(true);
      var mapCardElement = offerElement.querySelector('.map__card');
      var offerTitle = mapCardElement.querySelector('h3');
      var offerAddress = mapCardElement.querySelector('p > small');
      var offerPrice = mapCardElement.querySelector('.popup__price');
      var offerType = mapCardElement.querySelector('h4');
      var offerRoomsGuests = mapCardElement.querySelector('h4 + p');
      var offerCheckinOut = mapCardElement.querySelector('h4 + p + p');
      var offerFeatures = mapCardElement.querySelector('.popup__features');
      var offerDescription = mapCardElement.querySelector('.popup__features + p');
      var avatarUser = mapCardElement.querySelector('.popup__avatar');

      offerTitle.textContent = descriptionOffer.title;
      offerAddress.textContent = descriptionOffer.address;
      offerPrice.innerHTML = descriptionOffer.price + '&#x20bd;/ночь';
      offerType.textContent = getDescriptionType(descriptionOffer.type);
      offerRoomsGuests.textContent = descriptionOffer.rooms + ' комнаты для ' + descriptionOffer.guests + ' гостей';
      offerCheckinOut.textContent = 'Заезд после ' + descriptionOffer.checkin + ', выезд до ' + descriptionOffer.checkout;

      offerFeatures.innerHTML = '';
      offerFeatures.appendChild(createFeatures(descriptionOffer.features));
      offerDescription.textContent = descriptionOffer.description;
      avatarUser.src = imgAvatar;
      return mapCardElement;
    };

    var renderMapPinList = function () {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < descriptions.length; i++) {
        fragment.appendChild(renderMapPin(descriptions[i].location.x,
            descriptions[i].location.y, descriptions[i].author.avatar));
      }
      mapPins.appendChild(fragment);
    };

    var renderMapCardList = function (index) {
      var fragment = document.createDocumentFragment();
      fragment.appendChild(renderMapCard(descriptions[index].offer, descriptions[index].author.avatar));
      map.appendChild(fragment);
    };

    var disableForm = function (boolean) {
      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].disabled = boolean;
      }
    };

    var showMap = function () {
      map.classList.remove('map--faded');
      renderMapPinList();
      noticeForm.classList.remove('notice__form--disabled');
      disableForm(false);
    };

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

    var openPopup = function (pin, src) {
      deactivatePin();
      activatePin(pin);
      takeMapCard(src);
    };

    var closePopup = function (popup) {
      popup.remove();
      deactivatePin();
    };

    // Синхронизация времени заезда, выезда
    var timeinChangeHandler = function () {
      noticeForm.elements['timeout'].selectedIndex = noticeForm.elements['timein'].selectedIndex;
    };

    var timeoutChangeHandler = function () {
      noticeForm.elements['timein'].selectedIndex = noticeForm.elements['timeout'].selectedIndex;
    };

    // Синхронизация типа жилья и цены

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

    // Синхронизация комнат и гостей.
    // Не знаю как делать. Не работает.

    var syncQuantityRoomsGuests = function () {
      // if (roomNumber.options[0].selected) {
      //   console.log('zero')
      //   capacity.options[0].style.display = 'none';
      //   capacity.options[1].style.display = 'none';
      //   capacity.options[3].style.display = 'none';
      //   // capacity.options[0].text = '';
      // } else if (roomNumber.options[1].selected) {
      //   console.log('one')
      //   capacity.options[1].style.display = 'block';
      // } else if (roomNumber.options[2].selected) {
      //   console.log('two')
      //   capacity.options[0].style.display = 'block';
      //   capacity.options[2].style.display = 'block';
      //   capacity.options[3].style.display = 'none';
      // } else if (roomNumber.options[3].selected) {

      //   capacity.options[0].style.display = 'none';
      //   capacity.options[1].style.display = 'none';
      //   capacity.options[2].style.display = 'none';
      //   capacity.options[3].style.display = 'block';
      // }

      // console.log(roomNumber);
    };

    var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира',
      'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик',
      'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
    var TYPES = ['flat', 'house', 'bungalo'];
    var CHECK_IN_TIMES = ['12:00', '13:00', '14:00'];
    var CHECK_OUT_TIMES = ['12:00', '13:00', '14:00'];
    var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    var ESC_KEYCODE = 27;
    var ENTER_KEYCODE = 13;
    var COST_APARTMENT = {
      bungalo: '0',
      flat: '1000',
      house: '5000',
      palace: '10000'
    };
    var map = document.querySelector('.map');
    var mapPins = map.querySelector('.map__pins');
    var mapPinMain = map.querySelector('.map__pin--main');
    var template = document.querySelector('template').content;
    var noticeForm = document.querySelector('.notice__form');
    // var roomNumber = noticeForm.querySelectorAll('.room_number');
    var fieldsets = noticeForm.querySelectorAll('fieldset');
    var avatars = getAvatarList(8);
    var descriptions = createDescription(8);

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
        closePopup(target.parentNode);
      } else {
        if (target.tagName === 'IMG') {
          target = target.parentNode;
        }
        if (target.classList.contains('map__pin') && !target.classList.contains('map__pin--main')) {
          var imgElement = target.querySelector('img');
          openPopup(target, imgElement .getAttribute('src'));
        }
      }
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        var popup = map.querySelector('.popup');
        if (popup) {
          closePopup(popup);
        }
      }
    });

    noticeForm.elements['timein'].addEventListener('change', timeinChangeHandler);
    noticeForm.elements['timeout'].addEventListener('change', timeoutChangeHandler);

    noticeForm.elements['type'].addEventListener('change', function () {
      syncTypeHousePrice(noticeForm.elements['type'].value);
    });
    noticeForm.elements['room_number'].addEventListener('change', function () {
      syncQuantityRoomsGuests();
    });
  });
})();
