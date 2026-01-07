import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    port: parseInt(process.env.PORT ?? '3000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    walletEncryptionKey: process.env.WALLET_ENCRYPTION_KEY,
    solanaRpcUrl: process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com',
    solanaNetwork: process.env.SOLANA_NETWORK || 'devnet',
}));
