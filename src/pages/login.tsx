/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";

import ImgModel from "../assets/img/img-login.png";
import Logo from "../assets/img/logo.svg";

type credential = {
	email: string;
	password: string;
};

const Login = () => {
	document.title = "E-Assets - Login ";
	const [data, setData] = useState<any>();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState<string>("");
	const [isInvalid, setIsInvalid] = useState(false);
	const Navigate = useNavigate();

	const handleSubmit = async (e: FormEvent<HTMLElement>) => {
		e.preventDefault();
		await LoginUser({
			email: email,
			password: password,
		});
	};

	const LoginUser = async (credential: credential) => {
		axios
			.post("http://54.169.184.219:8080/login", credential)
			.then((res) => {
				const { data } = res;
				localStorage.setItem("token", data.token);
				localStorage.setItem("user_id", data.user_id);
				localStorage.setItem("isAuthenticated", "true");
				fetchData();
			})
			.catch((err) => {
				setIsInvalid(true);
				console.log(err);
			});
	};

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = () => {
		axios
			.get(`http://54.169.184.219:8080/users/${localStorage.getItem("user_id")}`)
			.then((res) => {
				setData(res.data.data);
				setName(res.data.data.name);
				setEmail(res.data.data.email);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<div className="container-fluid">
				<div className="row login-row d-flex align-items-center">
					<div className="col-12 col-md-6 lg-6 d-none d-md-block text-center side-left">
						<div className="row d-flex justify-content-center mt-5">
							<img className="imgModel mt-5" src={ImgModel} alt="model" />
						</div>
					</div>
					<div className="col-12 col-md-6 lg-6 pb-4 side-right">
						<div className="row d-flex justify-content-center ">
							<div className="col-10 col-md-8 col-lg-6 ">
								<div className="logo text-center">
									<img src={Logo} className="mb-5 mt-0 mt-sm-4 mb-md-none" alt="logo" />
								</div>
								<Form onSubmit={handleSubmit}>
									<div className="form-group mt-2">
										<label className="form-label">Email Address</label>
										<input
											className={`form-control ${isInvalid ? "is-invalid" : ""}`}
											type="text"
											required
											onChange={(e: ChangeEvent<HTMLInputElement>) =>
												setEmail(e.target.value)
											}
										/>
										<div className={`${isInvalid ? "invalid-feedback" : "d-none"}`}>
											Please enter correct email.
										</div>
									</div>
									<div className="form-group mt-2">
										<label className="form-label">Password</label>
										<input
											className={`form-control ${isInvalid ? "is-invalid" : ""}`}
											type="password"
											required
											onChange={(e: ChangeEvent<HTMLInputElement>) =>
												setPassword(e.target.value)
											}
										/>
										<div className={`${isInvalid ? "invalid-feedback" : "d-none"}`}>
											Please enter correct password.
										</div>
									</div>
									<div className="col d-grid gap-2 px-0 mt-4">
										<button className="btn btn-sign-in text-white" type="submit">
											Sign In to My Account
										</button>
									</div>
								</Form>
								{/* <h1>Data</h1>
								<h2>{data?.name}</h2>
								<h3>{data?.email}</h3> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
