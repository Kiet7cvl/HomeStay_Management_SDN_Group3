import React, { useEffect, useState, } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import { DEFAULT_IMG } from "../../common/constant";
import { buildImage, customDate, onErrorImg } from "../../common/helper";
import { ArrowRight } from "react-bootstrap-icons";
import { Pagination } from "../common/pagination";
import { NotFoundPage } from "../common/notFound";


export const BlogList = (props) => {
	useEffect(() => {
	}, []);
	return (
		<React.Fragment>
			<section className={`pt-4 ftco-section ${props.notShowTitle ? 'pt-0' : ' bg-light'}`}>
				<Container>
					{
						!props.notShowTitle && <Row className="row justify-content-center mb-5 pb-3">
							<Col md={7} className="heading-section text-center">
								<h2 className="mb-4">{props.title || 'Menu'}</h2>
							</Col>
						</Row>
					}
					<Row>
						{props.data?.length > 0 ? props.data.map((item, key) => {
							return (
								<Col md={3} key={key}>
									<div className="blog-entry  align-self-stretch">
										<a href={'/menu/show/' + item._id} onClick={() => {
											window.scrollTo({
												top: 0,
												behavior: 'smooth',
											});
										}} className="block-20 br-top-left-6 br-top-right-6"
										>
											<img src={item.avatar && buildImage(item.avatar) || DEFAULT_IMG}
												className="w-100 h-100 img br-top-left-6 br-top-right-6" onError={onErrorImg} />
										</a>
										<div className="text mt-3 d-block br-bottom-left-6 br-bottom-right-6">
											<h3 className="heading mt-3">
												<a className="text-decoration-none" href={'/menu/show/' + item._id}>{item.name}</a>
											</h3>

											<p className="meta mb-3">
												<div>
													<a className="text-decoration-none text-secondary" href="#">{customDate(item.created_at, 'DD-MM-yyyy')}</a>
												</div>

											</p>
										</div>
									</div>
								</Col>
							)
						}) : <NotFoundPage />
						}

						{
							// !props.isShowLink && !props.notShowTitle &&
							// <Col md={ 12 }>
							// 	{
							// 		props?.paging?.total > 0 &&
							// 			< Pagination
							// 				total={ props.paging.total }
							// 				page={ props.paging.current_page }
							// 				pageSize={ props.paging.page_size }
							// 				onPageChange={ ( e ) =>
							// 				{
							// 					props.getDataList( { ...props.params, page_size: props.paging.page_size, page: e } )
							// 				} }
							// 			/> 
							// 	}


							// </Col>
						}
					</Row>
					{
						props.isShowLink &&
						<Row className="pb-4">
							<Col md={12}>
								<div className="mt-3 text-center">
									<Link
										to="/menu"
										className="btn btn-primary btn-hover fs-18"
									>
										View All <ArrowRight />
									</Link>
								</div>
							</Col>
						</Row>
					}
				</Container>
			</section>
		</React.Fragment>
	);
};
