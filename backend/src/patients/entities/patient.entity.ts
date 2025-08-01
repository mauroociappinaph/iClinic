import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  dni: string;

  @Column()
  contacto: string;

  @Column({ nullable: true })
  obraSocial: string;

  @Column({ type: 'date' })
  fechaNacimiento: Date;

  @Column({ nullable: true })
  alergias: string;

  @Column({ nullable: true })
  profesionalAsignadoId: number;
}
