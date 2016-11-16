serviceModule.factory('PopupService', ['$ionicPopup', 'ngDialog', '$ionicModal', function ($ionicPopup, ngDialog, $ionicModal) {

    function pop (url, title, scope) {

        $ionicPopup.show({
            templateUrl: url,
            title: title,
            cssClass: 'storePopup',
            scope: scope,
            buttons: [{
                text: 'Cancel',
            }, {
                text: 'OK',
                type: 'button-positive',
                onTap: function (e) {
                    console.log('OK');
                    return;
                }
            }]
        });
    }

    return {

        OpenPopupAlert: function (title, template, callback) {

            var alert = $ionicPopup.alert({
                title: title,
                template: template
            });

            alert.then(function (result) {
                if (angular.isFunction(callback) == true)
                    callback();
            });
        },

        OpenPopupConfirm: function (title, template, callbackConfirm, callbackCancel) {
            var confirm = $ionicPopup.confirm({
                title: title,
                template: template
            });

            confirm.then(function (result) {
                if (result) { // OK
                    if (angular.isFunction(callbackConfirm) == true) {
                        callbackConfirm();
                    }
                }
                else {
                    if (angular.isFunction(callbackCancel) == true) {
                        callbackCancel();
                    }
                }
            });
        },

        InitPopup: function (templateUrl, $scope, callbackClose, callbackCancel) {
            //ngDialog.open({ template: templateUrl, scope: scope });
            var promise;
            $scope = $scope || $rootScope.$new();

            promise = $ionicModal.fromTemplateUrl(templateUrl, {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                return modal;
            });

            $scope.openModal = function () {
                $scope.modal.show();
            };

            $scope.closeModal = function (type) {
                $scope.modal.hide();
                if (type == 'cancel') {
                    if (angular.isFunction(callbackCancel) == true) {
                        callbackCancel();
                    }
                }
                if (type == 'close') {
                    if (angular.isFunction(callbackClose) == true) {
                        callbackClose();
                    }
                }
            };

            $scope.$on('$destroy', function () {
                $scope.modal.remove();
            });

            return promise;
        }
    }
}])