'use strict';

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира',
  'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик',
  'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['flat', 'house', 'bungalo'];
var CHECK_IN_TIMES = ['12:00', '13:00', '14:00'];
var CHECK_OUT_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var template = document.querySelector('template').content;

map.classList.remove('map--faded');

var getAvatarList = function (range) {
  var avatars = [];
  var src = 'img/avatars/user0';
  for (var i = 1; i <= range; i++) {
    avatars.push(src + i + '.png');
  }
  return avatars;
};

var avatars = getAvatarList(8);

var shuffle = function (arr) {
  var element;
  var list = arr.slice();
  for (var i = 0; i < arr.length; i++) {
    var random = Math.floor(Math.random() * (i + 1));
    element = list[i];
    list[i] = list[random];
    list[random] = element;
  }
  return list;
};

var getRandomList = function (arr) {
  var randomList = arr.slice();
  var range = getRandomInteger(1, arr.length);
  randomList = shuffle(randomList);
  randomList = randomList.splice(0, range);
  return randomList;
};

var getRandomUniqueElement = function (arr) {
  var randomElement;
  var max = arr.length - 1;
  var randomIndex = getRandomInteger(0, max);
  randomElement = arr.splice(randomIndex, 1)[0];
  return randomElement;
};

var getRandomElement = function (arr) {
  var max = arr.length - 1;
  var randomIndex = getRandomInteger(0, max);
  return arr[randomIndex];
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

var getAuthor = function (avatarList) {
  var avatarUser = getRandomUniqueElement(avatarList);
  return {
    avatar: avatarUser
  };
};

var getOffer = function (coordinateX, coordinateY, titleList) {
  var minPrice = 1000;
  var maxPrice = 1000000;
  var minGuests = 1;
  var maxGuests = 10;
  var minRooms = 1;
  var maxRooms = 5;
  return {
    title: getRandomUniqueElement(titleList),
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

// Не знаю как лучше назвать параметры. Могу типа authorObject
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

var renderMapPin = function (coordinateX, coordinateY, pinAvatar) {
  var templateElement = template.cloneNode(true);
  var mapPinElement = templateElement.querySelector('.map__pin');
  var mapPinAvatar = mapPinElement.querySelector('img');
  var sizePinWidth = 46;
  var sisePinHeight = 64;
  var centerPinWidth = sizePinWidth / 2;
  mapPinElement.style.left = (coordinateX - centerPinWidth) + 'px';
  mapPinElement.style.top = (coordinateY - sisePinHeight) + 'px';
  mapPinAvatar.src = pinAvatar;

  return mapPinElement;
};

var getDescriptionType = function (descriptionType) {
  if (descriptionType === 'flat') {
    descriptionType = 'Квартира';
  } else if (descriptionType === 'bungalo') {
    descriptionType = 'Бунгало';
  } else if (descriptionType === 'house') {
    descriptionType = 'Дом';
  }
  return descriptionType;
};

// var createListFeatures = function (featureList, parentElement) {
//   for (var i = 0; i < featureList.length; i++) {
//     var featureElement = document.createElement('li');
//     featureElement.className = 'feature feature--' + featureList[i];
//     parentElement.appendChild(featureElement);
//   }
//   return parentElement;
// };

// У меня нарушена здесь логика.
// Ф-ия createListFeatures создает li, которые помещает в ul в цикле.
// Bозвращаю ul.
// В разметке ul имеет класс .popup__features.
// Далее, в ф-ии renderMapCard:
// объявляю var offerFeatures - ее значение это доступ к элементу .popup__features.
// А потом я в эту переменную кладу вызов функции создания списка.
// По факту получается, что ul = ul(с li);
// Результат получается нужный, но на меня ругается трэвис:
// пишет, что offerFeatures is assigned a value but never used.
// Пробовала сделать по-другому, не получается.

var createListFeatures = function (featureList, parentElement) {
  for (var i = 0; i < featureList.length; i++) {
    var featureElement = document.createElement('li');
    featureElement.className = 'feature feature--' + featureList[i];
    parentElement.appendChild(featureElement);
  }
  return parentElement;
};

var renderMapCard = function (descriptionCard, imgAvatar) {
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

  offerTitle.textContent = descriptionCard.title;
  offerAddress.textContent = descriptionCard.address;
  offerPrice.innerHTML = descriptionCard.price + '&#x20bd;/ночь';
  offerType.textContent = getDescriptionType(descriptionCard.type);
  offerRoomsGuests.textContent = descriptionCard.rooms + ' комнаты для ' + descriptionCard.guests + ' гостей';
  offerCheckinOut.textContent = 'Заезд после ' + descriptionCard.checkin + ', выезд до ' + descriptionCard.checkout;
  offerFeatures = createListFeatures(descriptionCard.features, offerFeatures);
  offerDescription.textContent = descriptionCard.description;
  avatarUser.src = imgAvatar;
  return mapCardElement;
};

var renderMapPinList = function () {
  var descriptions = createDescription(8);
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < descriptions.length; i++) {
    fragment.appendChild(renderMapPin(descriptions[i].location.x,
        descriptions[i].location.y, descriptions[i].author.avatar));
    fragment.appendChild(renderMapCard(descriptions[i].offer, descriptions[i].author.avatar));
  }
  mapPins.appendChild(fragment);
  map.appendChild(fragment);
};

renderMapPinList();
