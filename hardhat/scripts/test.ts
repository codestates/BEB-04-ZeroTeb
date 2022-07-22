import { Contract } from "ethers/lib/ethers";
import { ethers, network } from "hardhat";
import abiInterface from "../abi/contracts/ZeroTEB.sol/ZeroTEB.json";

const ZTEBconnection = async () => {
  const CONTRACT_ADDRESS = "0x8A49eb27FE0670F0FA20A79320d870D9010dfc9F";

  const signer = await ethers.getSigners();
  const ztebContract = new ethers.Contract(CONTRACT_ADDRESS, abiInterface);

  return ztebContract.connect(signer[0]);
};

const decodeData = (types: string[], data: string) => {
  return ethers.utils.defaultAbiCoder.decode(
    types,
    ethers.utils.hexDataSlice(data, 4)
  );
};

async function main() {
  const zeroteb = await ZTEBconnection();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
