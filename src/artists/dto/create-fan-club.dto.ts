import { IsString, IsUUID, IsOptional, IsObject, IsBoolean } from 'class-validator';

export class CreateFanClubDto {
    @IsUUID()
    artistId: string;

    @IsString()
    name: string;

    @IsString()
    blockchain: string; // 'ethereum', 'polygon', 'solana'

    @IsString()
    contractAddress: string;

    @IsOptional()
    @IsObject()
    benefits?: {
        presale_hours?: number;
        exclusive_design?: boolean;
        discount_percent?: number;
    };

    @IsOptional()
    @IsString()
    tierAttributeName?: string;

    @IsOptional()
    @IsBoolean()
    active?: boolean;
}
