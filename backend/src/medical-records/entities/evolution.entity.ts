import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MedicalRecord } from './medical-record.entity';

@Entity()
export class Evolution {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  prescription: string;

  @ManyToOne(() => MedicalRecord, (medicalRecord) => medicalRecord.evolutions)
  @JoinColumn({ name: 'medicalRecordId' })
  medicalRecord: MedicalRecord;

  @Column()
  medicalRecordId: number;
}
