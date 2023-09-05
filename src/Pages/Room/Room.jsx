import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RoomContext } from '../../context/RoomContext';
import VideoPlayer from '../../Components/VideoPlayer';
import { Container ,Col} from 'react-bootstrap';

const Room = () => {

    const {id} = useParams();
    const {ws, me ,stream, peers} = useContext(RoomContext);

    useEffect(()=>{
        if(me)
        {
            ws.emit('join-room', {roomId:id, peerId:me._id})
        }
    },[id,ws, me ,peers]);

     console.log(Object.values(peers));
  return (
    <>
      Room {id}
      <Container>
      <Col xs={12} sm={3} md={4} lg={6}>
      <VideoPlayer stream={stream} />
        {
          Object.values(peers).map((peer)=>{
            return <VideoPlayer stream={peer.stream} />
          })
        }
      </Col>

      </Container>
    </>
  )
}

export default Room
