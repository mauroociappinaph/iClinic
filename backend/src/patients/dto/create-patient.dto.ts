import { IsString, IsNotEmpty, IsDateString, IsOptional, IsNumber } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  dni: string;

  @IsString()
  @IsNotEmpty()
  contacto: string;

  @IsOptional()
  @IsString()
  obraSocial?: string;

  @IsDateString()
  fechaNacimiento: Date;

  @IsOptional()
  @IsString()
  alergias?: string;

  @IsOptional()
  @IsNumber()
  profesionalAsignadoId?: number;
}
