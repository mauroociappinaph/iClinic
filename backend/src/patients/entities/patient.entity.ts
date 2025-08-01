import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  idNumber: string;

  @Column()
  contact: string;

  @Column({ nullable: true })
  insurance: string;

  @Column({ type: 'date' })
  birthDate: Date;

  @Column({ nullable: true })
  allergies: string;

  @Column({ nullable: true })
  assignedProfessionalId: number;
}
