import express from "express";
import { dbConnect } from "./config/database.js";
import contactRouter from "./routes/contactRoutes.js";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//middlewares
app.use(express.json());
app.use(express.static("public"));

await dbConnect();

app.use("/api/contact", contactRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
