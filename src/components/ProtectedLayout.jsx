import React, {useEffect} from 'react';
import {Link, Navigate, Outlet} from 'react-router-dom';
import axios from '../axios';
import {useAuth} from '../contexts/AuthContext';
import Swal from "sweetalert2";

export default function DefaultLayout() {
	const {user, setUser} = useAuth();

	// check if user is logged in or not from server
	useEffect(() => {
		(async () => {
			try {
				const resp = await axios.get('/user');
				if (resp.status === 200) {
					setUser(resp.data.data);
				}
			} catch (error) {
				if (error.response.status === 401) {
					localStorage.removeItem('user');
					window.location.href = '/';
				}
			}
		})();
	}, []);

	// if user is not logged in, redirect to login page
	if (!user) {
		return <Navigate to="/"/>;
	}

	// logout user
	const handleLogout = async () => {
		Swal.fire({
			title: "คุณต้องการออกจากระบบหรือไม่",
			showCancelButton: true,
			confirmButtonText: "ตกลง",
		}).then( async (result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				try {
					const resp = await axios.post('/logout');
					if (resp.status === 200) {
						localStorage.removeItem('user');
						window.location.href = '/';
					}
				} catch (error) {
					console.log(error);
				}
			}
		});

	};
	return (
		<>
			<nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
				{/*<nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">*/}

				<div className="container-fluid">
					<a className="navbar-brand" href="#">ส่งงาน</a>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse"
							data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false"
							aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarText">
						{/*<ul className="navbar-nav me-auto mb-2 mb-lg-0">*/}
						{/*	<li className="nav-item">*/}
						{/*		<Link className="nav-link"  to={'/about'}>เกี่ยวกับ</Link>*/}
						{/*	</li>*/}
						{/*	<li className="nav-item">*/}
						{/*		<Link className="nav-link"  to={'/profile'}>โปรไฟล์</Link>*/}
						{/*	</li>*/}
						{/*	<li className="nav-item">*/}
						{/*		<Link className="nav-link"  to={'/get_users'}>ผู้ใช้งาน</Link>*/}
						{/*	</li>*/}
						{/*</ul>*/}
						<Link className="navbar-text" onClick={handleLogout} href="#">Logout</Link>
						<i className="fa-regular text-light fa-right-from-bracket"></i>
					</div>
				</div>
			</nav>

			<div
				className="sidebar" style={{
				margin: 0,
				padding: 0,
				width: 200,
				backgroundColor: '#E2DEED',
				position: "fixed",
				height: '100vh',
				overflow: 'auto',
			}}
			>
				<div className={''}>
					<ul className="navbar-nav me-auto mb-2 mb-lg-0 p-3 text-center">
						<li className="nav-item">
							<Link className="nav-link" to={'/profile'}>โปรไฟล์</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to={`/history/${user.id}`}>ประวัติการเข้าใช้งาน</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to={'/get_users'}>ผู้ใช้งาน</Link>
						</li>
						<li className="nav-item" style={{marginTop: '60vh'}}>
							<button className="btn btn-danger w-100" onClick={handleLogout}>
								<i className="fa-regular text-light fa-right-from-bracket"></i>
								<span>ออกจากระบบ</span>
							</button>
						</li>
					</ul>
				</div>

			</div>
			<main className="container flex justify-center flex-col items-center mt-10">
				<Outlet/>
			</main>
		</>
	);
}
