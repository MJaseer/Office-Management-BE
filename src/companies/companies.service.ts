import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from './schemas/company.schema';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { EventsGateway } from '../common/websocket/events.gateway';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: Model<Company>,
    private eventsGateway: EventsGateway,
  ) { }

  async findAll(): Promise<Company[]> {
    return this.companyModel.find({ recordStatus: 'N' }).sort({ createdAt: -1 }).exec();
  }

  async findById(id: string): Promise<Company> {
    const company = await this.companyModel.findOne({ _id: id, recordStatus: 'N' }).exec();
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    return company;
  }

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const createdCompany = new this.companyModel(createCompanyDto);
    const savedCompany = await createdCompany.save();

    // Emit WebSocket event
    this.eventsGateway.emitCompanyCreated(savedCompany);

    return savedCompany;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    const updatedCompany = await this.companyModel
      .findOneAndUpdate({ _id: id, recordStatus: 'N' }, updateCompanyDto, { new: true })
      .exec();

    if (!updatedCompany) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    // Emit WebSocket event
    this.eventsGateway.emitCompanyUpdate(updatedCompany);

    return updatedCompany;
  }

  async delete(id: string): Promise<Company> {
    const deletedCompany = await this.companyModel.findByIdAndUpdate({ _id: id, recordStatus: 'N' }, { recordStatus: 'D' }).exec();

    if (!deletedCompany) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    // Emit WebSocket event
    this.eventsGateway.emitCompanyDeleted(id);

    return deletedCompany;
  }

  async getCompaniesForDropdown(): Promise<{ _id: string, name: string }[]> {
    const companies = await this.companyModel
      .find({ recordStatus: 'N' }, '_id name')
      .sort({ name: 1 })
      .exec();

    return companies.map(company => ({
      _id: company._id.toString(),
      name: company.name
    }));
  }
}