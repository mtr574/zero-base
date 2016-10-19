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

    $scope.doc_tags = []

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
            tags: $scope.doc_tags,
            creator: doc_creator,
            code: doc_code,
            content: doc_content
        }).then(function() {
            // done
            routerService.goto('/');
        });
    };

    // Add tag function
    $scope.addTag = function() {
        if ($scope.tagText.length != 0) {
            $scope.doc_tags.push({
                name: $scope.tagText
            });
            $scope.tagText = '';
        }
    };

    // Remove tag function
    $scope.removeTag = function(tagId) {
        if ($scope.doc_tags.length != 0) {
            $scope.doc_tags.splice(tagId, 1);
        }
    };
});

/**
 * New docuemnt tags input
 */
app.directive("tagInput", function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            scope.inputWidth = 300;
            // Watch width changes
            scope.$watch(attrs.ngModel, function(value) {
                if (value != undefined) {

                }
            });
            // Key press function
            element.bind('keydown', function(event) {
                if (event.which == 9)
                    event.preventDefault();
            })
            element.bind('keyup', function(event) {
                var key = event.which;
                if (key == 9 || key == 13) {
                    event.preventDefault();
                    scope.$apply(attrs.newTag);
                }
            })
        }
    }
});

/**
 * Edit controller
 */
app.controller('editController', function($scope, $routeParams, $firebaseObject, config) {

    var docId = $routeParams.docId;
    $scope.docId = docId;

    var ref = new Firebase(config.fbaseURL + '/' + docId);
    var specific_doc = $firebaseObject(ref);
    $scope.doc = specific_doc;
    specific_doc.$bindTo($scope, "docData");
});

/**
 * Edit controller
 */
app.controller('viewController', function($scope, $routeParams, $firebaseObject, config) {

    var docId = $routeParams.docId;
    $scope.docId = docId;

    var ref = new Firebase(config.fbaseURL + '/' + docId);
    var specific_doc = $firebaseObject(ref);
    $scope.doc = specific_doc;
    specific_doc.$bindTo($scope, "docData");

});
