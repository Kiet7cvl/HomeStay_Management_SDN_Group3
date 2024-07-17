import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartArea, faChartColumn, faChartLine, faChartPie } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { Alert, Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { Table } from 'react-bootstrap';

export default function PageHome() {

	return (
		
		<div>
			<div class="container-fluid  px-4">
			<h1 className="text-center ">Biểu đồ thống kê</h1>
				<div class="row pt-2 g-4">
					<div class="col-sm-6 col-xl-3">
						<div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
						<FontAwesomeIcon icon={faChartLine} className='fa-3x text-primary'/>
							<div class="ms-3">
								<p class="mb-2">Weekly Booking</p>
								<h6 class="mb-0 fw-bold">10</h6>
							</div>
						</div>
					</div>
					<div class="col-sm-6 col-xl-3">
						<div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
						<FontAwesomeIcon icon={faChartColumn} className='fa-3x text-primary' />
							<div class="ms-3">
								<p class="mb-2">Total Booking</p>
								<h6 class="mb-0 fw-bold">230</h6>
							</div>
						</div>
					</div>
					<div class="col-sm-6 col-xl-3">
						<div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
						<FontAwesomeIcon icon={faChartPie} className='fa-3x text-primary'/>
							<div class="ms-3">
								<p class="mb-2">Weekly Revenue</p>
								<h6 class="mb-0 fw-bold">$1234</h6>
							</div>
						</div>
					</div>
					<div class="col-sm-6 col-xl-3">
						<div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
						<FontAwesomeIcon icon={faChartArea} className='fa-3x text-primary'/>
							<div class="ms-3">
								<p class="mb-2">Total Revenue</p>
								<h6 class="mb-0 fw-bold">$1234</h6>
							</div>
						</div>
					</div>
				</div>
			</div>	
			<div class="container-fluid pt-4 px-4">
                <div class="row g-4">
                    <div class="col-sm-12 col-xl-6">
                        <div class="bg-light text-center rounded p-4">
                            <div class="d-flex align-items-center justify-content-between mb-4">
                                <h6 class="mb-0">Worldwide Sales</h6>
                                <a href="">Show All</a>
                            </div>
                            <canvas id="worldwide-sales"></canvas>
                        </div>
                    </div>
                    <div class="col-sm-12 col-xl-6">
                        <div class="bg-light text-center rounded p-4">
                            <div class="d-flex align-items-center justify-content-between mb-4">
                                <h6 class="mb-0">Salse & Revenue</h6>
                                <a href="">Show All</a>
                            </div>
                            <canvas id="salse-revenue"></canvas>
                        </div>
                    </div>
                </div>
            </div>	
		</div >
	);
}


