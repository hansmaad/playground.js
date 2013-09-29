var app = angular.module("burger", ['ui.bootstrap']);

app.filter("reverse", function() {
    return function(items) {
        return items.slice().reverse();
    };
});
