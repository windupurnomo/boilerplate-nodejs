app.controller('authController', function($scope, $rootScope, $location, $window, $filter,
        localStorageService, Main, GeneralSvc, toaster) {
    $scope.user = GeneralSvc.getUser;
    $scope.token = $scope.user == null ? null : $scope.user.token;
    $scope.date = new Date();
    $scope.shared = {};


    $scope.logout = function() {
        Main.logout(function() {
        }, function() {
            alert("Failed to logout!");
        });
    };

    function saveUser(val) {
        localStorageService.set('user', val);
        $scope.user = val;
    }

    function getUser() {
        return localStorageService.get('user');
    }

}); 