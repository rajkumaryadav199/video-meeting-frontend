import { useContext } from "react";
import { RoomContext } from "../context/RoomContext";
import { Button } from "react-bootstrap";

export const Join=()=>{
    const {ws} = useContext(RoomContext)
    const joinRoom=()=>{
        ws.emit("create-room")
    }
    return(
        <Button onClick={joinRoom}>Start new meeting</Button>
    )
}