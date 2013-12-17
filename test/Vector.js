describe("Vector", function() {
	var toBeEqualVector = function(lh, rh) {
		expect(lh.x).toEqual(rh.x);
		expect(lh.y).toEqual(rh.y);
		expect(lh.z).toEqual(rh.z);
	};
	
	it("is not not null", function() {
		var v = new Vector();
		expect(v).not.toBeNull();
	});
	
	it("x,y,z are initialized to 0", function() {
		var v = new Vector();
		expect(v.x).toEqual(0);
		expect(v.y).toEqual(0);
		expect(v.z).toEqual(0);
	});
	
	it("x,y,z are initialized from ctor", function() {
		var v = new Vector(1, 2, 3);
		expect(v.x).toEqual(1);
		expect(v.y).toEqual(2);
		expect(v.z).toEqual(3);
	});
	
	describe("plus", function() {
		
		it("returns a new vector", function() {
			var a = new Vector();
			var b = new Vector();
			var c = a.plus(b);
			expect(c).not.toBe(a);
			expect(c).not.toBe(b);
		});
		
		it("returns the sum of 2 vectors", function() {
			var v = (new Vector(1, 2, 3)).plus(new Vector(-1, 2, 0));
			toBeEqualVector(v, new Vector(0, 4, 3));
		});
		
		
	});
	
});
