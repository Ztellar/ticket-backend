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

@Entity('artists')
export class Artist {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'admin_user_id', nullable: true })
    adminUserId: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'admin_user_id' })
    adminUser: User;

    @Column()
    name: string;

    @Column({ unique: true })
    slug: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ name: 'image_url', nullable: true })
    imageUrl: string;

    @Column({ name: 'royalty_wallet_address' })
    royaltyWalletAddress: string;

    @Column({ default: false })
    verified: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;
}
