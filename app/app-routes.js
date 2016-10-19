/**
 * Router config
 */
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "pages/docs.html"
        })
        .when("/new", {
            templateUrl: "pages/new.html",
            controller: "newController"
        })
        .when("/edit/:docId", {
            templateUrl: "pages/edit.html",
            controller: "editController"
        })
        .otherwise({
            redirectTo: 'pages/err/404.html'
        });

    $locationProvider.html5Mode(true);
})