import { Module } from '@nestjs/common';
import { CompaniesModule } from './companies/companies.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeesModule } from './employees/employees.module';
import { EventsModule } from './common/websocket/events.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI')
      }),
      inject: [ConfigService],
    }),
    CompaniesModule,
    EmployeesModule,
    EventsModule,
    SeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
