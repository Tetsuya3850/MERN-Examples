const express = require("express");
const app = express();
const helmet = require("helmet");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require("dotenv").config();
const port = process.env.PORT;
const mongoDB = process.env.MONGODB;

const responseSchema = mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  colors: [String],
  comments: String
});
const Response = mongoose.model("Response", responseSchema);

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/response", async (req, res) => {
  const responses = await Response.find();
  res.json(responses);
});

app.post("/add", async (req, res) => {
  const newResponse = new Response(req.body);
  await newResponse.save();
  res.json("Response Saved!");
});

app.use((err, request, response, next) => {
  console.log(err);
  response.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
  mongoose.connect(mongoDB);
});