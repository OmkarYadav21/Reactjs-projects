import React, { useContext } from 'react'
import userContext from "../context/UserContext";


const Profile = () => {
    const {user}=useContext(userContext)
    if (!user) return <div>Please Login </div>
    return(
        <div>Welecome {user.username}</div>
    )
  
}

export default Profile
