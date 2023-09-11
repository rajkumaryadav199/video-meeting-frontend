import React, { useContext, useEffect , useState , useRef} from 'react'
import { useParams } from 'react-router-dom'
import { RoomContext } from '../../context/RoomContext';
import VideoPlayer from '../../Components/VideoPlayer';
import { Button ,Col,Row} from 'react-bootstrap';
import {TbScreenShare}  from "react-icons/tb"

const Room = () => {

    const {id} = useParams();
    const [permissionDenied, setPermissionDenied] = useState(false);
    const {ws, me ,stream, peers , ShareScreen , screenSharingId, setRoomId} = useContext(RoomContext);

    useEffect(()=>{
        if(me)
        {
          ws.emit("join-room", {roomId:id, peerId:me?._id})
        }
    },[me, id, ws]);

    useEffect(()=>{
      setRoomId(id)
    },[id, setRoomId, peers]);

    const handleShareScreen = async () => {
      try {
        await ShareScreen();
      } catch (error) {
        // Handle permission denied error
        setPermissionDenied(true);
      }
    }
     console.log({screenSharingId}, Object.values(peers));
  return (
    <>
      Room {id}
      <Row>
        <Col xs={12} sm={3} md={4} lg={3}>
          <VideoPlayer stream={stream} />
          {/* <video ref={videoRef} autoPlay muted /> */}
        </Col>
        <Col xs={12} sm={3} md={4} lg={3}>
          {
              Object.values(peers).map((peer)=>{
                console.log("peers",peer)
                return <VideoPlayer stream={peer}/>
              })
          }
        </Col>
      </Row>
      <Row> 
        <Col>
          <Button variant="danger" size='sm' onClick={handleShareScreen}>
            <TbScreenShare />
          </Button>
        </Col>
      </Row>
      {permissionDenied && <p>Permission denied for screen sharing.</p>}
    </>
  )
}

export default Room
