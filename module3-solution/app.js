(function() {
	'use strict';
	angular.module('NarrowItDownApp', [])
		.controller('NarrowItDownController', NarrowItDownController)
		.service('MenuSearchService', MenuSearchService)
		.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

		MenuSearchService.$inject = ['$http', 'ApiBasePath']
		function MenuSearchService($http, ApiBasePath) {
			var service = this;
			service.foundItems = [];

			service.getMatchedMenuItems = function(searchTerm) {
				console.log("calling service...");
				$http({
					method: "GET",
						url: (ApiBasePath + "/menu_items.json")
				}).then(function (response) {
						var menuItems = response.data;
						console.log(menuItems.menu_items.length);

						for (var i = 0; i < menuItems.menu_items.length; i++) {
							//console.log("menuItems.menu_items[i].description ", menuItems.menu_items[i].description);
							if (menuItems.menu_items[i].description.includes(searchTerm))
							{
								service.foundItems.push(menuItems.menu_items[i]);
							}
						}
						//console.log("Found items: ", service.foundItems.length);
				})
				.catch(function (error) {
					console.log("Something went terribly wrong.");
				});

				return service.foundItems;
			};
		};

		NarrowItDownController.$inject = ['MenuSearchService'];
		function NarrowItDownController(MenuSearchService) {
			var menu = this;
			menu.found = [];
			menu.search = "";
			menu.error = false;

			menu.narrowDown = function() {
				console.log("menu.search", menu.search);
				if (menu.search === "")
				{
					menu.error = true;
					return;
				}
				menu.found = MenuSearchService.getMatchedMenuItems(menu.search);
				console.log("Found ", menu.found.length);
				if (menu.found.length >= 1)
				{
					menu.error = false;
				}
				//console.log("Found items: ", menu.found);
			};

		}
		
		
		
		


})();
