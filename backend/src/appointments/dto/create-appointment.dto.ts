import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { AppointmentStatus } from '../entities/appointment.entity';

export class CreateAppointmentDto {
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsNumber()
  @IsNotEmpty()
  patientId: number;

  @IsNumber()
  @IsOptional()
  professionalId?: number;

  @IsEnum(AppointmentStatus)
  @IsOptional()
  status?: AppointmentStatus;
}
