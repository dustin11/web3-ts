import { EthersDemo } from "./ethers_demo"
import { ViemDemo } from "./viem_demo";

async function main() {
    
    const ethers = new EthersDemo();
    await ethers.account();
    await ethers.contract();
    ethers.onBlock();

    // const viem = new ViemDemo();
    // await viem.account();
    // await viem.contract();
    // viem.onBlock();
    
}

main()