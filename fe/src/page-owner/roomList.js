import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoomService } from "../services/feService/roomService";
import { toggleShowLoading } from "../redux/actions/common";
import { useSearchParams } from "react-router-dom";
import { INIT_PAGING } from "../common/constant";
import { useDispatch } from "react-redux";
import { NotFoundPage } from "../components/common/notFound";

const RoomLissPage = () => {
	document.title = 'Phòng cho thuê của bạn';

	const [data, setData] = useState([]);
	const [paging, setPaging] = useState(INIT_PAGING);

	const dispatch = useDispatch();
	useEffect(() => {
		getDataList({ page: 1, page_size: INIT_PAGING.page_size });
	}, []);

	const getDataList = async () => {
		dispatch(toggleShowLoading(true));
		let id = JSON.parse(localStorage.getItem('user'))._id;
		const rs = await RoomService.getRoombyOwner(id);
		if (rs?.status === 200) {
			setData(rs?.data || []);
			setPaging(rs?.meta || INIT_PAGING);

		} else {
			setData([]);
			setPaging(INIT_PAGING);
		}
		dispatch(toggleShowLoading(false));
	};
	console.log(data);
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
							{data?.length > 0 ? data?.map(item => {
								return (
									<div class="border border-0 col-md-4">
										<Link to={'/owner/room-detail/' + item._id} className="img d-flex justify-content-center align-items-center br-top-left-6 br-top-right-6"
										>
											<img src={item?.avatar || ''} class="card-img-top rounded" alt="..." style={{ width: "100%", height: "300px", objectFit: "cover" }} />
										</Link>
										<div class="card-body">
											<p class="card-text pt-2 pb-5 text-truncate">{item?.description}</p>
										</div>
									</div>
								)
							}) : <NotFoundPage />
							}


						</div>
					</div>
					<hr />

				</div>
			</main>
		</React.Fragment>
	);
};

export default RoomLissPage;
