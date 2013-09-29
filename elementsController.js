

function ElementsController($scope) {
    $scope.prototypes = [
        "Bun", "Meat", "Tomato", "Onions", "Chili", "Bacon"
    ];

    $scope.elements = [ 
        { name : "Bun" }, 
        { name : "Meat" }
    ];
    
    $scope.addElement = function() {
        $scope.elements.push({ name : $scope.newElement });
    }

}
