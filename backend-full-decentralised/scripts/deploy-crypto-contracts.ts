import { ethers } from "hardhat";

async function main() {
    console.log("Starting deployment of Decentralized Crypto Contracts...");

    // Get the signers (deployer)
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

    // 1. Deploy WillRegistry
    const WillRegistry = await ethers.getContractFactory("WillRegistry");
    const willRegistry = await WillRegistry.deploy();
    await willRegistry.waitForDeployment();
    const willRegistryAddress = await willRegistry.getAddress();
    console.log("✅ WillRegistry deployed to:", willRegistryAddress);

    // 2. Deploy GuardianRecovery (Social Recovery Logic)
    const GuardianRecovery = await ethers.getContractFactory("GuardianRecovery");
    const guardianRecovery = await GuardianRecovery.deploy();
    await guardianRecovery.waitForDeployment();
    const guardianRecoveryAddress = await guardianRecovery.getAddress();
    console.log("✅ GuardianRecovery deployed to:", guardianRecoveryAddress);

    // Write the addresses to a JSON or config for the frontend to consume
    const fs = require('fs');
    import * as path from 'path';

    const addresses = {
        WillRegistry: willRegistryAddress,
        GuardianRecovery: guardianRecoveryAddress,
        Network: (await ethers.provider.getNetwork()).name,
        ChainId: (await ethers.provider.getNetwork()).chainId.toString()
    };

    const configPath = path.join(__dirname, "../contract-addresses.json");
    fs.writeFileSync(configPath, JSON.stringify(addresses, null, 2));

    console.log("📝 Contract addresses saved to backend-full-decentralised/contract-addresses.json");
    console.log("🎉 Deployment 100% complete!");
}

// Recommend running with: npx hardhat run scripts/deploy-crypto-contracts.ts --network polygonAmoy
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
