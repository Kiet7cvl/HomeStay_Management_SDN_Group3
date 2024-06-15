import React, { useEffect, useState } from 'react';
import { Alert, Breadcrumb, Col, Container, Row } from "react-bootstrap";
// import dashboardApi from '../../services/dashboardService';
import { Table } from 'react-bootstrap';

export default function PageHome() {

	return (
		<Container>
			<Row>
				<Col>
					<Alert variant="success">
						<Alert.Heading>Xin chào</Alert.Heading>
						<p>Chào mừng bạn đến với hệ thống quản lý khách sạn của chúng tôi</p>
					</Alert>
				</Col>
			</Row>
			
			<div>
            <h2>Booking Statistics by Month</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Number of Bookings</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {statistics.map(stat => (
                        <tr key={stat._id}>
                            <td>{stat._id}</td>
                            <td>{stat.count}</td>
                        </tr>
                    ))} */}
                </tbody>
            </Table>
        </div>
			{/* <Row>
				<Col className={'col-8'}>
					{loadingChartStatus === false && (
						<Bar options={options} data={dataChartListDayInMonth} />
					)}
				</Col>
				<Col className={'col-4'}>
					{loadingChartStatus === false && (
						<Doughnut data={dataCharStatus} />
					)}
				</Col>
			</Row> */}
		</Container>
	);
}
