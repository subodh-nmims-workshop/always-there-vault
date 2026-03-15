const { ethers } = require("hardhat");
async function main() {
  const [sender] = await ethers.getSigners();
  const tx = await sender.sendTransaction({
    to: "0xff38de9c8f7b6a4cf810eace53d3e8ea9dac1178",
    value: ethers.parseEther("100.0")
  });
  await tx.wait();
  console.log("Sent 100 ETH to 0xff38de9c8f7b6a4cf810eace53d3e8ea9dac1178");
}
main().catch(console.error);
