'use strict';
(function () {
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

  var getRandomIndex = function (value) {
    var randomValue = Math.random() * value;
    randomValue = Math.floor(randomValue);
    return randomValue;
  };

  window.util = {
    getRandomList: function (list) {
      var randomList = list.slice();
      var range = window.util.getRandomInteger(1, list.length);
      randomList = shuffle(randomList);
      randomList = randomList.splice(0, range);
      return randomList;
    },
    getRandomUniqueElement: function (list) {
      var randomElement;
      var randomIndex = getRandomIndex(list.length);
      randomElement = list.splice(randomIndex, 1)[0];
      return randomElement;
    },
    getRandomElement: function (list) {
      var randomIndex = getRandomIndex(list.length);
      return list[randomIndex];
    },
    getRandomInteger: function (min, max) {
      var randomValue = min + Math.random() * (max - min + 1);
      randomValue = Math.floor(randomValue);
      return randomValue;
    }
  };
})();
