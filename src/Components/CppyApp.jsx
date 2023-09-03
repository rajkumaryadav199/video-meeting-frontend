import logo from './logo.svg';
import './App.css';
import { Button ,TextField, IconButton} from '@mui/material';
import { Assignment, Phone } from '@mui/icons-material';
import React, { useEffect, useRef, useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import Peer from "simple-peer"
import io from "socket.io-client"
import { Join } from './Components/JoinButton';
const socket = io.connect('http://localhost:8080')

function App() {
  const [ me, setMe ] = useState("")
	const [ stream, setStream ] = useState()
	const [ receivingCall, setReceivingCall ] = useState(false)
	const [ caller, setCaller ] = useState("")
	const [ callerSignal, setCallerSignal ] = useState()
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [ idToCall, setIdToCall ] = useState("")
	const [ callEnded, setCallEnded] = useState(false)
	const [ name, setName ] = useState("")
	const myVideo = useRef()
	const userVideo = useRef()
	const connectionRef= useRef()
	const [id, setId] = useState()
 
	useEffect(() => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream)
			console.log('stream', stream)
			if(myVideo.current)
			{
				myVideo.current.srcObject = stream
			}
		})

	socket.on("me", (id) => {
		setId(id)
			setMe(id)
		})

		socket.on("callUser", (data) => {
			setReceivingCall(true)
			setCaller(data.from)

			setName(data.name)
			setCallerSignal(data.signal)
		})
	}, [myVideo])

	// const callUser = (id) => {
	// 	const peer = new Peer({
	// 		initiator: true,
	// 		trickle: false,
	// 		stream: stream
	// 	})

	// 	peer.on("signal", (data) => {
	// 		socket.emit("callUser", {
	// 			userToCall: id,
	// 			signalData: data,
	// 			from: me,
	// 			name: name
	// 		})
	// 	})

	// 	peer.on("stream", (stream) => {
	// 			userVideo.current.srcObject = stream
			
	// 	})
	// 	socket.on("callAccepted", (signal) => {
	// 		setCallAccepted(true)
	// 		peer.signal(signal)
	// 	})

	// 	connectionRef.current = peer
	// }

	// const answerCall =() =>  {
	// 	setCallAccepted(true)
	// 	const peer = new Peer({
	// 		initiator: false,
	// 		trickle: false,
	// 		stream: stream
	// 	})
	// 	peer.on("signal", (data) => {
	// 		socket.emit("answerCall", { signal: data, to: caller })
	// 	})
	// 	peer.on("stream", (stream) => {
	// 		// userVideo.current.srcObject = stream
	// 		if (userVideo.current) {
	// 			userVideo.current.srcObject = stream;
	// 		  }
	// 	})
	// 	peer.signal(callerSignal)
	// 	connectionRef.current = peer
	// }

	// const leaveCall = () => {
	// 	setCallEnded(true)
	// 	connectionRef.current.destroy()
	// }

console.log('me', me, myVideo)
  return (
    <div className="App">
		<h1 style={{ textAlign: "center", color: '#fff' }}>Meeting Started</h1>
		{/* <div className="container">
			<div className="video-container">
				<div className="video">
					{stream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
				</div>
				<div className="video">
					{callAccepted && !callEnded ?
					<video playsInline ref={userVideo} autoPlay style={{ width: "300px"}} />:
					null}
				</div>
			</div>
			<div className="myId">
				<TextField
					id="filled-basic"
					label="Name"
					variant="filled"
					value={name}
					onChange={(e) => setName(e.target.value)}
					style={{ marginBottom: "20px" }}
				/>
				<CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
					<Button variant="contained" color="primary" startIcon={<Assignment fontSize="large" />}>
						Copy ID
					</Button>
				</CopyToClipboard>

				<TextField
					id="filled-basic"
					label="ID to call"
					variant="filled"
					value={idToCall}
					onChange={(e) => setIdToCall(e.target.value)}
				/>
				<div className="call-button">
					{callAccepted && !callEnded ? (
						<Button variant="contained" color="secondary" onClick={leaveCall}>
							End Call
						</Button>
					) : (
						<IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
							<Phone fontSize="large" />
						</IconButton>
					)}
					{idToCall}
				</div>

				<Button
					variant="contained"
					color="primary"
					onClick={() => {
					const newStream = stream.clone(); // Clone the current stream
					newStream.getVideoTracks().forEach((track) => {
					track.enabled = !track.enabled; // Toggle video track
					});
					setStream(newStream);
					}}
					>
					{stream?.getVideoTracks()[0]?.enabled ? "Stop Video" : "Start Video"}
				</Button>
				<Button
					variant="contained"
					color="primary"
					onClick={() => {
					const newStream = stream.clone(); // Clone the current stream
					newStream.getAudioTracks().forEach((track) => {
						track.enabled = !track.enabled; // Toggle audio track
					});
					setStream(newStream);
					}}
				>
					{stream?.getAudioTracks()[0]?.enabled ? "Mute" : "Unmute"}
				</Button>
			</div>
			<div>
				{receivingCall && !callAccepted ? (
						<div className="caller">
						<h1 >{name} is calling...</h1>
						<Button variant="contained" color="primary" onClick={answerCall}>
							Answer
						</Button>
					</div>
				) : null}
			</div>
		</div> */}
		<Join />
    </div>
);
}

export default App;
