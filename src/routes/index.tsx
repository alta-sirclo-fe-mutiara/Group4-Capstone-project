import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "../pages/login";
import AdminBeranda from "../pages/admin-beranda";
import EmployeeBeranda from "../pages/employee-beranda";
import ManagerBeranda from "../pages/manager-beranda";
import App from "../App";
import PenggunaAset from "../pages/admin-pengguna-aset";
import PermohonanPersetujuan from "../pages/manager-persetujuan";
import EmployeeAssets from "../pages/employee-assets";
import AdminAssets from "../pages/admin-assets";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../pages/notFound";

const Index = () => {
	const [role, setRole] = useState(localStorage.getItem('role') ? localStorage.getItem('role') : "");

	return (
		<BrowserRouter>
            <Routes>
                <Route path="/" element={role === "1" || role === "2" || role === "3" ? <App /> : <Login />}>
                    <Route path="login" element={<Login />} />
					<Route element={<ProtectedRoute />}>
					<Route path="/" element={role === "1" ? <AdminBeranda /> : role === "2" ? <EmployeeBeranda /> : role === "3" ? <ManagerBeranda /> : <Login />} />
					<Route path="/admin/asset" element={role === "1" ?  <AdminAssets /> : <NotFound />} />
					<Route path="/admin/pengguna_aset" element={role === "1" ?  <PenggunaAset /> : <NotFound />} />
					<Route path="/employee/asset" element={role === "2" ?  <EmployeeAssets /> : <NotFound />} />
					<Route path="/manager/permohonan_persetujuan" element={role === "3" ?  <PermohonanPersetujuan /> : <NotFound />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>

	);
};

export default Index;
