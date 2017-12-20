'use strict';
(function () {

  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира',
    'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик',
    'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES = ['flat', 'house', 'bungalo'];
  var CHECK_IN_TIMES = ['12:00', '13:00', '14:00'];
  var CHECK_OUT_TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  // window.data = {
  //   CHECK_IN_TIMES: ['12:00', '13:00', '14:00'],
  //   CHECK_OUT_TIMES: ['12:00', '13:00', '14:00']
  // }

  var getAvatarList = function (range) {
    var avatars = [];
    var src = 'img/avatars/user0';
    for (var i = 1; i <= range; i++) {
      avatars.push(src + i + '.png');
    }
    return avatars;
  };

  var getAuthor = function (avatars) {
    var sourceAvatar = window.util.getRandomUniqueElement(avatars);
    return {
      avatar: sourceAvatar
    };
  };

  var avatars = getAvatarList(8);

  var getLocation = function () {
    var coordinateX = window.util.getRandomInteger(300, 900);
    var coordinateY = window.util.getRandomInteger(100, 500);
    return {
      x: coordinateX,
      y: coordinateY
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
      title: window.util.getRandomUniqueElement(titles),
      address: coordinateX + ', ' + coordinateY,
      price: window.util.getRandomInteger(minPrice, maxPrice),
      type: window.util.getRandomElement(TYPES),
      rooms: window.util.getRandomInteger(minRooms, maxRooms),
      guests: window.util.getRandomInteger(minGuests, maxGuests),
      checkin: window.util.getRandomElement(CHECK_IN_TIMES),
      checkout: window.util.getRandomElement(CHECK_OUT_TIMES),
      features: window.util.getRandomList(FEATURES),
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

  window. data = {
    descriptions: createDescription(8)
  };
})();
