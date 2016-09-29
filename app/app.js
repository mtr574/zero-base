var app = angular.module("nobase", ["firebase"]);


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

    // Settings
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
            title: $scope.docTitle,
            content: $scope.docContent
        }).then(function() {
            // done. close the form
            $("#newDocPanel").fadeOut('fast').remoceClass('reveal');
        });

    };

});