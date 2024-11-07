import express, { Request, Response } from "express";
import loggerMiddleware from "./middleware/logger.middleware";
import bodyParser from "body-parser";
import dataSource from "./db/data-source.db";
import employeeRouter from "./routes/employee.routes";
const app = express();
const PORT = 3000;

app.use(loggerMiddleware);
app.use(bodyParser.json());
app.use("/employee", employeeRouter);

// app.get("/", (req: Request, res: Response) => {
//     res.status(200).send("Home page of Employee");
// });

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
