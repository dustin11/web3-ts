import { Contract, ethers, Wallet } from "ethers"
import { AssetHubClient } from "./client/AssetHubClient";

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
            value: ethers.parseEther("0.1")
        }
        const tx = await wallet.sendTransaction(transfer)
        await tx.wait()
        console.log(`tx hash is ${tx.hash}`)        

    }

    async contract(){
        const wallet = this.ethersWallet
        
    }
    
    
}