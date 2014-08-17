var Vector = function(x, y, z) {
	this.x = x === undefined ? 0 : x;
	this.y = y === undefined ? 0 : y;
	this.z = z === undefined ? 0 : z;
	
};

Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y, this.z + other.z);
};


