import { Link, NavLink, Navigate, Route, Routes, useNavigate, useRoutes } from "react-router-dom";
import { AuthRoutes, routes } from "../../router/router";
import { Provider, useDispatch, useSelector } from "react-redux";
// import { store } from "../../redux/store";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../../index.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faBars, faUser, faHouseUser, faComment, faFlag, faEnvelope, faBell } from '@fortawesome/free-solid-svg-icons'
import img from '../../assets/images/default-avatar.png'

import React, { useEffect, useState } from "react";

function AppMaster() {
	const routeConfig = useRoutes(routes());
	const [isOpen, setIsOpen] = useState(false);

	const handletoggler = (event) => {
		event.preventDefault();
		setIsOpen(!isOpen);
	}

	const [hoveredFeedbackLink, setHoveredFeedbackLink] = useState(() => {
		// Retrieve initial value from local storage
		const storedLink = localStorage.getItem('hoveredFeedbackLink');
		return storedLink || '/';
	});

	useEffect(() => {
		// Update local storage whenever hoveredFeedbackLink changes
		localStorage.setItem('hoveredFeedbackLink', hoveredFeedbackLink);
	}, [hoveredFeedbackLink]);

	const handleLinkHover = (href) => {
		setHoveredFeedbackLink(href);
	};


	return (

		<div className="container-fluid position-relative bg-white d-flex p-0">
			<div class={`sidebar pe-4 pb-3 ${isOpen ? 'open' : ''}`}>
				<nav class="navbar navbar-light">
					<a href="/" class="navbar-brand mx-4 mb-3">
						<h3 class="text-primary">DASHMIN</h3>
					</a>
					<div class="d-flex align-items-center ms-4 mb-4">
						<div class="position-relative">
							<img class="rounded-circle" src={img} alt="" style={{ width: "40px", height: "40px;" }} />
							<div class="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
						</div>
						<div class="ms-3">
							<h6 class="mb-0 fw-bold">Jhon Doe</h6>
							<span>Admin</span>
						</div>
					</div>
					<div class="navbar-nav w-100">
						<Link to={'/'} onMouseDown={() => handleLinkHover('/')} class={`nav-item nav-link  ${hoveredFeedbackLink === '/' ? 'active' : ''}`}><FontAwesomeIcon icon={faChartLine} className="icon me-2" size="8x" />Dashboard</Link>
						<Link to={'/user'} onMouseDown={() => handleLinkHover('/user')} class={`nav-item nav-link  ${hoveredFeedbackLink === '/user' ? 'active' : ''}`} ><FontAwesomeIcon icon={faUser} className="icon me-2" size="8x" />User</Link>
						<Link to={'/owner'} onMouseDown={() => handleLinkHover('/owner')} class={`nav-item nav-link  ${hoveredFeedbackLink === '/owner' ? 'active' : ''}`}><FontAwesomeIcon icon={faHouseUser} className="icon me-2" size="8x" />Owner</Link>
						<Link to={'/feedback'} onMouseDown={() => handleLinkHover('/feedback')} class={`nav-item nav-link  ${hoveredFeedbackLink === '/feedback' ? 'active' : ''}`}><FontAwesomeIcon icon={faComment} className="icon me-2" size="8x" />Feedback</Link>
						<Link to={'/report'} onMouseDown={() => handleLinkHover('/report')} class={`nav-item nav-link  ${hoveredFeedbackLink === '/report' ? 'active' : ''}`}><FontAwesomeIcon icon={faFlag} className="icon me-2" size="8x" />Report</Link>
					</div>
				</nav>
			</div>
			<div className={`content ${isOpen ? 'open' : ''}`}>

				{/* Header end  */}
				<nav class="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0" >
					<a href="#" class="sidebar-toggler flex-shrink-0" onClick={handletoggler}>
						<FontAwesomeIcon icon={faBars} size="2x" />
					</a>
					<form class="d-none d-md-flex ms-4">
						<input class="form-control border-0" type="search" placeholder="Search" />
					</form>

					<div class="navbar-nav align-items-center ms-auto">
						<div>
							<Link to="/feedback" onMouseDown={() => handleLinkHover('/feedback')} class="nav-item nav-link">
								<FontAwesomeIcon icon={faEnvelope} className="icon me-2" size="8x" />
								<span class="d-none d-lg-inline-flex">Message</span>
							</Link>
						</div>

						<div>
							<Link to="/report" onMouseDown={() => handleLinkHover('/report')} class="nav-item nav-link">
								<FontAwesomeIcon icon={faBell} className="icon me-2" size="8x" />
								<span class="d-none d-lg-inline-flex">Notificatin</span>
							</Link>
						</div>

						<div class="nav-item dropdown">
							<a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
								<img class="rounded-circle me-lg-2" src={img} alt="" style={{ width: "40px", height: "40px" }} />
								<span class="d-none d-lg-inline-flex">John Doe</span>
							</a>
							<div class="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
								<a href="account" class="dropdown-item">My Profile</a>
								<a href="#" class="dropdown-item">Settings</a>
								<a href="#" class="dropdown-item">Log Out</a>
							</div>
						</div>
					</div>
				</nav>
				{/* Header end  */}


				{/* content Start  */}
				<div class="container-fluid pt-4 px-4">
					{routeConfig}
				</div>
				{/* content end  */}


				{/* Footer Start  */}
				<div class="container-fluid pt-4 px-4">
					<div class="container-fluid pt-4 px-4">
						<div class="bg-light rounded-top p-4">
							<div class="row">
								<div class="col-12 col-sm-6 text-center text-sm-start">
									&copy; <a href="#">Your Site Name</a>, All Right Reserved.
								</div>
								<div class="col-12 col-sm-6 text-center text-sm-end">
									Designed By <a href="https://htmlcodex.com">HomeStay Manager's Team</a>
								</div>
							</div>
						</div>
					</div>

				</div>
				{/* Footer End  */}
			</div>
			<ToastContainer />
		</div>
	);
}

export default AppMaster;
