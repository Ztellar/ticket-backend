import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Artist } from '../../artists/entities/artist.entity';
import { Venue } from '../../venues/entities/venue.entity';

export enum EventStatus {
    DRAFT = 'draft',
    PUBLISHED = 'published',
    ON_SALE = 'on_sale',
    SOLD_OUT = 'sold_out',
    CANCELLED = 'cancelled',
    COMPLETED = 'completed',
}

@Entity('events')
export class Event {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'organizer_id' })
    organizerId: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'organizer_id' })
    organizer: User;

    @Column({ name: 'artist_id' })
    artistId: string;

    @ManyToOne(() => Artist)
    @JoinColumn({ name: 'artist_id' })
    artist: Artist;

    @Column({ name: 'venue_id' })
    venueId: string;

    @ManyToOne(() => Venue)
    @JoinColumn({ name: 'venue_id' })
    venue: Venue;

    @Column()
    name: string;

    @Column({ unique: true })
    slug: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ name: 'image_url', nullable: true })
    imageUrl: string;

    @Column({ name: 'event_date', type: 'timestamp' })
    eventDate: Date;

    @Column({ name: 'doors_open_at', type: 'timestamp', nullable: true })
    doorsOpenAt: Date;

    // Reventa
    @Column({ name: 'resale_enabled', default: true })
    resaleEnabled: boolean;

    @Column({ name: 'resale_limit_percent', default: 20 })
    resaleLimitPercent: number;

    @Column({ name: 'organizer_royalty_percent', type: 'decimal', precision: 5, scale: 2, default: 5 })
    organizerRoyaltyPercent: number;

    @Column({ name: 'artist_royalty_percent', type: 'decimal', precision: 5, scale: 2, default: 5 })
    artistRoyaltyPercent: number;

    @Column({ type: 'enum', enum: EventStatus, default: EventStatus.DRAFT })
    status: EventStatus;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;
}
