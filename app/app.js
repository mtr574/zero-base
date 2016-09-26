$(function() {
    var header = $("header.hero");
    $("#search").focusin(function() {
        // Expand header
        header.addClass('expand');
    }).focusout(function() {
        // Collapse header
        header.removeClass('expand');
    });
});
