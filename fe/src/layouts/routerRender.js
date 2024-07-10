import React from "react";
import { Link, Navigate, Route, Routes, useNavigate, useRoutes } from "react-router-dom";
import { AuthRoutes, Routers } from "../routers/router";
import { checkLogin } from "../common/helper";
import { useState, useEffect } from 'react';
import Home from "../page/home/home";

/* Layout */
const LayOutPage = React.lazy(() => import('./layOutPage'))

const Layout = () => {


	// const navigate = useNavigate()
	// useEffect(() => {
	// 	if (!checkLogin('access_token')) {
	// 		navigate('/sign-in');
	// 	}
	// }, [])

	return (
		<React.Fragment>
			<Routes>
				<Route>
					{Routers.map((route, idx) => (
						<Route
							path={route.path}
							element={<LayOutPage {...route}>{route.component}</LayOutPage>}
							key={idx}
							exact={true}
						/>
					))}
				</Route>
				<Route>
					{AuthRoutes.map((route, idx) => (
						<Route
							path={route.path}
							element={route.component}
							key={idx}
							exact={true}
						/>
					))}
				</Route>
			</Routes>
		</React.Fragment>
	);
};

export default Layout;
