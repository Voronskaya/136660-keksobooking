'use strict';
(function () {
  window.synchronizeFields = function(elem1, elem2, values1, values2, cb) {
    elem1.addEventListener('change', function (evt) {
      var currentValue = evt.target.value;
      for (var i = 0; i < values1.length; i++) {
        if (currentValue === values1[i]) {
          cb(elem2, values2[i])
        }
      }
    });
  };

  window.synchronizeFieldsFromQuantity = function (elem1, elem2, values1, values2, cb) {
    elem1.addEventListener('change', function (evt) {
      var currentValue = evt.target.value;
      for (var i = 0; i < values1.length; i++) {
        elem2[i].setAttribute('hidden', true);
        if (currentValue === values1[i]) {
          cb(elem2, values2[i])
        }
      }
    });
  }
})();
