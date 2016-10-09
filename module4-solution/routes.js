(function() {
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.template.html'
    })
    .state('categories', {
      url: '/categories',
      templateUrl: 'templates/categories-list.template.html',
      controller: 'CategoriesListController as categoriesCtrl',
      resolve: {
        categories : ['MenuDataService', function(MenuDataService) {
            return MenuDataService.getAllCategories();
        }]
      }
    })
    .state('categories.items', {
      url: '/items/{category}',
      templateUrl: 'templates/items-list.template.html',
      controller: 'ItemsListController as itemsCtrl',
      resolve: {
        category: ['$stateParams', function($stateParams) {
          return $stateParams.category;
        }],
        items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
          return MenuDataService.getItemsForCategory($stateParams.category);
        }]
      }
    });
  }
})();
