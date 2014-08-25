(function(ngUnits, undefined) {

  ngUnits.SimpleUnit = function(symbol, factor, offset) {
    this.symbol = symbol;
    this._factor = factor === undefined ? 1 : factor;
    this._offset = offset === undefined ? 0 : offset;
  };
  
  ngUnits.SimpleUnit.prototype.fromBase = function(value) {
    return (value + this._offset) / this._factor;
  };
  
  ngUnits.SimpleUnit.prototype.toBase = function(value) {
    return value * this._factor - this._offset;
  };
  
  
  ngUnits.Quantity = function(name, units) {
    this.name = name;
    this.units = units;
  };
  
  ngUnits.ngQuantity = function(systemOfUnits) {
    
    var input = undefined;
    var getValue = function() {      
      var str = input.val().replace(",", ".");
      return Number(str);
    };
   
    var setValue = function(value) {
      input.val(value);
    };
   
    var updateTarget = function(scope) {
      var viewValue = getValue();
      var converted = scope.fromBase(scope.value);
      if (scope.value && converted != viewValue)
         setValue(converted);
    };
     
    var updateSource = function(scope) {
        var viewValue = getValue();
        if (isNaN(viewValue)) {
          scope.$apply( function() {
            scope.value = undefined;
          });
        }
        else {
          scope.$apply( function() {
            scope.value = scope.toBase(viewValue);
          })
        }         
    };
    
    var updateQuantity = function(scope) {
      scope.quantityInstance = typeof scope.quantity == "string" ? 
          systemOfUnits.getQuantity(scope.quantity) : scope.quantity;
    };

    return {
      restrict: 'E',
      replace: 'true',
      scope : {
          value : "=",
          quantity : "@"
      },
      template: '<div><input /> \
                <select ng-model="selectedUnit" ng-options="unit.symbol for unit in quantityInstance.units"/></select></div>',
      link : function(scope, elem, attr) {
        input = elem.find("input");

        input.bind('blur', function() {
          updateSource(scope);          
        });
                
        input.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                updateSource(scope);
                event.preventDefault();
            }
        });

        scope.$watch("value", function() {
            updateTarget(scope);
        });

        scope.$watch("quantity", function() {
            updateTarget(scope);
            updateQuantity(scope);
        });
        
        scope.$watch("selectedUnit", function() {
            updateTarget(scope);
        });
    
        updateQuantity(scope);
    
        scope.selectedUnit = scope.quantityInstance.units[0];

        scope.currentUnit = function() {
          return scope.selectedUnit;
        };

        scope.fromBase = function(value) {
          var unit = scope.currentUnit();
          var view = unit.fromBase(value);
          return view;
        };

        scope.toBase = function(value) {
          var unit = scope.currentUnit();
          var base = unit.toBase(value);
          return base;
        };
          
        updateTarget(scope);
      }
    };
 
    ngUnits.ngQuantity.$inject = ["systemOfUnits"];
  };
  
  
  

}) 
(window.ngUnits = window.ngUnits || {}, undefined);

angular.module('ngUnits', [])
  .directive('ngQuantity', ngUnits.ngQuantity)
  .factory("systemOfUnits", function() {
  
    var quantities = {};
    
    var getQuantity = function(name) {
      return quantities[name.toLowerCase()];
    };
    
    var addQuantity = function(quantity) {
      quantities[quantity.name.toLowerCase()] = quantity;  
    };
    
    var simpleUnit = function(symbol, factor, offset) {
      return new ngUnits.SimpleUnit(symbol, factor, offset);
    };
    
    addQuantity(new ngUnits.Quantity("Length", [
      simpleUnit("m", 1),
      simpleUnit("cm", 0.01),
      simpleUnit("mm", 0.001),
    ]));
      
    addQuantity(new ngUnits.Quantity("Pressure", [
      simpleUnit("Pa", 1),
      simpleUnit("bar", 10000),
      simpleUnit("mbar", 100),
    ]));
    
    return {
      "getQuantity" : getQuantity,
      "addQuantity" : addQuantity,
      "simpleUnit" : simpleUnit
    };
  
  });