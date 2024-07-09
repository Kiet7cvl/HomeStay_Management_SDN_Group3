import React, { useEffect, useState } from "react";
// import { BlogList } from "../../components/blog/blogList";
// import { useDispatch } from "react-redux";
// import { toggleShowLoading } from "../../redux/actions/common";
// import { ArticleService } from "../../services/feService/articleService";
// import { useParams } from "react-router";
// import { menuService } from "../../services/feService/menuService";
// import { useSearchParams } from "react-router-dom";
// import { INIT_PAGING } from "../../common/constant";

const PricingPage = () => {
	document.title = 'Pricing';

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
				<div class="container-fluid p-0 pt-2">
					<div class="row">
						<div class="col-md-10 col-xl-8 mx-auto">
							<h1 class="text-center">We have a plan for everyone</h1>
							<p class="lead text-center mb-4">You can become a tenant on our system for periods of time.</p>

							<div class="row justify-content-center mt-3 mb-2">
								<div class="col-auto">
									<nav class="nav btn-group">
										<a href="#monthly" class="btn btn-outline-primary active" data-bs-toggle="tab">Monthly billing</a>
										<a href="#annual" class="btn btn-outline-primary" data-bs-toggle="tab">Annual billing</a>
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
														<h5>1 Month</h5>
														<span class="display-4">500.000</span>
														<span>/ VNĐ</span>
													</div>
													<h6>Includes:</h6>
													<ul class="list-unstyled">
														<li class="mb-2">
															1 month
														</li>
														<li class="mb-2">
															5 rooms
														</li>
														<li class="mb-2">
															Dashboard
														</li>
														<li class="mb-2">
															Security policy
														</li>
													</ul>
													<div class="mt-auto">
														<a href="#" class="btn btn-lg btn-outline-primary">Try it</a>
													</div>
												</div>
											</div>
										</div>
										<div class="col-sm-4 mb-3 mb-md-0">
											<div class="card text-center h-100">
												<div class="card-body d-flex flex-column">
													<div class="mb-4">
														<h5>4 Months</h5>
														<span class="display-4">2.000.000</span>
														<span>/ VNĐ</span>
													</div>
													<h6>Includes:</h6>
													<ul class="list-unstyled">
														<li class="mb-2">
															4 month
														</li>
														<li class="mb-2">
															10 rooms
														</li>
														<li class="mb-2">
															Dashboard
														</li>
														<li class="mb-2">
															Security policy
														</li>
													</ul>
													<div class="mt-auto">
														<a href="#" class="btn btn-lg btn-primary">Try it </a>
													</div>
												</div>
											</div>
										</div>
										<div class="col-sm-4 mb-3 mb-md-0">
											<div class="card text-center h-100">
												<div class="card-body d-flex flex-column">
													<div class="mb-4">
														<h5>8 Months</h5>
														<span class="display-4">4.000.000</span>
														<span>/ VNĐ</span>
													</div>
													<h6>Includes:</h6>
													<ul class="list-unstyled">
														<li class="mb-2">
															8 Months
														</li>
														<li class="mb-2">
															Unlimited Rooms
														</li>
														<li class="mb-2">
															Dashboard
														</li>
														<li class="mb-2">
															Security policy
														</li>
													</ul>
													<div class="mt-auto">
														<a href="#" class="btn btn-lg btn-outline-primary">Try it</a>
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
													<h6>Includes:</h6>
													<ul class="list-unstyled">
														<li class="mb-2">
															1 year
														</li>
														<li class="mb-2">
															Unlimited Rooms
														</li>
														<li class="mb-2">
															Dashboard
														</li>
														<li class="mb-2">
															Security policy
														</li>
														<li class="mb-2">
														    15% discount
														</li>
													</ul>
													<div class="mt-auto">
														<a href="#" class="btn btn-lg btn-outline-primary">Try it</a>
													</div>
												</div>
											</div>
										</div>
										<div class="col-sm-4 mb-3 mb-md-0">
											<div class="card text-center h-100">
												<div class="card-body d-flex flex-column">
													<div class="mb-4">
														<h5>2 Years</h5>
														<span class="display-4">10 TR</span>
														<span class="text-small4">/ VNĐ</span>
													</div>
													<h6>Includes:</h6>
													<ul class="list-unstyled">
													<li class="mb-2">
															2 years
														</li>
														<li class="mb-2">
															Unlimited Rooms
														</li>
														<li class="mb-2">
															Dashboard
														</li>
														<li class="mb-2">
															Security policy
														</li>
														<li class="mb-2">
														    15% discount
														</li>
													</ul>
													<div class="mt-auto">
														<a href="#" class="btn btn-lg btn-primary">Try it</a>
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
													<h6>Includes:</h6>
													<ul class="list-unstyled">
													<li class="mb-2">
															3 years
														</li>
														<li class="mb-2">
															Unlimited Rooms
														</li>
														<li class="mb-2">
															Dashboard
														</li>
														<li class="mb-2">
															Security policy
														</li>
														<li class="mb-2">
														    15% discount
														</li>
													</ul>
													<div class="mt-auto">
														<a href="#" class="btn btn-lg btn-outline-primary">Try it</a>
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
