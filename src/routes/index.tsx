import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import AdminBeranda from "../pages/admin-beranda";
import EmployeeBeranda from "../pages/employee-beranda";
import ManagerBeranda from "../pages/manager-beranda";

const Index = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/admin/beranda" element={<AdminBeranda />} />
				<Route path="/employee/beranda" element={<EmployeeBeranda />} />
				<Route path="/manager/beranda" element={<ManagerBeranda />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Index;
