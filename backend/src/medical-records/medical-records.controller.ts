import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { CreateEvolutionDto } from './dto/create-evolution.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('medical-records')
export class MedicalRecordsController {
  constructor(private readonly medicalRecordsService: MedicalRecordsService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.RECEPCION)
  @UsePipes(new ValidationPipe())
  create(@Body() createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.medicalRecordsService.create(createMedicalRecordDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.RECEPCION, UserRole.PROFESIONAL)
  findAll() {
    return this.medicalRecordsService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.RECEPCION, UserRole.PROFESIONAL)
  findOne(@Param('id') id: string) {
    return this.medicalRecordsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.RECEPCION)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(
    @Param('id') id: string,
    @Body() updateMedicalRecordDto: UpdateMedicalRecordDto,
  ) {
    return this.medicalRecordsService.update(+id, updateMedicalRecordDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.RECEPCION)
  remove(@Param('id') id: string) {
    return this.medicalRecordsService.remove(+id);
  }

  @Post(':id/evolutions')
  @Roles(UserRole.ADMIN, UserRole.PROFESIONAL)
  @UsePipes(new ValidationPipe())
  addEvolution(
    @Param('id') medicalRecordId: string,
    @Body() createEvolutionDto: CreateEvolutionDto,
  ) {
    return this.medicalRecordsService.addEvolution(
      +medicalRecordId,
      createEvolutionDto,
    );
  }

  @Get(':id/evolutions')
  @Roles(UserRole.ADMIN, UserRole.RECEPCION, UserRole.PROFESIONAL)
  findEvolutionsByMedicalRecord(@Param('id') medicalRecordId: string) {
    return this.medicalRecordsService.findEvolutionsByMedicalRecord(
      +medicalRecordId,
    );
  }
}
