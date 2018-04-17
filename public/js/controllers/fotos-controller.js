angular
    .module('alurapic')
    .controller('FotosController', function($scope, $http) {

        $scope.fotos = [];
        $scope.filtro = '';

        $http.get('v1/fotos')
            .success(function(fotos) {
                $scope.fotos = fotos;
            })
            .error(function(erro) {
                console.log(erro);
            });


        $scope.flashMsg = {};

        $scope.submeter = function() {
  
            if($scope.formulario.$valid) {
                $http.post('/v1/fotos', $scope.foto)
                    .success(function() {
                        $scope.flashMsg.sucesso = 'Foto cadastrada com sucesso.';
                        $scope.foto = {};
                        $scope.formulario.$submitted = false;
                    })
                    .error(function(erro) {
                        $scope.flashMsg.erro = 'Não foi possível cadastrar a foto.'
                    });
            }

            
            
        }

    });