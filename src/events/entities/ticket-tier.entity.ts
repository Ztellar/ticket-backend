import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Event } from './event.entity';
import { FanClub } from '../../artists/entities/fan-club.entity';

@Entity('ticket_tiers')
export class TicketTier {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'event_id' })
    eventId: string;

    @ManyToOne(() => Event)
    @JoinColumn({ name: 'event_id' })
    event: Event;

    @Column()
    name: string;

    @Column({ name: 'sector_id' })
    sectorId: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column()
    quantity: number;

    @Column({ default: 0 })
    sold: number;

    // Preventa fan club
    @Column({ name: 'fan_club_id', nullable: true })
    fanClubId: string;

    @ManyToOne(() => FanClub, { nullable: true })
    @JoinColumn({ name: 'fan_club_id' })
    fanClub: FanClub;

    @Column({ name: 'fan_club_presale_start', type: 'timestamp', nullable: true })
    fanClubPresaleStart: Date;

    @Column({ name: 'fan_club_presale_end', type: 'timestamp', nullable: true })
    fanClubPresaleEnd: Date;

    @Column({ name: 'fan_club_price', type: 'decimal', precision: 10, scale: 2, nullable: true })
    fanClubPrice: number;

    // Venta general
    @Column({ name: 'sale_start', type: 'timestamp', nullable: true })
    saleStart: Date;

    @Column({ name: 'sale_end', type: 'timestamp', nullable: true })
    saleEnd: Date;

    @Column({ name: 'max_per_user', default: 4 })
    maxPerUser: number;

    // Diseños
    @Column({ name: 'design_url', nullable: true })
    designUrl: string;

    @Column({ name: 'fan_club_design_url', nullable: true })
    fanClubDesignUrl: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
