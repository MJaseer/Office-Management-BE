import { Document } from 'mongoose';

export interface Company extends Document {
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}