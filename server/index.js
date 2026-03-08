import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

const app = express();


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});


const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
