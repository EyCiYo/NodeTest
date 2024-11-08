import { Repository } from "typeorm";
import Employee from "../entity/employee.entity";

class EmployeeRepository {
    constructor(private repository: Repository<Employee>) {}

    find = async (): Promise<Employee[]> => {
        return this.repository.find({ relations: ["address"] });
    };

    findOneBy = async (empId: Partial<Employee>): Promise<Employee | null> => {
        return this.repository.findOne({
            where: empId,
            relations: ["address"],
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

    update = async (employee: Partial<Employee>) => {
        return this.repository.update({ id: employee.id }, employee);
    };

    softRemove = (employee: Employee) => {
        return this.repository.softRemove(employee);
    };
}

export default EmployeeRepository;
