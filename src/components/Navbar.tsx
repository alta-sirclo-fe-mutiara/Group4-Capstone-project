import { FaUserAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Logo from "../assets/img/logo.svg";

const Navbar = () => {
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
					<ul className="navbar-nav ms-auto">
						<li className="nav-item mr-3">
							<NavLink className="nav-link active" aria-current="page" to="/">
								Home
							</NavLink>
						</li>
						<li className="nav-item mr-3">
							<NavLink className="nav-link" aria-current="page" to="/assets">
								Assets
							</NavLink>
						</li>
						{/* <li className="nav-item mr-3">
							<NavLink className="nav-link" aria-current="page" to="/assets">
								Pengguna Aset
							</NavLink>
						</li> */}
						{/* {isEmployee ? (
							<>
								<li className="nav-item mr-3">
									<NavLink className="nav-link" aria-current="page" to="/assets">
										Assets
									</NavLink>
								</li>
							</>
						) : (
							isAdmin(
								<>
                								<li className="nav-item mr-3">
									<NavLink className="nav-link" aria-current="page" to="/assets">
										Assets
									</NavLink>
								</li>
									<li className="nav-item mr-3">
										<NavLink className="nav-link" aria-current="page" to="/assets">
											Pengguna Aset
										</NavLink>
									</li>
								</>
							)
						) : isManager(									<li className="nav-item mr-3">
										<NavLink className="nav-link" aria-current="page" to="/assets">
											Permohonan Persetujuan
										</NavLink>
									</li>) : (
                    						<li className="dropdown nav-item my-auto py-2 py-lg-0">
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
								Hi, Employee
							</NavLink>
							<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
								<li>
									<NavLink className="bg-white text-black dropdown-item" to="#">
										Logout
									</NavLink>
								</li>
							</ul>
						</li>
                  ) }  */}
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
								Hi, Employee
							</NavLink>
							<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
								<li>
									<NavLink className="bg-white text-black dropdown-item" to="#">
										Logout
									</NavLink>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
