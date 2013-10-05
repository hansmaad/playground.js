describe("Quantity", function() {
  var quantity;

  beforeEach(function() {
    quantity = new Quantity();
  });

  it("has default Unit defined", function() {
    expect(quantity.unit).not.toBe(undefined);
  });



  describe("when unit factor is 1", function() {
    beforeEach(function() {
        quantity.unit = new Unit("e", 1);
    });

    it("fromBase equals base value", function() {
        expect(quantity.fromBase(3.14)).toEqual(3.14);
    });

    it("toBase equals value", function() {
        expect(quantity.toBase(3.14)).toEqual(3.14);
    });
  });

  describe("when unit factor is 1.5", function() {
    beforeEach(function() {
        quantity.unit = new Unit("e", 1.5);
    });

    it("fromBase returns value*1.5", function() {
        expect(quantity.fromBase(1)).toEqual(1.5);
    });

    it("toBase returns value/1.5", function() {
        expect(quantity.toBase(1.5)).toEqual(1);
    });
  });

});

describe("SystemOfUnits", function() {
    var system;
    beforeEach(function() {
        system = new SystemOfUnits();
    });

    describe("Mass quantity has unit kg", function() {
        it("Quantity symbol is mass", function() {
            expect(system.mass.symbol).toEqual("mass");
        });

        it("unit symbol is kg", function() {
            expect(system.mass.unit.symbol).toEqual("kg");
        });

        it("fromBase returns base value", function() {
            expect(system.mass.fromBase(1.23)).toEqual(1.23);
        });
        
        it("toBase returns base value", function() {
            expect(system.mass.toBase(1.23)).toEqual(1.23);
        });
    });
    describe("when mass quantity has unit g", function() {
        beforeEach(function() { system.mass.unit = units.g; });

        it("1 kg == 1000 g", function() {
            expect(system.mass.fromBase(1)).toEqual(1000);
        });
        
        it("2100 g == 2.1 kg", function() {
            expect(system.mass.toBase(2100)).toEqual(2.1);
        });
    });
});

