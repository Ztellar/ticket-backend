import {
    IsString, IsOptional, IsUUID, IsBoolean, IsNumber,
    IsDateString, IsEnum, IsArray, ValidateNested, IsUrl, Min, Max
} from 'class-validator';
import { Type } from 'class-transformer';
import { EventStatus } from '../entities/event.entity';

class CreateTicketTierDto {
    @IsString()
    name: string;

    @IsString()
    sectorId: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsNumber()
    @Min(1)
    quantity: number;

    @IsOptional()
    @IsUUID()
    fanClubId?: string;

    @IsOptional()
    @IsDateString()
    fanClubPresaleStart?: string;

    @IsOptional()
    @IsDateString()
    fanClubPresaleEnd?: string;

    @IsOptional()
    @IsNumber()
    fanClubPrice?: number;

    @IsOptional()
    @IsDateString()
    saleStart?: string;

    @IsOptional()
    @IsDateString()
    saleEnd?: string;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(10)
    maxPerUser?: number;

    @IsOptional()
    @IsUrl()
    designUrl?: string;

    @IsOptional()
    @IsUrl()
    fanClubDesignUrl?: string;
}

export class CreateEventDto {
    @IsUUID()
    artistId: string;

    @IsUUID()
    venueId: string;

    @IsString()
    name: string;

    @IsString()
    slug: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsUrl()
    imageUrl?: string;

    @IsDateString()
    eventDate: string;

    @IsOptional()
    @IsDateString()
    doorsOpenAt?: string;

    @IsOptional()
    @IsBoolean()
    resaleEnabled?: boolean;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    resaleLimitPercent?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(20)
    organizerRoyaltyPercent?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(20)
    artistRoyaltyPercent?: number;

    @IsOptional()
    @IsEnum(EventStatus)
    status?: EventStatus;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateTicketTierDto)
    tiers?: CreateTicketTierDto[];
}
