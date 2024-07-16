import React, { useEffect, useState } from "react";
import { DEFAULT_IMG } from "../../common/constant";
import { Button, Col, Container, Row } from "react-bootstrap";
import { RoomSideBar } from "../../components/room-service/roomSideBar";
import { RoomList } from "../../components/room-service/roomList";
import { RoomService } from "../../services/feService/roomService";
import { VoteService } from "../../services/feService/voteService";
import { useDispatch } from "react-redux";
import { toggleShowLoading } from "../../redux/actions/common";
import { URL_IMG, URL_IMG_V2, buildImage, buildImageV2, customNumber, onErrorImg } from "../../common/helper";
import { useNavigate, useParams, Link } from "react-router-dom";
import MyImageGallery from '../../components/form/MyImageGallery';
import { StarIcons } from "../../components/common/star";


const RoomDetailPage = () => {
	document.title = 'Chi tiết';

	const [rooms, setRooms] = useState([]);
	const [feedbacks, setFeedbacks] = useState([]);
	const [detailData, setDetailData] = useState(null);
	const [feedbackData, setFeedbackData] = useState(null);
	const [avgStar, setAvgStar] = useState(0);
	const [star, setStar] = useState(0);

	const [albums, setAlbums] = useState([]);
	const [images, setImages] = useState();

	const dispatch = useDispatch();
	const params = useParams();
	const navigate = useNavigate()
	useEffect(() => {
		getRooms();
		// getFeedback()
	}, []);

	useEffect(() => {
		if (params.id) {
			getDetailData(params.id)
		} else {
			setDetailData(null);
		}
	}, [params.id])

	const getRooms = async () => {
		const rs = await RoomService.getDataList({ page: 1, page_size: 2, status: 1 });
		if (rs?.status === 200) {
			setRooms(rs?.data?.rooms || [])
		} else {
			setRooms([]);
		}
	};
	const getFeedback = async () => {
		const rs = await VoteService.getDataList({ page: 1, page_size: 2, status: 1 });
		if (rs?.status === 200) {
			setFeedbacks(rs?.data?.votes || [])
		} else {
			setFeedbacks([]);
		}
	};

	const getDetailData = async (id) => {
		dispatch(toggleShowLoading(true));
		const response = await RoomService.getDetailData(id);
		const rsfeedback = await VoteService.getDetailData(id);
		if (response?.status === 200 && rsfeedback?.status === 200) {
			let room = response.data;
			if (room) {
				let totalVote = room.total_vote || 0;
				let totalStar = room.total_star || 0;
				if (totalVote > 0 && totalStar > 0) {
					setAvgStar(Math.round(totalStar / totalVote))
				}
			}
			let imgs = []
			if (room.avatar) {
				imgs.push({
					_id: room._id,
					avatar: room.avatar,
					class: 'h-50'
				});
				setImages(room.avatar)
			}
			if (room.albums?.length > 0) {
				if (!room.avatar) setImages(room.albums[0])
				for (let item of room.albums) {
					imgs.push({
						_id: room._id,
						avatar: item,
						class: 'h-50'
					})
				}
			}
			setAlbums(imgs);
			setDetailData(response.data);
			setFeedbackData(rsfeedback.data);
		} else {
			setDetailData(null);
			setFeedbackData(null);
		}
		dispatch(toggleShowLoading(false));

	}
	return (
		<React.Fragment>
			<section className="ftco-section">
				<div class="container p-0 pt-2">
					<div class="pt-4" >
						<div className="d-flex justify-content-between">
							<h2>Chi tiết Nhà/phòng: {detailData?.name}</h2>
							<div>
								<Link className={'btn btn-sm btn-primary'} to={'/room'} >Trở về</Link>
							</div>
						</div>
						<div className="row pt-4">
							<div className="col-md-8">
								<MyImageGallery></MyImageGallery>

							</div>
							<div className="col-md-4 px-md-5">
								<div className="pt-3">
									<h4>Tên phòng: {detailData?.name}</h4>
									<div className="row">
										<span className="col-6">Địa chỉ: {detailData?.address}</span>
										<span className="col-6">Kích thước: {detailData?.size} m2</span>
									</div>
									<div className="row">
										<span className="col-6">Phòng tắm: {detailData?.bathroom}</span>
										<span className="col-6">Giường: {detailData?.bed}</span>
									</div>
									<p>Thể loại: {detailData?.category?.name}</p>
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
										<span className="fs-2 fw-bold py-2">1.000.000</span><span> VNĐ / đêm </span>
									</div>
								</div>
								<div>
									<h4>Tổng sao: </h4>
									<StarIcons vote_number={Math.round(detailData?.total_star / detailData?.total_vote)} />
									<div className="py-3 row mx-5">
										<div className="fields">
											<form action="/create-payment-link">
												<Button className="p-3 mb-3" variant="dark" style={{ borderRadius: '50px', width: "200px" }}
													onClick={() => {
														// Kiểm tra xem có token truy cập trong localStorage không
														const accessToken = localStorage.getItem('access_token');

														if (!accessToken) {
															const currentPath = window.location.pathname; // Use window.location.pathname in v6
															localStorage.setItem('previousUrl', currentPath);
															// Nếu không có token, chuyển hướng người dùng tới trang đăng nhập
															navigate('/sign-in');
														} else {
															// Nếu có token, chuyển hướng người dùng tới trang booking
															navigate('/booking/create/' + detailData._id);
														}
													}}>
													Booking
												</Button>
											</form>
										</div>

									</div>
								</div>
							</div>
						</div>
						<div className="container  pt-4 py-2">
							<div className="container">
								<div className="container">
									<div className="container text-center fs-5">
										<p>{detailData?.description}</p>
									</div>
								</div>
							</div>
						</div>

					</div>
					<hr />

					<div class="row d-flex justify-content-center mb-4">
						<div class="col-md-12 col-lg-10">
							<div class="card text-body">
								<div class="card-body p-4">
									<h4 class="mb-0">Đánh giá</h4>
									<p class="fw-light mb-4 pb-2">Phản hồi của những người từng trải nghiệm !! </p>
									<div className="row">
										{feedbackData?.map(item => (
											<div className="col-md-6">
												<div class="d-flex flex-start pt-2">
													<img class="rounded-circle shadow-1-strong me-3"
														src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp" alt="avatar" width="60"
														height="60" />
													<div >
														<div>
															<div className="d-block">
																<h6 class="fw-bold mb-1">{item?.user?.name}</h6>
																<StarIcons vote_number={item.vote_number} />
															</div>
															<div class="d-flex align-items-center mb-1">
																<p class="mb-0">
																	{item.create_at}
																</p>
															</div>
														</div>
														<p class="mb-2">
															{item.vote_content}
														</p>
													</div>

												</div>
												<hr class="my-0" style={{ height: "1px" }} />
											</div>

										))}
									</div>

								</div>

							</div>
						</div>
					</div>

				</div>
			</section>
		</React.Fragment>
	);
};

export default RoomDetailPage;
