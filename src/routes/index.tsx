import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import AdminBeranda from "../pages/admin-beranda";
import EmployeeBeranda from "../pages/employee-beranda";
import ManagerBeranda from "../pages/manager-beranda";
import App from "../App";
import Home from "../pages/home";
<<<<<<< HEAD
import PenggunaAset from "../pages/admin-pengguna-aset";
import PermohonanPersetujuan from "../pages/manager-persetujuan";
=======
import EmployeeAssets from "../pages/employee-assets";
import AdminAssets from "../pages/admin-assets";
>>>>>>> 73a9484238e2d0e8b60329d6585ad9fd4d28113b

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
