import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  idNumber: string;

  @IsString()
  @IsNotEmpty()
  contact: string;

  @IsOptional()
  @IsString()
  insurance?: string;

  @IsDateString()
  birthDate: Date;

  @IsOptional()
  @IsString()
  allergies?: string;

  @IsOptional()
  @IsNumber()
  assignedProfessionalId?: number;
}
