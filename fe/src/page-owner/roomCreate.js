import React, { useEffect, useRef, useState } from 'react';
import { Breadcrumb, Button, Col, Container, Form, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { RoomService } from '../services/feService/roomService';
// import uploadApi from "../../services/uploadService";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { DEFAULT_IMG, onErrorImg, readFile } from '../../common/common';
// import { CloseOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import ImageForm from '../components/form/imageForm';
import { categoryService } from "../services/feService/categoryService";
import { ServiceService } from "../services/feService/serviceService";
import { OtherService } from '../services/feService/otherService';



const RoomCreatePage = () => {
	document.title = 'Thêm phòng cho thuê';

	const [validated, setValidated] = useState(false);
	const [name, setName] = useState('');
	const [avatar, setAvatar] = useState('');
	const [price, setPrice] = useState('');
	const [size, setSize] = useState('');
	const [bed, setBed] = useState('');
	const [description, setDescription] = useState('');
	const [file, setFile] = useState();
	const [bathroom, setBathroom] = useState('');
	const [address, setAddress] = useState('');
	const [max_people, setMaxPeople] = useState('');

	const [category_id, setCategoryId] = useState(null);
	const [service_id, setServiceId] = useState([]);
	const [user_id, setUserId] = useState(null);

	const [categories, setCategories] = useState([]);
	const [services, setServices] = useState([]);

	const [fileAlbums, setFileAlbums] = useState([
		{
			imgBase64: null,
			file: null
		}
	]);

	const [changes, setChanges] = useState(false);
	const params = useParams();
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.stopPropagation();
		} else {
			let data = {
				name: name,
				avatar: null,
				price: price,
				bed: bed,
				size: size,
				description: description,
				bathroom: bathroom,
				address: address,
				max_people: max_people,
				category_id: category_id,
				service_id: service_id,
				user_id: user_id,
			}

			const avatarUpload = await OtherService.uploadFiles(file);
			const albums = await OtherService.uploadMultiImg(fileAlbums);
			console.log('---------- avatarUpload: ', avatarUpload);
			console.log('---------- AlbumUpload: ', albums);
			if (avatarUpload) data.avatar = avatarUpload;
			if (albums.length > 0) data.albums = albums;
			console.log('------- data: ', data);

			const response = await RoomService.createData(data);
			if (response.status === 'success' || response.status === 200) {
				toast("Thêm mới thành công");
				navigate('/room/owner-list')
			} else {
				toast(response?.message || response?.error || 'error');
			}
		}

		setValidated(true);
	};

	const handleUpload = (event) => {
		if (event && event.target.files[0]) setFile(event.target.files[0]);
	}
	const getListsMenu = async () => {
		const response = await categoryService.getDataList({
			page_size: 1000
		})
		if (response?.status === 'success' || response?.status === 200) {
			setCategories(response.data.categories);
		}
	}
	const getListsService = async () => {
		const response = await ServiceService.getDataList({
			page_size: 1000
		})
		if (response?.status === 'success' || response?.status === 200) {
			setServices(response.data.services);
		}
	}

	const handleChangeMenu = (event) => {
		setCategoryId(event.target.value);
	}
	const handleServiceChange = (event) => {
		const { checked, value } = event.target;

		// Update selectedServices based on checkbox state
		setServiceId((prevServices) => {
			if (checked) {
				return [...prevServices, value]; // Add service to array
			} else {
				return prevServices.filter((service) => service !== value); // Remove service from array
			}
		});
	};


	useEffect(() => {
		getListsMenu({ ...params }).then(r => { });
		getListsService({ ...params }).then(r => { });
	}, []);

	return (
		<React.Fragment>
			<main class="content">
				<div class="container p-0 pt-2">
					<Row>
						<Col className='pt-4'>
							<div className="d-flex justify-content-between pb-2">
								<h2>Nhà/phòng cho thuê</h2>
								<div>
									<Link className={'btn btn-sm btn-primary'} to={'/owner/room-list	'} >trở về</Link>
								</div>
							</div>
							<Form noValidate validated={validated} onSubmit={handleSubmit}>
								<Row>
									<Col className={'col-6'}>
										<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
											<Form.Label>Tên phòng</Form.Label>
											<Form.Control required type="text" name={'name'} placeholder="Tên Phòng"
												onChange={event => setName(event.target.value)}
												value={name} />
											<Form.Control.Feedback type="invalid">
												Tên phòng không được để trống
											</Form.Control.Feedback>
										</Form.Group>
									</Col>
									<Col className={'col-6'}>
										<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
											<Form.Label>Địa chỉ</Form.Label>
											<Form.Control required type="text" name={'address'} placeholder="Địa chỉ"
												onChange={event => setAddress(event.target.value)}
												value={address} />
											<Form.Control.Feedback type="invalid">
												Tên phòng không được để trống
											</Form.Control.Feedback>
										</Form.Group>
									</Col>
								</Row>

								<Row>
									<Col className={'col-4'}>
										<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
											<Form.Label>Giá phòng / 1 đêm</Form.Label>
											<Form.Control required type="text" name={'price'} placeholder="giá"
												onChange={event => setPrice(event.target.value)}
												value={price} />
											<Form.Control.Feedback type="invalid">
												Giá phòng không được để trống
											</Form.Control.Feedback>
										</Form.Group>
									</Col>
									<Col className={'col-4'}>
										<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
											<Form.Label>Diện tích</Form.Label>
											<Form.Control required type="text" name={'size'} placeholder="diện tích"
												onChange={event => setSize(event.target.value)}
												value={size} />
											<Form.Control.Feedback type="invalid">
												Diện tích không được để trống
											</Form.Control.Feedback>
										</Form.Group>
									</Col>
									<Col className={'col-4'}>
										<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
											<Form.Label>Số phòng ngủ</Form.Label>
											<Form.Control required type="text" name={'bed'} placeholder="giường"
												onChange={event => setBed(event.target.value)}
												value={bed} />
											<Form.Control.Feedback type="invalid">
												Số phòng ngủ không được để trống
											</Form.Control.Feedback>
										</Form.Group>
									</Col>
								</Row>
								<Row>
									<Col className={'col-4'}>
										<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
											<Form.Label>Số phòng tắm</Form.Label>
											<Form.Control required type="text" name={'bathroom'} placeholder="nhà tắm"
												onChange={event => setBathroom(event.target.value)}
												value={bathroom} />
											<Form.Control.Feedback type="invalid">
												Tầng phòng tắm được để trống
											</Form.Control.Feedback>
										</Form.Group>
									</Col>
									<Col className={'col-4'}>
										<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
											<Form.Label>Số người tối đa</Form.Label>
											<Form.Control required type="text" name={'max-people'} placeholder="người tối đa"
												onChange={event => setMaxPeople(event.target.value)}
												value={max_people} />
											<Form.Control.Feedback type="invalid">
												Số người không được để trống
											</Form.Control.Feedback>
										</Form.Group>
									</Col>
									<Col className={'col-4'}>
										<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
											<Form.Label>Category</Form.Label>
											<Form.Select required aria-label="Default select example" onChange={handleChangeMenu}>
												<option value="">-- Mời chọn category --</option>
												{categories.map((item, index) => {
													return (
														<option value={item._id} selected={item._id == category_id ? true : false}>{item.name}</option>
													)
												})}
											</Form.Select>
											<Form.Control.Feedback type="invalid">
												Category không được để trống
											</Form.Control.Feedback>
										</Form.Group>
									</Col>
								</Row>

								<p>Tiện nghi: </p>
								<div key={`inline-checkbox`} className="mb-3 row">
									{services?.map((item, index) => (
										<div key={index} className="col-md-3"> {/* Use index for unique key */}
											<Form.Check
												inline
												label={item.name}
												name="service"
												type="checkbox"
												id={`inline-checkbox-${index}`}
												value={item.id} // Use service ID or unique identifier for value
												checked={service_id.includes(item.id)} // Set checkbox state based on selectedServices
												onChange={handleServiceChange}
											/>
										</div>
									))}
								</div>

								<Form.Group controlId="formFile" className="mb-3">
									<Form.Label>Avatar</Form.Label>
									<Form.Control type="file" accept="image/*" onChange={(event) => handleUpload(event)} />

								</Form.Group>
								<Form.Group className="mb-3 ">
									<Form.Label>
										Ảnh chi tiết:
									</Form.Label>
									<ImageForm files={fileAlbums} changes={changes} setChanges={setChanges} setFiles={setFileAlbums} max={5} />

								</Form.Group >
								<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
									<Form.Label>Nội dung</Form.Label>
									<CKEditor
										editor={ClassicEditor}
										data={description}
										onChange={(event, editor) => {
											setDescription(editor?.getData() || '')
										}}

										onBlur={(event, editor) => {
											setDescription(editor?.getData() || '')
										}}
									/>
								</Form.Group>
								<Form.Group className="mb-3 text-center" controlId="exampleForm.ControlTextarea1">
									<Button className="p-3 mb-3" variant="dark" style={{ borderRadius: '50px', width: "200px" }}>Thêm mới</Button>
								</Form.Group>
							</Form >
						</Col >
					</Row >
					<hr></hr>
				</div>
			</main>
		</React.Fragment>
	);
};

export default RoomCreatePage;
