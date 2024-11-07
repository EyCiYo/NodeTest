import express, { Request, Response } from "express";
import EmployeeService from "../service/employee.service";

class EmployeeController {
    public router: express.Router;

    constructor(private employeeServices: EmployeeService) {
        this.router = express.Router();

        this.router.get("/", this.getAllEmployees);
        this.router.get("/:id", this.getEmployeeById);
        this.router.post("/", this.createEmployee);
        this.router.put("/:id", this.updateEmployee);
        this.router.delete("/:id", this.deleteEmployee);
    }

    getAllEmployees = async (req: Request, res: Response) => {
        const employees = await this.employeeServices.findAll();
        res.status(200).send(employees);
    };

    getEmployeeById = async (req: Request, res: Response) => {
        const employee = await this.employeeServices.findById(req.params.id);
        if (employee) {
            res.status(200).send(employee);
        } else {
            res.status(404).send({ message: "Not Found employee" });
        }
    };

    createEmployee = (req: Request, res: Response) => {};

    updateEmployee = (req: Request, res: Response) => {};

    deleteEmployee = (req: Request, res: Response) => {};
}

export default EmployeeController;
