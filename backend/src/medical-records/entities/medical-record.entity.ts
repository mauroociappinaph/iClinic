import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  Column,
} from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';
import { Evolution } from './evolution.entity';

@Entity()
export class MedicalRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Patient, { eager: true })
  @JoinColumn({ name: 'patientId' })
  patient: Patient;

  @Column({ unique: true })
  patientId: number;

  @OneToMany(() => Evolution, (evolution) => evolution.medicalRecord, {
    cascade: true,
    eager: true,
  })
  evolutions: Evolution[];
}
