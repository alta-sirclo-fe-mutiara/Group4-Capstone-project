import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import App from "../App";
import Home from "../pages/home";
import EmployeeAssets from "../pages/employee-assets";
import AdminAssets from "../pages/admin-assets";

const Index = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route index element={<Home />} />
					<Route path="/assets" element={<EmployeeAssets />} />
				</Route>
				<Route path="/admin/assets" element={<AdminAssets />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Index;
