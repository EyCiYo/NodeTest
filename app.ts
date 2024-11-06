import express, { Request, Response } from "express";
import book from "./bookRoutes";
import loggerMiddleware from "./logger";
import bodyParser from "body-parser";
const app = express();
const PORT = 3000;

app.use(loggerMiddleware);
app.use(bodyParser.json());
app.use("/books", book);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Home page of Bookstore");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
