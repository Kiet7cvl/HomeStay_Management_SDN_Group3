import React from "react";
import ProfilePage from "../page/auth/profilePage";
import RoomPage from "../page/room/roomPage";
import BlogsPage from "../page/others/blogPage";
import Home from "../page/home/home";
import ErrorPage from "../page/auth/error";
import SignUpPage from "../page/auth/registerPage";
import { SignInPage } from "../page/auth/loginPage";
import RoomDetailPage from "../page/room/roomDetailPage";
import { BlogDetail } from "../components/blog/blogDetail";
import { FormBooking } from "../components/form/formBooking";
import { BookingPage } from "../page/others/BookingPage";
import PricingPage from "../page-owner/pricing";
import ReservationPage from "../page-owner/reservations";
import TransactionPage from "../page-owner/transaction";
import RoomLissPage from "../page-owner/roomList";
import RoomCreatePage from "../page-owner/roomCreate";
import RoomDetail from "../page-owner/roomDetail";
// import { PaymentStatus } from "../components/booking/paymentStatus";
// import  {PaymentPage}  from "../page/others/paymentPage.js";

export const Routers = [
	//profile Section(User Profile)

	{ path: "/room", title: 'Room', component: <RoomPage /> },
	{
		path: "/room/:id",
		parents: [
			{
				title: 'Room',
				path: '/room'
			}
		],
		title: 'Chi tiết phòng',
		component: <RoomDetailPage />
	},
	// 	// menu
	{
		path: "/menu/:id",
		title: 'Menu',
		component: <BlogsPage />
	},

	{
		path: "/menu",
		title: 'Bài viết',
		component: <BlogsPage />
	},

	{
		path: "/menu/show/:id/",
		title: 'Chi tiết',
		parents: [
			{
				title: 'Menu',
				path: '/menu'
			}
		],
		component: <BlogDetail />
	},
		//booking
	{
		path: "/booking/create",

		title: "Đặt phòng",
		component: <FormBooking />
	},

	{
		path: "/booking/create/:id",

		title: "Đặt phòng",
		component: <FormBooking />
	},
	// 	{
	// 		path: "/payment/:id",
	// 		title: "payment",
	// 		component: <PaymentPage />
	// 	},
	{
		path: "/booking",
		title: "Lịch sử đặt phòng",
		component: <BookingPage />
	},

	// 	{
	// 		path: "/payment/:type",
	// 		title: "Thanh toán",
	// 		component: <PaymentStatus />
	// 	},

	// 	// other
	{
		path: "/home",
		title: 'HomePage',
		component: <Home />
	},
	{
		path: "/account",
		title: 'Thông tin tài khoản',
		component: <ProfilePage />
	},
	{
		path: "/become-owner",
		title: 'Trở thành Owner',
		component: <PricingPage />
	},
	{
		path: "/owner/reservations",
		title: 'Đặt phòng',
		component: <ReservationPage />
	},
	{
		path: "/owner/transaction_history",
		title: 'Thu nhập',
		component: < TransactionPage/>
	},
	{
		path: "/owner/room-list",
		title: 'Phòng cho thuê',
		component: < RoomLissPage />
	},
	{
		path: "/owner/room-detail",
		title: 'Chi tiết phòng',
		component: < RoomDetail />
	},
	{
		path: "/owner/room-create",
		title: 'Cho thuê mới ',
		component: <RoomCreatePage />
	},
	// {
	// 	path: "/account",
	// 	title: 'Thông tin tài khoản',
	// 	component: <ProfilePage />
	// },
	{ path: "/", component: <Home /> },
	{ path: "/error", component: <ErrorPage /> },

];


export const AuthRoutes = [
	{ path: "/sign-up", component: <SignUpPage /> },
	{ path: "/sign-in", component: <SignInPage /> }
]
