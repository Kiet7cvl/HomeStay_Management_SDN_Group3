import React, { useEffect, useState, startTransition } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toggleShowLoading } from "../../redux/actions/common";
import { OtherService } from "../../services/feService/otherService";
import { caculateDateTime, customNumber, getItem, getUser, setField, timeDelay } from "../../common/helper";
import { toast } from "react-toastify";
import { InputBase } from "../base-form/controlInputForm";
import { SelectBase } from "../base-form/selectForm";
import { RoomService } from "../../services/feService/roomService";
import { BookingService } from "../../services/feService/bookingService";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const paymentType = [
	{
		_id: 1,
		name: 'Online'
	}
];
export const FormBooking = () => {
	document.title = 'Đặt phòng';

	const [rooms, setRooms] = useState([]);
	const [detailData, setDetailData] = useState(null);



	const [form, setForm] = useState({
		check_in: null,
		check_out: null,
		amount_of_people: null,
		room_id: null,
		user_id: null,

		status: 'PENDING',
		status_payment: 'UNPAID',
		price: 0,
		total_money: 0,
		customer_name: null,
		customer_email: null,
		customer_phone: null,
		payment_type: 1,
	});

	const [validated, setValidated] = useState(false);



	const dispatch = useDispatch();
	const navigate = useNavigate();

	const user = getUser();
	const params = useParams();


	useEffect(() => {
		getDataList();
		let data = { ...form };
		if (user) {
			data.user_id = user._id;
			data.customer_email = user.email;
			data.customer_name = user.name;
			data.customer_phone = user.phone
		}
		if (params.id) {
			data.room_id = params.id;
		}
		setForm(data);

		if (params.id) {
			getDetailData(params.id)
		} else {
			setDetailData(null);
		}
	}, [params.id]);

	useEffect(() => {
		if (form.room_id && rooms?.length > 0) {
			let data = rooms.find(item => item._id === form.room_id);
			let price = data?.price || 0;
			if (form.check_in && form.check_out) {
				let numberDate = caculateDateTime(form.check_in, form.check_out);
				setForm({ ...form, price: price * numberDate });
				params.id = data?._id
			}

		}
	}, [form.room_id, form.check_in, form.check_out]);


	const getDetailData = async (id) => {
		dispatch(toggleShowLoading(true));
		const response = await RoomService.getDetailData(id);
		if (response?.status === 200) {
			setDetailData(response.data);
		} else {
			setDetailData(null);
		}
		dispatch(toggleShowLoading(false));

	}

	const convertToUSD = (vndAmount, exchangeRate) => {
		const usdAmount = vndAmount * exchangeRate;
		const formattedUSD = usdAmount.toFixed(2);

		return formattedUSD;
	};

	let kiet = convertToUSD(form?.price, 0.00004)
	console.log(kiet);

	const onSuccessPaypal = async (details, data) => {
		console.log('PayPal payment successful:', details, data);
		form.total_money = form.total_money;
		form.payment_type = Number(form.payment_type);

		dispatch(toggleShowLoading(true));

		const response = await BookingService.createData(form);
		console.log('----------------- response booking: ', response)

		if (response?.status === 200 && response?.data) {
			toast('đặt phòng thành công!', { type: 'success', autoClose: 900 });
			resetForm();
			dispatch(toggleShowLoading(false));
			if (response?.data?.link) {
				window.open(response?.data?.link, '_blank ');
			} else {
				resetForm();
			}
			if (getUser()) {
				navigate('/');
			} else {
				window.location.href = '/payment/booking-success';
			}

		} else {
			toast(response?.message || response?.error || 'Có lỗi sảy ra', { type: 'error', autoClose: 900 });
			dispatch(toggleShowLoading(false));
		}
	}

	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	if (e?.currentTarget?.checkValidity() === false) {
	// 		e.stopPropagation();
	// 	} else {
	// 		form.total_money = form.price;
	// 		form.payment_type = Number(form.payment_type);

	// 		dispatch(toggleShowLoading(true));

	// 		const response = await BookingService.createData(form);
	// 		console.log('----------------- response booking: ', response)

	// 		if (response?.status === 200 && response?.data) {
	// 			toast('đặt phòng thành công!', { type: 'success', autoClose: 900 });
	// 			resetForm();
	// 			dispatch(toggleShowLoading(false));
	// 			if (response?.data?.link) {
	// 				window.open(response?.data?.link, '_blank ');
	// 			} else {
	// 				resetForm();
	// 			}
	// 			if (getUser()) {
	// 				navigate('/');
	// 			} else {
	// 				// view mới
	// 				window.location.href = '/payment/booking-success';
	// 			}

	// 		} else {
	// 			toast(response?.message || response?.error || 'Có lỗi sảy ra', { type: 'error', autoClose: 900 });
	// 			dispatch(toggleShowLoading(false));
	// 		}
	// 	}
	// 	setValidated(true);
	// }
	const resetForm = () => {
		setForm({
			check_in: null,
			check_out: null,
			amount_of_people: null,
			room_id: null,
			user_id: null,

			status: 'PENDING',
			status_payment: 'UNPAID',
			price: 0,
			total_money: 0,
			customer_name: null,
			customer_email: null,
			customer_phone: null,
			payment_type: 2,
		});
		setValidated(false);
	}
	const getDataList = async () => {

		dispatch(toggleShowLoading(true));
		const rs = await RoomService.getDataList({ page: 1, page_size: 1000, status: 1 });
		if (rs?.status === 200) {

			setRooms(rs?.data?.rooms || []);
		} else {
			setRooms([]);
		}
		dispatch(toggleShowLoading(false));
	};



	return (
		<React.Fragment>
			<section className={`ftco-section bg-light`}>
				<Container>
					<Row className="row justify-content-center pb-3">
						<Col md={7} className="heading-section text-center">
							<h2 className="pt-2">Thông tin đặt phòng</h2>
						</Col>
					</Row>

					<div className="">
						<h4>Tên phòng: {detailData?.name}</h4>
						<div className="row">
							<span className="col-6">Địa chỉ: {detailData?.address}</span>
							<span className="col-6">Kích thước: {detailData?.size} m2</span>
						</div>
						<div className="row">
							<span className="col-6">Phòng tắm: {detailData?.bathroom}</span>
							<span className="col-6">Giường: {detailData?.bed}</span>
						</div>
						<div className="row">
							<p className="col-6">Thể loại: {detailData?.category?.name}</p>
							<span className="col-6">Số người tối đa: {detailData?.amount_of_people}</span>
						</div>
						<span>Dịch vụ, tiện ích đi kèm:</span>
						<div className="row">
							{detailData?.services?.map((item, index) => (
								<div key={index} className="col-md-6">
									<input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />
									<label class="form-check-label" for="flexCheckChecked">
										{item?.name}
									</label>
								</div>
							))}
						</div>
						<div className="py-2">
							<span className="fs-2 fw-bold py-2">{customNumber(detailData?.price, '.', ' vnđ')}</span><span> / đêm </span>
						</div>
					</div>

					<Row className="block-9 mt-5">
						<Col md={12} className="d-flex justify-content-center">
							<Form className="bg-white p-5 w-100 row" noValidate validated={validated}>
								<Form.Group className="mb-3 col-xl-6">
									<InputBase form={form} setForm={setForm} name={'check_in'}
										label={'Check in: '}
										key_name={'check_in'} required={true} placeholder={'Thời gian check in'}
										type={'date'} error={'Vui lòng nhập Thời gian check in.'}
									/>
								</Form.Group>

								<Form.Group className="mb-3 col-xl-6">
									<InputBase form={form} setForm={setForm} name={'checkout'}
										label={'Check out: '}
										key_name={'check_out'} required={true} placeholder={'Checkout'}
										type={'date'} error={'Vui lòng nhập Thời gian check out.'}
									/>
								</Form.Group>

								<Form.Group className="mb-3 col-xl-6">
									<InputBase form={form} setForm={setForm} name={'name'}
										label={'Họ và tên: '}
										key_name={'customer_name'} required={true} placeholder={'Họ và tên'}
										type={'text'} error={'Vui lòng nhập họ tên đầy đủ.'}
									/>
								</Form.Group>

								<Form.Group className="mb-3 col-xl-6">
									<InputBase form={form} setForm={setForm} name={'email'}
										label={'Email: '}
										key_name={'customer_email'} required={true} placeholder={'Email'}
										type={'email'} error={'Vui lòng nhập email.'}
									/>
								</Form.Group>

								<Form.Group className="mb-3 col-xl-6">
									<InputBase form={form} setForm={setForm} name={'customer_phone'}
										label={'Số điện thoại: '}
										key_name={'customer_phone'} required={true} placeholder={'Số điện thoại'}
										type={'text'} error={'Vui lòng nhập số điện thoại.'}
									/>
								</Form.Group>

								<Form.Group className="mb-3 col-xl-6">
									<InputBase form={form} setForm={setForm} name={'amount_of_people'}
										label={`Số người: (tối đa ${detailData?.amount_of_people} )`}
										key_name={'amount_of_people'} required={true} placeholder={'Số người'}
										type={'text'} error={'Vui lòng nhập số người.'}
									/>
								</Form.Group>



								<Form.Group className="mb-3 col-xl-6">
									<SelectBase form={form} setForm={setForm} name={'room_id'}
										label={'Phòng: '} data={rooms}
										key_name={'room_id'} required={true} placeholder={'Chọn phòng'}
										type={'text'} error={'Vui lòng chọn phòng.'} />
								</Form.Group>



								<Form.Group className="mb-3 col-xl-6">
									<SelectBase form={form} setForm={setForm} name={'payment_type'}
										data={paymentType}
										label={'Phương thức thanh toán: '}
										key_name={'payment_type'} required={true} placeholder={'Chọn phương thức thanh toán'}
										type={'text'} error={'Vui lòng chọn phương thức thanh toán.'}
										readOnly={true}
									/>
								</Form.Group>

								<Col xl={12} className="w-100 row">
									<Form.Group className="mb-3 col-xl-4">
										<Form.Label className="fs-19">Số tiền: </Form.Label>
										<p className="text-dark fw-bold fs-2">{customNumber(form.price, '.', 'đ')}</p>
									</Form.Group>



									<Form.Group className="mb-3 col-xl-4">
										<Form.Label className="fs-19">Tổng tiền: </Form.Label>
										<p className="text-dark fw-bold fs-2">{customNumber(form.price, '.', 'đ')}</p>
									</Form.Group>

									<Form.Group className="mb-3 col-12 d-flex justify-content-center">
										{/* <Button type="submit" className='btn btn-primary py-3 px-5'>Đặt phòng</Button> */}
										<PayPalScriptProvider options={{ clientId: "AU6XB-d0fJsPI1rqbU9W86zh6x5-j1GD_Syih9tlvPm9pC2W2PrWkKh3SgA2XO5HZx62euF-jAPnNHKM" }}>
											<PayPalButtons
												createOrder={(data, actions) => {
													return actions.order.create({
														purchase_units: [{
															amount: {
																value: kiet,
																currency_code: 'USD'
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
									</Form.Group>
								</Col>
							</Form>
						</Col>

					</Row>
				</Container>
			</section>
		</React.Fragment>
	);
};
