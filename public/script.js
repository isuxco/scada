( function (){

	//alert("Doc enlazado");
	//Script donde se encuentran los controladores del FrontEnd, la funcion es autoejecutable

	var app = angular.module('scada', []);

	app.controller('mainController',function ($scope, $http){
		
		$scope.showUsers = function () {
			$http.get('/api/users')
			.success(function(data){
				$scope.users = data
				console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data );
			});
		}

		$scope.addUser = function () {
			$http.post('/api/users',$scope.formData)
			.success(function(data){
				$scope.formData = {};
				alert("Usuario Agregado");
			})
			.error(function(data){
				console.log('Error: ' + data );
			});
		}

		$scope.showMeasures = function () {
			$http.get('/api/measures')
			.success(function(data){
				$scope.measures = data
				console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data );
			});
		}
	});
	

})();