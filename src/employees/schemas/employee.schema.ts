import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document, Schema as MongooseSchema } from 'mongoose';
import { Company } from '../../companies/schemas/company.schema';

export enum EmployeeRole {
  MANAGER = 'Manager',
  ADMIN = 'Admin',
  DEVELOPER = 'Developer'
}

@Schema({ timestamps: true })
export class Employee extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Company',
    required: true
  })
  company: Types.ObjectId;

  @Prop({
    type: String,
    enum: EmployeeRole,
    required: true
  })
  role: string;

  @Prop({ required: true, default:'N' })
  recordStatus: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);