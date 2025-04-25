import { ChainConst } from '../config/config';
import { defineChain } from 'viem'
import { ChainClient }  from './chain_client'

export class LocalClient extends ChainClient {
  protected chainConfig = defineChain({
    id: 31337,
    name: 'Local Network',
    network: 'Local Network',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: [ChainConst.LOCAL_PROVIDER],
      },
    },
    testnet: true,
  });
}
