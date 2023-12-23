import "./App.css";
import React, { useState } from "react";
import axios from "axios";
// font awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIceCream,
  faBoltLightning,
  faBowlFood,
} from "@fortawesome/free-solid-svg-icons";

// put the ip address of the device your node server is running on here
const ip_address = "192.168.1.223";

function App() {
  // set time for feed to be scheduled
  const [time, setTime] = useState("");
  // whether button is selected or not
  const [isActiveOne, setActiveOne] = useState("true");
  const [isActiveTwo, setActiveTwo] = useState("");

  const ToggleActiveOne = () => {
    if (!isActiveOne) {
      setActiveOne(!isActiveOne);
      setActiveTwo(!isActiveTwo);
    }
  };

  const ToggleActiveTwo = () => {
    if (!isActiveTwo) {
      setActiveTwo(!isActiveTwo);
      setActiveOne(!isActiveOne);
    }
  };

  // make request to the backend to set the feeding tone to the ice cream truck song
  async function icecream() {
    ToggleActiveOne();
    try {
      await axios.post("http://" + ip_address + ":8000/post_tone1");
    } catch (error) {
      console.log(error);
    }
  }

  // make request to the backend to se the feeding tune to the harry potter theme song
  async function harrypotter() {
    ToggleActiveTwo();
    try {
      await axios.post("http://" + ip_address + ":8000/post_tone2");
    } catch (error) {
      console.log(error);
    }
  }

  // make request to the backend to feed the pet immediately
  async function feed(event) {
    event.preventDefault();
    try {
      await axios.post("http://" + ip_address + ":8000/feed");
    } catch (error) {
      console.log(error);
    }
  }

  // make request to the backend to feed the pet at the scheduled time
  async function scheduleFeed(event) {
    event.preventDefault();
    try {
      await axios.post("http://" + ip_address + ":8000/schedule", { time });
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
          {/* button to select ice cream truck song tune */}
          <button
            id="icecream"
            className={isActiveOne ? "active" : null}
            onClick={icecream}
          >
            <FontAwesomeIcon icon={faIceCream} />
          </button>
          {/* button to select harry potter theme song tune */}
          <button
            id="harrypotter"
            className={isActiveTwo ? "active" : null}
            onClick={harrypotter}
          >
            <FontAwesomeIcon icon={faBoltLightning} />
          </button>
        </div>
      </div>
      <div className="feed-button">
        <div className="feed-caption">
          <h2>🐾 Feed Your Pet! 🐾</h2>
        </div>
        {/* if a time was not given, feed immediately. otherwise, schedule the feed for the given time */}
        <form onSubmit={time === "" ? feed : scheduleFeed}>
          <label htmlFor="timeinput">Schedule a Time:</label>
          <div>
            {/* set a time for the pet to be fed */}
            <input
              id="timeinput"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            ></input>
            {/* reset time */}
            <button type="button" id="clear" onClick={(e) => setTime("")}>
              clear
            </button>
          </div>
          {/* button to feed pet */}
          <button type="submit" id="feeder">
            <FontAwesomeIcon icon={faBowlFood} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
