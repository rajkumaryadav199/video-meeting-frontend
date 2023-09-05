import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RoomContext } from '../../context/RoomContext';
import VideoPlayer from '../../Components/VideoPlayer';
import { Button ,Col,Row} from 'react-bootstrap';
import {TbScreenShare}  from "react-icons/tb"


const Room = () => {

    const {id} = useParams();
    const {ws, me ,stream, peers , ShareScreen} = useContext(RoomContext);

    useEffect(()=>{
        if(me)
        {
            ws.emit('join-room', {roomId:id, peerId:me._id})
        }
    },[me, id, ws]);

     console.log(Object.values(peers));
  return (
    <>
      Room {id}
      <Row>
      <Col xs={2} sm={3} md={4}>
        <VideoPlayer stream={stream}/>
        {
          Object.values(peers).map((peer)=>{
            return <VideoPlayer stream={peer.stream} />
          })
        }
      </Col>

      </Row>
      <Row> 
      <Button variant="danger" onClick={ShareScreen}>
  <TbScreenShare />
   </Button>
      </Row>
    </>
  )
}

export default Room
