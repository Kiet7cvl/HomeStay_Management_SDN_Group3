import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import MyImageGallery from '../components/form/MyImageGallery';
import { RoomService } from "../services/feService/roomService";
import { useDispatch } from "react-redux";
import { toggleShowLoading } from "../redux/actions/common";
import { INIT_PAGING } from "../common/constant";
import { URL_IMG, URL_IMG_V2, buildImage, buildImageV2, customNumber, onErrorImg } from "../common/helper";
import { StarIcons } from "../components/common/star";


const RoomDetail = () => {
	document.title = 'Phòng cho thuê của bạn';
	const [data, setData] = useState([]);
	const [paging, setPaging] = useState(INIT_PAGING);
	const params = useParams();
	const dispatch = useDispatch();
	useEffect(() => {
		getDataList({ page: 1, page_size: INIT_PAGING.page_size });
	}, []);

	useEffect(() => {
		if (params.id) {
			getDataList(params.id)
		} else {
			setData(null);
		}
	}, [params.id])
	const getDataList = async (id) => {
		dispatch(toggleShowLoading(true));
		const rs = await RoomService.getRoomById(id);
		if (rs?.status === 200) {
			setData(rs?.data || []);
			setPaging(rs?.meta || INIT_PAGING);
			console.log(data);
		} else {
			setData([]);
			setPaging(INIT_PAGING);
		}
		dispatch(toggleShowLoading(false));
	};
	return (
		<React.Fragment>
			<section className="ftco-section">
				<div class="container p-0 pt-2">
					<div class="pt-4" >
						<div className="d-flex justify-content-between">
							<h2>Chi tiết Nhà/phòng: {data?.name}</h2>
							<div>
								<Link className={'btn btn-sm btn-primary'} to={'/owner/room-list'} >Trở về</Link>
							</div>
						</div>
						<div className="row pt-4">
							<div className="col-md-8">
								<MyImageGallery></MyImageGallery>

							</div>
							<div className="col-md-4 px-md-5">
								<div className="pt-3">
									<h4>Tên phòng {data?.name}</h4>
									<div className="row">
										<span className="col-6">Địa chỉ: {data?.address}</span>
										<span className="col-6">Kích thước: {data?.size} m2</span>
									</div>
									<div className="row">
										<span className="col-6">Phòng tắm: {data?.bathroom}</span>
										<span className="col-6">Giường: {data?.bed}</span>
									</div>
									<p>Thể loại: {data?.category?.name}</p>
									<span>Dịch vụ, tiện ích đi kèm:</span>
									<div className="row">
										{data?.services?.map((item, index) => (
											<div key={index} className="col-md-6">
												<input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />
												<label class="form-check-label" for="flexCheckChecked">
													{item?.name}
												</label>
											</div>
										))}
									</div>
									<div className="py-2">
										<span className="fs-2 fw-bold py-2">{customNumber(data?.price, '.', ' vnđ')}</span><span> / đêm </span>
									</div>
								</div>

								<div>
									<h4>Tổng sao: </h4>
									<StarIcons vote_number={Math.round(data?.total_star / data?.total_vote)} />
									<div className="py-3 row mx-5">
										<div className="fields">
											<div className="py-3">
												<Button className="p-3 mb-3" variant="dark" style={{ borderRadius: '50px', width: '200px' }}>Ẩn phòng</Button>
												<Button className="p-3" variant="light" style={{ borderRadius: '50px', width: '200px', border: '1px solid' }}>Chỉnh xửa phòng</Button>
											</div>
										</div>

									</div>
								</div>
							</div>
						</div>
						<div className="container  pt-4 py-2">
							<div className="container">
								<div className="container">
									<div className="container text-center fs-5">
										<p>Here's some straightforward, good-looking AJ1s. Were you expecting anything less? Crafted from crisp leather, they feature comfortable Nike Air cushioning in the sole. An embroidered Swoosh logo puts the finishing touch on this all-time favourite.</p>
									</div>
								</div>
							</div>
						</div>

					</div>
					<hr />

				</div>
			</section>
		</React.Fragment>
	);
};

export default RoomDetail;
