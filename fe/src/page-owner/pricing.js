import React, { useEffect, useState } from "react";
// import { BlogList } from "../../components/blog/blogList";
// import { useDispatch } from "react-redux";
// import { toggleShowLoading } from "../../redux/actions/common";
// import { ArticleService } from "../../services/feService/articleService";
// import { useParams } from "react-router";
// import { menuService } from "../../services/feService/menuService";
// import { useSearchParams } from "react-router-dom";
// import { INIT_PAGING } from "../../common/constant";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { UserService } from "../services/feService/userService";

import { toast } from "react-toastify"


const PricingPage = () => {

	document.title = 'Pricing';

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);


	const onSuccessPaypal = async (details, data) => {
		console.log('PayPal payment successful:', details, data);
		// const id = JSON.parse(localStorage.getItem('user'))._id
		// const response = await UserService.putBecomeOwnerData(id, "668ead6e14c426340ad69882");
		// if (response?.status === 200 && response?.data) {
		// 	localStorage.setItem('access_token', response.data.accessToken);
		// 	let user = {
		// 		name: response.data.user?.name,
		// 		email: response.data.user?.email,
		// 		avatar: response.data.user?.avatar,
		// 		_id: response.data.user?._id,
		// 		phone: response.data.user?.phone || null,
		// 		type: response.data.user?.type,
		// 		roles: "OWNER",
		// 	};
		// 	localStorage.setItem('user', JSON.stringify(user));
		// 	handleClose();
		// 	toast('Nâng cấp lên OWNER thành công !!', { type: 'success', autoClose: 900 })
		// } else {
		// 	handleClose();
		// 	toast('Nâng cấp lên OWNER thất bại !!', { type: 'error' })
		// }
	};
	return (
		<React.Fragment>
			<Modal show={show} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title> Paypal Payment</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<PayPalScriptProvider options={{ clientId: "AU6XB-d0fJsPI1rqbU9W86zh6x5-j1GD_Syih9tlvPm9pC2W2PrWkKh3SgA2XO5HZx62euF-jAPnNHKM" }}>
						<PayPalButtons
							createOrder={(data, actions) => {
								return actions.order.create({
									purchase_units: [{
										amount: {
											value: '10'
										}
									}]
								});
							}}
							onApprove={(data, actions) => {
								return actions.order.capture().then(details => {
									onSuccessPaypal(details, data);
								});
							}}
						/>
					</PayPalScriptProvider>

				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
			<main class="content">
				<div class="container-fluid p-0 pt-2">
					<div class="row">
						<div class="col-md-10 col-xl-8 mx-auto">
							<h1 class="text-center">Chúng tôi có các gói nâng cấp cho mọi người</h1>
							<p class="lead text-center mb-4">Bạn có thể trở thành người cho thuê nhà, trọ trên hệ thống của chúng tôi trong các khoảng thời gian.</p>

							<div class="row justify-content-center mt-3 mb-2">
								<div class="col-auto">
									<nav class="nav btn-group">
										<a href="#monthly" class="btn btn-outline-primary active" data-bs-toggle="tab">Gói hàng tháng</a>
										<a href="#annual" class="btn btn-outline-primary" data-bs-toggle="tab">Gói hàng năm</a>
									</nav>
								</div>
							</div>

							<div class="tab-content">
								<div class="tab-pane fade show active" id="monthly">
									<div class="row py-4">
										<div class="col-sm-4 mb-3 mb-md-0">
											<div class="card text-center h-100">
												<div class="card-body d-flex flex-column">
													<div class="mb-4">
														<h5>1 Tháng</h5>
														<span class="display-4">500.000</span>
														<span>/ VNĐ</span>
													</div>
													<h6>Bao gồm:</h6>
													<ul class="list-unstyled">
														<li class="mb-2">
															1 Tháng
														</li>
														<li class="mb-2">
															5 Phòng
														</li>
														<li class="mb-2">
															Bảng thống kê
														</li>
														<li class="mb-2">
															Chính sách Bảo mật
														</li>
													</ul>
													<div class="mt-auto">
														<Button variant="outline-primary" onClick={handleShow}>
															Chọn gói
														</Button>
													</div>
												</div>
											</div>
										</div>
										<div class="col-sm-4 mb-3 mb-md-0">
											<div class="card text-center h-100">
												<div class="card-body d-flex flex-column">
													<div class="mb-4">
														<h5>4 Tháng</h5>
														<span class="display-4">2.000.000</span>
														<span>/ VNĐ</span>
													</div>
													<h6>Bao gồm:</h6>
													<ul class="list-unstyled">
														<li class="mb-2">
															4 Tháng
														</li>
														<li class="mb-2">
															10 Phòng
														</li>
														<li class="mb-2">
															Bảng thống kê
														</li>
														<li class="mb-2">
															Chính sách bảo mật
														</li>
													</ul>
													<div class="mt-auto">
														<Button variant="primary" onClick={handleShow}>
															Chọn gói
														</Button>
													</div>
												</div>
											</div>
										</div>
										<div class="col-sm-4 mb-3 mb-md-0">
											<div class="card text-center h-100">
												<div class="card-body d-flex flex-column">
													<div class="mb-4">
														<h5>8 Tháng</h5>
														<span class="display-4">4.000.000</span>
														<span>/ VNĐ</span>
													</div>
													<h6>Bao gồm:</h6>
													<ul class="list-unstyled">
														<li class="mb-2">
															8 Tháng
														</li>
														<li class="mb-2">
															Không giới hạn phòng
														</li>
														<li class="mb-2">
															Bảng thống kê
														</li>
														<li class="mb-2">
															Chính sách bảo mật
														</li>
													</ul>
													<div class="mt-auto">
														<Button variant="outline-primary" onClick={handleShow}>
															Chọn gói
														</Button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="tab-pane fade" id="annual">
									<div class="row py-4">
										<div class="col-sm-4 mb-3 mb-md-0">
											<div class="card text-center h-100">
												<div class="card-body d-flex flex-column">
													<div class="mb-4">
														<h5>1 Year</h5>
														<span class="display-4">5 TR</span>
														<span class="text-small4">/ VNĐ</span>
													</div>
													<h6>Bao gồm:</h6>
													<ul class="list-unstyled">
														<li class="mb-2">
															1 năm
														</li>
														<li class="mb-2">
															Không giới hạn phòng
														</li>
														<li class="mb-2">
															Bảng điều khiển
														</li>
														<li class="mb-2">
															Chính sách bảo mật
														</li>
														<li class="mb-2">
															Giảm giá 15%
														</li>
													</ul>
													<div class="mt-auto">
														<Button variant="outline-primary" onClick={handleShow}>
															Chọn gói
														</Button>
													</div>
												</div>
											</div>
										</div>
										<div class="col-sm-4 mb-3 mb-md-0">
											<div class="card text-center h-100">
												<div class="card-body d-flex flex-column">
													<div class="mb-4">
														<h5>2 Năm</h5>
														<span class="display-4">10 TR</span>
														<span class="text-small4">/ VNĐ</span>
													</div>
													<h6>Bao gồm:</h6>
													<ul class="list-unstyled">
														<li class="mb-2">
															2 năm
														</li>
														<li class="mb-2">
															Không giới hạn phòng
														</li>
														<li class="mb-2">
															Bảng điều khiển
														</li>
														<li class="mb-2">
															Chính sách bảo mật
														</li>
														<li class="mb-2">
															Giảm giá 15%
														</li>
													</ul>
													<div class="mt-auto">
														<Button variant="primary" onClick={handleShow}>
															Chọn gói
														</Button>
													</div>
												</div>
											</div>
										</div>
										<div class="col-sm-4 mb-3 mb-md-0">
											<div class="card text-center h-100">
												<div class="card-body d-flex flex-column">
													<div class="mb-4">
														<h5>3 Years</h5>
														<span class="display-4">15 TR</span>
														<span>/ VNĐ</span>
													</div>
													<h6>Bao gồm:</h6>
													<ul class="list-unstyled">
														<li class="mb-2">
															3 năm
														</li>
														<li class="mb-2">
															Không giới hạn phòng
														</li>
														<li class="mb-2">
															Bảng điều khiển
														</li>
														<li class="mb-2">
															Chính sách bảo mật
														</li>
														<li class="mb-2">
															Giảm giá 15%
														</li>
													</ul>
													<div class="mt-auto">
														<Button variant="outline-primary" onClick={handleShow}>
															Chọn gói
														</Button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<hr />
						</div>
					</div>

				</div>
			</main>
		</React.Fragment>
	);
};

export default PricingPage;
