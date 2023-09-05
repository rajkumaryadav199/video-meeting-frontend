import { Routes,Route } from "react-router-dom";
import { Join } from "./Components/JoinButton";
import { useEffect } from "react";
import Home from "./Pages/Home/Home";
import Room from "./Pages/Room/Room";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

return(
	<>
	<div className="container">
		<div className="h1">Video meeting
		</div>
	</div>
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/room/:id" element={<Room />} />
	</Routes>
		
	</>
)
}
export default App;