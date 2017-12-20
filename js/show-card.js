'use strict';
(function () {
window.showCard = {
    takeMapCard: function (src) {
      for (var i = 0; i < window.data.descriptions.length; i++) {
        if (src === window.data.descriptions[i].author.avatar) {
          var index = i;
          window.card.renderMapCardList(index);
        }
      }
    }
  };
})();
