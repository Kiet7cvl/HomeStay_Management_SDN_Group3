import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import userService from "../../services/userService";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { Pagination } from '../../common/form/pagination';

export default function PageUser() {

    const [paging, setPaging] = useState({
        page: 1,
        page_size: 20,
        total: 0,
        current_page: 1
    });
    const [params, setParams] = useState({});

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers({...params}).then(r =>{});
    }, []);

    const getUsers = async (filters) => {
        const response = await userService.getLists(filters)
        console.log(response);
        if (response?.status === 'success' || response?.status === 200) {
            setUsers(response?.data?.users)
            
        }
    }


    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Breadcrumb>
                            <Breadcrumb.Item href="/user" >
                                Thành viên
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>Danh sách</Breadcrumb.Item>
                        </Breadcrumb>
                        <h1 className="text-center pb-4">Danh sách người dùng</h1>
                        <Table responsive striped bordered hover >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Sex</th>
                                    <th>Birthday</th>
                                    <th>Type</th>
                                    <th>Created</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? users.filter(i=>i.roles.length == 0).map((item, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{key + 1}</td>
                                            <td>
                                                {item.name}
                                            </td>
                                            <td>{item.email}</td>
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
                            // onPageChange={ ( e ) =>
                            // {
                            // 	getUsers( { ...params, page_size: paging.page_size, page: e } )
                            // } }
                            />
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
