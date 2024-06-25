import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
// import userApi from "../../services/userService";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { Pagination } from '../../common/form/pagination';
import { FormRoomSearch } from '../../common/form/formSearchRoom';



export default function Feedback() {

    const [paging, setPaging] = useState({
        page: 1,
        page_size: 20,
        total: 0,
        current_page: 1
    });


    const feedbacks = [
        {
            _id: 1,
            name: "Hoang Tuan Kiet",
            room: "Phòng Vip 101",
            description: 'Phòng đẹp, rộng rãi như mô tả, dịch vụ chất lượng',
            vote: "4/5",
            crecreated_at: "2024-03-21"
        }, {
            _id: 1,
            name: "Hoang Tuan Kiet",
            room: "Phòng Vip 101",
            description: 'Phòng đẹp, rộng rãi như mô tả, dịch vụ chất lượng',
            vote: "4/5",
            crecreated_at: "2024-03-21"
        }, {
            _id: 1,
            name: "Hoang Tuan Kiet",
            room: "Phòng Vip 101",
            description: 'Phòng đẹp, rộng rãi như mô tả, dịch vụ chất lượng',
            vote: "4/5",
            crecreated_at: "2024-03-21"
        }, {
            _id: 1,
            name: "Hoang Tuan Kiet",
            room: "Phòng Vip 101",
            description: 'Phòng đẹp, rộng rãi như mô tả, dịch vụ chất lượng',
            vote: "4/5",
            crecreated_at: "2024-03-21"
        }, {
            _id: 1,
            name: "Hoang Tuan Kiet",
            room: "Phòng Vip 101",
            description: 'Phòng đẹp, rộng rãi như mô tả, dịch vụ chất lượng',
            vote: "4/5",
            crecreated_at: "2024-03-21"
        }
    ]

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Breadcrumb>
                            <Breadcrumb.Item href="/user" className='text-decoration-none'>
                                Phản hồi
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>Danh sách</Breadcrumb.Item>
                        </Breadcrumb>
                        <h1 className="text-center ">Danh sách phản hồi</h1>
                        <div className='mb-4'>
                            <FormRoomSearch
                            lable='Phản hồi theo Phòng'
							placeholder='Chọn phòng'
                            // getDataList={ getRooms }
                            // paging={ paging }
                            // setPaging={ setPaging }
                            // params={ params }
                            // setParams={ setParams }
                            />

                        </div>
                        <Table responsive striped bordered hover>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Name</th>
                                    <th>Room</th>
                                    <th>Description</th>
                                    <th>Vote</th>
                                    <th>Created</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feedbacks.length > 0 ? feedbacks.map((item, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{key + 1}</td>
                                            {/* <Link to={`/room/${item._id}`}>{item.name}</Link> */}
                                            <td>
                                                {/* <Link to={`/room`} className='text-decoration-none'></Link> */}
                                                {item.name}
                                            </td>
                                            <td>{item.room}</td>
                                            <td>{item.description}</td>
                                            <td>{item.vote}</td>
                                            <td>{moment(item.created_at).format("MM-DD-YYYY")}</td>
                                            <td>
                                                <Button variant="success" size="sm">
                                                    Enable
                                                </Button>{' '}
                                            </td>
                                        </tr>
                                    )
                                })
                                    :
                                    <tr>
                                        <td className='text-center' colSpan={4}>Không có dữ liệu</td>
                                    </tr>
                                }

                            </tbody>
                        </Table>
                        {
                            paging.total > 0 &&
                            <Pagination
                                total={paging.total}
                                page={paging.current_page}
                                pageSize={paging.page_size}
                            />
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
