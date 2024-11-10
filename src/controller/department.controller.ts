import { plainToClass } from "class-transformer";
import DepartmentService from "../service/department.service";
import { validate } from "class-validator";
import CreateDepartmentDto from "../dto/createDepartment.dto";
import { Request, Response } from "express";
import HttpException from "../exeption/http.excption";
import { RequestWithUser } from "../utils/requestWithUser";
import { Role } from "../utils/role.enum";
import IncorrectPasswordException from "../exeption/incorrectPassword.exception";
import { ErrorCodes } from "../utils/error.code";
import EntityNotFoundException from "../exeption/entityNotFound.exception";

class DepartmentController{
    constructor(private departmentService: DepartmentService) {}

    createDepartment = async (req: RequestWithUser, res: Response) => {
        const department = plainToClass(CreateDepartmentDto, req.body);
        const errors = await validate(department);

        const role = req.role;
            if (role != Role.HR) {
                throw new IncorrectPasswordException(ErrorCodes.UNAUTHORIZED);
            }

        if (errors.length > 0) {
            throw new HttpException(400, JSON.stringify(errors));
        }
        const newDepartment = await this.departmentService.createDepartment(department.name, department.description);
        if (!newDepartment) {
            throw new HttpException(500, "Internal Server Error");
        }
        res.status(201).send(newDepartment);
    }

    getDepartments = async (req: Request, res: Response) => {
        const departments = await this.departmentService.getDepartments();
        if (!departments) {
            throw new HttpException(404, "Departments not found");
        }
        res.status(200).send(departments);
    }

    getDepartmentById = async (req: Request, res: Response) => {
        const deptId = parseInt(req.params.id);
        const department = await this.departmentService.getDepartmentById(deptId);
        if (!department) {
            throw new EntityNotFoundException(ErrorCodes.DEPARTMENT_WITH_ID_NOT_FOUND);
        }
        res.status(200).send(department);
    }
}

export default DepartmentController;