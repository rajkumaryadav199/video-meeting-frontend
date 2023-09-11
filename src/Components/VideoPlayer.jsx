import React ,{useRef, useEffect }from 'react'

const VideoPlayer = ({stream}) => {
    const videoRef = useRef(null)
      console.log(stream)
    useEffect(()=>{
      if(videoRef.current)
        {
          videoRef.current.srcObject=stream
        }
    },[stream])
  return <video ref={videoRef} autoPlay muted={true} />
}

export default VideoPlayer
