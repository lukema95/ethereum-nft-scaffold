const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("CodeDoge", function() {
  async function deployFixture(){

    const maxPerAddressMint = 2;
    const maxPerWhitelistAddressMint = 2;
    const collectionSize = 10000;
    const amountForDevs = 1000;
    const amountForWhitelist = 4000;

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const CodeDoge = await ethers.getContractFactory("CodeDoge");
    const codeDoge = await CodeDoge.deploy(maxPerAddressMint, maxPerWhitelistAddressMint, collectionSize, amountForDevs, amountForWhitelist);
    return { codeDoge, owner, maxPerAddressMint, maxPerWhitelistAddressMint, collectionSize, amountForDevs, amountForWhitelist };
  }

  describe("Deployments", function() { 
    it("Should set the right amount", async function() {

      const { codeDoge, maxPerAddressMint, maxPerWhitelistAddressMint, collectionSize, amountForDevs, amountForWhitelist } = await loadFixture(deployFixture);

      expect(await codeDoge.maxPerAddressMint()).to.equal(maxPerAddressMint);
      expect(await codeDoge.maxPerWhitelistAddressMint()).to.equal(maxPerWhitelistAddressMint);
      expect(await codeDoge.collectionSize()).to.equal(collectionSize);
      expect(await codeDoge.amountForDevs()).to.equal(amountForDevs);
      expect(await codeDoge.amountForWhitelist()).to.equal(amountForWhitelist);
    })

    it("Should set the right phase", async function() {
      const { codeDoge } = await loadFixture(deployFixture);
      expect(await codeDoge.phase()).to.equal(0);
    })

    it("Should set the right owner", async function () {
      const { codeDoge, owner } = await loadFixture(deployFixture);

      expect(await codeDoge.owner()).to.equal(owner.address);
    });
  })

  describe("Mints", async function() {
    it("Should success if minted by dev on phase 0", async function() {
      
    })
  })

})