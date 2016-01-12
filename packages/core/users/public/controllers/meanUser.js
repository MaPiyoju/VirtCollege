'use strict';

angular.module('mean.users')
  .controller('AuthCtrl', ['$scope', '$rootScope', '$http', '$state', 'Global',
    function($scope, $rootScope, $http, $state, Global) {
      // This object will contain list of available social buttons to authorize
      $scope.socialButtonsCounter = 0;
      $scope.global = Global;
      $scope.$state = $state;

      $http.get('/api/get-config')
        .success(function(config) {
          if(config.hasOwnProperty('local')) delete config.local; // Only non-local passport strategies
          $scope.socialButtons = config;
          $scope.socialButtonsCounter = Object.keys(config).length;
        });
    }
  ])
  .controller('LoginCtrl', ['$rootScope', 'MeanUser',
    function($rootScope, MeanUser) {
      var vm = this;

      // This object will be filled by the form
      vm.user = {};
      
      vm.input = {
        type: 'password',
        placeholder: 'Contraseña',
        confirmPlaceholder: 'Repite la contraseña',
        iconClass: '',
        tooltipText: 'Mostrar contraseña'
      };

      vm.togglePasswordVisible = function() {
        vm.input.type = vm.input.type === 'text' ? 'password' : 'text';
        vm.input.placeholder = vm.input.placeholder === 'Contraseña' ? 'Contraseña visible' : 'Contraseña';
        vm.input.iconClass = vm.input.iconClass === 'icon_hide_password' ? '' : 'icon_hide_password';
        vm.input.tooltipText = vm.input.tooltipText === 'Mostrar contraseña' ? 'Ocultar contraseña' : 'Mostrar contraseña';
      };

      $rootScope.$on('loginfailed', function(){
        vm.loginError = MeanUser.loginError;
      });

      // Register the login() function
      vm.login = function() {
        MeanUser.login(this.user);
      };
    }
  ])
  .controller('RegisterCtrl', ['$rootScope', 'MeanUser',
    function($rootScope, MeanUser) {
      var vm = this;

      vm.user = {};
      
      vm.registerForm = MeanUser.registerForm = true;

      vm.input = {
        type: 'password',
        placeholder: 'Contraseña',
        placeholderConfirmPass: 'Repite la contraseña',
        iconClassConfirmPass: '',
        tooltipText: 'Mostrar contraseña',
        tooltipTextConfirmPass: 'Mostrar contraseña'
      };

      vm.togglePasswordVisible = function() {
        vm.input.type = vm.input.type === 'text' ? 'password' : 'text';
        vm.input.placeholder = vm.input.placeholder === 'Contraseña' ? 'Contraseña visible' : 'Contraseña';
        vm.input.iconClass = vm.input.iconClass === 'icon_hide_password' ? '' : 'icon_hide_password';
        vm.input.tooltipText = vm.input.tooltipText === 'Mostrar contraseña' ? 'Ocultar contraseña' : 'Mostrar contraseña';
      };
      vm.togglePasswordConfirmVisible = function() {
        vm.input.type = vm.input.type === 'text' ? 'password' : 'text';
        vm.input.placeholderConfirmPass = vm.input.placeholderConfirmPass === 'Repite la contraseña' ? 'Contraseña visible' : 'Repite la contraseña';
        vm.input.iconClassConfirmPass = vm.input.iconClassConfirmPass === 'icon_hide_password' ? '' : 'icon_hide_password';
        vm.input.tooltipTextConfirmPass = vm.input.tooltipTextConfirmPass === 'Mostrar contraseña' ? 'Ocultar contraseña' : 'Mostrar contraseña';
      };

      // Register the register() function
      vm.register = function() {
        MeanUser.register(this.user);
      };

      $rootScope.$on('registerfailed', function(){
        vm.registerError = MeanUser.registerError;
      });
    }
  ])
  .controller('ForgotPasswordCtrl', ['MeanUser', '$rootScope',
    function(MeanUser, $rootScope) {
      var vm = this;
      vm.user = {};      
      vm.registerForm = MeanUser.registerForm = false;
      vm.forgotpassword = function() {
        MeanUser.forgotpassword(this.user);
      };
      $rootScope.$on('forgotmailsent', function(event, args){
        vm.response = args;
      });
    }
  ])
  .controller('ResetPasswordCtrl', ['MeanUser',
    function(MeanUser) {
      var vm = this;
      vm.user = {};      
      vm.registerForm = MeanUser.registerForm = false;
      vm.resetpassword = function() {
        MeanUser.resetpassword(this.user);
      };
    }
  ]);