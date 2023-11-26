import React, {useState} from 'react'

export default function TextForm(props) {
const handleUpClick=()=>{
    // console.log("Clicked");
    // let newText=
    setText(text.toUpperCase());
    props.showAlert("Converted to uppercase!","success");

}
const handleLoClick=()=>{
    // console.log("Clicked");
    let newText=text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to lowercase!","success");
}
const handleBoClick=()=>{
  // console.log("Clicked");
  
  setIsBold(!isBold);
  props.showAlert("Converted to bold!","success");
}
const handleOnChange=(event)=>{
    //console.log("on change");
    setText(event.target.value);
}
const [text,setText]=useState();
const [isBold, setIsBold] = useState(false);
const len=text?.split(/\s+/)?.filter((element)=>{return element.length!==0})?.length;
const len1=0.008*len;
  return (
    <>
    <div className='container' style={{color:props.mode === "dark" || props.mode === "success" ?'white':'black'}}>
      <div className='mb-3 my-2'>
        <h1>{props.heading}</h1>
        
        <textarea className='form-control' value={text} onChange={handleOnChange} rows='3' style={{ fontWeight: isBold ? 'bold' : 'normal',backgroundColor:props.mode==='light' ? 'white': props.mode === "success"? '#4a855a': "white",color:props.mode==='dark' || props.mode === "success" ?'white':'black'}} ></textarea>
      </div>
      <button className={`btn btn-${props.mode === "dark" ? "dark" : props.mode === "success" ? "success" : "primary"} mx-2 my-2`} disabled={text?.length===0} onClick={handleUpClick}>Convert to uppercase</button>
      <button className={`btn btn-${props.mode === "dark" ? "dark" : props.mode === "success" ? "success" : "primary"} mx-2 my-2`} disabled={text?.length===0} onClick={handleLoClick}>Convert to lowercase</button>
      <button className={`btn btn-${props.mode === "dark" ? "dark" : props.mode === "success" ? "success" : "primary"} mx-2 my-2`} disabled={text?.length===0} onClick={handleBoClick}>Bold</button>
    </div>
    <div className='container my-3' style={{color:props.mode==='dark' || props.mode === "success" ?'white':'black'}}>
        <h1>Your text summary</h1>
        <p> {len} words and {text?.length} characters</p>
        <p> {len1} Minutes to read</p>
    </div>
    
    </>
  )
}
