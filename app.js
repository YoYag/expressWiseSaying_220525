import express from "express";
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

app.use(cors(corsOptions)); // cors 사용

const port = 3000;

// 수정PATCH
app.patch("/wiseSaying/:id", async (req, res) => {
  const { id } = req.params;
  const [[wiseSayingRow]] = await pool.query(
    `
    SELECT *
    FROM wise_saying
    WHERE id = ?;
    `,
    [id]
  );

  if (wiseSayingRow === 0) {
    res.status(404).json({
      resultCode: "F-1",
      msg: "404 not found",
    });
    return;
  }

  const {
    content = wiseSayingRow.content,
    figure = wiseSayingRow.figure,
    like_it = wiseSayingRow.like_it,
    hate_it = wiseSayingRow.hate_it,
  } = req.body;

  await pool.query(
    `
    UPDATE wise_saying
    SET content = ?,
    figure = ?,
    like_it = ?,
    hate_it = ?
    WHERE id = ?
    `,
    [content, figure, like_it, hate_it, id]
  );

  const [[justModifiedWiseSayingRow]] = await pool.query(
    `
  SELECT *
  FROM wise_saying
  WHERE id = ?;
  `,
    [id]
  );

  res.json({
    resultCode: "S-1",
    msg: "성공",
    data: justModifiedWiseSayingRow,
  });
});

// 랜덤조회GET
app.get("/wiseSaying/random", async (req, res) => {
  const [[wiseSayingRow]] = await pool.query(
    `
    SELECT * 
    FROM wise_saying 
    ORDER BY RAND() LIMIT 1;
    `
  );

  if (wiseSayingRow === 0) {
    res.status(404).json({
      resultCode: "F-1",
      msg: "404 not found",
    });
    return;
  }

  wiseSayingRow.hits++;

  await pool.query(
    `
    UPDATE wise_saying
    SET hits = ?
    WHERE id = ?;
    `,
    [wiseSayingRow.hits, wiseSayingRow.id]
  );

  res.json({
    resultCode: "S-1",
    msg: "성공",
    data: wiseSayingRow,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
