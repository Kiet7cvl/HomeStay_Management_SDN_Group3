import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


const RoomLissPage = () => {
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
							<Link className={'btn btn-sm btn-primary'} to={'/owner/room-create'} >Thêm mới</Link>
							</div>
						</div>
						<div class="pt-4 row">
							<div class="  border border-0 col-md-4">
								<img src="https://cdn.pixabay.com/photo/2024/06/07/04/44/interior-8813800_640.jpg" class="card-img-top rounded" alt="..." style={{width: "100%", height: "300px", objectFit: "cover"}}/>
								<div class="card-body">
									<p class="card-text pt-2 pb-5">This is a wider card with a natural lead-in to additional content. This content is a little bit longer.</p>
								</div>
							</div>
							<div class=" border border-0 col-md-4">
								<img src="https://img.pikbest.com/wp/202347/high-quality-background-photograph-of-a-gaming-room-featuring-3d-rendered-computers-and-chairs_9769943.jpg!w700wp" class="card-img-top rounded " alt="..." style={{width: "100%", height: "300px", objectFit: "cover"}}/>
								<div class="card-body">
									<p class="card-text pt-2 pb-5">This card has supporting text below as a natural lead-in to additional content.</p>
								</div>
							</div>
							<div class="  border border-0 col-md-4">
								<img src="https://images.squarespace-cdn.com/content/v1/5aadf482aa49a1d810879b88/1625384955010-ICW3WG4U9V1FKFZCFK6B/Img9949.jpg" class="card-img-top rounded " alt="..." style={{width: "100%", height: "300px", objectFit: "cover"}}/>
								<div class="card-body">
									<p class="card-text pt-2 pb-5">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
								</div>
							</div>
							<div class="  border border-0 col-md-4">
								<img src="https://cdn.pixabay.com/photo/2024/06/07/04/44/interior-8813800_640.jpg" class="card-img-top rounded" alt="..." style={{width: "100%", height: "300px", objectFit: "cover"}}/>
								<div class="card-body">
									<p class="card-text pt-2 pb-5">This is a wider card with a natural lead-in to additional content. This content is a little bit longer.</p>
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

export default RoomLissPage;
