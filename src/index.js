import express from "express";
import appRouter from "./routes/router.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = 3333;

app.use(cors());

app.use("/api", appRouter);

app.get("/", (request, response) => {
  response.json({ message: "hello, express" });
});

const server = app.listen(PORT, () => {
  console.log(`server init on port : ${PORT}`);
});
