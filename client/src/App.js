import "./App.css";
import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIceCream } from "@fortawesome/free-solid-svg-icons";
import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons";
const ip_address = "192.168.1.223";
const date = "12/20/2023";

function App() {
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

  async function feed() {
    try {
      await axios.post("http://" + ip_address + ":8000/schedule", {
        date,
      });
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
        <button id="feeder" onClick={feed}>
          <FontAwesomeIcon icon={faBowlFood} />
        </button>
      </div>
    </div>
  );
}

export default App;
