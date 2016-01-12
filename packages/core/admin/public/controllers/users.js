'use strict';

angular.module('mean.admin').controller('UsersController', ['$scope', 'Global', 'Menus', '$rootScope', '$http', 'Users', 'Circles',
    function($scope, Global, Menus, $rootScope, $http, Users, Circles) {

        $scope.global = Global;
        $scope.user = {};

        Circles.mine(function(acl) {

            var circles = acl.allowed;
            var tipoDoc = ['Tarjeta de identidad','Cedula de ciudadania','Cedula de extranjería'];

            $scope.userSchema = [{
                title: 'Nombres',
                schemaKey: 'nombres',
                type: 'text',
                inTable: true
            }, {
                title: 'Apellidos',
                schemaKey: 'apellidos',
                type: 'text',
                inTable: true
            }, {
                title: 'Fecha de nacimiento',
                schemaKey: 'fecha_nacimiento',
                type: 'text',
                inTable: false
            }, {
                title: 'Tipo de documento',
                schemaKey: 'tipo_documento',
                type: 'select',
                options: tipoDoc,
                inTable: true
            }, {
                title: 'N. de documento',
                schemaKey: 'numero_documento',
                type: 'text',
                inTable: true
            }, {
                title: 'Roles',
                schemaKey: 'roles',
                type: 'select',
                options: circles,
                inTable: true
            }, {
                title: 'EPS',
                schemaKey: 'eps',
                type: 'text',
                inTable: false
            }, {
                title: 'Tipo de sangre',
                schemaKey: 'tipo_sangre',
                type: 'text',
                inTable: false
            }, {
                title: 'Email',
                schemaKey: 'email',
                type: 'email',
                inTable: true
            }, {
                title: 'Dirección',
                schemaKey: 'direccion',
                type: 'text',
                inTable: false
            }, {
                title: 'Contraseña',
                schemaKey: 'password',
                type: 'password',
                inTable: false
            }, {
                title: 'Repetir contraseña',
                schemaKey: 'confirmPassword',
                type: 'password',
                inTable: false
            }];
            
        });



        $scope.init = function() {
            Users.query({}, function(users) {
                $scope.users = users;
            });
        };

        $scope.add = function(valid) {
            if (!valid) return;
            if (!$scope.users) $scope.users = [];

            var user = new Users({                
                nombres: $scope.user.nombres,
                apellidos: $scope.user.apellidos,
                fecha_nacimiento: $scope.user.fecha_nacimiento, 
                tipo_documento: $scope.user.tipo_documento,
                numero_documento: $scope.user.numero_documento,
                roles: $scope.user.roles,
                eps: $scope.user.eps,
                tipo_sangre: $scope.user.tipo_sangre,
                email: $scope.user.email,
                direccion: $scope.user.direccion,
                telefono: $scope.user.telefono,
                password: $scope.user.password,
                confirmPassword: $scope.user.confirmPassword                
            });

            user.$save(function(data, headers) {
                $scope.user = {};
                $scope.users.push(user);
                $scope.userError = null;
            }, function(data, headers) {
                $scope.userError = data.data;
            });
        };

        $scope.remove = function(user) {
            for (var i in $scope.users) {
                if ($scope.users[i] === user) {
                    $scope.users.splice(i, 1);
                }
            }

            user.$remove();
        };

        $scope.update = function(user, userField) {
            if (userField && userField === 'roles' && user.tmpRoles.indexOf('admin') !== -1 && user.roles.indexOf('admin') === -1) {
                if (confirm('Are you sure you want to remove "admin" role?')) {
                    user.$update();
                } else {
                    user.roles = user.tmpRoles;
                }
            } else
                user.$update();
        };

        $scope.beforeSelect = function(userField, user) {
            if (userField === 'roles') {
                user.tmpRoles = user.roles;
            }
        };
    }
]);
