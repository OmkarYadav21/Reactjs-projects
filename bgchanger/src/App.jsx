import { useState } from 'react'

import './App.css'

function App() {
  const [color, setColor] = useState("white")
  const change=(e)=>{
    const buttonText = e.target.textContent;
    setColor(buttonText)
  }

  return (
    <div className="main" style={{backgroundColor: color}}>
      <div className='block1'>
          <button onClick={change}>Red</button>
          <button onClick={change}>Blue</button>
          <button onClick={change}>Green</button>
          <button onClick={change}>Black</button>
          <button onClick={change}>SkyBlue</button>
      </div>
      
    </div>
  )
}

export default App
