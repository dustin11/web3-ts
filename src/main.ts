import { EthersDemo } from "./EthersDemo"
import { ViemDemo } from "./viem_demo";

async function main() {
    
    // const ethers = new EthersDemo();
    // ethers.account();
    // ethers.contract();
    // ethers.onBlock();

    const viem = new ViemDemo();
    viem.account();
    
}

main()