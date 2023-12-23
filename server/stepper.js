const { Board, Stepper } = require("johnny-five");
const { EtherPortClient } = require("etherport-client");
const board = new Board({
  port: new EtherPortClient({
    host: "192.168.1.53",
    port: 3030,
  }),
  repl: false,
});

board.on("ready", () => {
  console.log("Board ready");
  /**
   * In order to use the Stepper class, your board must be flashed with
   * either of the following:
   *
   * - AdvancedFirmata https://github.com/soundanalogous/AdvancedFirmata
   * - ConfigurableFirmata https://github.com/firmata/arduino/releases/tag/v2.6.2
   *
   */

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

  // set stepp[er to 180 rpm, CCW, with acceleration and deceleration
  stepper.rpm(200).direction(0).accel(1200).decel(1200);

  // make 10 full revolutions
  console.log("Moving CCW");
  stepper.step(2000, () => {
    console.log("Done moving CCW");
    process.exit();
  });
});
