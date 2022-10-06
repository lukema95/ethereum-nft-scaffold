import { ethers } from "hardhat";

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  // const lockedAmount = ethers.utils.parseEther("1");

  // const Lock = await ethers.getContractFactory("Lock");
  // const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  // await lock.deployed();
  const maxPerAddressMint = 2;
  const maxPerWhitelistAddressMint = 2;
  const collectionSize = 10000;
  const amountForDevs = 200;
  const amountForWhitelist = 4000;

  // Contracts are deployed using the first signer/account by default
  const [owner, otherAccount] = await ethers.getSigners();

  const CodeDoge = await ethers.getContractFactory("CodeDoge");
  const codeDoge = await CodeDoge.deploy(maxPerAddressMint, maxPerWhitelistAddressMint, collectionSize, amountForDevs, amountForWhitelist);

  console.log(`Deployed to ${codeDoge.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
