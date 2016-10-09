(function() {
  'use strict';

  angular.module('data')
  .constant("BaseURL", 'https://davids-restaurant.herokuapp.com')
  .service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http', 'BaseURL'];
  function MenuDataService($http, BaseURL) {
    var service = this;

    service.getAllCategories = function() {
      return $http({
        method: 'GET',
        url: BaseURL + '/categories.json'
      }).then(function (result) {
        return result.data;
      });
    }

    service.getItemsForCategory = function(categoryShortName) {
      return $http({
        method: 'GET',
        url: BaseURL + '/menu_items.json?category=' + categoryShortName
      }).then(function(result) {
        return result.data.menu_items;
      });
    }
  }

})();
