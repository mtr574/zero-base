module LabelApplication {
    export class LabelCollection {
        constructor(private $scope: ng:IScope) {

        }
    }

    LabelEditor.editorModule.controller('labelCollectionController', ['$scope', LabelCollection]);
}
