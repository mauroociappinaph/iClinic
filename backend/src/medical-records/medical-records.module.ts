import { Module } from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service';
import { MedicalRecordsController } from './medical-records.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalRecord } from './entities/medical-record.entity';
import { Evolution } from './entities/evolution.entity';
import { Patient } from '../patients/entities/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalRecord, Evolution, Patient])],
  controllers: [MedicalRecordsController],
  providers: [MedicalRecordsService],
})
export class MedicalRecordsModule {}
