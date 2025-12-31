import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { BlockchainService } from '../blockchain/blockchain.service';

@Injectable()
export class TicketsService {
  constructor(private readonly blockchainService: BlockchainService) { }

  async create(createTicketDto: CreateTicketDto) {
    // For MVP: We assume the DTO comes with metadata for the Demo
    // In production, we would fetch Event details from DB based on eventId
    const { name, symbol, metadataUri } = createTicketDto;

    return await this.blockchainService.mintTicket(metadataUri, name, symbol);
  }

  findAll() {
    return `This action returns all tickets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
