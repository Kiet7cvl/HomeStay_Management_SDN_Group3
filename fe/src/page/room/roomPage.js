import React, { useEffect, useState } from "react";
import { RoomList } from "../../components/room-service/roomList";
import { RoomService } from "../../services/feService/roomService";
import { useDispatch } from "react-redux";
import { toggleShowLoading } from "../../redux/actions/common";
import { useSearchParams } from "react-router-dom";
import { INIT_PAGING } from "../../common/constant";
import { OtherService } from "../../services/feService/otherService";

const RoomPage = () => {
	document.title = 'Booking | room list';

	const [data, setData] = useState([]);
	const [categories, setCategories] = useState([]);
	const [paging, setPaging] = useState(INIT_PAGING);
	const [params, setParams] = useState({
		vote_number: null,
		bed: null,
		bathroom: null,
		price: null,
		service: null,
		address: null,
		category_id: null,
	});
	console.log(data);
	const dispatch = useDispatch();
	let [searchParams, setSearchParams] = useSearchParams({});
	useEffect(() => {
		getDataList({ page: 1, page_size: INIT_PAGING.page_size });
	}, []);

	const getDataList = async (params) => {

		dispatch(toggleShowLoading(true));
		const rs = await RoomService.getDataList(params, true, setSearchParams);
		console.log('--------- response: ', rs)
		if (rs) {
			setData(rs?.data?.rooms || []);
			setPaging(rs?.meta || INIT_PAGING);
		} else {
			setData([]);
			setPaging(INIT_PAGING);
		}
		dispatch(toggleShowLoading(false));
	};

	const getDataCategories = async (params) => {

		const rs = await OtherService.getCategories(params);
		if (rs?.status === 200) {
			setCategories(rs?.data?.categories || []);
		} else {
			setCategories([]);
		}
	};

	return (
		<React.Fragment>

			<RoomList
				data={data}
				getDataList={getDataList}
				paging={paging}
				params={params}
				setParams={setParams}
				setPaging={setParams}
				categories={categories}
				setCategories={setCategories}
			/>


		</React.Fragment>

	);
};

export default RoomPage;
