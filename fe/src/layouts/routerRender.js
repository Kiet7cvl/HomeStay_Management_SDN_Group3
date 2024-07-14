import React from "react";
import { Link, Navigate, Route, Routes, useNavigate, useRoutes } from "react-router-dom";
import { AuthRoutes, Routers, PublicRoutes } from "../routers/router";
import { checkLogin } from "../common/helper";
import { useState, useEffect } from 'react';
import Home from "../page/home/home";
import { SignInPage } from "../page/auth/loginPage";

/* Layout */
const LayOutPage = React.lazy(() => import('./layOutPage'))

const Layout = () => {

	return (
		<React.Fragment>
			<Routes>
				<Route>
					{PublicRoutes.map((route, idx) => (
						<Route
							path={route.path}
							element={<LayOutPage {...route}>{route.component}</LayOutPage>}
							key={idx}
							exact={true}
						/>
					))}
				</Route>

				<Route
					path="/*"
					element={
						checkLogin('access_token') ? (
							<Routes>
								{Routers.map((route, idx) => (
									<Route
										key={idx}
										path={route.path}
										element={<LayOutPage {...route}>{route.component}</LayOutPage>}
									/>
								))}
							</Routes>
						) : (
							<Navigate to="/sign-in" replace /> // Redirect to sign-in on unauthorized access
						)
					}
				/>


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
