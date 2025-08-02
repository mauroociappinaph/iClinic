import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateEvolutionDto {
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  prescription?: string;

  @IsNumber()
  @IsNotEmpty()
  medicalRecordId: number;
}
