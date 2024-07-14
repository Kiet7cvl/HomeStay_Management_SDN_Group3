import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { InputBase } from "../base-form/controlInputForm";
import { categoryService } from "../../services/feService/categoryService";
import { ServiceService } from "../../services/feService/serviceService";
import { useParams } from "react-router-dom";
import { SelectBase } from "../base-form/selectForm";

export const FormRoomSearch = (props) => {
	const [form, setForm] = useState({
		vote_number: null,
		bed: null,
		bathroom: null,
		price: null,
		service: null,
		category_id: null,
		address: null
	});

	const [category_id, setCategoryId] = useState(null);
	const [categories, setCategories] = useState([]);
	const [services, setServices] = useState([]);
	const params = useParams();
	const handleSubmit = async (e) => {
		e.preventDefault();
		props.setParams(form);
		props.getDataList({ page: 1, page_size: props.paging.page_size, ...form });
	}

	const resetForm = () => {
		setForm({
			bed: null,
			bathroom: null,
			price: null,
			service: null,
			category_id: null,
			address: null
		})
		props.setParams({
			bed: null,
			bathroom: null,
			price: null,
			service: null,
			category_id: null,
			address: null
		});
		props.getDataList({ page: 1, page_size: props.paging.page_size });
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

	useEffect(() => {
		getListsMenu().then(r => { });
		getListsService().then(r => { });
	}, []);

	return (
		<Form noValidate onSubmit={handleSubmit}>
			<Row className="">
				<Form.Group className="mb-3 col-md-12">
					<InputBase form={form} setForm={setForm} name={'address'}
						label={'Điểm đến: '}
						key_name={'address'} required={false} placeholder={'Nhập điểm đến'}
						type={'text'}
					/>
				</Form.Group>

				<Form.Group className="mb-3 col-md-12">
					<SelectBase form={form} setForm={setForm} name={'category_id'}
						label={'Loại phòng: '} data={categories}
						key_name={'category_id'} required={false} placeholder={'Loại phòng'}
						type={'text'} />
				</Form.Group>
				<Form.Group className="mb-3 col-md-12">
					<SelectBase form={form} setForm={setForm} name={'price'}
						label={'Khoảng giá: '} data={categories}
						key_name={'price'} required={false} placeholder={'Khoảng giá'}
						type={'text'}
					/>
				</Form.Group>

				<Form.Group className="mb-3 col-md-12">
					<InputBase form={form} setForm={setForm} name={'bed'}
						label={'Giường: '}
						key_name={'bed'} required={false} placeholder={'nhập số giường'}
						type={'text'}
					/>
				</Form.Group>

				<Form.Group className="mb-3 col-md-12">
					<InputBase form={form} setForm={setForm} name={'bathroom'}
						label={'Phòng tắm: '}
						key_name={'bathroom'} required={false} placeholder={'Nhập số nhà tắm'}
						type={'text'}
					/>
				</Form.Group>

				<p>Tiện nghi: </p>
				<div key={`inline-checkbox`} className="mb-3 row">
					{services?.map((item, index) => (
						<div key={index} className="col-md-6"> {/* Use index for unique key */}
							<Form.Check
								form={form}
								setForm={setForm}
								inline
								label={item.name} // Assuming your service item has a "name" property
								name="service" // Assuming you want each checkbox to have the same name
								type="checkbox"
								id={`inline-checkbox-${index}`} // Generate unique IDs
							/>
						</div>
					))}
				</div>

			</Row>

			<Form.Group className="mb-3 d-flex justify-content-center">
				<button type="submit" className='btn btn-primary px-3 fs-14 py-2'>Tìm kiếm</button>
				<button type="button"
					onClick={(e) => { resetForm() }}
					className='ml-2 px-3 fs-14 py-2 btn btn-secondary'>Reset</button>
			</Form.Group>
		</Form>
	);
};

