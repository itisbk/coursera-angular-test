(function () {
'use strict';

angular.module('MenuCategoriesApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    scope: {
      found: '<',
      nothingFound: '&'
    },
    controller: NarrowItDownController,
    bindToController: true,
    controllerAs: 'narrow',
    templateUrl: 'foundItems.html'

  };

  return ddo;
}

NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
function NarrowItDownController($scope, MenuSearchService) {
  var narrow = this;
  narrow.found = MenuSearchService.getFoundItems();

  var _nothingFound = false;
  narrow.getAllMenuItems = function () {
    _nothingFound = false;

    if (!$scope.searchTerm || $scope.searchTerm.length === 0) {
      _nothingFound = true;
    } else {
      MenuSearchService.getMatchedMenuItems($scope.searchTerm)
      .then(function (response) {
        narrow.found = response;
        if (narrow.found.length === 0) {
          _nothingFound = true;
        }
      })
      .catch(function (error) {

      });
    }
  };

  narrow.removeItem = function (index) {
    MenuSearchService.removeItem(index.index);
  };

  narrow.nothingFound = function () {
    return _nothingFound;
  };
}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var search = this;
  var found  = [];
  search.getMatchedMenuItems = function (searchTerm) {
    found = [];
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {
        for (var i = 0; i < result.data.menu_items.length; i++) {
          if (result.data.menu_items[i].description.search(searchTerm) !== -1) {
            found.push(result.data.menu_items[i]);
          }
        }

        return found;
    });
  };

  search.getFoundItems = function () {
    return found;
  };

  search.removeItem = function (itemIndex) {
    found.splice(itemIndex, 1);
  };

}


})();