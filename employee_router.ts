import express, { Request, Response } from "express";
import Employee from "./Employee";
import dataSource from "./data-source";

const employeeRouter = express.Router();

let employees: Employee[] = [];
let count = employees.length;

employeeRouter.get("/", async (req, res) => {
  const employeeRepository = dataSource.getRepository(Employee);
  const values = await employeeRepository.find();
  res.json(values);
});

employeeRouter.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const employeeRepository = dataSource.getRepository(Employee);
  const emp = await employeeRepository.findOneBy({
    id: id,
  });
  if (emp) {
    res.status(200).json(emp);
  } else {
    res.status(404).json({ message: "Not Found employee" });
  }
});

employeeRouter.post("/", async (req, res) => {
  console.log(req.body);
  const newEmployee = new Employee();
  newEmployee.email = req.body.email;
  newEmployee.name = req.body.name;
  const employeeRepository = dataSource.getRepository(Employee);
  await employeeRepository.save(newEmployee);
  res.status(200).send(newEmployee);
});

employeeRouter.delete("/:id", async (req, res) => {
  console.log("delete employees");
  const empid = parseInt(req.params.id);
  const employeeRepository = dataSource.getRepository(Employee);
  await employeeRepository.softDelete({
    id: empid,
  });
  res.status(200).send("Employee with id:" + empid + " deleted.");
});

employeeRouter.put("/:id", async (req, res) => {
  const newEmail = req.body.email;
  const newName = req.body.name;
  const employeeRepository = dataSource.getRepository(Employee);
  const employeeUpdated = await employeeRepository.findOneBy({
    id: Number(req.params["id"]),
  });
  employeeUpdated.name = newName;
  employeeUpdated.email = newEmail;

  await employeeRepository.save(employeeUpdated);
  console.log("update employees");
  res.send(employeeUpdated);
});

export default employeeRouter;
