import express, { Request, Response } from "express";
import book from "./bookRoutes";
import loggerMiddleware from "./logger";
import bodyParser from "body-parser";
import dataSource from "./data-source";
import employeeRouter from "./employee_router";
const app = express();
const PORT = 3000;

app.use(loggerMiddleware);
app.use(bodyParser.json());
app.use("/employee", employeeRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Home page of Bookstore");
});

(async () => {
  try {
    await dataSource.initialize();
  } catch (e) {
    console.log("Failed to connect to db", e);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log("server listening to " + PORT);
  });
})();
