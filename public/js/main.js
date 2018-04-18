angular.module('alurapic', ['minhasDiretivas', 'ngAnimate', 'ngRoute'])
.config(function($routeProvider, $locationProvider) {
    
    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/fotos', {
            templateUrl: 'partials/principal.html',
            controller: 'FotosController'
        })
        .when('/foto/new', {
            templateUrl: 'partials/foto.html',
            controller: 'FotosController'
        })
        .when('/fotos/edit/:fotoId', {
            templateUrl: 'partials/foto.html',
            controller: 'FotosController'
        })
        .otherwise({redirectTo: '/fotos'});

});