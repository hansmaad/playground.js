var Vector = function(x, y) {
	this.x = x === undefined ? 0 : x;
	this.y = y === undefined ? 0 : y;
};

Vector.prototype.times = function(factor) {
	return new Vector(this.x * factor, this.y * factor);
};

Vector.prototype.dot = function(other) {
	return this.x * other.x + this.y * other.y;
};


Vector.prototype.norm = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector.prototype.projectionOnto = function(otherVector){
	var norm = otherVector.norm();	
	var projectionLength = this.dot(otherVector) / norm;
	return otherVector.times(projectionLength / norm);
};
