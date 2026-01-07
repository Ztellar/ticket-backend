import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { BlockchainService } from '../blockchain/blockchain.service';
import { Ticket, TicketStatus } from './entities/ticket.entity';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private readonly blockchainService: BlockchainService,
  ) { }

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const { name, symbol, metadataUri, owner } = createTicketDto;

    // Mint NFT on Solana
    const result = await this.blockchainService.mintTicket(
      metadataUri,
      name,
      symbol,
      owner,
    );

    // Create ticket record
    const ticket = this.ticketRepository.create({
      mintAddress: result.mintAddress,
      mintTxHash: result.transactionHash,
      ownerId: owner,
      originalBuyerId: owner,
      tierId: createTicketDto.tierId,
      status: TicketStatus.ACTIVE,
    });

    return this.ticketRepository.save(ticket);
  }

  async findAllByOwner(ownerId: string): Promise<Ticket[]> {
    return this.ticketRepository.find({
      where: { ownerId },
      relations: ['tier', 'tier.event'],
    });
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find({
      relations: ['tier', 'owner'],
    });
  }

  async findOne(id: string): Promise<Ticket | null> {
    return this.ticketRepository.findOne({
      where: { id },
      relations: ['tier', 'tier.event', 'owner'],
    });
  }

  async update(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket | null> {
    await this.ticketRepository.update(id, updateTicketDto as any);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.ticketRepository.softDelete(id);
  }
}
