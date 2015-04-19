var app = angular.module("pelangi", ['ngAnimate', 'toaster', 'flow',
    "ui.router", "LocalStorageModule", "ui.bootstrap", "angular.filter", "fcsa-number"]);

app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            // abstract: true,
            templateUrl: 'templates/home.html',
            controller: 'authController'
        })

        .state('profile', {
            url: '/profile',
            templateUrl: 'templates/profile.html'
        })

        .state('about', {
            url: '/about',
            templateUrl: 'templates/about.html'
        })        

        .state('contact', {
            url: '/contact',
            templateUrl: 'templates/contact.html'
        })

        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html'
        })

        .state('register', {
            url: '/register',
            templateUrl: 'templates/register.html'
        })

        .state('activation', {
            url: '/activation',
            templateUrl: 'templates/activation.html'
        });

    $urlRouterProvider.otherwise('/');

    $httpProvider.interceptors.push(function($q, $location, localStorageService) {
        return {
            'request': function(config) {
                config.headers = config.headers || {};
                var user = localStorageService.get('user');
                var token = user === null ? null : user.token;
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return config;
            },
            'responseError': function(response) {
                if (response.status === 401 || response.status === 403) {
                    // $location.path('/categorymag');
                    console.log('forbidden: login please')
                    $location.path('/');
                }
                return $q.reject(response);
            }
        };
    });

});