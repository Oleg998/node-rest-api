import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import eventRouter from "./routes/eventsRouter.js";
import authRouter from "./routes/authRouter.js";

const {DB_HOST} = process.env;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/users", authRouter)
app.use("/api/events", eventRouter);



app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});


mongoose.connect(process.env.DB_HOST)
.then(()=>{
  const PORT = process.env.PORT || 4000;
  console.log("Database connection successful");
  app.listen(PORT, () => {
    console.log(`Server is running. Use our API on port: ${PORT}`);
  });
})
.catch (error =>{
  console.error("Database connection error:", error.message);
  process.exit(1);
   })
