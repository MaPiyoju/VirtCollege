'use strict';

angular.module('mean.virtCollege').config(['$viewPathProvider','$stateProvider',
  function($viewPathProvider, $stateProvider) {
    $viewPathProvider.override('system/views/index.html', 'virtCollege/views/index.html');
  }
]);
