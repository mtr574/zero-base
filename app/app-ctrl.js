/**
 * Retrieve docs
 */
app.controller("mainController", function($scope, $location, $firebaseArray, config, routerService) {

    // Router goto helper
    $scope.goto = function(path) {
        routerService.goto(path)
    }

    // Doc widget menu
    $scope.toggleMenu = function(a) {
        $('ul.doc-menu.' + a.doc.$id).toggleClass('poped');
    }

    // Object
    var ref = new Firebase(config.fbaseURL);

    // Loader
    ref.on("value", function(status) {
        if (status.val() === true) {
            $(".loader").fadeIn();
        } else {
            $(".loader").fadeOut();
            $("#docs").fadeIn();
        }
    });

    // Data as an array
    var docsArray = $firebaseArray(ref)
    $scope.docs = docsArray;
    console.log(docsArray);

    // Delete an node from array
    $scope.deleteDoc = function(key, creator) {
        console.log(key);
        console.log(creator);
        // Show delete dialog
        var docCreator = prompt("If you so sure, enter doc creator: ");
        if (docCreator == creator) {
            ref.child(key).remove();
        }
    }
});


/**
 * Add new doc
 */
app.controller("newController", function($scope, $firebaseArray, config, routerService) {

    // Router goto helper
    $scope.goto = function(path, id) {
        routerService.goto(path, id)
    }
    // END

    // Settings
    var ref = new Firebase(config.fbaseURL);
    $scope.messages = $firebaseArray(ref);

    // Add new doc
    $scope.postNewDoc = function() {
        var timestamp = new Date().getTime(),
            doc_title = $scope.docTitle || "n/a",
            doc_creator = "Nate Ben",
            doc_code = $scope.docCode || "n/a",
            doc_content = $scope.docContent || "n/a";

        // Post new doc
        $scope.messages.$add({
            time: timestamp,
            title: doc_title,
            creator: doc_creator,
            code: doc_code,
            content: doc_content
        }).then(function() {
            // done
            routerService.goto('/');
        });

    };

});

/**
 * Edit controller
 */
app.controller('editController', function($scope, $routeParams) {

    $scope.docId = $routeParams.docId;

});
