import React, { useEffect, useState } from "react";
const Chart = require('chart.js');

const TransactionPage = () => {
	document.title = 'Thu nhập';

	document.addEventListener("DOMContentLoaded", function () {
		// Line chart
		new Chart(document.getElementById("chartjs-line"), {
			type: "line",
			data: {
				labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
				datasets: [{
					label: "Sales ($)",
					fill: true,
					backgroundColor: "transparent",
					borderColor: window.theme.primary,
					data: [2115, 1562, 1584, 1892, 1487, 2223, 2966, 2448, 2905, 3838, 2917, 3327]
				}, {
					label: "Orders",
					fill: true,
					backgroundColor: "transparent",
					borderColor: "#adb5bd",
					borderDash: [4, 4],
					data: [958, 724, 629, 883, 915, 1214, 1476, 1212, 1554, 2128, 1466, 1827]
				}]
			},
			options: {
				maintainAspectRatio: false,
				legend: {
					display: false
				},
				tooltips: {
					intersect: false
				},
				hover: {
					intersect: true
				},
				plugins: {
					filler: {
						propagate: false
					}
				},
				scales: {
					xAxes: [{
						reverse: true,
						gridLines: {
							color: "rgba(0,0,0,0.05)"
						}
					}],
					yAxes: [{
						ticks: {
							stepSize: 500
						},
						display: true,
						borderDash: [5, 5],
						gridLines: {
							color: "rgba(0,0,0,0)",
							fontColor: "#fff"
						}
					}]
				}
			}
		});
	});

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
					<div class="row pt-4" >
						<div className="col-8 ">
							<h1>Bạn có thu nhập</h1>
							<span className="fs-1 text-secondary">4.000.000</span>
							<h1 className="d-inline"> VNĐ Trong tháng này</h1>

							<div>
								<div class="card-body">
									<div class="chart">
										<canvas id="chartjs-line"></canvas>
									</div>
								</div>
							</div>
						</div>

						<div className="col-4">
							<h3>Tổng thu nhập từ đầu năm đến nay</h3>
							<div className="row justify-content-between">
								<p className="col">Thu nhập </p>
								<div className="col">
									<span>10.000.000</span>
									<span> VNĐ</span>
								</div>
							</div>
							<div className="row justify-content-between">
								<p className="col">Tiền cọc </p>
								<div className="col">
									<span>1.000.000</span>
									<span> VNĐ</span>
								</div>
							</div>
							<div className="row justify-content-between">
								<p className="col">Phí duy trì</p>
								<div className="col">
									<span>3.000.000</span>
									<span> VNĐ</span>
								</div>
							</div>
							<div className="row justify-content-between">
								<p className="col">Phí Điều khoản</p>
								<div className="col">
									<span>3.000.000</span>
									<span> VNĐ</span>
								</div>
							</div>
							
							<hr></hr>
							<div className="row justify-content-between">
								<h5 className="col ">Tổng </h5>
								<div className="col">
									<span>5.000.000</span>
									<span> VNĐ</span>
								</div>
							</div>
						</div>
					</div>

					<hr></hr>

				</div>
			</main>
		</React.Fragment>
	);
};

export default TransactionPage;
