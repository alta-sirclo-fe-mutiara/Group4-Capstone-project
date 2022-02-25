import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import AdminBeranda from "../pages/admin-beranda";
import EmployeeBeranda from "../pages/employee-beranda";
import ManagerBeranda from "../pages/manager-beranda";
import App from "../App";
import Home from "../pages/home";
import PenggunaAset from "../pages/admin-pengguna-aset";
import PermohonanPersetujuan from "../pages/manager-persetujuan";

const Index = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route index element={<Home />} />
				</Route>
				<Route path="/login" element={<Login />} />
				<Route path="/admin/beranda" element={<AdminBeranda/>}/>
				<Route path="/employee/beranda" element={<EmployeeBeranda/>}/>
				<Route path="/manager/beranda" element={<ManagerBeranda/>}/>
				<Route path="/admin/pengguna_aset" element={<PenggunaAset/>}/>
				<Route path="/manager/beranda" element={<ManagerBeranda/>}/>
				<Route path="/manager/permohonan_persetujuan" element={<PermohonanPersetujuan/>}/>
			</Routes>
		</BrowserRouter>
	);
};

export default Index;
