import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
} from 'typeorm';

export enum UserRole {
    CLIENT = 'client',
    ORGANIZER = 'organizer',
    ARTIST = 'artist',
    STAFF = 'staff',
    ADMIN = 'admin',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column({ name: 'password_hash' })
    passwordHash: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENT })
    role: UserRole;

    // Wallet custodial
    @Column({ name: 'wallet_public_key' })
    walletPublicKey: string;

    @Column({ name: 'wallet_secret_encrypted', type: 'text' })
    walletSecretEncrypted: string;

    @Column({ name: 'wallet_key_version', default: 1 })
    walletKeyVersion: number;

    // Profile
    @Column({ name: 'first_name', nullable: true })
    firstName: string;

    @Column({ name: 'last_name', nullable: true })
    lastName: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    rut: string;

    // Estado
    @Column({ name: 'email_verified', default: false })
    emailVerified: boolean;

    // Auditoría
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;
}
