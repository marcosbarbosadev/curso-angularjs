angular
    .module('alurapic')
    .controller('FotosController', function($scope, $routeParams, recursoFoto) {

        $scope.fotos = [];
        $scope.filtro = '';


        recursoFoto.query(function(fotos) {
            $scope.fotos = fotos;
        }, function(erro) {
            console.log(erro);
        });


        if($routeParams.fotoId) {

            var fotoId = $routeParams.fotoId;

            recursoFoto.get({fotoId: fotoId}, function(foto) {
                $scope.foto = foto
            }, function(erro) {
                $scope.flashMsg.erro = 'Não foi possível carregar a foto.'
            });

        }

        $scope.flashMsg = {};

        $scope.submeter = function() {
  
            if($scope.formulario.$valid) {

                if($routeParams.fotoId) {
                    $scope.editar($scope.foto);
                } else {
                    recursoFoto.save($scope.foto, function() {
                        $scope.flashMsg.sucesso = 'Foto cadastrada com sucesso.';
                        $scope.foto = {};
                        $scope.formulario.$setPristine();
                    }, function(erro) {
                        $scope.flashMsg.erro = 'Não foi possível cadastrar a foto.'
                    });
                }

            }
            
        }

        $scope.editar = function(foto) {

            recursoFoto.update({fotoId: foto._id}, foto, function() {
                $scope.flashMsg.sucesso = 'Foto alterada com sucesso.';
            }, function(erro) {
                $scope.flashMsg.sucesso = 'Não foi possível alterar foto.';
            });

        }

        $scope.remover = function(foto) {
            
            recursoFoto.delete({fotoId: foto._id}, function() {
                var fotoIndex = $scope.fotos.indexOf(foto);
                $scope.fotos.splice(fotoIndex, 1);
                $scope.flashMsg.sucesso = 'Foto ' + foto.titulo + ' foi removida com sucesso.';
            }, function(erro) {
                $scope.flashMsg.sucesso = 'Não foi possível remover foto.';
            });

            return false;
        }

    });