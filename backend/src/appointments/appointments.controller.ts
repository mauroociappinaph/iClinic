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
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.RECEPCION)
  @UsePipes(new ValidationPipe())
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.RECEPCION, UserRole.PROFESIONAL)
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.RECEPCION, UserRole.PROFESIONAL)
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.RECEPCION)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.RECEPCION)
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }

  @Get('upcoming')
  @Roles(UserRole.ADMIN, UserRole.RECEPCION, UserRole.PROFESIONAL)
  findUpcoming() {
    return this.appointmentsService.findUpcomingAppointments();
  }
}
