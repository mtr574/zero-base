var app = angular.module("nobase", ["firebase"]);

app.controller("DocsController", function($scope, $firebaseObject) {
    var ref = new Firebase("https://zebraz.firebaseio.com");
    $scope.messages = $firebaseArray(ref);
});