import { createContext, useEffect , useState, useReducer} from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";
import Peer from "peerjs";
import {v4 as uuid} from "uuid";
import { PeerReducer } from "./PeerReducer";
import { AddPeerAction } from "./PeerAcction";
const WS = "http://localhost:8080";

export const RoomContext = createContext(null);

const ws = socketIOClient(WS);

export const RoomProvider =({children})=>{
    const navigate = useNavigate();
    const [me, setMe] = useState();
    const [stream, setStream] = useState();
    const [peer, dispatch] = useReducer(PeerReducer,{});
    const enterRoom = ({roomId})=>{
        navigate(`/room/${roomId}`)
    }
    const getUsers = ({participants})=>{
        console.log({participants})
    }
    useEffect(()=>{
        const meId=uuid()
        const peer=new Peer(meId);
        setMe(peer);
        try {
            navigator.mediaDevices
            .getUserMedia({video:true, audio:true}).then((stream)=>{
                setStream(stream)
            })
        } catch (error) {
            console.log('error', error)
        }
        ws.on("room-created",enterRoom);
        ws.on("get-users", getUsers);
    },[]);

    useEffect(()=>{
        if(!me){
            return;
        }
        if(!stream)
        {
            return;
        }
        ws.on('user-joined',({peerId})=>{
            const call = me.call(peerId, stream)
            call.on("stream", (peerStream)=>{
                dispatch(AddPeerAction(peerId, peerStream))
            })
        })
        me.on("call", (call)=>{
            call.answer(stream);
            call.on("stream", (peerStream)=>{
                dispatch(AddPeerAction(call.peer, peerStream))
            })
        })
    },[me, stream])

    console.log("peer",{peer})
return (
    <RoomContext.Provider value={{ws ,me, stream, peer}}>
        {children}
    </RoomContext.Provider>
)
}