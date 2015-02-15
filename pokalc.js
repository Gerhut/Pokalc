"use strict"

angular
  .module('pokalc', [ 'oc.lazyLoad', 'ionic', 'firebase' ])
  .config(function (modules, $stateProvider) {
    angular.forEach(modules, function (module, id) {
      var upperId = angular.uppercase(id[0]) + angular.lowercase(id.slice(1))
      var lowerId = angular.lowercase(id)
      this.state(lowerId, {
        url: '/' + lowerId,
        controller: upperId + 'Controller as ' + lowerId,
        templateUrl: id + '/index.html',
        resolve: {
          lazyLoad: function ($ocLazyLoad) {
            var files = []
            angular.forEach(module.files, function (file) {
              files.push(id + '/' + file)
            })
            return $ocLazyLoad.load({
              name: 'pokalc.' + lowerId,
              files: files
            });
          }
        }
      })
    }, $stateProvider)
  })
  .config(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('home')
  })
  .controller('ModulesController', function (modules) {
    var self = this
    angular.forEach(modules, function (module, id) {
      self[angular.lowercase(id)] = module
    })
  })