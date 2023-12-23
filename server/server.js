require("dotenv").config();
const { Board, Stepper } = require("johnny-five");
const { EtherPortClient } = require("etherport-client");
const board = new Board({
  port: new EtherPortClient({
    host: "192.168.1.53", // put the ip address your arduino here
    port: 3030, // arduino communication port
  }),
  repl: false,
});
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

board.on("ready", () => {
  console.log("Board ready");
  const stepper = new Stepper({
    type: Stepper.TYPE.FOUR_WIRE,
    stepsPerRev: 64,
    pins: {
      motor1: 1,
      motor2: 2,
      motor3: 3,
      motor4: 4,
    },
  });

  // calculate time from now to the scheduled feeding time, then feed when that amount of time has passed
  // continue to feed every 12 hours from scheduled time
  // if you need to replace the time being fed rather than add a new time, simply restart this server and set a new time on the app
  function scheduler(time) {
    let timeSplit = time.toString().split(":");
    let hour = Number(timeSplit[0]);
    let minutes = Number(timeSplit[1]);
    const twelveHrs = 43200000;
    const now = new Date();
    let eta_ms =
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hour,
        minutes,
        0,
        0
      ).getTime() - now;
    if (eta_ms < 0) {
      eta_ms += twelveHrs;
    }
    setTimeout(function () {
      feed();
      setInterval(feed, twelveHrs);
    }, eta_ms);
  }

  // communicate with the stepper to perform the feed
  function feed() {
    // set stepper to 180 rpm, CCW, with acceleration and deceleration
    stepper.rpm(200).direction(0).accel(1200).decel(1200);

    // make 10 full revolutions
    console.log("Moving CCW");
    stepper.step(2000, () => {
      console.log("Done moving CCW");
    });
  }

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

  // receive request to feed the pet immediately
  app.post("/feed", async (req, res) => {
    feed();
  });

  // receive request to schedule a time to feed the pet
  app.post("/schedule", async (req, res) => {
    let time = req.body.time;
    scheduler(time);
  });
});

// this server runs on local host port 8000
app.listen(8000, () => {
  console.log("Server is running on port 8000.");
});
