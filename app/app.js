var app = angular.module("nobase", ["firebase", "hljs"]);


/**
 * Configuration
 */
app.constant('config', {
    fbaseURL: "https://zebraz.firebaseio.com"
})

/**
 * Retrieve docs
 */
app.controller("DocsController", function($scope, $firebaseArray, config) {
    // Open new doc panel
    $scope.newDocPanelOpen = function() {
        var panel = $("#newDocPanel");
        panel.toggleClass("reveal");
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
app.controller("NewDocController", function($scope, $firebaseArray, config) {

    // Settings
    var ref = new Firebase(config.fbaseURL);

    // Add new doc
    $scope.messages = $firebaseArray(ref);
    $scope.postNewDoc = function() {
        var timestamp = new Date().getTime();
        $scope.messages.$add({
            time: timestamp,
            title: $scope.docTitle || "n/a",
            creator: "Nate Ben",
            code: $scope.docCode || "n/a",
            content: $scope.docContent || "n/a"
        }).then(function() {
            // done. close the form
            $("#newDocPanel").removeClass('reveal');
        });

    };

});
