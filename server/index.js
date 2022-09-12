//this file basically connects the server to mongodb and setup server for further processing.

import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; //cors allows developer to use resources from other servers too.
import mongoose from "mongoose";

//importing routes
import postRoutes from "./routes/posts.js";

const app = express();

//with this the url of the server will change to http://localhost:3000/posts instead of http://localhost:3000

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postRoutes);

const CONNECTON_URL =
  "mongodb+srv://miroj:strawhatcrew001@cluster0.mwgcc9i.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.port || 3000;

//connecting the server to the monoose database.
mongoose
  .connect(CONNECTON_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    //.then is simply a promise which is similar to futures in flutter.
    app.listen(PORT, () =>
      console.log(`Server up and running on port : ${PORT}`)
    )
  )
  .catch((error) => {
    console.log(error.message);
  });
