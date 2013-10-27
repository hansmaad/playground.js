var Vector = function(x, y) {
	this.x = x === undefined ? 0 : x;
	this.y = y === undefined ? 0 : y;
};

Vector.prototype.dot = function(other) {
	return this.x * other.x + this.y * other.y;
};


Vector.prototype.norm = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y);
};
