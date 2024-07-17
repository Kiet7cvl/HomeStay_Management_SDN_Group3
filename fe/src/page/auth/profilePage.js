import React, { useEffect, useState } from "react";
import { Card, Container, Form, Tab, Tabs } from "react-bootstrap";
// import Accordion from "react-bootstrap/Accordion";
import { FormProfile } from "../../components/form/formProfile";
import { AuthService } from "../../services/feService/authService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { toggleShowLoading } from "../../redux/actions/common";
import { timeDelay } from "../../common/helper";
import { FormChangePass } from "../../components/form/formChangePassword";

const ProfilePage = () =>
{
	document.title = 'Tài khoản';
	let [mydata, setData] = useState(null) ;

	let [status, setStatus] = useState(true);

	const dispatch = useDispatch()

	useEffect(() => {
		findByUser();
	}, []);


	const findByUser = async () => {
		dispatch(toggleShowLoading(true));
		let id = JSON.parse(localStorage.getItem('user'))._id;
        const response = await AuthService.getProfile(id);
		await timeDelay(500);
		dispatch(toggleShowLoading(false));

        if (response.status === 'success' || response.status === 200) {
			console.log(response);
			console.log(response.data);
			setData(response.data);
        } 
		else {
            toast(response?.message || response?.error || 'error', {type:"error", autoClose: 500});
        }
    }
	console.log(mydata);
	return (
		<React.Fragment>
			<Container className="my-5">
				<Tabs
					defaultActiveKey="0"
					id="uncontrolled-tab-example"
					className="mb-3 nav-profile"
				>
					<Tab eventKey="0" title="Thông tin tài khoản" className="border-0">
						<FormProfile data={mydata} status={status} setStatus={setStatus}/>
					</Tab>
					<Tab eventKey="1" title="Đổi mật khẩu">
						<FormChangePass/>
					</Tab>
				</Tabs>
			</Container>
		</React.Fragment>
	);
};

export default ProfilePage;
