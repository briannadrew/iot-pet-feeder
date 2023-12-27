const { Board, Led } = require("johnny-five");
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

// board pins
const PIN1 = 15; // tone 1
const PIN2 = 12; // tone 2
const PIN3 = 13; // forward
const PIN4 = 14; // reverse

app.use(cors());
app.use(express.json());

board.on("ready", () => {
  console.log("Board ready");
  let tone1 = true;
  var out1 = new Led(PIN1); // tone 1
  var out2 = new Led(PIN2); // tone 2
  var out3 = new Led(PIN3); // forward
  var out4 = new Led(PIN4); // reverse

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
    console.log(tone1);
    if (tone1) {
      out1.on();
      setTimeout(() => {
        out1.stop();
      }, 2000);
    } else {
      out2.on();
      setTimeout(() => {
        out2.stop();
      }, 2000);
    }
    setTimeout(
      () => {
        out3.on();
      },
      tone1 ? 6000 : 8000
    );
    setTimeout(
      () => {
        out3.off();
      },
      tone1 ? 21000 : 23000
    );
    setTimeout(
      () => {
        out4.on();
      },
      tone1 ? 22000 : 24000
    );
    setTimeout(
      () => {
        out4.off();
      },
      tone1 ? 37000 : 39000
    );

    out1.off();
    out2.off();
  }

  app.post("/post_tone1", async (req, res) => {
    tone1 = true;
  });

  app.post("/post_tone2", async (req, res) => {
    tone1 = false;
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
