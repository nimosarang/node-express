import express from "express";
import db from "../database/connection.js";

const router = express.Router();

router.get("/", async (request, response) => {
  let connection = null;
  const { userId, password } = request.query;
  try {
    const SQL = `
        SELECT 
            id,
            user_id,
            password,
            nick_name,
            create_date,
            update_date
        FROM 
            table_user
        WHERE 1=1
            AND user_id = '${userId}'
            AND password = '${password}'
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
    const { userId, password, nickName } = request.body;
    const SQL = `
      INSERT INTO table_user (user_id, password, nick_name)
      VALUES ('${userId}', '${password}', '${nickName}');
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
  const { userId, password, nickName } = request.body;
  try {
    const SQL = `
        UPDATE table_user SET 
            user_id = '${userId}', 
            password = '${password}', 
            nick_name = '${nickName}'
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
          DELETE FROM table_user WHERE id = ${id}
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
