import { Contract, ethers, Wallet } from "ethers"
import { AssetHubClient } from "./client/asset_hub_client";
import { ABI, BYTECODE } from "./config/storage";

export class EthersDemo extends AssetHubClient{

    async account(){
        const wallet = this.ethersWallet
        const addr = wallet.address
        //余额
        const balance = await this.ethersProvider.getBalance(addr)
        const ethValue = ethers.formatEther(balance)
        console.log(`balance is ${balance}, ethValue is ${ethValue}`)
        //交易次数
        const nonce = await this.ethersProvider.getTransactionCount(addr)
        console.log(`nonce is ${nonce}`)
        //转账
        const transfer = {
            to: "0x0A75f01b75d23eAF7Bf291A0EC1aD436e49852c3",
            value: ethers.parseEther("0.1"),
            nonce: nonce,
        }
        // const gasPrice = await this.ethersProvider.getFeeData()
        const tx = await wallet.sendTransaction(transfer)
        await tx.wait()
        console.log(`tx hash is ${tx.hash}`)        

    }

    async contract(){
        const wallet = this.ethersWallet
        const factory = new ethers.ContractFactory(ABI, BYTECODE, wallet)
        const contract = await factory.deploy()
        await contract.waitForDeployment()
        console.log(`contract address is ${contract.target}`)
        //读合约
        const readStorage = new Contract(contract.target, ABI, this.ethersProvider)
        const value = await readStorage.retrieve()
        console.log(`value is ${value}`)
        //写合约
        const writeStorage = new Contract(contract.target, ABI, wallet)
        const tx = await writeStorage.store(100)
        await tx.wait()
        console.log(`tx hash is ${tx.hash}`)
        //验证结果
        const value2 = await readStorage.retrieve()
        console.log(`value is ${value2}`)
        
    }

    async onBlock(){
        let i = 0;
        const blockHandler = async (blockNumber: number) => {
            console.log(`current block: ${blockNumber}`);            
            if (i++ > 5) {
                this.ethersProvider.off("block", blockHandler);
                console.log("成功停止监听");
                return; // 提前终止后续逻辑
            }
            const currentFee = await this.ethersProvider.getFeeData();
            console.log("当前基准费用:", currentFee.maxFeePerGas);
        };

        this.ethersProvider.on("block", blockHandler);

        // let i = 0;
        // this.ethersProvider.on("block", async (blockNumber) => {
        //     console.log(`current block: ${blockNumber}`);            
        //     if( i++ >5 ){
        //         this.ethersProvider.off("block");
        //         console.log("停止监听区块事件");
        //         return;
        //     }
        //     const currentFee = await this.ethersProvider.getFeeData();
        //     console.log("当前基准费用:", currentFee.maxFeePerGas);
        // });
    }
    
    
}