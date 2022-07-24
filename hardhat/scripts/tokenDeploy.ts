// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  // KIP17 - NFT
  const kip17 = await ethers.getContractFactory("MyNFT");
  const ZTEB_NFT = await kip17.deploy("ZeroTEB Token", "ZTEB");

  await ZTEB_NFT.deployed();

  console.log("ZeroTEB's MyNFT deployed to:", ZTEB_NFT.address);

  // SBT
  const sbt = await ethers.getContractFactory("MySBT");
  const ZTEB_SBT = await sbt.deploy("ZeroTEB Token", "ZTEB");

  await ZTEB_SBT.deployed();

  console.log("ZeroTEB's MySBT deployed to:", ZTEB_SBT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
