import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIceCream } from "@fortawesome/free-solid-svg-icons";
import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons";
const ip_address = "10.0.0.213";

function App() {
  const [time, setTime] = useState("")

  function schedule (event) {
    event.preventDefault();
    let timeSplit = time.split(":");
    let hour = Number(timeSplit[0]);
    let minutes = Number(timeSplit[1]);
    const twelveHrs = 43200000;
    const now = new Date();
    let eta_ms = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minutes, 0, 0).getTime() - now;
    if (eta_ms < 0) {
      eta_ms += twelveHrs;
    }
    setTimeout(function() {
      scheduleFeed();
      setInterval(scheduleFeed, twelveHrs);
    }, eta_ms);
  }

  async function icecream() {
    try {
      await axios.post("http://" + ip_address + ":8000/post_tone1");
    } catch (error) {
      console.log(error);
    }
  }

  async function harrypotter() {
    try {
      await axios.post("http://" + ip_address + ":8000/post_tone2");
    } catch (error) {
      console.log(error);
    }
  }

  async function feed(event) {
    event.preventDefault();
    try {
      await axios.post("http://" + ip_address + ":8000/schedule");
    } catch (error) {
      console.log(error);
    }
  }

  async function scheduleFeed () {
    try {
      await axios.post("http://" + ip_address + ":8000/schedule");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <div className="title">
        <h1>PET-'O-MATIC</h1>
      </div>
      <div className="tone">
        <div className="tone-caption">
          <h2>♫ Select a Ringtone ♫</h2>
        </div>
        <div className="tone-buttons">
          <button id="icecream" onClick={icecream}>
            <FontAwesomeIcon icon={faIceCream} />
          </button>
          <button id="harrypotter" onClick={harrypotter}>
            <FontAwesomeIcon icon={faBoltLightning} />
          </button>
        </div>
      </div>
      <div className="feed-button">
        <div className="feed-caption">
          <h2>🐾 Feed Your Pet! 🐾</h2>
        </div>
        <form onSubmit={time === '' ? feed : schedule}>
          <label htmlFor="timeinput">Schedule a time:</label>
          <div>
            <input id="timeinput" type="time" value={time} onChange={(e) => setTime(e.target.value)}></input>
            <button id="clear" onClick={(e => setTime(''))}>clear</button>
          </div>
          <button type="submit" id="feeder">
            <FontAwesomeIcon icon={faBowlFood} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
