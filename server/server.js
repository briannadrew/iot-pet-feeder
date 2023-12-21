require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const IFTTT = require("node-ifttt-maker");
const ifttt = new IFTTT(process.env.IFTTT_KEY);
const eventname1 = "RingTone1";
const eventname2 = "RingTone2";
const eventname3 = "Schedule";

app.use(cors());
app.use(express.json());

app.post("/post_tone1", async (req, res) => {
  ifttt
    .request(eventname1)
    .then((response) => {})
    .catch((err) => {});
});

app.post("/post_tone2", async (req, res) => {
  ifttt
    .request(eventname2)
    .then((response) => {})
    .catch((err) => {});
});

app.post("/schedule", async (req, res) => {
  let { date } = req.body;
  ifttt
    .request(eventname3, date)
    .then((response) => {})
    .catch((err) => {});
});

app.get("/message", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000.");
});
