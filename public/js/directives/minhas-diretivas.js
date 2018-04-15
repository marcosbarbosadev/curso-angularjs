angular
    .module('minhasDiretivas', [])
    .directive('meuPainel', function() {
        return {
            restrict: 'AE',
            templateUrl: 'js/directives/meu-painel.html',
            transclude: true,
            scope: {
                titulo: '@'
            }
        };
    });