import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from '../companies/schemas/company.schema';
import { Employee, EmployeeRole } from '../employees/schemas/employee.schema';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>,
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
  ) {}

  async onModuleInit() {
    // Check if data already exists
    const companiesCount = await this.companyModel.countDocuments();
    
    if (companiesCount === 0) {
      await this.seedData();
    }
  }

  private async seedData() {
    console.log('Seeding initial data...');

    // Create sample companies
    const companies = await this.companyModel.create([
      {
        name: 'Tech Solutions Inc.',
        address: '123 Tech Street, San Francisco, CA',
        phone: '+1-555-123-4567',
        email: 'info@techsolutions.com',
      },
      {
        name: 'Innovate Corp',
        address: '456 Innovation Ave, New York, NY',
        phone: '+1-555-987-6543',
        email: 'contact@innovatecorp.com',
      },
      {
        name: 'Global Systems Ltd.',
        address: '789 Global Way, London, UK',
        phone: '+44-20-1234-5678',
        email: 'support@globalsystems.com',
      },
    ]);

    console.log(`Created ${companies.length} companies`);

    // Create sample employees
    const employeesData = [
      {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@techsolutions.com',
        phone: '+1-555-111-2222',
        company: companies[0]._id,
        role: EmployeeRole.MANAGER,
      },
      {
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.j@techsolutions.com',
        phone: '+1-555-333-4444',
        company: companies[0]._id,
        role: EmployeeRole.DEVELOPER,
      },
      {
        firstName: 'Michael',
        lastName: 'Brown',
        email: 'michael.b@innovatecorp.com',
        phone: '+1-555-555-6666',
        company: companies[1]._id,
        role: EmployeeRole.ADMIN,
      },
      {
        firstName: 'Emma',
        lastName: 'Wilson',
        email: 'emma.w@innovatecorp.com',
        phone: '+1-555-777-8888',
        company: companies[1]._id,
        role: EmployeeRole.DEVELOPER,
      },
      {
        firstName: 'David',
        lastName: 'Taylor',
        email: 'david.t@globalsystems.com',
        phone: '+44-20-8765-4321',
        company: companies[2]._id,
        role: EmployeeRole.MANAGER,
      },
    ];

    await this.employeeModel.create(employeesData);
    console.log(`Created ${employeesData.length} employees`);

    console.log('Database seeding completed!');
  }
}