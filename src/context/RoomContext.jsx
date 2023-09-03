import { createContext, useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";
import Peer from "peerjs";
import {v4 as uuid} from "uuid";
const WS = "http://localhost:8080";

export const RoomContext = createContext(null);

const ws = socketIOClient(WS);

export const RoomProvider =({children})=>{
    const navigate = useNavigate()
    const [me, setMe] = useState()
    const enterRoom = ({roomId})=>{
        console.log({roomId})
        navigate(`/room/${roomId}`)
    }
    const getUsers = ({participants})=>{
        console.log({participants})
    }
    useEffect(()=>{

        const meId=uuid()

        const peer=new Peer(meId);
    
        setMe(peer);

        ws.on("room-created",enterRoom);

        ws.on("get-users", getUsers);

    },[])
return (
    <RoomContext.Provider value={{ws ,me}}>
        {children}
    </RoomContext.Provider>
)
}