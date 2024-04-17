import React, { useState, useRef, useEffect } from "react";
import logo from "../logo.jpg";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import toast from "react-hot-toast";
import {
  useNavigate,
  useLocation,
  Navigate,
  useParams,
} from "react-router-dom";
import ACTIONS from "../Actions";

const EditorPage = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const reactNavigator = useNavigate();
  const location = useLocation();
  const { roomId } = useParams();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const handleErrors = (e) => {
      console.log("Socket error", e);
      toast.error("Socket connection failed try again later");
      reactNavigator("/");
    };

    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      socketRef.current.on(
        ACTIONS.JOINED,
        ({ socketID, clients, username }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room`);
            console.log(`${username} joined`);
          }
          clients = clients.filter(
            (obj, index, self) =>
              index === self.findIndex((t) => t.username === obj.username)
          );
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE,{
            code: codeRef.current.getValue(),
            socketID,
          })
        }
      );

      socketRef.current.on(
        ACTIONS.DISCONNECTED,
        ({ socketID, username }) => {
          toast.success(`${username} left the room`);
          setClients(prevClients => prevClients.filter(client => client.socketID !== socketID));
        }
      );
    };
    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [roomId, location.state]);

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("RoomId copied successfully")
    } catch (error) {
      toast.error("Could not copy roomid")
    }
  }

  const leave = () => {
    reactNavigator("/");
  }

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="limg">
            <img src={logo} className="logoImg" alt="logo" />
          </div>
          <h3>Connected</h3>
          <div className="clientsList">
            {clients.map((client) => (
              <Client key={client.socketID} username={client.username} />
            ))}
          </div>
        </div>
        <button className="btn copyBtn" onClick={copyRoomId}>Copy RoomID</button>
        <button className="btn leave" onClick={leave}>Leave</button>
      </div>
      <div className="editorWrap">
        <Editor socketRef={socketRef} roomID={roomId} onCodeChange={(code)=>{
          codeRef.current=code; 
        }}/>
      </div>
    </div>
  );
};

export default EditorPage;
