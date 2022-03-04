import { Outlet } from "react-router-dom";
<<<<<<< HEAD
import Footer from "./componets/footer";
import Navbar from "./componets/navbar";
=======
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
>>>>>>> 9ac5aa0bfe4c6e83a297883adfae49c43a6f2575

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
