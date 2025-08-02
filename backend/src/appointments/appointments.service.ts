import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
  ) {}

  create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const appointment =
      this.appointmentsRepository.create(createAppointmentDto);
    return this.appointmentsRepository.save(appointment);
  }

  findAll(): Promise<Appointment[]> {
    return this.appointmentsRepository.find();
  }

  findOne(id: number): Promise<Appointment | null> {
    return this.appointmentsRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment | null> {
    const appointment = await this.appointmentsRepository.preload({
      id: id,
      ...updateAppointmentDto,
    });
    if (!appointment) {
      return null;
    }
    return this.appointmentsRepository.save(appointment);
  }

  async remove(id: number): Promise<void> {
    await this.appointmentsRepository.delete(id);
  }

  async findUpcomingAppointments(): Promise<Appointment[]> {
    const now = new Date();
    return this.appointmentsRepository.createQueryBuilder('appointment')
      .where('appointment.date > :now', { now: now.toISOString().split('T')[0] })
      .andWhere('appointment.status != :status', { status: 'Cancelled' })
      .orderBy('appointment.date', 'ASC')
      .addOrderBy('appointment.time', 'ASC')
      .getMany();
  }
}
