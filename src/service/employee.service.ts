import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";

class EmployeeService {
    constructor(private employeeRepository: EmployeeRepository) {}

    findAll = async (): Promise<Employee[]> => {
        return this.employeeRepository.find();
    };
    findById = async (id: string): Promise<Employee | null> => {
        const numId = Number(id);
        return this.employeeRepository.findOneBy(numId);
    };
    /*
    this is for the method that uses Partial<Employee> as argument
    findById = async(id:number) => {
        return this.employeeRepository.findOneByFilter({id,})
    }
    */
}

export default EmployeeService;
