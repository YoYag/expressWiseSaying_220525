import express from "express";
import {
  application
} from "express";
import mysql from "mysql2/promise";
import cors from "cors";

const pool = mysql.createPool({
  host: "localhost",
  user: "sbsst",
  password: "sbs123414",
  database: "a1",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const app = express();

app.use(express.json()); // Postman 사용가능

const corsOptions = {
  origin: "https://cdpn.io",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

const port = 3000;

// 랜덤조회GET
app.get("/wiseSayings", async (req, res) => {
  const [[rows]] = await pool.query(`
  SELECT * 
  FROM wise_saying 
  ORDER BY RAND() LIMIT 1;
  `);

  await pool.query(`
  UPDATE wise_saying
  SET hits = hits + 1
  WHERE id = ?;
  `, [rows.id]);

  res.json([rows]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});