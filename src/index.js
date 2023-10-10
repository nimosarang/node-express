import express from "express";
import appRouter from "./routes/router.js";
import cors from "cors";
import todoRouter from "./routes/Todo.js";

const app = express();
app.use(express.json()); // req.body 사용 위한 JSON 미들웨어 활성화, 미사용시 undefined 반환

app.use(express.urlencoded({ extended: true })); // JSON 미들웨어와 함께 사용

const PORT = 3333;

app.use(cors());

app.use("/api", appRouter);
app.use("/todo", todoRouter);

app.get("/", (request, response) => {
  response.json({ message: "hello, express" });
});

const server = app.listen(PORT, () => {
  console.log(`server init on port : ${PORT}`);
});
