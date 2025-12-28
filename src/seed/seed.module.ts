import { MongooseModule } from "@nestjs/mongoose";
import { Module } from '@nestjs/common';
import { Company, CompanySchema } from "src/companies/schemas/company.schema";
import { Employee, EmployeeSchema } from "src/employees/schemas/employee.schema";
import { SeedService } from "./seed.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchema }]),
  ],
  providers: [SeedService],
})
export class SeedModule {}
