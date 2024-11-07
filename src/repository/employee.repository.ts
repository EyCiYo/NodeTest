import { Repository } from "typeorm";
import Employee from "../entity/employee.entity";

class EmployeeRepository {
    constructor(private repository: Repository<Employee>) {}

    find = async (): Promise<Employee[]> => {
        return this.repository.find();
    };

    findOneBy = async (empId: number): Promise<Employee | null> => {
        return this.repository.findOneBy({
            id: empId,
        });
    };
    /*
    findOneByFilter =async (filter:Partial<Employee>) => {
        const repository = this.dataSource.getRepository(Employee);
        return repository.findOne({
            where: filter,
        });
    }
    */

    save = async (employee: Partial<Employee>) => {
        return this.repository.save(employee);
    };
}

export default EmployeeRepository;
