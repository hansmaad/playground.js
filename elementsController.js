
function Bun(name) {
  this.type = "bun";
  this.name = name === undefined ? "Bun" : name;  
  this.clone = function() { return new Bun(this.name); }
  this.keywords = ["brot", "bread"];
};

function Sauce(name) {
  this.type = "sauce";
  this.name = name === undefined ? "Ketchup" : name;  
  this.liters = 0.01;
  
  this.clone = function() { return new Sauce(this.name); }
};

function Meat(name) {
  this.type = "meat";
  this.name = name === undefined ? "Meat" : name;  
  this.clone = function() { return new Meat(this.name); }
  this.keywords = ["fleisch", "burger"];
};


function Cheese(name) {
  this.type = "cheese";
  this.cheeseType = undefined;
  this.name = name === undefined ? "Cheese" : name;
  this.clone = function() { return new Cheese(this.name); }
  this.types = [ "cheddar", "gauda" ];
};



function ElementsController($scope) {
    $scope.prototypes = [
        new Bun(),
        new Sauce(),
        new Sauce("Sauce (Mayo)"),
        new Sauce("Sauce (Sömpf)"),
        new Meat(), 
        new Meat("Meat (beef)"),
        new Meat("Meat (pork)"),
        new Meat("Meat (chicken)"),
        new Cheese(),
        new Cheese("Cheese (cheddar)"),
        new Cheese("Cheese (gauda)"),
    ];

    $scope.elements = [ 
        { name : "Bun" },
    ];
   
    $scope.newElement = undefined;

    $scope.addElement = function(index) {
        var length = $scope.elements.length;
        if (index === undefined)
          index = 0;
        
        var reverseIndex = length - index;
                   
       $scope.elements.splice(reverseIndex, 0, $scope.newElement.clone());
        $scope.newElement = "";
    }
    
}
