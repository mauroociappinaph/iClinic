import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMedicalRecordDto {
  @IsNumber()
  @IsNotEmpty()
  patientId: number;
}
