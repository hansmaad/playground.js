describe("Vector", function() {

  it("is [0; 0] by default", function() {
  	var v = new Vector();
    expect(v.x).toBe(0);
    expect(v.y).toBe(0);
  });
  
  describe("dot product", function() {
  	
  	it("is zero for orthogonal vectors", function() {
  		var a = new Vector(1, 0);
  		var b = new Vector(0, 3);
  		var c = a.dot(b);
  		expect(c).toBe(0);
  	});


  	it(" of [2;-5] and [1;1] is 7", function() {
  		var a = new Vector(2, -5);
  		var b = new Vector(1, 1);
  		var c = a.dot(b);
  		expect(c).toBe(-3);
  	});  	
  	
  });  // dot product
  
  
  describe("norm", function(){
  	
  	it("is 0 for null vector", function(){
  		var a = new Vector();
  		expect(a.norm()).toBe(0);
  	});
  	
  	it("is 1 for unit vector", function(){
  		var a = new Vector(0, 1);
  		expect(a.norm()).toBe(1);
  	});
  	
  });  // norm
  
  describe("projectionOnto", function(){
  	
  	it("is projected vector", function(){
  		var a = new Vector(5, 0);
  		var b = new Vector(1, 1);
  		var c = b.projectionOnto(a);
  		expect(c.x).toBe(1);
  		expect(c.y).toBe(0);
  	});
  	
  	it("is null vector for orthognal vectors", function(){
  		var a = new Vector(1, 0);
  		var b = new Vector(0, 2);
  		var c = b.projectionOnto(a);
  		expect(c.x).toBe(0);
  		expect(c.y).toBe(0);
  	});
  	
  	  	it("is -projected vector", function(){
  		var a = new Vector(1, -1);
  		var b = new Vector(0, 2);
  		var c = b.projectionOnto(a);
  		expect(c.x).toBe(-1);
  		expect(c.y).toBe(1);
  	});
  	
  });  // projectionOnto
  
  
});