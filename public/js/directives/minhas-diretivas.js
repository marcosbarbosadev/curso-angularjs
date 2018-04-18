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
    })
    .directive('minhaFoto', function() {
        return {
            restrict: 'AE',
            replace: true,
            template: '<img class="img-responsive center-block" ng-src="{{ url }}" alt="{{ titulo }}">',
            scope: {
                url: '@',
                titulo: '@'
            }
        }
    })
    .directive('btnRemover', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                nome: '@',
                acao: '&'
            },
            template: '<button class="btn btn-danger btn-block" ng-click="acao(foto)">{{nome}}</button>'
        }
    });