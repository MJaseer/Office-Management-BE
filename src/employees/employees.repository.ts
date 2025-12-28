import { Injectable } from "@nestjs/common";

@Injectable()
export class EmployeeRepository  {

    logGello(){
        return 'hello';
    }
}