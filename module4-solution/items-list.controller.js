(function() {
  'use strict';

  angular.module('MenuApp')
  .controller('ItemsListController', ItemsListController);

  ItemsListController.$inject = ['MenuDataService', 'category', 'items', 'categories'];
  function ItemsListController(MenuDataService, category, items, categories) {
    var itemsList = this;
    itemsList.category = categories.filter(c => c.short_name === category)[0].name;
    itemsList.items = items;
  }
})();