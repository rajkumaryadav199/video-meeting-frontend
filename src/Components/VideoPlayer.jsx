import React ,{useRef, useEffect }from 'react'

const VideoPlayer = ({stream}) => {
    const videoRef = useRef(null)
    
    useEffect(()=>{
      if(videoRef.current)
        {
            videoRef.current.srcObject=stream
        }
    },[stream])
  return <video ref={videoRef} autoPlay muted />
}

export default VideoPlayer
