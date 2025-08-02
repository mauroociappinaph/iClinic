import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from '../appointments/entities/appointment.entity';
import { Patient } from '../patients/entities/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Patient])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
