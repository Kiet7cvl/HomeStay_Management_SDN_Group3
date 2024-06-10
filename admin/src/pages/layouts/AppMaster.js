import { Link, NavLink, Navigate, Route, Routes, useNavigate, useRoutes } from "react-router-dom";
import { AuthRoutes, routes } from "../../router/router";
import { Provider } from "react-redux";
import { store } from "../../store/Store";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../../index.css";
// import { checkLogin } from "../../services/common";
import React, { useEffect } from "react";
// import { buildImage, DEFAULT_USER, getUser } from "../../common/common";

function AppMaster ()
{
	const routeConfig = useRoutes( routes() );
	// const authRoutes = useRoutes( AuthRoutes );

	// const navigate = useNavigate()
	// useEffect( () =>
	// {
	// 	if ( !checkLogin() )
	// 	{
	// 		navigate( '/auth/login' );
	// 	}
	// }, [checkLogin()] )


	return (
		<Provider store={ store }>
			{/* {
				checkLogin() ? */}
            
					<div>
						<Navbar bg="dark" data-bs-theme="dark" expand="lg" className=" mb-5 fixed-top">
							<Container >
								<Navbar.Brand>
									<Link to="/" className={ 'nav-link' }>Trang chủ</Link>
								</Navbar.Brand>
								<Navbar.Toggle aria-controls="basic-navbar-nav" />
								<Navbar.Collapse id="basic-navbar-nav">
									<Nav className="me-auto justify-content-evenly w-100">
										<NavLink to="/booking" className={ 'nav-link' }>Quản lý đặt phòng</NavLink>
										<NavLink to="/article" className={ 'nav-link ' }>Bài viết</NavLink>
										<NavLink to="/user" className={ 'nav-link' }>Thành viên</NavLink>
										<NavLink to="/feedback" className={ 'nav-link' }>Đánh giá</NavLink>
										<NavDropdown title="Phân quyền" id="basic-nav-dropdown">
											<NavLink to="/permission" className={ 'dropdown-item ' }>Permission</NavLink>
											<NavLink to="/role" className={ 'dropdown-item' }>Role</NavLink>
											<NavLink to="/admin" className={ 'dropdown-item' }>Admin</NavLink>
										</NavDropdown>
									</Nav>
									<Nav className="d-flex">
										<img style={ { width: '50px', height: '50px', borderRadius: '50%' } } src='../assets/images/default-avatar.png' />
										<NavDropdown title={ "kiet7cvl" } id="user-nav-dropdown" className="user-nav">
											<Link to="/account" className={ 'dropdown-item' }>Tài khoản</Link>
											<Link to='#' onClick={ () =>
											{
												localStorage.clear();
											} } className={ 'dropdown-item' }>Đăng xuất</Link>
										</NavDropdown>
									</Nav>

								</Navbar.Collapse>
							</Container>
						</Navbar>
						<ToastContainer />
						<div className={ '' } style={{paddingTop: '12vh'}}></div>
						{ routeConfig }
					</div>
					{/* : authRoutes
			} */}

			{/* <Routes>
				<Route
					path="/auth"
					element={ <Navigate to="/auth/login" replace /> }
				/>
			</Routes> */}
		</Provider>
	);
}

export default AppMaster;
