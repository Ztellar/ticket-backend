import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateFanClubDto } from './create-fan-club.dto';

export class UpdateFanClubDto extends PartialType(
    OmitType(CreateFanClubDto, ['artistId'] as const)
) { }
