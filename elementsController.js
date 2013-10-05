



function Bun(name) {
  this.type = "bun";
  this.name = name === undefined ? "Bun" : name;  
  this.clone = function() { return new Bun(this.name); }
  this.keywords = ["brot", "bread"];
  this.getPrice = function() {
    return 0.5;
  }
};

function Sauce(name) {
  this.type = "sauce";
  this.name = name === undefined ? "Ketchup" : name;  
  this.liters = 0.01;
  
  this.clone = function() { return new Sauce(this.name); }
  this.getPrice = function() {
    return 0.5 * this.liters;
  }
};

function Meat(name) {
  this.type = "meat";
  this.name = name === undefined ? "Meat" : name;  
  this.weight = 0.150;

  this.clone = function() { return new Meat(this.name); }

  this.keywords = ["fleisch", "burger"];
  this.getPrice = function() {
    return 1.5;
  }
};


function Cheese(name) {
  this.type = "cheese";
  this.cheeseType = undefined;
  this.name = name === undefined ? "Cheese" : name;
  this.clone = function() { return new Cheese(this.name); }
  this.types = [ "cheddar", "gauda" ];

  this.getPrice = function() {
    return 0.25;
  }
};

function findIf(array, predicate) {   
    for(var i = 0, e = array.length; i < e; i++) {
        if (predicate(array[i]))
        return array[i];
    }
}

function Bill(elements) {
  this.elements = elements;
  this.total = 0;

  this.items = function() {
    var bill = [];
    this.total = 0;
    for(var i = 0, e = this.elements.length; i < e; i++) {
      var element = this.elements[i];
      var existendItem = findIf(bill, function(item) { 
        return item.type === element.type;
      });

      if (existendItem === undefined) {

        bill.push({ 
         "type" : element.type,
         "name" : element.name, 
         "amount" : 1, 
          "price" : element.getPrice === undefined ? "N/A" :  element.getPrice()
         });
      } else {
        existendItem.amount++;
        existendItem.price += element.getPrice();     
      }
      this.total += element.getPrice();
    }   
    return bill;
  };

}

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
        new Bun(),
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
    
    $scope.bill = new Bill($scope.elements);
}
