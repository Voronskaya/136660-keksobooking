'use strict';
(function () {
  var map = document.querySelector('.map');

    var renderMapCardList = function (index) {
      var fragment = document.createDocumentFragment();
      fragment.appendChild(window.card.renderMapCard(window.data.descriptions[index].offer, window.data.descriptions[index].author.avatar));
      map.appendChild(fragment);
    };

  window.showCard = {
    takeMapCard: function (src) {
      for (var i = 0; i < window.data.descriptions.length; i++) {
        if (src === window.data.descriptions[i].author.avatar) {
          var index = i;
          renderMapCardList(index);
        }
      }
    }
  };

   window.backend.download(renderMapCardList, window.backend.errorHandler);

  // window.backend.download(renderMapCardList);
  // console.log(window.backend.download(renderMapCardList))
})();
