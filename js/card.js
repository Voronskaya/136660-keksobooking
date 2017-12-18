'use strict';
(function () {
  var template = document.querySelector('template').content;
  // var map = document.querySelector('.map');
  // var descriptions = window.data.createDescription(8);

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

  var renderMapCardList = function (index) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderMapCard(window.card.descriptions[index].offer, window.card.descriptions[index].author.avatar));
    window.map.appendChild(fragment);
  };

  window.card = {
    takeMapCard: function (src) {
      for (var i = 0; i < window.card.descriptions.length; i++) {
        if (src === window.card.descriptions[i].author.avatar) {
          var index = i;
          renderMapCardList(index);
        }
      }
    },
    descriptions: window.data.createDescription(8)
  };
})();
