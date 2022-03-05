import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Logo from "../assets/img/logo.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
	const [role, setRole] = useState(localStorage.getItem('role') ? localStorage.getItem('role') : "");
	const [name, setName] = useState(localStorage.getItem('name') ? localStorage.getItem('name') : "");
	const navigate = useNavigate()

	const logoutHandle = () =>{
		localStorage.clear();
		navigate("login");
		window.location.reload();

	}
	return (
		<nav className="navbar navbar-expand-lg navbar-light shadow-sm">
			<div className="container">
				<div className="navbar-brand">
					<img
						src={Logo}
						alt="logo"
						height="60"
						className="d-inline-block align-text-top"
					/>
				</div>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
				{role === "1" ?
					<ul className="navbar-nav ms-auto">
					<li className="nav-item mr-3">
						<NavLink className="nav-link active" aria-current="page" to="/">
							Home
						</NavLink>
					</li>
					<li className="nav-item mr-3">
						<NavLink className="nav-link" aria-current="page" to="/admin/asset">
							Assets
						</NavLink>
					</li>
					<li className="nav-item mr-3">
						<NavLink className="nav-link" aria-current="page" to="/admin/pengguna_aset">
							Pengguna Aset
						</NavLink>
					</li>
					
					<li className="dropdown nav-item ms-3 my-auto py-2 py-lg-0">
						<NavLink
							className="avatar bg-dark p-2 fs-6 rounded-circle text-white"
							to="#"
						>
							<FaUserAlt />
						</NavLink>
						<NavLink
							to="#"
							className="text-decoration-none text-dark ms-2 dropdown-toggle"
							id="navbarDropdown"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							Hi, {name}
						</NavLink>
						<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
							<li>
								<NavLink className="bg-white text-black dropdown-item" to="#" onClick={logoutHandle}>
									Logout
								</NavLink>
							</li>
						</ul>
					</li>
				</ul> :
				role === "2" ?
				<ul className="navbar-nav ms-auto">
				<li className="nav-item mr-3">
					<NavLink className="nav-link active" aria-current="page" to="/">
						Home
					</NavLink>
				</li>
				<li className="nav-item mr-3">
					<NavLink className="nav-link" aria-current="page" to="/employee/asset">
						Assets
					</NavLink>
				</li>
				
				<li className="dropdown nav-item ms-3 my-auto py-2 py-lg-0">
					<NavLink
						className="avatar bg-dark p-2 fs-6 rounded-circle text-white"
						to="#"
					>
						<FaUserAlt />
					</NavLink>
					<NavLink
						to="#"
						className="text-decoration-none text-dark ms-2 dropdown-toggle"
						id="navbarDropdown"
						role="button"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						Hi, {name}
					</NavLink>
					<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
						<li>
							<NavLink className="bg-white text-black dropdown-item" to="#" onClick={logoutHandle}>
								Logout
							</NavLink>
						</li>
					</ul>
				</li>
			</ul> :
			role === "3" ?
			<ul className="navbar-nav ms-auto">
			<li className="nav-item mr-3">
				<NavLink className="nav-link active" aria-current="page" to="/">
					Home
				</NavLink>
			</li>
			<li className="nav-item mr-3">
				<NavLink className="nav-link" aria-current="page" to="/manager/permohonan_persetujuan">
					Permohonan Persetujuan
				</NavLink>
			</li>
			
			<li className="dropdown nav-item ms-3 my-auto py-2 py-lg-0">
				<NavLink
					className="avatar bg-dark p-2 fs-6 rounded-circle text-white"
					to="#"
				>
					<FaUserAlt />
				</NavLink>
				<NavLink
					to="#"
					className="text-decoration-none text-dark ms-2 dropdown-toggle"
					id="navbarDropdown"
					role="button"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					Hi, {name}
				</NavLink>
				<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
					<li>
						<NavLink className="bg-white text-black dropdown-item" to="#" onClick={logoutHandle}>
							Logout
						</NavLink>
					</li>
				</ul>
			</li>
		</ul> 
				: 
				<ul></ul>
				}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
