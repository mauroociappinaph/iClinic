import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';
import { User } from '../../users/entities/user.entity';

export enum AppointmentStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  CANCELLED = 'Cancelled',
  COMPLETED = 'Completed',
}

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  time: string;

  @Column({ type: 'varchar', default: AppointmentStatus.PENDING })
  status: AppointmentStatus;

  @ManyToOne(() => Patient, { eager: true })
  @JoinColumn({ name: 'patientId' })
  patient: Patient;

  @Column()
  patientId: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'professionalId' })
  professional: User;

  @Column({ nullable: true })
  professionalId: number;
}
