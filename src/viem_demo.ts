
import { parseEther, Address, Account, getContract } from 'viem'
import { ABI, BYTECODE } from "./config/storage";
import { AssetHubClient } from "./client/asset_hub_client";

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
        // console.log(`chain: `, this.chainConfig)
        const walletClient = this.viemWalletClient        
        const transfer = {
            chain: this.chainConfig,
            to: '0x0A75f01b75d23eAF7Bf291A0EC1aD436e49852c3' as Address,
            value: parseEther('0.1'),
            // nonce: nonce,
        }
        const txHash = await walletClient.sendTransaction(transfer)
        console.log(`tx hash is ${txHash}`)
        // 等待交易确认
        const receipt = await client.waitForTransactionReceipt({ hash: txHash});
        console.log('Confirmed in block:', receipt.blockNumber);
    }

    async contract(){
        const client = this.viemPublicClient
        //部署合约
        const walletClient = this.viemWalletClient
        const txHash = await walletClient.deployContract({
            chain: this.chainConfig,
            abi: ABI, 
            bytecode: BYTECODE, 
            args: []
        })
        const recieipt = await client.waitForTransactionReceipt({ hash: txHash })
        const contractAddress = recieipt.contractAddress
        console.log(`contract address is ${contractAddress}`)
        if (typeof contractAddress !== 'string' || !contractAddress.startsWith('0x')) {
            throw new Error('Invalid contract address: ' + contractAddress);
        }
        //读取合约
        const number = await client.readContract({ address: contractAddress as Address, abi: ABI, functionName: 'retrieve', args: [] })
        console.log(`number is ${number}`)
        //写合约
        const contract = getContract({ address: contractAddress as Address, abi: ABI, client: walletClient})
        const tx = await contract.write.store([100])
        console.log(`write tx hash is ${tx}`)
        const receipt = await client.waitForTransactionReceipt({ hash: tx});
        console.log('Confirmed in block:', receipt.blockNumber);

        //验证结果
        const number1 = await client.readContract({ address: contractAddress as Address, abi: ABI, functionName: 'retrieve', args: [] })
        console.log(`number is ${number1}`)
    }

    async onBlock(){
        const client = this.viemPublicClient
        client.watchBlockNumber({
            onBlockNumber: (blockNumber) => {
                console.log(`current block: ${blockNumber}`)
            },
            onError: (error) => {
                console.error('Error watching block number:', error);
            }
        })
    }

}
