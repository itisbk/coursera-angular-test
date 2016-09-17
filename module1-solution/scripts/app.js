(function() {
	'use strict';
	angular.module('LunchCheck', [])

		.controller('LunchCheckController', LunchCheckController);

		LunchCheckController.$inject = ['$scope'];

		function LunchCheckController($scope) {
			$scope.lunchItems = "Enter a comma separated list of lunch items";
			var lItems = $scope.lunchItems;

			var btnLbl = "Check If Too Much";
			$scope.buttonLabel = btnLbl;

			$scope.checkIfTooMuch = function(){
				console.log($scope.lunchItems);
				if (validateInput($scope.lunchItems))
				{
					$scope.response = checkItems($scope.lunchItems);
					console.log($scope.response);
				}
				else
				{
					$scope.response = "Please enter data first";
				}
			};

			function validateInput(items) {
				if (items!="")
				{
					return true;
				}
			}

			function checkItems(items) {
				console.log(">>>"+items);
				var itemsArr = items.split(",");
				//for (i=0; i<itemsArr.length; i++)
				//{
				//	console.log(itemsArr[i]);
				//}
				if (itemsArr.length > 3)
				{
					return "Too much!";
				} else {
					return "Enjoy";
				}
			}
		};
})();
