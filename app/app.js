angular.module('app', ['ngRoute', 'firebase'])
    .controller('Ctrl', MainController)
    .config(AppConfig);

function AppConfig($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '',
        controller: 'MainController'
    })
}

function MainController() {

}
