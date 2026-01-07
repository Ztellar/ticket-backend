import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateTicketDto {
    @IsString()
    name: string;

    @IsString()
    symbol: string;

    @IsString()
    metadataUri: string;

    @IsOptional()
    @IsString()
    owner?: string;

    @IsOptional()
    @IsUUID()
    tierId?: string;
}
