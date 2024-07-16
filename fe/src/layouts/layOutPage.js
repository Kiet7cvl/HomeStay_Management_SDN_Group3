import React, { Suspense, useEffect, useState } from "react";
import Header from "../components/common/header";
import { Footer } from "../components/common/footer";
import { checkLogin } from "../common/helper";
import { Link, Navigate, Route, Routes, useNavigate, useRoutes } from "react-router-dom";


const LayOutPage = (props) => {

	// const navigate = useNavigate()
	// useEffect(() => {
	// 	if (!checkLogin('access_token')) {
	// 		navigate('/sign-in');
	// 	}
	// }, [])

	return (
		<React.Fragment>
			<div className="main-content d-flex flex-column justify-content-between" style={{ height: '100vh' }}>
				<div className="page-content">
					<Header {...props} />
					{props.children}
					<Footer />
				</div>
			</div>
		</React.Fragment>
	);
};

export default (LayOutPage);
