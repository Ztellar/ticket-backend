import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Event, TicketTier } from './entities';

@Module({
    imports: [TypeOrmModule.forFeature([Event, TicketTier])],
    controllers: [EventsController],
    providers: [EventsService],
    exports: [EventsService],
})
export class EventsModule { }
