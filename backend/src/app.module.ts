import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { PatientsModule } from './patients/patients.module';
import { Patient } from './patients/entities/patient.entity';
import { AppointmentsModule } from './appointments/appointments.module';
import { Appointment } from './appointments/entities/appointment.entity';
import { MedicalRecordsModule } from './medical-records/medical-records.module';
import { MedicalRecord } from './medical-records/entities/medical-record.entity';
import { Evolution } from './medical-records/entities/evolution.entity';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Patient, Appointment, MedicalRecord, Evolution],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    PatientsModule,
    AppointmentsModule,
    MedicalRecordsModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
