import { IsString, IsEmail, IsEnum, IsMongoId } from 'class-validator';
import { EmployeeRole } from '../schemas/employee.schema';
import { Types } from 'mongoose';

export class CreateEmployeeDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsMongoId()
  company: Types.ObjectId;

  @IsEnum(EmployeeRole)
  role: EmployeeRole;
}