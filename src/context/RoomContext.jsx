import { createContext, useEffect , useState, useReducer} from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";
import Peer from "peerjs";
import {v4 as uuid} from "uuid";
import { PeerReducer } from "./PeerReducer";
import { AddPeerAction, RemovePeerAction } from "./PeerAcction";
const WS = "http://localhost:8080";

export const RoomContext = createContext(null);

const ws = socketIOClient(WS);

export const RoomProvider =({children})=>{
    const navigate = useNavigate();
    const [me, setMe] = useState();
    const [stream, setStream] = useState();
    const [peers, dispatch] = useReducer(PeerReducer,{});
    const [screenSharingId, setScreenSharingId] = useState();
    const [roomId, setRoomId] = useState("");

    const enterRoom = ({roomId})=>{
        navigate(`/room/${roomId}`)
    }

    const getUsers = ({participants})=>{
        console.log("participents",{participants})
    }

    const peerRemove =({peerId})=>{
        dispatch(RemovePeerAction(peerId))
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
        ws.on("user-disconnected", peerRemove);
        ws.on("user-started-sharing", (peerId)=>setScreenSharingId(peerId));
        ws.on("user-stoped-sharing", ()=>setScreenSharingId(''))
     return()=>{
        ws.off("room-created");
        ws.off("get-users");
        ws.off("user-disconnected");
        ws.off("user-started-sharing");
        ws.off("user-stopped-sharing");
        ws.off("user-joined");
     };

    },[]);

    useEffect(()=>{
       if(screenSharingId)
       {
        ws.emit("start-sharing", {peerId:screenSharingId, roomId})
       }
       else{
        ws.emit("stop-sharing")
       }
    },[screenSharingId, roomId])

    const switchScreen =(stream)=>{
        setStream(stream);
        setScreenSharingId(me?.id || "");

        Object.values(me?.connections).forEach((connection)=>{
            const videoTrack = stream?.getTracks().find((track)=>track.kind ==='video');
            connection[0].peerConnection
            .getSenders()[1]
            .replaceTrack(videoTrack)
            .catch((err)=>{
                console.log(err)
            })
        })
    }
    const ShareScreen =()=>{
        if(screenSharingId)
        {
            navigator.mediaDevices.getUserMedia({video:true, audio:true}).then(switchScreen);
        }
        else{
            navigator.mediaDevices.getDisplayMedia({}).then(switchScreen);
        }
        Object.values(me?.connections).forEach((connection)=>{
            const videoTrack = stream?.getTracks().find((track)=>track.kind ==='video');
            connection[0].peerConnection
            .getSenders()[1]
            .replaceTrack(videoTrack)
            .catch((err)=>{
                console.log(err)
            })
        })
    }
    useEffect(()=>{
        if(!me){
            return;
        }
        if(!stream)
        {
            return;
        }
        ws.on('user-joined',({ peerId })=>{
            const call = me.call(peerId, stream);
            call.on("stream", (peerStream)=>{
                dispatch(AddPeerAction(peerId, peerStream));
            })
        })
        me.on("call", (call)=>{
            call.answer(stream);
            call.on("stream", (peerStream)=>{
                dispatch(AddPeerAction(call.peer, peerStream))
            })
        })
    },[me, stream])

    
    console.log("peer",{peers})
return (
    <RoomContext.Provider value={{ws ,me, stream, peers , ShareScreen, screenSharingId ,setRoomId}}>
        {children}
    </RoomContext.Provider>
)
}