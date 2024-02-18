import express from "express";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors";
import { testConnection } from "./models/index.js";
import userRoute from "./routes/userRoute.js";
const app = express();
const port = process.env.PORT || 5001;

testConnection();

app.get("/", (req, res) => {
  res.send("Welcome to Finpay backend API");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use("/api/user", userRoute);

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
