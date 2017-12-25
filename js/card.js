'use strict';
(function () {
  var template = document.querySelector('template').content;
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
      var featureItem = document.createElement('li');
      featureItem.className = 'feature feature--' + features[i];
      fragment.appendChild(featureItem);
    }
    return fragment;
  };

  window.card = {
    render: function (descriptionOffer, imgAvatar) {
      var offerTemplate = template.cloneNode(true);
      var mapCard = offerTemplate.querySelector('.map__card');
      var offerTitle = mapCard.querySelector('h3');
      var offerAddress = mapCard.querySelector('p > small');
      var offerPrice = mapCard.querySelector('.popup__price');
      var offerType = mapCard.querySelector('h4');
      var offerRoomsGuests = mapCard.querySelector('h4 + p');
      var offerCheckinOut = mapCard.querySelector('h4 + p + p');
      var offerFeatures = mapCard.querySelector('.popup__features');
      var offerDescription = mapCard.querySelector('.popup__features + p');
      var avatarUser = mapCard.querySelector('.popup__avatar');

      offerTitle.textContent = descriptionOffer.title;
      offerAddress.textContent = descriptionOffer.address;
      offerPrice.textContent = descriptionOffer.price + '₽/ночь';
      offerType.textContent = getDescriptionType(descriptionOffer.type);
      offerRoomsGuests.textContent = descriptionOffer.rooms + ' комнаты для ' + descriptionOffer.guests + ' гостей';
      offerCheckinOut.textContent = 'Заезд после ' + descriptionOffer.checkin + ', выезд до ' + descriptionOffer.checkout;

      while (offerFeatures.firstChild) {
        offerFeatures.removeChild(offerFeatures.firstChild);
      }
      offerFeatures.appendChild(createFeatures(descriptionOffer.features));
      offerDescription.textContent = descriptionOffer.description;
      avatarUser.src = imgAvatar;
      return mapCard;
    }
  };
})();
