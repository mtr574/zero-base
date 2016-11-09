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
    var header = $("header.hero"),
        docsContainer = $("#docs article");
    // Alert widget
    function sideAlert(msg) {
        console.log('sideAlert' + msg);
    }
    // Fullscreen search on focus
    $("#search").focusin(function() {
        $(".header-tools").addClass("full-screen");
        header.addClass('collapse');
    }).focusout(function() {
        $(".header-tools").removeClass("full-screen");
        header.removeClass('collapse');
    });
    // tools function
    $("#docsGridview").on('click', function() {
        docsContainer.addClass('col-md-6').removeClass('col-md-12');
    });
    // Aside sticky panel
    $('aside section').affix({
        offset: {
            top: $('aside').offset().top
        }
    });
    // Tooltips
    $('[data-toggle="tooltip"]').tooltip();
    // Capture 's' key to focus search input
    firstTime = false;
    $(window).on('keydown', function(e) {
        switch (e.keyCode) {
            case 83:
                if (!firstTime) {
                    e.preventDefault();
                    $("#search").focus();
                    firstTime = true;
                }
                break;
            case 27:
                $("#search").val(null).blur();
                break;
            default:
        }
    });

    // Clipboard copy handlers
    $('.copy-code').on('click', function() {
        sideAlert('Code copied to clipboard');
    });
    $('.copy-permalink').on('click', function() {
        sideAlert('Link copied to clipboard');
    });
    new Clipboard('.copy-code');
    new Clipboard('.copy-permalink');
});
