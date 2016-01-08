'use strict';

angular.module('mean.virtCollege').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('virtCollege example page', {
      url: '/virtCollege/example',
      templateUrl: 'virtCollege/views/index.html'
    });
  }
]);
