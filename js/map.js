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
var AVATARS = [];
// Не знаю где их лучше объявить.
var copyTitle = TITLES.slice();
var copyFeatures = FEATURES.slice();


map.classList.remove('map--faded');

// Массив с аватарами. нужно ли выносить i=1 в min?
// Проблема с нулем - user0: если аватаров будет больше, то
// ноль будет прибавляться впереди двузначного числа.
// Когда сгенерировала массив, нужно вызов ф-ии в переменную?
// Почему в самом конце кода, если проверять значения AVATARS и TITLES - массивы пустые?

var getAvatarList = function (arr, max) {
  var src = 'img/avatars/user0';
  for (var i = 1; i <= max; i++) {
    arr.push(src + i + '.png');
  }
  return arr;
};

getAvatarList(AVATARS, 8);

// arr.length или copy.length?
var getMixElements = function (arr) {
  var element;
  var copy = arr.slice();
  for (var i = 0; i < arr.length; i++) {
    var random = Math.floor(Math.random() * (i + 1));
    element = copy[i];
    copy[i] = copy[random];
    copy[random] = element;
  }
  return copy;
};

var getRandomList = function (arr) {
  var range = getRandomInteger(1, arr.length);
  arr = getMixElements(arr);
  arr = arr.splice(0, range);
  return arr;
};
// Ф-ия для title и avatar
// Смущает randomElement[0]: то, что там стоит конкретное число. Правильно ли это?
var getRandomUniqueElement = function (arr) {
  var randomElement;
  var min = 0;
  var max = arr.length - 1;
  var randomIndex = getRandomInteger(min, max);
  randomElement = arr.splice(randomIndex, 1);
  return randomElement[0];
};
// Ф-ия для type, checkin, checkout.
var getRandomElement = function (arr) {
  var min = 0;
  var max = arr.length - 1;
  var randomIndex = getRandomInteger(min, max);
  return arr[randomIndex];
};
// Расчет координат
var Coordinates = function (x, y) {
  this.x = x;
  this.y = y;
};

var getCoordinates = function (positionX1, positionX2, positionY1, positionY2) {
  var coordinates = [];
  var x = getRandomInteger(positionX1, positionX2);
  var y = getRandomInteger(positionY1, positionY2);
  coordinates[0] = x;
  coordinates[1] = y;
  return coordinates;
};

var getLocation = function () {
  var coordinates = getCoordinates(300, 900, 100, 500);
  var x = coordinates[0];
  var y = coordinates[1];
  var locationObj = new Coordinates(x, y);
  return locationObj;
};

// Ф-ия для получения price, rooms, guests.
var getRandomInteger = function (min, max) {
  var random = min + Math.random() * (max - min + 1);
  random = Math.floor(random);
  return random;
};

var Description = function (author, offer, location) {
  this.author = author;
  this.offer = offer;
  this.location = location;
};

var Author = function (avatar) {
  this.avatar = avatar;
};

var Offer = function (title, address, price, type,
    rooms, guests, checkin, checkout, features,
    description, photos) {
  this.title = title;
  this.address = address;
  this.price = price;
  this.type = type;
  this.rooms = rooms;
  this.guests = guests;
  this.checkin = checkin;
  this.checkout = checkout;
  this.features = features;
  this.description = description;
  this.photos = photos;
};

// Нужен параметр?
var getAvatar = function () {
  var avatar = getRandomUniqueElement(AVATARS);
  return new Author(avatar);
};

var getOffer = function (coordinateX, coordinateY) {
  var minPrice = 1000;
  var maxPrice = 1000000;
  var minGuests = 1;
  var maxGuests = 10;
  var minRooms = 1;
  var maxRooms = 5;
  var title = getRandomUniqueElement(copyTitle);
  var address = coordinateX + ', ' + coordinateY;
  var price = getRandomInteger(minPrice, maxPrice);
  var type = getRandomElement(TYPES);
  var rooms = getRandomInteger(minRooms, maxRooms);
  var guests = getRandomInteger(minGuests, maxGuests);
  var checkin = getRandomElement(CHECK_IN_TIMES);
  var checkout = getRandomElement(CHECK_OUT_TIMES);
  var features = getRandomList(copyFeatures);
  var description = '';
  var photos = [];
  return new Offer(title, address, price, type, rooms, guests,
      checkin, checkout, features, description, photos);
};

var createDescription = function (length) {
  var descriptions = [];
  for (var i = 0; i < length; i++) {
    var author = getAvatar();
    var location = getLocation();
    var offer = getOffer(location.x, location.y);
    descriptions.push(new Description(author, offer, location));
  }
  return descriptions;
};

var renderMapPin = function (obj) {
  var mapPinElement = template.cloneNode(true);
  var mapPin = mapPinElement.querySelector('.map__pin');

  mapPin.style.left = obj.location.x + 'px';
  mapPin.style.top = obj.location.y + 'px';
  return mapPinElement;
};

var renderMapPinList = function () {
  var pinList = createDescription(8);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pinList.length; i++) {
    fragment.appendChild(renderMapPin(pinList[i]));
  }
  mapPins.appendChild(fragment);
};

renderMapPinList();

var getDescriptionType = function (type) {
  if (type === 'flat') {
    type = 'Квартира';
  } else if (type === 'bungalo') {
    type = 'Бунгало';
  } else if (type === 'house') {
    type = 'Дом';
  }
  return type;
};

var createListFeatures = function (featureList, wrapElement) {
  for (var i = 0; i < featureList.length; i++) {
    var featureElement = document.createElement('li');
    featureElement.className = 'feature feature--' + featureList[i];
    wrapElement.appendChild(featureElement);
  }
  return wrapElement;
};

// Можно ли в разметке тегам присвоить класс, чтобы не искать типа h4 + p + p?

var renderMapCard = function (descriptionCard) {
  var offerElement = template.cloneNode(true);
  var offerTitle = offerElement.querySelector('.map__title');
  var offerAddress = offerElement.querySelector('p > small');
  var offerPrice = offerElement.querySelector('.popup__price');
  var offerType = offerElement.querySelector('h4');
  var offerRoomsGuests = offerElement.querySelector('h4 + p');
  var offerCheckinOut = offerElement.querySelector('h4 + p + p');
  var offerFeatures = offerElement.querySelector('.popup__features');
  var offerDescription = offerElement.querySelector('.popup__features + p');
  // var offerPhotos = offerElement.querySelector('.popup__pictures');

  offerTitle.textContent = descriptionCard.offer.title;
  offerAddress.textContent = descriptionCard.offer.address;
  offerPrice.textContent = descriptionCard.offer.price + '&#x20bd;/ночь';
  offerType.textContent = getDescriptionType(descriptionCard.offer.type);
  offerRoomsGuests.textContent = descriptionCard.offer.rooms + ' комнаты для ' + descriptionCard.offer.guests + ' гостей';
  offerCheckinOut.textContent = 'Заезд после ' + descriptionCard.offer.checkin + ', выезд до ' + descriptionCard.offer.checkout;
  offerFeatures = createListFeatures(descriptionCard.offer.features, offerFeatures);
  offerDescription.textContent = descriptionCard.offer.description;
  return offerElement;
};

var renderMapCardList = function () {
  var cardList = createDescription(8);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < cardList.length; i++) {
    fragment.appendChild(renderMapCard(cardList[i]));
  }
  map.appendChild(fragment);
};

renderMapCardList();
