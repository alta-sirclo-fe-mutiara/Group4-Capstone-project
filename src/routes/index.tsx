import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Login from "../pages/login";
import AdminBeranda from "../pages/admin-beranda";
import EmployeeBeranda from "../pages/employee-beranda";
import ManagerBeranda from "../pages/manager-beranda";
import App from "../App";
import Home from "../pages/home";
import PenggunaAset from "../pages/admin-pengguna-aset";
import PermohonanPersetujuan from "../pages/manager-persetujuan";
import EmployeeAssets from "../pages/employee-assets";
import AdminAssets from "../pages/admin-assets";

const Index = () => {
	const [role, setRole] = useState<string>("");

	// useEffect(() => {
	// 	const parsed = localStorage.getItem("id_role");
	// 	setRole(parsed);
	// }, []);

	return (
		<AuthContext.Provider value={role}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />}>
						<Route index element={<Home />} />
						<Route path="/assets" element={<EmployeeAssets />} />
					</Route>
					<Route path="/admin/assets" element={<AdminAssets />} />
					<Route path="/login" element={<Login />} />
					<Route path="/admin/beranda" element={<AdminBeranda />} />
					<Route path="/employee/beranda" element={<EmployeeBeranda />} />
					<Route path="/manager/beranda" element={<ManagerBeranda />} />
					<Route path="/admin/pengguna_aset" element={<PenggunaAset />} />
					<Route path="/manager/beranda" element={<ManagerBeranda />} />
					<Route
						path="/manager/permohonan_persetujuan"
						element={<PermohonanPersetujuan />}
					/>
				</Routes>
			</BrowserRouter>
		</AuthContext.Provider>
	);
};

export default Index;
