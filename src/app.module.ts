import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockchainModule } from './blockchain/blockchain.module';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [BlockchainModule, TicketsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
