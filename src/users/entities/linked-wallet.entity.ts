import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('linked_wallets')
export class LinkedWallet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'user_id' })
    userId: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    blockchain: string; // 'ethereum', 'polygon', 'solana'

    @Column({ name: 'wallet_address' })
    walletAddress: string;

    @CreateDateColumn({ name: 'verified_at' })
    verifiedAt: Date;
}
