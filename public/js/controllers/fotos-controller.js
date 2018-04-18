angular
    .module('alurapic')
    .controller('FotosController', function($scope, $http, $routeParams) {

        $scope.fotos = [];
        $scope.filtro = '';

        $http.get('v1/fotos')
            .success(function(fotos) {
                $scope.fotos = fotos;
            })
            .error(function(erro) {
                console.log(erro);
            });


        if($routeParams.fotoId) {

            var fotoId = $routeParams.fotoId;

            $http.get('/v1/fotos/' + fotoId)
                .success(function(foto) {
                    $scope.foto = foto
                })
                .error(function(erro) {
                    console.log(erro);
                });
    
            ;
        }


        $scope.flashMsg = {};

        $scope.submeter = function() {
  
            if($scope.formulario.$valid) {

                if($routeParams.fotoId) {
                    $scope.editar($scope.foto._id, $scope.foto);
                } else {
                    $http.post('/v1/fotos', $scope.foto)
                        .success(function() {
                            $scope.flashMsg.sucesso = 'Foto cadastrada com sucesso.';
                            $scope.foto = {};
                            $scope.formulario.$setPristine();
                        })
                        .error(function(erro) {
                            $scope.flashMsg.erro = 'Não foi possível cadastrar a foto.'
                        });
                }

            }
            
        }

        $scope.editar = function(id, foto) {
            $http.put('/v1/fotos/' + id, foto)
                .success(function() {
                    $scope.flashMsg.sucesso = 'Foto alterada com sucesso.';
                    
                })
                .error(function(erro) {
                    $scope.flashMsg.sucesso = 'Não foi possível alterar foto.';
                });
        }

        $scope.remover = function(foto) {
            
            $http.delete('/v1/fotos/' + foto._id)
                .success(function() {
                    var fotoIndex = $scope.fotos.indexOf(foto);
                    $scope.fotos.splice(fotoIndex, 1);
                    $scope.flashMsg.sucesso = 'Foto ' + foto.titulo + ' foi removida com sucesso.';
                })
                .error(function(erro) {
                    $scope.flashMsg.sucesso = 'Não foi possível remover foto.';
                });

            return false;
        }

    });