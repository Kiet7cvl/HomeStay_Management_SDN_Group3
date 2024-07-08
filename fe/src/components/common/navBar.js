import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, Link, useNavigate, NavLink } from "react-router-dom";
import { Collapse, Container, NavDropdown, Nav, NavItem, Navbar } from 'react-bootstrap';
import { buildImage, checkLogin, getUser, onErrorUser, timeDelay } from "../../common/helper";
import { useDispatch } from "react-redux";
// import { toggleShowLoading } from "../../redux/actions/common";
// import { menuService } from "../../services/feService/menuService";
import { hover } from "@testing-library/user-event/dist/hover";

export const NavBarPage = () => {

	//menu activation
	const [menus, setMenus] = useState([]);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// const getMenus = async () => {
	// 	const response = await menuService.getDataList({
	// 		page: 1,
	// 		page_size: 2
	// 	});

	// 	if (response.status === 200) {
	// 		setMenus(response.data.menus)
	// 	}

	// }

	// useEffect(() => {
	// 	getMenus();
	// }, []);

	return (
		<React.Fragment>
			<Navbar
				className="navbar
				navbar-expand ftco-navbar-light navbar-dark"
			// id="ftco-navbar"
			>
				<Container className="headerHome" >
					<Navbar.Brand>
						{/* <Link to={ '/' } className={ 'navbar-brand' }>
							<img src={'/logo.png'} style={{ width: "100px"}} />
						</Link> */}
					</Navbar.Brand>

					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav" style={{ backdropFilter: "blur(5px)" }} className="justify-content-between">
						<Nav className="ml-auto justify-content-end">
							<NavLink className="nav-link" to="/" style={{ color: 'black' }}>
								Trang chủ
							</NavLink>
							<NavLink className="nav-link " to="/room" style={{ color: 'black' }}>
								Phòng
							</NavLink>
							<NavLink className="nav-link " to="/menu" style={{ color: 'black' }}>
								Bài viết
							</NavLink>
							<NavLink className="nav-link " to="/owner" style={{ color: 'black' }}>
								Cho thuê
							</NavLink>
						</Nav>
						<Nav className="navbar-light">
							{!checkLogin() ?
								<Nav>
									<Link to="/sign-up" className="nav-link text-dark">
										Đăng ký
									</Link>
									<h5 className="pt-2">/</h5>
									<Link to="/sign-in" className="nav-link text-dark">
										Đăng nhập
									</Link>
								</Nav >
								: <>

									<NavDropdown title={'Hi, ' + getUser()?.name} id="user-nav-dropdown" className="user-nav">
										<Link to="/account" className={'dropdown-item'}>Tài khoản</Link>
										<Link to="/booking" className={'dropdown-item'}>Lịch sử đặt phòng</Link>
										<Link to='#' onClick={async () => {

											// dispatch(toggleShowLoading(true))

											await timeDelay(500);
											localStorage.clear();
											window.location.href = '/'
											// dispatch(toggleShowLoading(false))

										}} className={'dropdown-item'}>Đăng xuất</Link>
									</NavDropdown>
								</>
							}

						</Nav>


					</Navbar.Collapse>
				</Container>
			</Navbar>

		</React.Fragment>
	);
};

