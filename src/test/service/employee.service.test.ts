import Employee from "../../entity/employee.entity";
import EmployeeService from "../../service/employee.service";
import EmployeeRepository from "../../repository/employee.repository";
import { when } from "jest-when";
import bcrypt from "bcrypt";

describe("Employee Service Test", () => {
    let employeeService: EmployeeService;
    let employeeRepository: EmployeeRepository;

    beforeAll(() => {
        const dataSource = {
            getRepository: jest.fn(),
        };
        employeeRepository = new EmployeeRepository(
            dataSource.getRepository(Employee)
        ) as jest.Mocked<EmployeeRepository>;
        employeeService = new EmployeeService(employeeRepository);
    });

    it("should get all employees", async () => {
        employeeRepository.find = jest.fn().mockResolvedValueOnce([]);
        const employees = await employeeService.findAll();
        expect(employees).toEqual([]);
    });

    // it("should be called twice", async () => {
    //     const spy = jest.spyOn(employeeService, "findAll");
    //     const employees1 = await employeeService.findAll();
    //     const employees = await employeeService.findAll();
    //     expect(spy).toHaveBeenCalledTimes(2);
    // });

    it("should return employee", async () => {
        const expectedEmployee = {
            name: "Alex",
            email: "alex@gmail.com",
        };
        employeeRepository.findOneBy = jest
            .fn()
            .mockResolvedValueOnce(expectedEmployee);
        const employee = await employeeService.findById(1);
        expect(employee).toEqual(expectedEmployee);
    });
    it("should return employee details as per given id", async () => {
        const mockedFunction = jest.fn();
        when(mockedFunction).calledWith({ id: 1 }).mockResolvedValue({
            id: 1,
            name: "Alexnader",
            email: "alex@gmail.com",
        });
        employeeRepository.findOneBy = mockedFunction;
        const user = await employeeService.findById(1);
        expect(user).toEqual({
            id: 1,
            name: "Alexnader",
            email: "alex@gmail.com",
        });
        expect(mockedFunction).toHaveBeenCalledTimes(1);
    });

    it("should delete and return deleted status", async () => {
        const mockedDelete = jest.fn();
        when(mockedDelete)
            .calledWith({
                id: 1,
                name: "Alexnader",
                email: "alex@gmail.com",
            })
            .mockResolvedValue({ status: "deleted" });
        employeeRepository.softRemove = mockedDelete;
        const deleted = await employeeService.deleteEmployee(1);
        expect(deleted).toEqual({
            status: "deleted",
        });
    });

    it("should throw not found exception when employee not found", async () => {
        const mockedFunction = jest.fn();
        when(mockedFunction)
            .calledWith({ email: "abc@yopmail.com" })
            .mockResolvedValue(null);
        employeeRepository.findOneBy = mockedFunction;
        try {
            await employeeService.loginEmployee("abc@yopmail.com", "password");
        } catch (err) {
            expect(err).toEqual(new Error("Employee not found"));
        }
    });

    it("should throw password mismatch if password mismatch", async () => {
        const bcryptMock = jest.fn();
        when(bcryptMock)
            .calledWith("password", "11111111")
            .mockResolvedValue(false);
        bcrypt.compare = bcryptMock;

        const mockedFunction = jest.fn();
        when(mockedFunction)
            .calledWith({ email: "abc@yopmail.com" })
            .mockResolvedValue({
                email: "abc@yopmail.com",
                password: "password",
            });
        employeeRepository.findOneBy = mockedFunction;
        try {
            await employeeService.loginEmployee("abc@yopmail.com", "password");
        } catch (err) {
            expect(err).toEqual(new Error("Incorrect Password"));
        }
    });
});
