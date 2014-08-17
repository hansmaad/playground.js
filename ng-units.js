angular.module('ngUnits', [])
 .directive('quantity', function() {
    
   var input = undefined;
   
    var getValue = function() {
      return Number(input.val());
    };
   
    var setValue = function(value) {
      input.val(value);  
    };
   

    
    var updateTarget = function(scope) {
      var value = getValue();
      var converted = scope.value * 2;
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
            scope.value = value * 0.5;
          })
        }         
    }; 
     
    return {
      restrict: 'E',
      replace: 'true',
      scope : {
          value : "="
      },
      template: '<div><input /> <span>mm</span></div>',
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
          
        updateTarget(scope);
      }
  };
});