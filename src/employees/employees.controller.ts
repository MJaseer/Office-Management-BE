import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  async getAllEmployees(@Query('company') companyId?: string) {
    if (companyId) {
      return await this.employeesService.findByCompany(companyId);
    }
    return await this.employeesService.findAll();
  }

  @Get(':id')
  async getEmployeeById(@Param('id') id: string) {
    return await this.employeesService.findById(id);
  }

  @Post()
  async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    return await this.employeesService.create(createEmployeeDto);
  }

  @Put(':id')
  async updateEmployee(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return await this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteEmployee(@Param('id') id: string) {
    return await this.employeesService.delete(id);
  }
}