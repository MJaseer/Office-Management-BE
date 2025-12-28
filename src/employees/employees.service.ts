import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Employee } from './schemas/employee.schema';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EventsGateway } from '../common/websocket/events.gateway';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
    private eventsGateway: EventsGateway,
  ) { }

  async findAll(): Promise<Employee[]> {
    return this.employeeModel
      .find({ recordStatus: 'N' })
      .populate('company', 'name')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findById(id: string): Promise<Employee> {
    const employee = await this.employeeModel
      .findOne({ _id: id, recordStatus: 'N' })
      .populate('company', 'name address phone email')
      .exec();

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    // Check if email already exists
    const existingEmployee = await this.employeeModel
      .findOne({ email: createEmployeeDto.email, recordStatus: 'N' })
      .exec();

    if (existingEmployee) {
      throw new ConflictException('Employee with this email already exists');
    }

    const createdEmployee = new this.employeeModel({
      ...createEmployeeDto,
      company: new Types.ObjectId(createEmployeeDto.company),
    });

    const savedEmployee = await createdEmployee.save();
    await savedEmployee.populate('company', 'name');

    // Emit WebSocket event
    this.eventsGateway.emitEmployeeCreated(savedEmployee);

    return savedEmployee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    // Check if email is being updated to an existing one
    if (updateEmployeeDto.email) {
      const existingEmployee = await this.employeeModel
        .findOne({
          email: updateEmployeeDto.email,
          _id: { $ne: id },
          recordStatus: 'N'
        })
        .exec();

      if (existingEmployee) {
        throw new ConflictException('Employee with this email already exists');
      }
    }

    const updateData = { ...updateEmployeeDto };

    if (updateEmployeeDto.company) {
      updateData.company = new Types.ObjectId(updateEmployeeDto.company);
    }

    const updatedEmployee = await this.employeeModel
      .findOneAndUpdate({ _id: id, recordStatus: 'N' }, updateData, { new: true })
      .populate('company', 'name')
      .exec();

    if (!updatedEmployee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    // Emit WebSocket event
    this.eventsGateway.emitEmployeeUpdate(updatedEmployee);

    return updatedEmployee;
  }

  async delete(id: string): Promise<Employee> {
    const deletedEmployee = await this.employeeModel
      .findOneAndUpdate({ _id: id, recordStatus: 'N' }, { recordStatus: 'D' })
      .populate('company', 'name')
      .exec();

    if (!deletedEmployee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    // Emit WebSocket event
    this.eventsGateway.emitEmployeeDeleted(id);

    return deletedEmployee;
  }

  async findByCompany(companyId: string): Promise<Employee[]> {
    return this.employeeModel
      .find({ company: new Types.ObjectId(companyId),recordStatus: 'N' })
      .populate('company', 'name')
      .sort({ createdAt: -1 })
      .exec();
  }
}