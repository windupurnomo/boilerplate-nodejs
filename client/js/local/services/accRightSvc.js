app.factory('AccRightSvc', function ($http, GeneralSvc) {
    var baseUrl = GeneralSvc.baseUrl;  
    return {
        get: function (success, error){
            $http.post(baseUrl + '/accrights').success(success).error(error)
        },
        save: function (data, success, error){
            $http.post(baseUrl + '/accright/save', data).success(success).error(error)
        },
        delete: function (data, success, error){
            $http.post(baseUrl + '/accright/delete', data).success(success).error(error)
        },
        menus: function (success, error){
            $http.get(baseUrl + '/accright/menus').success(success).error(error);
        }
    };
    
});