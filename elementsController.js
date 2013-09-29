

function ElementsController($scope) {
    $scope.elements = [ 
        { name : "Bun" }, 
        { name : "Meat" }
        ];
    
    $scope.addElement = function() {
        $scope.elements.push({ name : $scope.newElement });
    }

}
