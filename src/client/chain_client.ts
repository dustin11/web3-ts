import { ethers } from 'ethers';
import { defineChain, createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import dotenv from 'dotenv';

dotenv.config();

export abstract class ChainClient {
  protected abstract chainConfig: ReturnType<typeof defineChain>;
  protected privateKey: `0x${string}`;

  constructor() {
    this.privateKey = this.normalizePrivateKey();
  }

  private normalizePrivateKey(): `0x${string}` {
    const key = process.env.PRIVATE_KEY;
    if (!key) throw new Error("PRIVATE_KEY is not defined in environment variables");
    return key.startsWith('0x') ? key as `0x${string}` : `0x${key}`;
  }

  // Ethers.js 相关方法
  get ethersProvider(): ethers.JsonRpcProvider {
    return new ethers.JsonRpcProvider(this.chainConfig.rpcUrls.default.http[0]);
  }

  get ethersWallet(): ethers.Wallet {
    return new ethers.Wallet(this.privateKey, this.ethersProvider);
  }

  // Viem 相关方法
  get viemPublicClient() {
    return createPublicClient({
      chain: this.chainConfig,
      transport: http()
    });
  }

  get viemAccount() {
    return privateKeyToAccount(this.privateKey);
  }

  get viemWalletClient() {
    return createWalletClient({
      account: this.viemAccount,
      chain: this.chainConfig,
      transport: http()
    });
  }



  // 通用方法
  async getBalance(address?: string): Promise<string> {
    const target = address || this.ethersWallet.address;
    const balance = await this.viemPublicClient.getBalance({
      address: target as `0x${string}`
    });
    return balance.toString();
  }
}
