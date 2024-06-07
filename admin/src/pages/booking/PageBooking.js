import React, { useEffect, useState } from "react";
import { Badge, Breadcrumb, Button, Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link, useSearchParams } from "react-router-dom";
// import bookingApi from "../../services/bookingService";
import moment from "moment";
import currencyFormat, { URL_IMG } from "../../common/common";
import { toast } from "react-toastify";
import { Pagination } from "../../common/form/pagination";
import { buildFilter } from "../../services/common";

export default function PageBooking() {
  const [paging, setPaging] = useState({
    page: 1,
    page_size: 10,
    total: 0,
    current_page: 1,
  });

  const bookings = [{
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  },]
  const [params, setParams] = useState({});

  // const [bookings, setBookings] = useState();
  const [paramSearch, setParamSearch] = useSearchParams();

  useEffect(() => {
    getBookings({ ...params, ...paging }).then((r) => { });
  }, []);

  const getBookings = async (filters) => {
    filters = buildFilter(filters);
    setParamSearch(filters);
    // const response = await bookingApi.index(filters);
    // console.log("--------- response: ", response);
    // if (response?.status === "success" || response?.status === 200) {
    //   setBookings(response.data.bookings);
    //   setPaging(response.meta);
    // }

  };

  // const handleDelete = async (id) => {
  //   const response = await bookingApi.delete(id);
  //   if (response?.status === "success" || response?.status === 200) {
  //     toast("Xóa thành công!");
  //     getBookings({ ...params }).then((r) => {});
  //   } else {
  //     toast(response?.error || "error");
  //   }
  // };


  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Breadcrumb>
              <Breadcrumb.Item href="/booking">
                Quản lý đặt phòng
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Danh sách</Breadcrumb.Item>
            </Breadcrumb>
            <Table responsive striped bordered hover>
              <thead>
                <tr> 
                  <th>#</th>
                  <th>Customer</th>
                  <th>Room</th>
                  <th>Total</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Status</th>
                  <th>Payment Type</th>
                  <th>Payment</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings ? (
                  bookings.map((item, key) => {
                    return (
                      <tr key={item._id}>
                        <td>{key + 1}</td>
                        <td>
                          <ul style={{ paddingLeft: 0, listStyle: "none" }}>
                            <li>{item.customer_name}</li>
                            <li>{item.customer_email}</li>
                            <li>{item.customer_phone}</li>
                          </ul>
                        </td>
                        <td>
                          <span>{item.room?.name}</span>
                        </td>
                        <td>
                          <span className={"text-success"}>
                            {currencyFormat(item.total_money)} đ
                          </span>
                        </td>
                        <td>{moment(item.check_in).format("MM-DD-YYYY")}</td>
                        <td>{moment(item.check_out).format("MM-DD-YYYY")}</td>
                        <td>
                          <Link
                            className={""}
                            to={`/booking/update/${item._id}`}
                          >
                            <span
                              className={`badge ${item.status === "PENDING"
                                ? "bg-secondary"
                                : item.status === "REJECT"
                                  ? "bg-danger"
                                  : item.status === "APPROVED"
                                    ? "bg-success"
                                    : ""
                                }`}
                            >
                              {item.status}
                            </span>
                          </Link>
                        </td>
                        <td>

                          <Badge bg="primary">TT Online</Badge>


                        </td>
                        <td>
                          <Link
                            className={`btn btn-sm ${item.status_payment === "PAID"
                              ? "btn-success"
                              : "btn-secondary"
                              }`}
                            to={`/booking/updatePayment/${item._id}`}
                          >
                            {item.status_payment}
                          </Link>
                        </td>
                        <td>
                          {moment(item.created_at).format("MM-DD-YYYY H:mm:ss")}
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                          // onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </Button>{" "}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td className="text-center" colSpan={7}>
                      Không có dữ liệu
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            {paging.total > 0 && (
              <Pagination
                total={paging.total}
                page={paging.current_page}
                pageSize={paging.page_size}
                onPageChange={(e) => {
                  getBookings({
                    ...params,
                    page_size: paging.page_size,
                    page: e,
                  });
                }}
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
