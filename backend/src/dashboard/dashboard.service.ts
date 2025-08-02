import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from '../appointments/entities/appointment.entity';
import { Patient } from '../patients/entities/patient.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
    @InjectRepository(Patient)
    private patientsRepository: Repository<Patient>,
  ) {}

  async getDashboardData() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const appointmentsToday = await this.appointmentsRepository.count({
      where: {
        date: today,
      },
    });

    const newPatientsToday = await this.patientsRepository.count({
      where: {
        // Assuming there's a creation date column in Patient entity
        // createdAt: Between(today, tomorrow),
      },
    });

    const totalPatients = await this.patientsRepository.count();

    return {
      appointmentsToday,
      newPatientsToday,
      totalPatients,
    };
  }
}
