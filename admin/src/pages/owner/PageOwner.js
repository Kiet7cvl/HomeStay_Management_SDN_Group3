import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
// import userApi from "../../services/userService";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { Pagination } from '../../common/form/pagination';

export default function PageOwner() {

    const [paging, setPaging] = useState({
        page: 1,
        page_size: 20,
        total: 0,
        current_page: 1
    });


    const owners = [
        {
            _id: 1,
            name: "Hoang Tuan Kiet",
            email: "kiet7cvl@gmail.com",
            phone: '0377245644',
            sex: "Nam",
            birthday: "2024-03-21",
            type: "OWNER",
            crecreated_at: "2024-03-21"
        }, {
            _id: 1,
            name: "Hoang Tuan Kiet",
            email: "kiet7cvl@gmail.com",
            phone: '0377245644',
            sex: "Nam",
            birthday: "2024-03-21",
            type: "OWNER",
            crecreated_at: "2024-03-21"
        }, {
            _id: 1,
            name: "Hoang Tuan Kiet",
            email: "kiet7cvl@gmail.com",
            phone: '0377245644',
            sex: "Nam",
            birthday: "2024-03-21",
            type: "OWNER",
            crecreated_at: "2024-03-21"
        }, {
            _id: 1,
            name: "Hoang Tuan Kiet",
            email: "kiet7cvl@gmail.com",
            phone: '0377245644',
            sex: "Nam",
            birthday: "2024-03-21",
            type: "OWNER",
            crecreated_at: "2024-03-21"
        }, {
            _id: 1,
            name: "Hoang Tuan Kiet",
            email: "kiet7cvl@gmail.com",
            phone: '0377245644',
            sex: "Nam",
            birthday: "2024-03-21",
            type: "OWNER",
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
                                Người cho thuê
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>Danh sách</Breadcrumb.Item>
                        </Breadcrumb>
                        <h1 className="text-center ">Danh sách người cho thuê</h1>
                        <Table responsive striped bordered hover className='mt-4'>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Sex</th>
                                    <th>Birthday</th>
                                    <th>Type</th>
                                    <th>Created</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {owners.length > 0 ? owners.map((item, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{key + 1}</td>
                                            {/* <Link to={`/room/${item._id}`}>{item.name}</Link> */}
                                            <td>
                                            <Link to={`/room`} className='text-decoration-none'>{item.name}</Link>

                                            </td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>{(item.sex === 'nu' || item.sex === 'Nữ') ? 'Nữ' : "Nam"}</td>
                                            <td>{moment(item.birthday).format("MM-DD-YYYY")}</td>
                                            <td>{item.type}</td>
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
