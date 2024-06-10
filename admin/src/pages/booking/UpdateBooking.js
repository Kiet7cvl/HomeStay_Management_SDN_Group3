import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
// import roomApi from "../../services/roomService";
import { toast } from "react-toastify";
// import uploadApi from "../../services/uploadService";
// import bookingApi from "../../services/bookingService";

export default function UpdateBooking() {
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');

    const navigate = useNavigate();
    const params = useParams();
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const form = event.currentTarget;
    //     if (form.checkValidity() === false) {
    //         event.stopPropagation();
    //     } else {
    //         let data = {
    //             status: status,
    //         }

    //         const response = await bookingApi.update(params.id,data);
    //         if (response.status === 'success' || response.status === 200) {
    //             toast("Cập nhật thành công");
    //             navigate('/booking')
    //         } else {
    //             toast(response?.message || response?.error || 'error');
    //         }
    //     }

    //     setValidated(true);
    // };

    const bookings = [{
        _id: "1",
        status: "PENDING",
        status_payment: "UNPAID",
        price: "200000",
        total_money: 400000,
        amount_of_people: "2",
        payment_type: "2",
        check_in: "2024-03-16T00:00:00.000+00:00",
        check_out: "2024-03-18T00:00:00.000+00:00",
        customer_name: "Lê Quý Trường",
        customer_email: "lqt@fpt.edu.vn",
        customer_phone: "0886031112",
        room: { name: "VIP" },
        created_at: "2024-03-16T10:29:02.572+00:00"
    }
    ]
    // const findById = async (id) => {
    //     const response = await bookingApi.findById(id);
    //     console.log('----------- response: ', response);
    //     if (response.status === 'success' || response.status === 200) {
    //         console.log('---------- OK');
    //         setName(response.data?.name);
    //     } else {
    //         toast(response?.message || response?.error || 'error');
    //     }
    // }

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    }

    useEffect(() => {
        // getDetailData();
        // if ( params.id )
        // {
        //     findById(params.id).then(r => {});
        // }
    }, [params.id]);

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Breadcrumb>
                            <Breadcrumb.Item href="/booking" >
                                Quản lí đặt Phòng
                            </Breadcrumb.Item>&nbsp; số {bookings[0]._id}
                            <Breadcrumb.Item active>Cập nhật</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className={'d-flex justify-content-end'}>
                            <Link className={'btn btn-sm btn-primary'} to={'/booking'} >Trở về</Link>
                        </div>
                        <Form noValidate validated={validated}
                        // onSubmit={handleSubmit}
                        >
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Customer Name</Form.Label>
                                    <Form.Control type="text" placeholder={bookings[0].customer_name} readOnly />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Customer Email</Form.Label>
                                    <Form.Control type="text" placeholder={bookings[0].customer_email} readOnly />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Customer Phone</Form.Label>
                                    <Form.Control type="text" placeholder={bookings[0].customer_phone} readOnly />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Check In</Form.Label>
                                    <Form.Control type="text" placeholder={bookings[0].check_in} readOnly />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Check Out</Form.Label>
                                    <Form.Control type="text" placeholder={bookings[0].check_out} readOnly />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Room</Form.Label>
                                    <Form.Control type="text" placeholder={bookings[0].room.name} readOnly />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="text" placeholder={bookings[0].price} readOnly />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Total Money</Form.Label>
                                    <Form.Control type="text" placeholder={bookings[0].total_money} readOnly />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Col className={'col-3'}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Trạng thái</Form.Label>
                                        <Form.Select aria-label="Default select example" onChange={handleChangeStatus}>
                                            <option value="PENDING">PENDING</option>
                                            <option value="APPROVED">APPROVED</option>
                                            <option value="REJECT">REJECT</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Button type="submit">Lưu dữ liệu</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
