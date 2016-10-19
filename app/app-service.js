// Router's goto service
app.factory('routerService', function($location) {
    return {
        goto: function(routePath, id) {
            $location.path(routePath + id);
        }
    };
});
