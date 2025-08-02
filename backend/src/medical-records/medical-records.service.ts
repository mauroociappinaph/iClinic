import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalRecord } from './entities/medical-record.entity';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { Evolution } from './entities/evolution.entity';
import { CreateEvolutionDto } from './dto/create-evolution.dto';

@Injectable()
export class MedicalRecordsService {
  constructor(
    @InjectRepository(MedicalRecord)
    private medicalRecordsRepository: Repository<MedicalRecord>,
    @InjectRepository(Evolution)
    private evolutionsRepository: Repository<Evolution>,
  ) {}

  async create(
    createMedicalRecordDto: CreateMedicalRecordDto,
  ): Promise<MedicalRecord> {
    const medicalRecord = this.medicalRecordsRepository.create(
      createMedicalRecordDto,
    );
    return this.medicalRecordsRepository.save(medicalRecord);
  }

  findAll(): Promise<MedicalRecord[]> {
    return this.medicalRecordsRepository.find();
  }

  findOne(id: number): Promise<MedicalRecord | null> {
    return this.medicalRecordsRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateMedicalRecordDto: UpdateMedicalRecordDto,
  ): Promise<MedicalRecord | null> {
    const medicalRecord = await this.medicalRecordsRepository.preload({
      id: id,
      ...updateMedicalRecordDto,
    });
    if (!medicalRecord) {
      return null;
    }
    return this.medicalRecordsRepository.save(medicalRecord);
  }

  async remove(id: number): Promise<void> {
    await this.medicalRecordsRepository.delete(id);
  }

  async addEvolution(
    medicalRecordId: number,
    createEvolutionDto: CreateEvolutionDto,
  ): Promise<Evolution> {
    const medicalRecord = await this.medicalRecordsRepository.findOneBy({
      id: medicalRecordId,
    });
    if (!medicalRecord) {
      throw new NotFoundException(
        `Medical record with ID ${medicalRecordId} not found`,
      );
    }
    const evolution = this.evolutionsRepository.create({
      ...createEvolutionDto,
      medicalRecordId: medicalRecord.id,
    });
    return this.evolutionsRepository.save(evolution);
  }

  async findEvolutionsByMedicalRecord(
    medicalRecordId: number,
  ): Promise<Evolution[]> {
    return this.evolutionsRepository.find({ where: { medicalRecordId } });
  }
}
