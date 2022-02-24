import { Outlet } from "react-router-dom";
import Footer from "./componets/Footer";
import Navbar from "./componets/Navbar";

function App() {
	return (
		<>
			<Navbar />
			<Outlet />
			<Footer />
		</>
	);
}

export default App;
