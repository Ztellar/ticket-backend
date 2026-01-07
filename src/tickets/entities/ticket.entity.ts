import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { TicketTier } from '../../events/entities/ticket-tier.entity';

export enum TicketStatus {
    ACTIVE = 'active',
    FOR_SALE = 'for_sale',
    PENDING_TRANSFER = 'pending_transfer',
    USED = 'used',
    CANCELLED = 'cancelled',
}

@Entity('tickets')
export class Ticket {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'tier_id' })
    tierId: string;

    @ManyToOne(() => TicketTier)
    @JoinColumn({ name: 'tier_id' })
    tier: TicketTier;

    @Column({ name: 'owner_id' })
    ownerId: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'owner_id' })
    owner: User;

    @Column({ name: 'original_buyer_id' })
    originalBuyerId: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'original_buyer_id' })
    originalBuyer: User;

    // Blockchain
    @Column({ name: 'mint_address', unique: true })
    mintAddress: string;

    @Column({ name: 'mint_tx_hash', nullable: true })
    mintTxHash: string;

    @Column({ type: 'enum', enum: TicketStatus, default: TicketStatus.ACTIVE })
    status: TicketStatus;

    // Reventa
    @Column({ name: 'resale_price', type: 'decimal', precision: 10, scale: 2, nullable: true })
    resalePrice: number;

    @Column({ name: 'listed_at', type: 'timestamp', nullable: true })
    listedAt: Date;

    // Uso
    @Column({ name: 'is_used', default: false })
    isUsed: boolean;

    @Column({ name: 'used_at', type: 'timestamp', nullable: true })
    usedAt: Date;

    @Column({ name: 'validated_by', nullable: true })
    validatedBy: string;

    // Metadata
    @Column({ name: 'is_fan_club_purchase', default: false })
    isFanClubPurchase: boolean;

    @Column({ name: 'design_type', default: 'standard' })
    designType: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;
}
