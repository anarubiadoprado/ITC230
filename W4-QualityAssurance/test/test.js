const expect = require("chai").expect;
const music = require('../music.js');


//test for get//

describe("My songs, using get module", () => {
 it("returns requested song", () => {
   const result = music.get("BadFish");
   expect(result).to.deep.equal({artist: "Sublime", song:"BadFish", year:1992});
 });
 
 it("fails w/ invalid music", () => {
   const result = music.get("Coco");
   expect(result).to.be.undefined;
 });
});


//test for delete//
describe("My songs,using delete module", () => {
	it("delete request song" () => {
		const result = music.delete("Celebration");
		expect(result).to.be.true;
	});
	it("fails w/ invalid song to delete", () => {
		const result = music.delete("Not-Celebration");
		expect(result).to.be.false;
	 });
	});

//test for add//
describe("my songs, using add module", () => {
	it("add new song" () => {
		const result = music.add("FullyNewMusic");
		expect(result).to.eql({artist: "NovoArtist", song:"FullyNewMusic", year:1990});
	});
});
