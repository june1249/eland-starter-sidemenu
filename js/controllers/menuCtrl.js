controllerModule.controller('MenuCtrl', function($scope, $window, $ionicModal, $ionicSideMenuDelegate, MenuService) {

  $scope.menus = [];
  $scope.data = MenuService.all();
  $scope.userInfo = $scope.data[0].data.accountInfo;
  $scope.menus = $scope.data[0].data.sections;

  $scope.showSettings = function() {
      $scope.settings();
      $ionicSideMenuDelegate.toggleLeft();
  }

  $ionicModal.fromTemplateUrl('templates/settings.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the settings modal to close it
  $scope.closeSettings = function() {
    $scope.modal.hide();
  };

  // Open the settings modal
  $scope.settings = function() {
    $scope.modal.show();
  };

});