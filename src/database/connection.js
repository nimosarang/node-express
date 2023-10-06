import mysql from "mysql2/promise";

const connection = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "sonjk",
  password: "1234",
  database: "js",
  connectTimeout: 5000,
});

export default connection;
