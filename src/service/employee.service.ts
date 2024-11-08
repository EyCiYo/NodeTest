import { AddressDto } from "../dto/createAddress.dto";
import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import EntityNotFoundException from "../exeption/entityNotFound.exception";
import IncorrectPasswordException from "../exeption/incorrectPassword.exception";
import EmployeeRepository from "../repository/employee.repository";
import { JWT_SECRET, JWT_VALIDITY } from "../utils/constants";
import { CustomError, ErrorCodes } from "../utils/error.code";
import { jwtPayload } from "../utils/jwtPayload";
import { Role } from "../utils/role.enum";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

class EmployeeService {
    constructor(private employeeRepository: EmployeeRepository) {}

    findAll = async (): Promise<Employee[]> => {
        return this.employeeRepository.find();
    };
    findById = async (id: number): Promise<Employee | null> => {
        return this.employeeRepository.findOneBy({ id: id });
    };
    /*
    this is for the method that uses Partial<Employee> as argument
    findById = async(id:number) => {
        return this.employeeRepository.findOneByFilter({id,})
    }
    */
    createEmployee = async (
        name: string,
        email: string,
        address: AddressDto,
        password: string,
        role: Role
    ) => {
        console.log(role);
        const newEmployee = new Employee();
        newEmployee.name = name;
        newEmployee.email = email;

        const newAddress = new Address();
        newAddress.line1 = address.line1;
        newAddress.pincode = address.pincode;

        newEmployee.address = newAddress;
        newEmployee.password = password ? await bcrypt.hash(password, 10) : "";
        newEmployee.role = role;

        return this.employeeRepository.save(newEmployee);
    };

    updateEmployee = async (employee: Employee) => {
        employee.password = await bcrypt.hash(employee.password, 10);
        return this.employeeRepository.save(employee);
    };

    deleteEmployee = async (id: number) => {
        const emp = await this.employeeRepository.findOneBy({ id });
        if (!emp) {
            throw new EntityNotFoundException(
                ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND
            );
        }
        return this.employeeRepository.softRemove(emp);
    };

    loginEmployee = async (email: string, password: string) => {
        const employee = await this.employeeRepository.findOneBy({ email });

        if (!employee) {
            throw new EntityNotFoundException(
                ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND
            );
        }
        const result = await bcrypt.compare(password, employee.password);
        if (!result) {
            throw new IncorrectPasswordException(ErrorCodes.INCORRECT_PASSWORD);
        }

        const payload: jwtPayload = {
            name: employee.name,
            role: employee.role,
            email: employee.email,
        };

        const token = jsonwebtoken.sign(payload, JWT_SECRET, {
            expiresIn: JWT_VALIDITY,
        });
        return token;
    };
}

export default EmployeeService;
