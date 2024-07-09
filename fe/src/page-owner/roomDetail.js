import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import MyImageGallery from '../components/form/MyImageGallery';


const RoomDetail = () => {
	document.title = 'Phòng cho thuê của bạn';

	// const [data, setData] = useState([]);
	// const [title, setTitle] = useState('Pricing');
	// const [paging, setPaging] = useState(INIT_PAGING);
	// const [params, setParams] = useState({
	// 	menu_id: null
	// });

	// let [searchParams, setSearchParams] = useSearchParams({});

	// const paramQuery = useParams();

	// const dispatch = useDispatch();
	// useEffect(() => {
	// 	getDataList({ page: 1, page_size: INIT_PAGING.page_size, menu_id: paramQuery.id });
	// 	if (paramQuery.id) {
	// 		getDetail(paramQuery.id);
	// 		setParams({ ...params, menu_id: paramQuery.id })
	// 	}
	// }, [paramQuery.id]);

	// const getDataList = async (params) => {
	// 	dispatch(toggleShowLoading(true));
	// 	const rs = await ArticleService.getDataList(params, true, setSearchParams);
	// 	if (rs?.status === 200) {

	// 		setData(rs?.data?.articles || []);
	// 		setPaging(rs?.meta || INIT_PAGING);
	// 	} else {
	// 		setData([]);
	// 		setPaging(INIT_PAGING);
	// 	}
	// 	dispatch(toggleShowLoading(false));
	// };

	// const getDetail = async (id) => {
	// 	const response = await menuService.getDetailData(id);
	// 	if (response?.status === 200) {
	// 		setTitle(response?.data?.name || 'Menu');
	// 	}
	// }
	return (
		<React.Fragment>
			<main class="content">
				<div class="container p-0 pt-2">
					<div class="pt-4" >
						<div className="d-flex justify-content-between">
							<h2>Nhà/phòng cho thuê của bạn</h2>
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
									<h4>Tên phòng</h4>
									<div className="row">
										<span className="col-6">Floor:</span>
										<span className="col-6">Room Code:</span>
									</div>
									<div className="row">
										<span className="col-6">Size:</span>
										<span className="col-6">Bed:</span>
									</div>
									<p>Category: </p>
									<span className="fs-2">1.000.000</span><span> VNĐ / night </span>
								</div>
								<div>
									<h4>Total Start: </h4>
									<div className="py-3 row mx-5">
										<Button className="p-3 mb-3" variant="dark" style={{ borderRadius: '50px' }}>Ẩn phòng</Button>
										<Button className="p-3" variant="light" style={{ borderRadius: '50px', border: '1px solid' }}>Chỉnh xửa phòng</Button>
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
			</main>
		</React.Fragment>
	);
};

export default RoomDetail;
