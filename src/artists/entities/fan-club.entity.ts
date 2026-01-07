import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Artist } from './artist.entity';

@Entity('fan_clubs')
export class FanClub {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'artist_id' })
    artistId: string;

    @ManyToOne(() => Artist)
    @JoinColumn({ name: 'artist_id' })
    artist: Artist;

    @Column()
    name: string;

    @Column() // 'ethereum', 'polygon', 'solana'
    blockchain: string;

    @Column({ name: 'contract_address' })
    contractAddress: string;

    @Column({ type: 'jsonb', default: {} })
    benefits: {
        presale_hours?: number;
        exclusive_design?: boolean;
        discount_percent?: number;
    };

    @Column({ name: 'tier_attribute_name', nullable: true })
    tierAttributeName: string;

    @Column({ default: true })
    active: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
