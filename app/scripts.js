// // jQuery
// require('./jquery.min.js');
// // Angular modules
// require('./angular.min.js');
// require('./angular-route.min.js');
// // Firebase modules
// require('./firebase.js')
// require('./angularfire.js');
// // Bootstrap module
// require('./bootstrap.min.js');
// // App modules
// require('./app-config.js');
// require('./app-routes.js');
// require('./app-ctrl.js');
// require('./app-service.js');
// Clipboard module
//require('./clipboard.min.js');

$(function() {
    var header = $("header.hero");
    var docsContainer = $("#docs article");
    $("#search").focusin(function() {
        // Expand header
        header.addClass('expand');
    }).focusout(function() {
        // Collapse header
        header.removeClass('expand');
    });
    // search
    $("#searchButton").on('click', function() {
        console.log("get firebase data");
        var docs = firebase.database().ref('docs'),
            data;
        docs.on('value', function(snapshot) {
            data = snapshot.val();
        });
        $(".container ul").append("<li>" + data[0].username + "</li>");
    });
    // tools function
    $("#docsGridview").on('click', function() {
        docsContainer.addClass('col-md-6').removeClass('col-md-12');
    });
    // tooltips
    $('[data-toggle="tooltip"]').tooltip();
    // Capture 's' key to focus search input firstTime = false; $(window).on('keydown', function(e) {     if (e.keyCode == 83) {         if (!firstTime) {             e.preventDefault();             $("#search").focus();             firstTime = true; } }
    // }); Clipboard copy init
    new Clipboard('.copy-code');
    new Clipboard('.copy-permalink');
});
