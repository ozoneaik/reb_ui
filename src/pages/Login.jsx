import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from '../axios';
import { useAuth } from '../contexts/AuthContext';
import Swal from "sweetalert2";

export default function Login() {
	const { setUser, csrfToken } = useAuth();
	const [error, setError] = React.useState(null);

	// login user
	const handleSubmit = async (e) => {
		e.preventDefault();
		const { email, password } = e.target.elements;
		const body = {
			email: email.value,
			password: password.value,
		};
		await csrfToken();
		try {
			const resp = await axios.post('/login', body);
			if (resp.status === 200) {
				setUser(resp.data.user);
				Swal.fire({
					icon: 'success',
					title: 'เข้าสู่ระบบสำเร็จ',
				})
				return <Navigate to="/get_users" />;
			}
		} catch (error) {
			if (error.response.status === 401) {
				setError(error.response.data.message);
			}
			Swal.fire({
				icon: 'error',
				title: 'ข้อผิดพลาด',
				text: 'email หรือ password ไม่ถูกต้อง',
				confirmButtonText: 'ตกลง'
			})
		}
	};

	return (
		<section className="container mt-4">
			<div className="row">
				<div className="col-sm-12 col-lg-12 d-flex justify-content-center align-items-center">
					<div className={'card '} style={{width:600,marginTop: '15%'}}>
						<div className={'card-header'}>
							<span className={'card-title'}>เข้าสู่ระบบ</span>
						</div>
						<div className={'card-body'}>
							<form action="#" method="post" onSubmit={handleSubmit}>
								<div className={'form-group mb-3'}>
									<label htmlFor="email">อีเมล</label>
									<input className={'form-control'} type="email" name="email" id="email" placeholder="อีเมล" required/>
								</div>
								<div className={'form-group mb-3'}>
									<label htmlFor="password">รหัสผ่าน</label>
									<input className={'form-control'} type="password" name="password" id="password" placeholder="••••••••" required/>
								</div>
								<button type="submit" className={'btn btn-primary w-100 mb-3'}>เข้าสู่ระบบ</button>
								<p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
									ยังไม่มีบัญชี?{' '}
									<Link to="/register">คลิกที่นี่เพื่อลงสมัครสมาชิด</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
