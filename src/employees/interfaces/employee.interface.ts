import { Document } from 'mongoose';
import { Company } from '../../companies/schemas/company.schema';

export interface Employee extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: Company;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}