const express = require("express");
const app = express();

require("dotenv").config();

const cors = require("cors");
const { connection } = require("./config/db");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("MongoDB is connected");
  } catch (error) {
    console.log("MongoDB is not connected");
  }
  console.log(`http://localhost:${process.env.PORT}`);
});
