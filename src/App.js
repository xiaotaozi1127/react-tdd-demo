import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [buttonColor, setButtonColor] = useState("red")
  const [disabled, setDisabled] = useState(false)
  const newButtonColor = buttonColor === "red" ? "blue" : "red"
  return (
    <div>
      <button 
      style={{backgroundColor: buttonColor}}
      disabled={disabled}
      onClick={()=>setButtonColor(newButtonColor)}
      >
        change to {newButtonColor}
        </button>
        <input type="checkbox" onChange={(e)=> setDisabled(e.target.checked)}/>
    </div>
  );
}

export default App;
