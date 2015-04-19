app.factory('GeneralSvc', function ($http, localStorageService){
	var baseUrl = "http://localhost:3003/api";
	return {
		baseUrl: baseUrl,
		getUser: localStorageService.get('user'),
		setUser: function (u){
			localStorageService.set('user', u);
		},
		validateAccessPage: function (success, error){
			$http.get(baseUrl + '/validateAccessPage').success(success).error(error);
		}
	}
});