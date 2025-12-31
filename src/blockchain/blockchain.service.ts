import { Injectable, OnModuleInit } from '@nestjs/common';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { Umi, generateSigner, keypairIdentity, percentAmount, sol, createSignerFromKeypair } from '@metaplex-foundation/umi';
import { createNft, mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import bs58 from 'bs58';
import * as fs from 'fs';

@Injectable()
export class BlockchainService implements OnModuleInit {
    private umi: Umi;

    async onModuleInit() {
        // Connect to Solana Devnet
        this.umi = createUmi('https://api.devnet.solana.com')
            .use(mplTokenMetadata());

        let authority;
        const keypairFile = 'backend-wallet.json';

        try {
            if (fs.existsSync(keypairFile)) {
                // Load existing keypair
                const secretKey = new Uint8Array(JSON.parse(fs.readFileSync(keypairFile, 'utf-8')));
                authority = this.umi.eddsa.createKeypairFromSecretKey(secretKey);
                console.log('Loaded existing wallet from backend-wallet.json');
            } else {
                // Generate new keypair
                authority = generateSigner(this.umi);
                // Save to file
                fs.writeFileSync(keypairFile, JSON.stringify(Array.from(authority.secretKey)));
                console.log('Created new wallet and saved to backend-wallet.json');
            }
        } catch (err) {
            console.error('Error managing keypair file:', err);
            authority = generateSigner(this.umi);
        }

        const signer = createSignerFromKeypair(this.umi, authority);
        this.umi.use(keypairIdentity(signer));

        console.log('Blockchain Service Initialized. Authority:', authority.publicKey.toString());

        // MVP FIX: Only request airdrop if balance is low (< 1 SOL)
        try {
            const balance = await this.umi.rpc.getBalance(authority.publicKey);
            console.log(`Current Balance: ${Number(balance.basisPoints) / 1000000000} SOL`);

            if (Number(balance.basisPoints) < 1000000000) {
                console.log('Low balance. Requesting Airdrop of 1 SOL...');
                await this.umi.rpc.airdrop(authority.publicKey, sol(1));
                console.log('Airdrop Successful!');
            }
        } catch (error) {
            console.warn('Airdrop failed (Rate Limit?). Please fund manually via https://faucet.solana.com using the address above.');
            // Do not throw error, let the app start so user can fund manually
        }
    }

    async mintTicket(metadataUri: string, name: string, symbol: string) {
        console.log(`Minting NFT: ${name} (${symbol})`);

        // 1. Generate a new Mint Keypair for the NFT
        const mint = generateSigner(this.umi);

        // 2. Create the NFT on-chain
        const { signature } = await createNft(this.umi, {
            mint,
            name,
            symbol,
            uri: metadataUri,
            sellerFeeBasisPoints: percentAmount(5), // 5% Royalty
            isCollection: false,
        }).sendAndConfirm(this.umi);

        return {
            mintAddress: mint.publicKey.toString(),
            transactionHash: bs58.encode(signature),
            status: 'Minted'
        };
    }
}
