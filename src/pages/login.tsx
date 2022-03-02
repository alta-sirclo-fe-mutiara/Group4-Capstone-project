import { useState, ChangeEvent } from "react";
import axios from "axios";

import ImgModel from "../assets/img/img-login.png";
import Logo from "../assets/img/logo.svg";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isInvalid, setIsInvalid] = useState(false);

  const loginHandle = () => {
    axios
      .post("/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("role", res.data.data.id_role);
        localStorage.setItem("name", res.data.data.name);
        localStorage.setItem("id", res.data.data.id_user);
        setIsInvalid(false);
      })
      .catch((err) => {
        console.log(err);
        setIsInvalid(true);
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
                  <img
                    src={Logo}
                    className="mb-5 mt-0 mt-sm-4 mb-md-none"
                    alt="logo"
                  />
                </div>
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
                  <div
                    className={`${isInvalid ? "invalid-feedback" : "d-none"}`}
                  >
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
                  <div
                    className={`${isInvalid ? "invalid-feedback" : "d-none"}`}
                  >
                    Please enter correct password.
                  </div>
                </div>
                <div className="col d-grid gap-2 px-0 mt-4">
                  <button
                    className="btn btn-sign-in text-white"
                    onClick={() => loginHandle()}
                  >
                    Sign In to My Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
