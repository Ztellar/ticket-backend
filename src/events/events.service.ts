import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event, EventStatus } from './entities/event.entity';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event)
        private eventRepository: Repository<Event>,
    ) { }

    async findAll(): Promise<Event[]> {
        return this.eventRepository.find({
            where: { status: EventStatus.PUBLISHED },
            relations: ['artist', 'venue'],
            order: { eventDate: 'ASC' },
        });
    }

    async findOne(id: string): Promise<Event | null> {
        return this.eventRepository.findOne({
            where: { id },
            relations: ['artist', 'venue', 'organizer'],
        });
    }

    async findBySlug(slug: string): Promise<Event | null> {
        return this.eventRepository.findOne({
            where: { slug },
            relations: ['artist', 'venue', 'organizer'],
        });
    }

    async create(eventData: Partial<Event>): Promise<Event> {
        const event = this.eventRepository.create(eventData);
        return this.eventRepository.save(event);
    }

    async update(id: string, eventData: Partial<Event>): Promise<Event | null> {
        await this.eventRepository.update(id, eventData);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.eventRepository.softDelete(id);
    }
}
