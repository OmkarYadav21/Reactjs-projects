import { useState } from "react";
import logo from "../logo.jpg";
import { v4 as uuidV4 } from "uuid";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUserName] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success("Room created successfully");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Both Room ID and User Name are required.");
      return;
    }
    navigate(`/editor/${roomId}`, {
      state: { username }, 
    });
  };

  const handleInputEnter = (e) => {
    if (e.code ==='Enter') {
      joinRoom();
    }
  };

  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img className="logo" src={logo} alt="" />
        <h4 className="mainLabel">Paste Invitation Room Id</h4>
        <div className="inputGroup">
          <input
            type="text"
            className="inputBox"
            placeholder="ROOM ID"
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
            onKeyDownCapture={handleInputEnter}
          />
          <input
            type="text"
            className="inputBox"
            placeholder="USER NAME"
            onChange={(e) => setUserName(e.target.value)}
            value={username}
            onKeyDownCapture={handleInputEnter}
          />
          <button className="btn joinBtn" onClick={joinRoom}>Join</button>
          <span className="createInfo">
            If you don't have any invite then create &nbsp;
            <button className="createNewBtn" onClick={handleCreateRoom}>
              new room
            </button>
          </span>
        </div>
      </div>
      <footer>
        <h4>
          Built by OM <a href="#">GitHub</a>
        </h4>
      </footer>
    </div>
  );
};

export default Home;
