import db from "./database/connection.js";

const SQL = `SELECT * FROM table_user`;

const connection = await db.getConnection();

const result = await connection.query(SQL);

console.log(result[0]);

connection.release();
