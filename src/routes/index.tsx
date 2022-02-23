/* eslint-disable @typescript-eslint/no-redeclare */
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../pages/register";
import Login from "../pages/login";

const Index = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Index;
