angular.module("lvTable", [])
  .directive("lvTableCell", function($compile) {
    return {
      restrict : "A",
      link : function(scope, elem, attr) {
        var template = scope.col.template || "{{ row[col.field] }}";
        if (template[0] !== "<")
          template = "<span>" + template + "</span>"
        var newElem = $compile(template)(scope);
        elem.contents().remove();
        elem.append(newElem);
      }
    };
    
    
  })
  .directive("lvTable", function($compile) {
    var makeColumns = function(data) {
      var columns = [];
      angular.forEach(data, function(value, key) {
        columns.push({ field: key, displayName: key});
      });
      return columns;
    };
    return {
      restrict : "EA",
      templateUrl : "lv-table.html",
      replace : true,
      transclude : true,
      scope : {
        lvTable : "="
      },
      link : function(scope, elem, attr) {
        scope.columns = scope.lvTable.columns || makeColumns(scope.lvTable.data[0]);
        
        scope.orderBy = function(col) {
          scope.orderByField = col.field;
          scope.reverseOrder = !scope.reverseOrder;
        };
        scope.isOrderedBy = function(col) { return scope.orderByField === col.field; };
      }
    };
  });