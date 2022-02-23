import { ChangeEvent, FormEvent, useState } from "react";
import { TextInput } from "../componets/TextInput";
import { Form } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

type credential = {
	name: string;
	email: string;
	password: string;
};

const Register = () => {
	document.title = " - Register ";
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const Navigate = useNavigate();

	const handleSubmit = async (e: FormEvent<HTMLElement>) => {
		e.preventDefault();
		await registerUser({
			name: name,
			email: email,
			password: password,
		});
	};

	const registerUser = async (credential: credential) => {
		await axios
			.post("http://54.169.184.219:8080/users", credential)
			.then((res) => {
				Swal.fire("Success!", "Your Account has been created.", "success").then(
					(res) => {
						if (res.isConfirmed) {
							Navigate("/login");
						}
					}
				);
			})
			.catch((err) => {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "E-mail already used!",
				});
			});
	};

	return (
		<>
			<div className="register">
				<div className="container mt-3 mb-5">
					<div className="row justify-content-center">
						<div className="col-11 col-md-6 col-lg-4">
							<div className="logo text-center">
								<NavLink to="/">Register</NavLink>
								<h4 className="register">Daftar Sekarang</h4>
							</div>
							<Form className="mt-4" onSubmit={handleSubmit}>
								<TextInput
									label="Full Name"
									type="text"
									onChange={(e: ChangeEvent<HTMLInputElement>) =>
										setName(e.target.value)
									}
								/>
								<TextInput
									label="Email Address"
									type="email"
									onChange={(e: ChangeEvent<HTMLInputElement>) =>
										setEmail(e.target.value)
									}
								/>
								<TextInput
									label="Password"
									type="password"
									onChange={(e: ChangeEvent<HTMLInputElement>) =>
										setPassword(e.target.value)
									}
								/>
								<div className="col d-grid gap-2 mt-4">
									<button type="submit" className="btn btn-sign-in text-white">
										Sign Up Now
									</button>
									<NavLink to="/login" className="btn btn-light">
										Sign In
									</NavLink>
								</div>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Register;
