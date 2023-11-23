import { useCallback, useEffect, useRef, useState } from 'react'
// import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numAllow,setNumAllow]=useState(false);
  const [charAllow,setCharAllow]=useState(false)
  const [password,setPassword]=useState("")
  const passwordRef = useRef(null)
  const passwordGen=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
   
    if(numAllow) str+="0123456789"
    if(charAllow) str+="!~@#$%^&*"
    for (let i = 1; i <=length; i++) {
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)

    
  },[length,numAllow,charAllow,setPassword])

  const copyText=useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])
  useEffect(()=>{
    passwordGen();
  },[length,numAllow,charAllow,setPassword]
  )
  return (
    <>
      <div className='main' style={{color:"white"}}>
        <input type="text"  value={password} readOnly  ref={passwordRef}/>
        <button onClick={copyText}>copy</button>
      </div>
      <div>
        <input type="range" min={8} max={18} value={length} 
         onChange={(e) => {setLength(e.target.value)}
        } /> <label style={{color:"white"}}>Length: {length}</label>
        <input type="checkbox"  value={numAllow} 
         onChange={(e) => {setNumAllow((prev)=>!prev)}
        } /> <label style={{color:"white"}}>Number allow</label>
        <input type="checkbox"  value={charAllow} 
         onChange={(e) => {setCharAllow((prev)=>!prev)}
        } /> <label style={{color:"white"}}>Char allow</label>
      </div>
    </>
  )
}

export default App
