import React from "react";
import PageHome from "../pages/home/PageHome";
import PageArticle from "../pages/article/PageArticle";
import CreateArticle from "../pages/article/CreateArticle";
import UpdateArticle from "../pages/article/UpdateArticle";
import PageRoom from "../pages/room/PageRoom";
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
			path: "/article/",
			children: [
				{
					path: "",
					element: <PageArticle />,
				},
				{
					path: "create",
					element: <CreateArticle />,
				},
				{
					path: "update/:id",
					element: <UpdateArticle />,
				},
				{
					path: "*",
					element: <PageArticle />,
				},
			]
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
			path: "/room/",
			children: [
				{
					path: "",
					element: <PageRoom />,
				},
				{
					path: "*",
					element: <PageRoom />,
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
