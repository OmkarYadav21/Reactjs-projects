import React, { useContext, useState } from "react";
import userContext from "../context/UserContext";
const Login = () => {
    const[username, setUsername]=useState(null);
    const[password, setPassword]=useState(null);
    const {setUser}=useContext(userContext);
    const submit=(e)=>{
        e.preventDefault()
        setUser({username, password})
    }
  return (
    <div>
      <input
        type="text"
        placeholder="enter user name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={submit}>Submit</button>
    </div>
  );
};

export default Login;
