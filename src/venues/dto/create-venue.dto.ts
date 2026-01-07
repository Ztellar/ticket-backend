import { IsString, IsOptional, IsArray, ValidateNested, IsBoolean, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class SectorDto {
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsNumber()
    capacity: number;
}

export class CreateVenueDto {
    @IsString()
    name: string;

    @IsString()
    slug: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    city?: string;

    @IsOptional()
    @IsString()
    country?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SectorDto)
    sectors: SectorDto[];

    @IsOptional()
    @IsBoolean()
    active?: boolean;
}
