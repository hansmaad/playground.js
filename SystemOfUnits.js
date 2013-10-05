
function Unit(symbol, factor) {
  this.symbol = symbol;
  this.factor = factor;
};


function Quantity(symbol, unit) {
  this.unit = unit === undefined ? new Unit() : unit;
  this.symbol = symbol;
};

Quantity.prototype.fromBase = function(value) {

};

function SystemOfUnits() {

};

