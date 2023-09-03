import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RoomContext } from '../../context/RoomContext';

const Room = () => {

    const {id} = useParams();
    const {ws, me} = useContext(RoomContext);

    useEffect(()=>{
        if(me)
        {
            ws.emit('join-room', {roomId:id, peerId:me._id})
        }
    },[]);

  return (
    <div>
      Room {id}
    </div>
  )
}

export default Room
