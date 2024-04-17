import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import  ACTIONS from './src/Actions.mjs'
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const socketMap={};

const getAllConnectedClients=(roomId)=>{
    return Array.from(io.sockets.adapter.rooms.get(roomId)|| []).map((socketID)=>{
        return{
            socketID,
            username:socketMap[socketID],
        }
    })
}

io.on('connection', (socket) => {
    console.log("socket connected", socket.id);
    socket.on(ACTIONS.JOIN,({ roomID,username})=>{
        socketMap[socket.id]=username;
        socket.join(roomID);
        console.log(username);
        const clients=getAllConnectedClients(roomID);
        clients.forEach(({socketID})=>{
            io.to(socketID).emit(ACTIONS.JOINED,{
                clients,
                username,
                socketID:socket.id,
            })
        })
    })

    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on(ACTIONS.SYNC_CODE, ({ socketID, code }) => {
        io.to(socketID).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on('disconnecting', ()=>{
        const rooms=[...socket.rooms];
        rooms.forEach((roomID)=>{
            socket.in(roomID).emit(ACTIONS.DISCONNECTED,{
                socketID:socket.id,
                username:socketMap[socket.id],
            })
        })
        delete socketMap[socket.id];
        socket.leave();

    })
});



// Define a default port
const DEFAULT_PORT = 5000;
const PORT = process.env.PORT || DEFAULT_PORT;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
