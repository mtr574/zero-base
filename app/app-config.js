var app = angular.module("nobase", ["ngRoute", "firebase"]);

/**
 * Configuration
 */
app.constant('config', {
    fbaseURL: 'https://zebraz.firebaseio.com',
    fbaseDocRef: 'https://zebraz.firebaseio.com/docs',
    fbaseTagsRef: 'https://zebraz.firebaseio.com/tags'
})
