angular.module('alurapic', ['minhasDiretivas', 'ngAnimate', 'ngRoute'])
.config(function($routeProvider, $locationProvider) {
    
    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/fotos', {
            templateUrl: 'partials/principal.html',
            controller: 'FotoController'
        })
        .when('/fotos/new', {
            templateUrl: 'partials/foto.html'
        });

});