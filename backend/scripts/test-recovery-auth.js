const { ethers } = require('ethers');

async function testRecovery() {
    const apiEndpoint = 'http://localhost:7001';
    
    // 1. Fetch nonce
    console.log('1. Fetching auth nonce from backend...');
    const nonceRes = await fetch(`${apiEndpoint}/api/auth/nonce`);
    if (!nonceRes.ok) {
        throw new Error(`Failed to fetch nonce: ${nonceRes.statusText}`);
    }
    const nonceData = await nonceRes.json();
    const message = nonceData.nonce;
    console.log(`Received nonce message:\n${message}\n`);

    // 2. Sign message using the recovery private key
    // This key corresponds to recovery address: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
    const recoveryPrivateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
    console.log('2. Signing the message locally with the recovery private key...');
    const wallet = new ethers.Wallet(recoveryPrivateKey);
    const signature = await wallet.signMessage(message);
    console.log(`Generated signature: ${signature}`);
    console.log(`Signature resolves to address: ${wallet.address}\n`);

    // 3. Post signature to verification endpoint
    // We request login as the primary wallet address: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
    const primaryWalletAddress = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
    console.log(`3. Sending signature verification request for primary wallet ${primaryWalletAddress}...`);
    
    const verifyRes = await fetch(`${apiEndpoint}/api/auth/verify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            walletAddress: primaryWalletAddress,
            message,
            signature
        })
    });

    console.log(`Verification status: ${verifyRes.status}`);
    const verifyData = await verifyRes.json();
    console.log('Verification response:', JSON.stringify(verifyData, null, 2));

    if (verifyData.authenticated && verifyData.token && verifyData.walletAddress.toLowerCase() === primaryWalletAddress.toLowerCase()) {
        console.log('\n✅ SUCCESS: Recovery key login test passed! Session correctly initialized for primary user.');
    } else {
        console.log('\n❌ FAILURE: Recovery key login did not return expected user session.');
    }
}

testRecovery().catch(err => {
    console.error('Test run failed with error:', err);
});
