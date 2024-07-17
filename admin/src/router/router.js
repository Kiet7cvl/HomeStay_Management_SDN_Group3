import React from "react";
import PageHome from "../pages/home/PageHome";
import PageUser from "../pages/user/PageUser";
import { LoginPage } from "../pages/auth/Login";
import AccountUser from "../pages/account/AccountUser";
import PageOwner from "../pages/owner/PageOwner";
import Feedback from "../pages/feedback/Feedback";
import Report from "../pages/report/Report";

export const routes = () => {
	return [
		{
			path: "/",
			element: <PageHome />,
			index: true,
			exact: true
		},
		{
		    path: "/account",
		    element: <AccountUser />,
		},
		{
			path: "/user/",
			children: [
				{
					path: "",
					element: <PageUser />,
				},
				{
					path: "*",
					element: <PageUser />,
				}
			]
		},
		{
			path: "/owner/",
			children: [
				{
					path: "",
					element: <PageOwner />,
				},
				{
					path: "*",
					element: <PageOwner />,
				}
			]
		},
		{
			path: "/feedback/",
			children: [
				{
					path: "",
					element: <Feedback />,
				},
				{
					path: "*",
					element: <Feedback />,
				}
			]
		},
		{
			path: "/report/",
			children: [
				{
					path: "",
					element: <Report />,
				},
				{
					path: "*",
					element: <Report />,
				}
			]
		},
	]
}

export const AuthRoutes = [{
	path: "/auth",
	children: [
		{
			path: "login",
			element: <LoginPage />,
		}
	]
},]
