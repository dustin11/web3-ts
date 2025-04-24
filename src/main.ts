import { EthersDemo } from "./EthersDemo"

async function main() {
    
    const ethers = new EthersDemo();
    ethers.account();
    ethers.contract();
    ethers.onBlock();
    
}

main()