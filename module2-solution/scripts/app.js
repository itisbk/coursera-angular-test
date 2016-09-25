(function() {
	'use strict';
	angular.module('ShoppingListCheckOff', [])
		.controller('ToBuyShoppingController', ToBuyShoppingController)
		.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
		.provider('ShoppingListCheckOffService', ShoppingListCheckOffServiceProvider)
		.config(Config);

//		.service('ShoppingListCheckOffService', ShoppingListCheckOffService);
		Config.$inject = ['ShoppingListCheckOffServiceProvider'];
		function Config(ShoppingListCheckOffServiceProvider) {
		  // Save Yaakov from himself
		  ShoppingListCheckOffServiceProvider.defaults.initialItems = [
			  {name: 'Apples', quantity: 4, bought:false},
			  {name: 'Oranges', quantity: 5, bought:false},
			  {name: 'Bananas', quantity: 12, bought:false},
			  {name: 'Strawberries', quantity: 25, bought:false},
			  {name: 'Mangoes', quantity: 2, bought:false},
		  ];
		}

		function ShoppingListCheckOffServiceProvider() {
		  var provider = this;

		  provider.defaults = {
			initialItems: []
		  };

		  provider.$get = function () {
			var shoppingList = new ShoppingListCheckOffService(provider.defaults.initialItems);

			return shoppingList;
		  };
		}

		ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
		function ToBuyShoppingController(ShoppingListCheckOffService) {
			var shoppingList = this;

			shoppingList.items = ShoppingListCheckOffService.shoppingItems();

			shoppingList.isAllBought = false;

			shoppingList.buyItem = function(itemIndex) {
				//console.log("itemIndex ", itemIndex);
				var bItem = ShoppingListCheckOffService.buyItem(itemIndex);
				
				shoppingList.isAllBought = ShoppingListCheckOffService.isAllBought();
			};
			//console.log(shoppingList.items);
		};

		AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
		function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
			var boughtList = this;

			boughtList.items = ShoppingListCheckOffService.shoppingItems();

			boughtList.isAnyBought = ShoppingListCheckOffService.isAnyBought;

		};

		function ShoppingListCheckOffService(initialItems) {
			var service = this;

			var items = initialItems;

			service.shoppingItems = function() {
				return items;
			};

			var boughtCount = 5;

			service.buyItem = function(itemIndex) {
				//console.log("Item # bought is ", itemIndex);
				boughtCount--;
				items[itemIndex].bought=true;
				//console.log("count ", boughtCount);
				//service.isAnyBought();
			};

			service.isAllBought = function() {
				//console.log("remaining ", boughtCount);
				return boughtCount === 0 ? true:false;
			}

			service.isAnyBought = function() {
				console.log("bought Count ", boughtCount);
				return boughtCount === 5 ? true:false;
			}
		};
})();
