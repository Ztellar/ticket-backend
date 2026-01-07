import { IsString, IsOptional, IsUUID, IsBoolean, IsUrl } from 'class-validator';

export class CreateArtistDto {
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

    @IsString()
    royaltyWalletAddress: string;

    @IsOptional()
    @IsUUID()
    adminUserId?: string;
}
