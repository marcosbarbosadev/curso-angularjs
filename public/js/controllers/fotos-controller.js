angular
    .module('alurapic')
    .controller('FotosController', function($scope, $routeParams, recursoFoto, cadastroDeFotos) {

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

                cadastroDeFotos.cadastrar($scope.foto).then(function(retorno) {
                    $scope.flashMsg.sucesso = retorno.mensagem;
                    if(retorno.cadastrar) {
                        $scope.foto = {};
                        $scope.formulario.$setPristine();
                    }
                })
                .catch(function(retorno) {
                    console.log(retorno.mensagem);
                    $scope.flashMsg.erro = retorno.mensagem
                });

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