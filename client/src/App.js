import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIceCream } from '@fortawesome/free-solid-svg-icons';
import { faBoltLightning } from '@fortawesome/free-solid-svg-icons';
import { faBowlFood } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <div className="App">
      <div className='title'>
        <h1>Pet-'O-Matic</h1>
      </div>
      <div className='tone'>
        <div className='tone-caption'>
          <h2>Select a Ringtone</h2>
        </div>
        <div className='tone-buttons'>
          <button id='icecream'>
            <FontAwesomeIcon icon={faIceCream} />
          </button>
          <button id='harrypotter'>
            <FontAwesomeIcon icon={faBoltLightning} />
          </button>
        </div>
      </div>
      <div className='feed-button'>
        <div className='feed-caption'>
          <h2>Feed Your Pet!</h2>
        </div>
        <button id='feeder'>
          <FontAwesomeIcon icon={faBowlFood} />
        </button>
      </div>
    </div>
  );
}

export default App;
