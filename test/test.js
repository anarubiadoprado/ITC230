const expect = require("chai").expect;
const music = require('./music.js');


//test for get//

describe("Musics module", () => {
 it("returns requested music", () => {
   const result = music.get("Sublime");
   expect(result).to.deep.equal({artist: "Sublime", song:"BadFish", year:1992});
 });
 
 it("fails w/ invalid music", () => {
   const result = music.get("fake");
   expect(result).to.be.undefined;
 });
});


//test for delete//

it("delete requested artist", () => {
	const result = music.delet("Pepper");
	expect(result).to
})


//test for add//
