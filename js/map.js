'use strict';

var OFFERS = ['Большая уютная квартира', 'Маленькая неуютная квартира',
'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик',
'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря',
'Неуютное бунгало по колено в воде'];
var TYPES = ['flat', 'house', 'bungalo'];
var CHECK_IN_TIMES = ['12:00', '13:00', '14:00'];
var CHECK_OUT_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var main = document.querySelector('main');
var map = main.querySelector('.map');
var mapPins = main.querySelector('.map__pins');
var template = document.querySelector('template').content;

map.classList.remove('map--faded');
// Массив с аватарами.
var getAvatarList = function () {
  var src = 'img/avatars/user0';
  var max = 8;
  var arr = [];
  for(var i = 1; i <= max; i++) {
    arr.push(src + i + '.png');
  }
  return arr[0];
}

var getMixElements = function (arr) {
  var element;
  for (var i = 0; i < arr.length; i++) {
    var random = Math.floor(Math.random() * (i + 1));
    element = arr[i];
    arr[i] = arr[random];
    arr[random] = element;
  }
  return arr;
}

var getRandomList = function (arr) {
  var copy = arr.slice();
  var range = getRandomInteger(1, copy.length);
  copy = getMixElements(copy);
  copy = copy.splice(0, range);
  return copy;
}

// Ф-ия под вопросом. Некорректно работает.
// Не выполняется условие: значения не должны повторяться.
var getRandomTitle = function (arr) {
  var copy = arr.slice();
  var randomElement;
  var min = 0;
  var max = arr.length - 1;
  var randomIndex = getRandomInteger(min, max);
  copy = getMixElements(copy);
  randomElement = copy.splice(randomIndex, 1);
  return randomElement[0];
}

// Ф-ия для type, checkin, checkout.
var getRandomElement = function (arr) {
  var min = 0;
  var max = arr.length - 1;
  var randomIndex = getRandomInteger(min, max);
  return arr[randomIndex];
}
// Расчет координат
var Coordinates = function (x, y) {
  this.x = x;
  this.y = y;
}
var getLocationX = function () {
  var minX = 300;
  var maxX = 900;
  var coordinateX = getRandomInteger(minX, maxX);
  return coordinateX;
}

var getLocationY = function () {
  var minY = 100;
  var maxY = 500;
  var coordinateY = getRandomInteger(minY, maxY);
  return coordinateY;
}

var getAddress = function () {
  var x = getLocationX();
  var y = getLocationY();
  return 'location.' + x + ', location.' + y;
}
var getLocation = function () {
  var locationObj = new Coordinates(getLocationX(), getLocationY());
  return locationObj;
}

// Ф-ия для получения price, rooms, guests.
function getRandomInteger(min, max) {
  var random = min + Math.random() * (max - min + 1);
  random = Math.floor(random);
  return random;
}

// Конструкторы
var Description = function (author, offer, loaction) {
  this.author = author;
  this.offer = offer;
  this.location = location;
}

var Author = function (avatar) {
  this.avatar = avatar;
}

var Offer = function (title, address, price, type,
  rooms, guests, checkin, checkout, features,
  description, photos) {
  this.title = title;
  this.address = address;
  this.prcie = price;
  this.type = type;
  this.rooms = rooms;
  this.guests = guests;
  this.checkin = checkin;
  this.checkout = checkout;
  this.features = features;
  this.description = description;
  this.photos = photos;
}

var getAvatar = function () {
  var avatar = getAvatarList();
  return new Author(avatar);
}

var getOffer = function () {
  var copy = OFFERS.slice();
  var minPrice = 1000;
  var maxPrice = 1000000;
  var minGuests = 1;
  var maxGuests = 10;
  var minRooms = 1;
  var maxRooms = 5;
  var title = getRandomTitle(copy);
  var address = getAddress();
  var price = getRandomInteger(minPrice, maxPrice);
  var type = getRandomElement(TYPES);
  var rooms = getRandomInteger(minRooms, maxRooms);
  var guests = getRandomInteger(minGuests, maxGuests);
  var checkin = getRandomElement(CHECK_IN_TIMES);
  var checkout = getRandomElement(CHECK_OUT_TIMES);
  var features = getRandomList(copy);
  var description = '';
  var photos = [];
  return new Offer(title, address, price, type, rooms, guests, checkin,
    checkout, features, description, photos);
}

var createDescription = function (length) {
  var descriptions = [];
  for(var i = 0; i < length; i++) {
    var author = getAvatar();
    var offer = getOffer();
    var location = getLocation();
    descriptions.push(new Description(author, offer, location));
  }
  return descriptions;
}

// Стр 186 не уверена, что тут так можно писать.
var renderOffer = function (obj) {
  var offerElement = template.cloneNode(true);
  var offerMapCard = offerElement.querySelector('.map__card');
  var offerTitle = offerElement.querySelector('h3');
  var offerAddress = offerElement.querySelector('p > small');
  var offerPrice = offerElement.querySelector('.popup__price');
  var offerType = offerElement.querySelector('h4');
  var offerRoomsGuests = offerElement.querySelector('h4 + p');
  var offerCheckinOut = offerElement.querySelector('h4 + p + p');
  var offerFeatures = offerElement.querySelector('.popup__features');
  var offerDescription = offerElement.querySelector('.popup__features + p');
  var offerPhotos = offerElement.querySelector('.popup__pictures');

  offerTitle.textContent = obj.offer.title;
  offerAddress.textContent = obj.offer.address;
  offerPrice.textContent = obj.offer.price + '&#x20bd;/ночь';
  offerType.textContent = 'flat' ? 'Квартира' : offerType.textContent = 'bungalo' ? 'Бунгало' : offerType.textContent = 'house' ? 'Дом';
  offerRoomsGuests.textContent = obj.offer.rooms + ' для ' + obj.offer.guests + ' гостей';
  offerRoomsGuest.textContent = 'Заезд после ' + obj.offer.checkin +
  ', выезд до ' + obj.offer.checkout;
}

var renderOfferList = function () {
  var offerList = createDescription(8);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < offerList.length; i++) {
    fragment.appendChild(renderOffer(offerList[i]));
  }
  map.appendChild(fragment);
}
renderOfferList();
// Тестирование - отрисовка объекта==================
// var Dog = function (x, y) {
//   this.x = x;
//   this.y = y;
// }

// var getTest = function (length) {
//   var testArr = [];
//   testArr.push(new Dog(100, 200));
//   return testArr;
// }

// var renderPin = function (obj) {
//   var pinElement = template.cloneNode(true);
//   var pinButton = pinElement.querySelector('.map__pin');

//   pinButton.style.left = obj.x + 'px';
//   pinButton.style.top = obj.y + 'px';
//   return pinElement;
// }

// var renderPinList = function () {
//   var testList = getTest(1);
//   var fragment = document.createDocumentFragment();
//   fragment.appendChild(renderPin(testList[0]));
//   mapPins.appendChild(fragment);
// }
// renderPinList();
