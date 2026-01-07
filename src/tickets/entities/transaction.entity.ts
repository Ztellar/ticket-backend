import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Ticket } from './ticket.entity';

export enum TransactionType {
    PURCHASE = 'purchase',
    RESALE = 'resale',
    REFUND = 'refund',
}

export enum PaymentStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    COMPLETED = 'completed',
    FAILED = 'failed',
    REFUNDED = 'refunded',
}

@Entity('transactions')
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'ticket_id' })
    ticketId: string;

    @ManyToOne(() => Ticket)
    @JoinColumn({ name: 'ticket_id' })
    ticket: Ticket;

    @Column({ type: 'enum', enum: TransactionType })
    type: TransactionType;

    @Column({ name: 'buyer_id' })
    buyerId: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'buyer_id' })
    buyer: User;

    @Column({ name: 'seller_id', nullable: true })
    sellerId: string;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'seller_id' })
    seller: User;

    // Montos CLP
    @Column({ name: 'base_price', type: 'decimal', precision: 10, scale: 2 })
    basePrice: number;

    @Column({ name: 'spot_fee', type: 'decimal', precision: 10, scale: 2 })
    spotFee: number;

    @Column({ name: 'processor_fee', type: 'decimal', precision: 10, scale: 2 })
    processorFee: number;

    @Column({ name: 'organizer_royalty', type: 'decimal', precision: 10, scale: 2, default: 0 })
    organizerRoyalty: number;

    @Column({ name: 'artist_royalty', type: 'decimal', precision: 10, scale: 2, default: 0 })
    artistRoyalty: number;

    @Column({ name: 'iva_amount', type: 'decimal', precision: 10, scale: 2, default: 0 })
    ivaAmount: number;

    @Column({ name: 'total_paid', type: 'decimal', precision: 10, scale: 2 })
    totalPaid: number;

    // Pago
    @Column({ name: 'payment_method', nullable: true })
    paymentMethod: string;

    @Column({ name: 'payment_reference', nullable: true })
    paymentReference: string;

    @Column({ name: 'payment_status', type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
    paymentStatus: PaymentStatus;

    // Blockchain
    @Column({ name: 'blockchain_tx_hash', nullable: true })
    blockchainTxHash: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
