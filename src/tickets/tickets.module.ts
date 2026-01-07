import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { BlockchainModule } from '../blockchain/blockchain.module';
import { Ticket, Transaction } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, Transaction]),
    BlockchainModule,
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService],
})
export class TicketsModule { }
