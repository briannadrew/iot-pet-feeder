require("dotenv").config();
const { Board, Stepper } = require("johnny-five");
const { EtherPortClient } = require("etherport-client");
const board = new Board({
  port: new EtherPortClient({
    host: "192.168.1.53",
    port: 3030,
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
    console.log("hey");
    /**
     * In order to use the Stepper class, your board must be flashed with
     * either of the following:
     *
     * - AdvancedFirmata https://github.com/soundanalogous/AdvancedFirmata
     * - ConfigurableFirmata https://github.com/firmata/arduino/releases/tag/v2.6.2
     *
     */

    // set stepp[er to 180 rpm, CCW, with acceleration and deceleration
    stepper.rpm(200).direction(0).accel(1200).decel(1200);

    // make 10 full revolutions
    console.log("Moving CCW");
    stepper.step(2000, () => {
      console.log("Done moving CCW");
      // process.exit();
    });
  });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000.");
});
