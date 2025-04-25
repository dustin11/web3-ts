import { ChainConst } from '../config/config';
import { defineChain } from 'viem'
import { ChainClient }  from './chain_client'

export class AssetHubClient extends ChainClient {
  protected chainConfig = defineChain({
    id: 420420421,
    name: 'Asset-Hub Westend Testnet',
    network: 'Asset-Hub Westend Testnet',
    nativeCurrency: {
      name: 'WND',
      symbol: 'WND',
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: [ChainConst.ASSET_HUB],
      },
    },
    testnet: true,
  });
  
}
