# web3-ts
ts 使用ethers、viem库，钱包操作，合约发布等

## 执行
<pre>
yarn install  
yarn start
</pre>

## ethers执行结果
```typescript
const ethers = new EthersDemo();  
await ethers.account();  
await ethers.contract();  
ethers.onBlock();  
```
<pre>
print:  
    balance is 17618742280549000000, ethValue is 17.618742280549  
    nonce is 48  
    tx hash is 0xfcb62e368d52fa8898ecfcc1e2bd117797479c8d1f705a3853118ca2f5a69a22  
    contract address is 0x3414F99d087c8691ded5fA5c91f28985791939DC  
    value is 0  
    tx hash is 0xc708c12f218d428b547d107c38fece21a62c206eef3fda3a84ee94add025c197  
    value is 100  
    当前基准费用: 2200n  
    current block: 11535861  
    当前基准费用: 2200n  
    current block: 11535862  
    成功停止监听  
</pre>
## viem执行结果
```typescript
const viem = new ViemDemo();
await viem.account();
await viem.contract();
viem.onBlock();
```
<pre>
print:
    balance is 17806250006555000000  
    nonce is 44  
    tx hash is 0x67aa5cd277205e87678096fbf2692c7f8119b37d944c7c2a892e911b2f450f81  
    Confirmed in block: 11535811n  
    contract address is 0x9dfba8eb95e3e8fe54bcdf7d3e88fadb70578982  
    number is 0  
    write tx hash is 0xc34c89bfdcd320db33f2c38331ed3cc5fac8189e6c50561b7e6a6d896748bc88  
    Confirmed in block: 11535814n  
    number is 100  
    current block: 11535814  
    current block: 11535815  
</pre>
