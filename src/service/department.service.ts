import Department from "../entity/department.entity";
import DepartmentRepository from "../repository/department.repository";

class DepartmentService {
  constructor(private departmentRepository: DepartmentRepository) {}

  createDepartment = async (name:string,description:string): Promise<Department> => {
    const department = new Department();
    department.name = name;
    department.description = description;
    return this.departmentRepository.save(department);
  }

  getDepartments = async(): Promise<Department[]> => {
    return this.departmentRepository.findAllDepartments();
  }

//   updateDepartment = async (department: Department): Promise<Department> => {
//     return this.departmentRepository.update(department);
//   }

  getDepartmentById = async (id: number): Promise<Department | null> => {
    return this.departmentRepository.findOneBy({ id });
  }
}

export default DepartmentService;