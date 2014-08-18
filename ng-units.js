angular.module('ngUnits', [])
 .directive('quantity', function() {
    var input = undefined;

    var getValue = function() {      
      var str = input.val().replace(",", ".");
      return Number(str);
    };
   
    var setValue = function(value) {
      input.val(value);
    };
   
    var updateTarget = function(scope) {
      var value = getValue();
      var converted = scope.fromBase(scope.value);
      if (scope.value && converted != value)
         setValue(converted);
    };
     
    var updateSource = function(scope) {
        var value = getValue();
        if (isNaN(value)) {
          scope.$apply( function() {
            scope.value = undefined;
          });
        }
        else {
          scope.$apply( function() {
            scope.value = scope.toBase(value);
          })
        }         
    }; 

    return {
      restrict: 'E',
      replace: 'true',
      scope : {
          value : "=",
          quantity : "=?"
      },
      template: '<div><input /> <span>{{ quantity.units[quantity.unit].symbol }}</span></div>',
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

        if (scope.quantity === undefined) {
          scope.quantity = {
            "units" : [{ "symbol" : "", "factor" : 1, "offset" : 0 }],
            "unit" : 0
          };
        }

        scope.$watch("value", function() {
            updateTarget(scope);
        });

        scope.currentUnit = function() {
          return scope.quantity.units[scope.quantity.unit];
        };

        scope.fromBase = function(value) {
         var unit = scope.currentUnit();
         return value * unit.factor;
        };

        scope.toBase = function(value) {
         var unit = scope.currentUnit();
         return value / unit.factor;
        };
          
        updateTarget(scope);
      }
  };
});