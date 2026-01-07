import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockchainModule } from './blockchain/blockchain.module';
import { TicketsModule } from './tickets/tickets.module';
import { EventsModule } from './events/events.module';
import { databaseConfig, jwtConfig, appConfig } from './config';

// Entities
import { User, LinkedWallet } from './users/entities';
import { Artist, FanClub } from './artists/entities';
import { Venue } from './venues/entities';
import { Event, TicketTier } from './events/entities';
import { Ticket, Transaction } from './tickets/entities';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig, appConfig],
      envFilePath: '.env',
    }),

    // Database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
        username: process.env.DATABASE_USER || 'spot',
        password: process.env.DATABASE_PASSWORD || 'spot_dev_password',
        database: process.env.DATABASE_NAME || 'spot_db',
        entities: [
          User, LinkedWallet,
          Artist, FanClub,
          Venue,
          Event, TicketTier,
          Ticket, Transaction,
        ],
        synchronize: process.env.NODE_ENV !== 'production',
        logging: process.env.NODE_ENV === 'development',
      }),
      inject: [ConfigService],
    }),

    // Rate Limiting
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),

    // Feature Modules
    BlockchainModule,
    TicketsModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
