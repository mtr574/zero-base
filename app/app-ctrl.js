/**
 * Retrieve docs
 */
app.controller("mainController", function($scope, config, $location, $firebaseObject, $firebaseArray, $firebaseUtils, routerService) {

    // Router goto helper
    $scope.goto = function(path) {
        routerService.goto(path)
    }

    // Toggle grid view
    $scope.toggleGridView = function() {
      $("#docs > article").toggleClass("col-sm-12").toggleClass("col-sm-6");
    }

    // Doc widget menu
    $scope.toggleMenu = function(a) {
        $('ul.doc-menu.' + a.doc.$id).toggleClass('poped');
    }

    var ref = new Firebase(config.fbaseDocRef);

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
        // Show delete dialog
        var docCreator = prompt("If you so sure, enter doc creator: ");
        if (docCreator == creator) {
            // don't delete but unshow!
            // ref.child(key).remove();
        }
    }

    /**
     * Add exist document to bookmark array
     */
    $scope.bookmarkAdd = function(docId) {
        // Bookmarks object
        var ref = new Firebase(config.fbaseBookmarkedRef);
        var bookmarkList = $firebaseObject(ref);
        isBookmarked = true;
        // After load test for exist record
        bookmarkList.$loaded().then(function() {
            angular.forEach(bookmarkList, function(value, key) {
                if (value.doc_id == docId) {
                    // Found doc, don't add
                    alert('already in bookmarks');
                } else {
                    addBookmark();
                }
            });
        });

        function addBookmark() {
            var bookmarkList = $firebaseArray(ref);
            bookmarkList.$add({
                doc_id: docId
            }).then(function(ref) {
                alert('added to bookmarks, ref: ' + ref);
            });
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
    var ref = new Firebase(config.fbaseDocRef);
    $scope.messages = $firebaseArray(ref);

    var refTags = new Firebase(config.fbaseTagsRef);
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
            content: doc_content,
            cheers: 0
        }).then(function(ref) {
            // done
            $scope.addToTagList(ref.path.u[1]);
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

    // Save doc in tag array
    $scope.addToTagList = function(docId) {
        var ref = new Firebase(config.fbaseTagsRef);
        var tagDocList = $firebaseArray(ref);
        tagDocList.$add({
            doc_id: docId,
            doc_tags: $scope.doc_tags
        });
    }
});

/**
 * New docuemnt tags input
 */
app.directive("tagInput", function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
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

    var ref = new Firebase(config.fbaseDocRef + '/' + docId);
    var specific_doc = $firebaseObject(ref);
    $scope.doc = specific_doc;
    specific_doc.$bindTo($scope, "docData");

    var refTags = new Firebase(config.fbaseDocRef + '/' + docId + '/tags');
    $scope.doc_tags = [];
    tags = [];
    refTags.on('value', function(snap) {
        $scope.doc_tags = snap.val();
        tags = snap.val();
    });

    // Add tag function
    $scope.addTag = function() {
        if ($scope.tagText.length != 0) {
            $scope.doc_tags.push({
                name: $scope.tagText
            });
            tags.push({
                name: $scope.tagText
            });
            refTags.set(tags);
            $scope.tagText = '';
        }
    };

    // Remove tag function
    $scope.removeTag = function(tagId) {
        if ($scope.doc_tags.length != 0) {
            $scope.doc_tags.splice(tagId, 1);
            tags.splice(tagId, 1);
            refTags.set(tags);
        }
    };
});

/**
 * Edit controller
 */
app.controller('viewController', function($scope, $routeParams, $firebaseObject, config) {

    var docId = $routeParams.docId;
    $scope.docId = docId;

    var ref = new Firebase(config.fbaseDocRef + '/' + docId);
    var specific_doc = $firebaseObject(ref);
    $scope.doc = specific_doc;
    specific_doc.$bindTo($scope, "docData");

});

/**
 * Bookmark controller
 */
app.controller('bookmarkController', function($scope, config, $firebaseObject) {
    var ref = new Firebase(config.fbaseBookmarkedRef);
    var bookmarked = $firebaseObject(ref);
    $scope.bookmarkList = bookmarked;
});

/**
 * Bookmark controller
 */
app.controller('tagsController', function($scope, config, $firebaseArray) {

    var ref = new Firebase(config.fbaseTagsRef);
    var tags = $firebaseArray(ref);

    $scope.tagsList = tags;
});
