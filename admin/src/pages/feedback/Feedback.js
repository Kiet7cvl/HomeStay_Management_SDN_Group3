import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { Pagination } from '../../common/form/pagination';
import  voteService  from "../../services/voteService";



export default function Feedback() {

    const [paging, setPaging] = useState({
        page: 1,
        page_size: 20,
        total: 0,
        current_page: 1
    });
	const [feedback, setFeedbacks] = useState([]);

    useEffect(() => {
		getFeedback()
	}, []);

    const getFeedback = async () => {
        const rs = await voteService.getLists({ page: 1, page_size: 7, status: 1 });
        if (rs?.status === 200) {
            setFeedbacks(rs?.data?.votes || [])
        } else {
            setFeedbacks([]);
        }
    };
   console.log(feedback);
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
                        <h1 className="text-center pb-4">Danh sách phản hồi</h1>
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
                                {feedback?.length > 0 ? feedback.map((item, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{key + 1}</td>
                                            <td>                             
                                                {item?.user?.name}
                                            </td>
                                            <td>{item?.room?.name}</td>
                                            <td>{item.vote_content}</td>
                                            <td>{item.vote_number}</td>
                                            <td>{moment(item.create_at).format("MM-DD-YYYY")}</td>
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
