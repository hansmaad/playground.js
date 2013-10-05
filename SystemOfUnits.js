
function Unit(symbol, factor) {
  this.symbol = symbol;
  this.factor = factor;
};


function Quantity(symbol, unit) {
  this.unit = unit === undefined ? new Unit() : unit;
  this.symbol = symbol;
};

Quantity.prototype.fromBase = function(value) {
    return value * this.unit.factor;
};

Quantity.prototype.toBase = function(value) {
    return value / this.unit.factor;
};

var units = {
    kg : new Unit("kg", 1),
    g : new Unit("g", 1000)
};

function SystemOfUnits() {
    this.mass = new Quantity("mass", units.kg);
};

