import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RoomContext } from '../../context/RoomContext';
import VideoPlayer from '../../Components/VideoPlayer';

const Room = () => {

    const {id} = useParams();
    const {ws, me ,stream, peer} = useContext(RoomContext);
    console.log('stream', stream, me)

    useEffect(()=>{
        if(me)
        {
            ws.emit('join-room', {roomId:id, peerId:me._id})
        }
    },[id,ws, me]);

  return (
    <>
      Room {id}
      <div>
        <VideoPlayer stream={stream}/>
        {
          Object.values(peer).map((peer)=>{
            <VideoPlayer stream={peer.stream}/>
          })
        }
      </div>
    </>
  )
}

export default Room
