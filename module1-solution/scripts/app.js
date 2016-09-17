(function() {
	'use strict';
	angular.module('LunchCheck', [])

		.controller('LunchCheckController', function($scope){
			$scope.lunchItems = "Enter a comma separated list of lunch items";
			var lItems = $scope.lunchItems;

			var btnLbl = "Check If Too Much";
			$scope.buttonLabel = btnLbl;

			$scope.checkIfTooMuch = function(){
				if (validateInput())
				{
					$scope.response = checkItems($scope.lunchItems);
					console.log($scope.response);
				}
				else
				{
					$scope.response = 
				}
			};

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
		});
})();
