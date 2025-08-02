import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepository: Repository<Patient>,
  ) {}

  findAll(): Promise<Patient[]> {
    return this.patientsRepository.find();
  }

  findOne(id: number): Promise<Patient | null> {
    return this.patientsRepository.findOneBy({ id });
  }

  create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const patient = this.patientsRepository.create(createPatientDto);
    return this.patientsRepository.save(patient);
  }

  async update(
    id: number,
    updatePatientDto: UpdatePatientDto,
  ): Promise<Patient | null> {
    const patient = await this.patientsRepository.preload({
      id: id,
      ...updatePatientDto,
    });
    if (!patient) {
      return null;
    }
    return this.patientsRepository.save(patient);
  }

  async remove(id: number): Promise<void> {
    await this.patientsRepository.delete(id);
  }
}
