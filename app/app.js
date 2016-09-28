var app = angular.module("nobase", ["firebase"]);

/**
 * Header search and new doc controller
 */
app.controller("headerController", function($scope) {
    // Open new doc panel
    $scope.newDocPanelOpen = function() {
        var panel = $("#newDocPanel");
        panel.toggleClass("reveal");
    }
});

/**
 * Retrieve docs
 */
app.controller("DocsController", function($scope, $firebaseArray) {
    // Settings
    var ref = new Firebase("https://zebraz.firebaseio.com");

    // Loader
    ref.on("value", function(status) {
        if (status.val() === true) {
            $(".loader").fadeIn();
        } else {
            $(".loader").fadeOut();
        }
    });

    // Data as an array
    var docsArray = $firebaseArray(ref)
    $scope.docs = docsArray;
});

/**
 * Add new doc
 */
app.controller("NewDocController", function($scope, $firebaseArray) {
    // Settings
    var ref = new Firebase("https://zebraz.firebaseio.com");

    // Add new doc
    $scope.messages = $firebaseArray(ref);
    $scope.postNewDoc = function() {
        var timestamp = new Date().getTime();
        $scope.messages.$add({
            title: $scope.docTitle,
            time: timestamp
        }).then(function() {
            // done. close the form
            console.log("new doc added.");
        });

    };

});
