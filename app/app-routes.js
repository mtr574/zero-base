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
        .when("/edit/:docId*", {
            templateUrl: "pages/edit.html",
            controller: "editController"
        })
        .when("/view/:docId*", {
            templateUrl: "pages/view.html",
            controller: "viewController"
        })
        .when("/bookmark", {
            templateUrl: "pages/bookmark.html",
            controller: "bookmarkController"
        })
        .when("/tags", {
            templateUrl: "pages/tags.html",
            controller: "tagsController"
        })
        .when("/login", {
            templateUrl: "pages/admin/login.html",
            controller: "adminLoginController"
        })
        .otherwise({
            redirectTo: 'pages/err/404.html'
        });

    $locationProvider.html5Mode(true);
})
