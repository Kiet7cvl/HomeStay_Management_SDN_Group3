import React, { useEffect, useState } from "react";


const ReservationPage = () => {
	document.title = 'Đặt phòng';

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
					<div class="row bg-secondary" style={{height: "400px"}}>
						
					</div>

				</div>
			</main>
		</React.Fragment>
	);
};

export default ReservationPage;
