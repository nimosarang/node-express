import express from "express";
import db from "../database/connection.js";

const router = express.Router();

router.get("/", async (request, response) => {
  let connection = null;
  try {
    const SQL = `
        SELECT 
            id,
            name,
            completed,
            create_date,
            update_date
        FROM 
            table_todo
        WHERE 1=1
        `;
    const connection = await db.getConnection();
    const result = await connection.query(SQL);
    response.status(200).json(result[0]);
  } catch (error) {
    response.status(500).send({ message: "에러가 발생했습니다.", e: error });
  } finally {
    connection && connection.release();
  }
});

router.post("/", async (request, response) => {
  let connection = null;
  try {
    console.log(request.body);
    const { name, completed } = request.body;
    const SQL = `
      INSERT INTO table_todo (name, completed)
      VALUES ('${name}', '${completed}');
      `;

    const connection = await db.getConnection();
    await connection.execute(SQL);
    response
      .status(200)
      .json({ success: true, message: "저장이 완료 되었습니다." });
  } catch (error) {
    response.status(500).send({ message: "에러가 발생했습니다.", e: error });
  } finally {
    connection && connection.release();
  }
});

router.put("/", async (request, response) => {
  let connection = null;
  const { name, completed } = request.body;
  try {
    const SQL = `
        UPDATE table_todo SET 
        name = '${name}', 
        completed = '${completed}' 
        WHERE 1=1
            AND id = ${id}
    `;

    const connection = await db.getConnection();
    await connection.execute(SQL);
    response
      .status(200)
      .json({ success: true, message: "저장이 완료 되었습니다." });
  } catch (error) {
    response.status(500).send({ message: "에러가 발생했습니다.", e: error });
  } finally {
    connection && connection.release();
  }
});

router.delete("/", async (request, response) => {
  let connection = null;
  const { id } = request.query;
  try {
    const SQL = `
          DELETE FROM table_todo WHERE id = ${id}
      `;

    const connection = await db.getConnection();
    await connection.execute(SQL);
    response
      .status(200)
      .json({ success: true, message: "삭제가 완료 되었습니다." });
  } catch (error) {
    response.status(500).send({ message: "에러가 발생했습니다.", e: error });
  } finally {
    connection && connection.release();
  }
});

export default router;
