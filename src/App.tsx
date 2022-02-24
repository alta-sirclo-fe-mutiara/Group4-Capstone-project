import { Outlet } from "react-router-dom";
import Footer from "./componets/footer";
import Navbar from "./componets/navbar";

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
