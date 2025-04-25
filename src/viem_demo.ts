
import { parseEther, Address } from 'viem'
import { ABI, BYTECODE } from "./config/storage";
import { AssetHubClient } from "./client/AssetHubClient";

export class ViemDemo extends AssetHubClient{

    async account(){
        const client = this.viemPublicClient
        const addr = this.viemAccount.address
        //余额
        const balance = await client.getBalance({ address: addr })
        console.log(`balance is ${balance}`)
        //交易次数
        const nonce = await client.getTransactionCount({ address: addr })
        console.log(`nonce is ${nonce}`)
        //转账
        console.log(`chain: `, this.chainConfig)
        const walletClient = this.viemWalletClient        
        const transfer = {
            chain: this.chainConfig,
            to: '0x0A75f01b75d23eAF7Bf291A0EC1aD436e49852c3' as Address,
            value: parseEther('0.1'),
            // nonce: nonce,
        }
        const txHash = await walletClient.sendTransaction(transfer)
        console.log(`tx hash is ${txHash}`)
    }

}
