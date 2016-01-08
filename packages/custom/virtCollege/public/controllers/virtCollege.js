'use strict';

/* jshint -W098 */
angular.module('mean.virtCollege').controller('VirtCollegeController', ['$scope', 'Global', 'VirtCollege',
  function($scope, Global, VirtCollege) {
    $scope.global = Global;
    $scope.package = {
      name: 'virtCollege'
    };
  }
]);
