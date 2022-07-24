import { ethers } from "hardhat";

async function main() {
  const NFT_CONTRACT_ADDRESS = "0x6b07C5B4342E56BF9A567E5C0D26D509b164d5Ef";
  const SBT_CONTRACT_ADDRESS = "0x781A19C6fce2d3bf5Eb9A9De760078b431adEdB2";

  const zeroTEB = await ethers.getContractFactory("ZeroTEB");
  const ZTEB_NFT = await zeroTEB.deploy("ZeroTEB", "TT");

  await ZTEB_NFT.deployed();

  console.log("ZeroTEB deployed to:", ZTEB_NFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
