(function(){
	'use strict';
	angular
		.module('winecellar')
		.directive('winecellarDirective', function(){
			return{
				scope: true,
				restrict: 'E',
				templateUrl: '/components/mentorprogram/templates/index.html'
			};
		})
		.directive('inventoryDirective', function(){
			return{
				scope: true,
				restrict: 'E',
				templateUrl: '/components/mentorprogram/templates/inventory.html',
				controller: ['$rootScope', 'LocalStorageService', function($rootScope, LocalStorageService){
					var _this = this;
					LocalStorageService.getData('data/items.json')
					.then(function(data){
						_this.items = data;
					});
					this.updateWine = function(dataItem){
						LocalStorageService.updateData(dataItem);
					}
				}],
				controllerAs: 'inventory'
			};
		})
		.directive('searchDirective', ['ApiService', function(){
			return{
				scope: true,
				restrict: 'E',
				templateUrl: '/components/mentorprogram/templates/search.html',
				controller: ['$scope', 'ApiService', function($scope, ApiService){					
					/*
						Object sendes nu som parameter til view´et istedet for gennem
					this.addWine = function($event){
						const wineData = $event.currentTarget.dataset;
						const wineInfo = document.querySelectorAll('add-directive .form-control');
						wineInfo[0].value = wineData.name;
						wineInfo[1].value = wineData.vineyard;
						wineInfo[2].value = wineData.percentage;
					};
					*/
					this.searchWine = function(){
						ApiService.search($scope.searchQuery)
						.then(function(data){
							$scope.result = data;
						});
					};
				}],
				controllerAs: 'search'
			};
		}])
		.directive('addDirective', function(){
			return{
				scope: true,
				restrict: 'E',
				templateUrl: '/components/mentorprogram/templates/add.html',
				controller: ['$scope', function(){

				}],
				controllerAs: 'add'
			};
		});
})();
