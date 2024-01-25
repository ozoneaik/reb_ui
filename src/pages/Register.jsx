import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from '../axios';
import Axios from 'axios';
import {useAuth} from '../contexts/AuthContext';
import Swal from "sweetalert2";

export default function Register() {
	const {setUser} = useAuth();

	const [prefix, setPrefix] = useState('นาย')
	const [name, setName] = useState('สมศักดิ์ ใจหาร')
	const [email, setEmail] = useState('user@gmail.com')
	const [password, setPassword] = useState('11111111')
	const [cpassword, setCpassword] = useState('11111111')
	const [tel, setTel] = useState('0896675477')
	const [home_id, setHomeId] = useState('1')
	const [mu, setMu] = useState('12/23')
	const [tambon, setTambon] = useState('')
	const [amphure, setAmphure] = useState('')
	const [city, setCity] = useState('')
	const [zip_id, setZipId] = useState('')


	const [provinces, setProvinces] = useState({});
	const [a, setA] = useState({});
	const [t, setT] = useState({});
	const [z, setZ] = useState({});

	let [_CITY,_setCITY] = useState('')
	let [_AMPHURE,_setAMPHURE] = useState('');


	useEffect(() => {
		getCity()
	}, []);

	const getCity = async () => {
		try {
			const response = await Axios.get('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json');
			if (response.status === 200 && Array.isArray(response.data)) {
				setProvinces(response.data);
			}
		} catch (error) {
		}
	};

	const onChangeProvince = async (e) => {
		setCity(e)
		const res = await Axios.get('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json');
		const setAm = []
		for (let i = 0; i < res.data.length; i++) {
			if (e == res.data[i].province_id) {
				setAm.push(res.data[i])
				setCITY(res.data[i].province_id)
				console.log(res.data[i].province_id)
			}
		}

		setA(setAm)
		setT('')
		// console.log(res.data[2].province_id)
	}
	function setCITY(i){
		_setCITY(provinces[i-1].name_th)
	}

	const onChangeAmphure = async (e) => {
		setAmphure(e)
		const res = await Axios.get('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json');
		const set = []
		for (let i = 0; i < res.data.length; i++) {
			if (e == res.data[i].amphure_id) {
				set.push(res.data[i])
				console.log(e, res.data[i].amphure_id)
				setZ(res.data[i])
			}
		}
		setT(set)

	}





	const onChangeTambon = async (e) => {
		setTambon(e)
		const res = await Axios.get('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json');
		for (let i = 0; i < res.data.length; i++) {
			if (e == res.data[i].id) {
				setZipId(res.data[i].zip_code)
			}
		}
	}

	// register user
	const handleSubmit = async (e) => {
		e.preventDefault();

		let _a,_t
		for (let j=0;j<a.length;j++){
			if (a[j].id == amphure){
				_a = a[j].name_th
				break
			}
		}
		for (let j=0;j<t.length;j++){
			if (t[j].id == tambon){
				_t = t[j].name_th
				break
			}
		}
		const body = {
			prefix,
			name,
			email,
			password,
			password_confirmation: cpassword,
			tel,
			home_id,
			mu,
			tambon: _t,
			amphure: _a,
			city:_CITY,
			zip_id,
		};

		Swal.fire({
			title: "ยืนยันข้อมูล ?",
			showCancelButton: true,
			confirmButtonText: "Save",
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					const resp = await axios.post('/register', body);
					if (resp.status === 200) {
						setUser(resp.data.user);
						return <Navigate to="/get_users"/>;
					}
				} catch (error) {
					if (error.response.status === 422) {
						console.log(error.response.data.errors);
					}
					Swal.fire({
						icon: 'error',
						title: 'ข้อผิดพลาด',
						confirmButtonText: 'ตกลง'
					})
				}
			}
		});


	};



	return (
		<section className={'container mt-5'}>
			<div className={'row'}>
				<div className={'col-12'}>
					<div className={'card'}>
						<div className={'card-header'}>
							<span className={'card-title fw-bold'}>สมัครสมาชิก</span>
						</div>
						<div className={'card-body'}>
							<div className={'row'}>
								<form action="#" method="post" onSubmit={handleSubmit}>
									<div className={'col-lg-12'}>
										<div className={'row'}>

											<div className={'form-group col-lg-6'}>
												<label htmlFor="prefix">คำนำหน้า</label>
												<select className={'form-control'} name="prefix" id="prefix" value={prefix} onChange={(e)=>setPrefix(e.target.value)}>
													<option value="นาย">นาย</option>
													<option value="นาง">นาง</option>
													<option value="นางสาว">นางสาว</option>
												</select>
											</div>

											<div className={'form-group col-lg-6'}>
												<label htmlFor="name">ชื่อ - นามสกุล</label>
												<input type="text" value={name}
													   onChange={(e) => setName(e.target.value)} name="name"
													   id="name" placeholder="กรอกชื่อ-นามสกุล" className={'form-control'}
													   required/>
											</div>

											<div className={'form-group col-lg-6'}>
												<label htmlFor="tel">เบอร์โทรศัพท์</label>
												<input type="text" value={tel} onChange={(e) => setTel(e.target.value)}
													   name="tel" id="tel"
													   placeholder="กรอกเบอร์โทรศัพท์" className={'form-control'} required/>
											</div>

											<div className={'form-group col-lg-6'}>
												<label htmlFor="home_id">บ้านเลขที่</label>
												<input type="text" value={home_id}
													   onChange={(e) => setHomeId(e.target.value)}
													   name="home_id" id="home_id" className={'form-control'}
													   placeholder="กรอกบ้านเลขที่" required/>
											</div>

											<div className={'form-group col-lg-6'}>
												<label htmlFor="mu">หมู่ที่</label>
												<input type="text" value={mu} onChange={(e) => setMu(e.target.value)}
													   name="mu" id="mu"
													   placeholder="กรอกหมู่ที่" className={'form-control'} required/>
											</div>

											<div className={'form-group col-lg-6'}>
												<label htmlFor="city">จังหวัด</label>
												{provinces.length > 0 ? (
													<select className={'form-control'} name="city" id="city" value={city} onChange={(e) => onChangeProvince(e.target.value)}>
														<option value="">กรุณาเลือก</option> {/* Option ว่าง */}
														{provinces.map((province) => (
															<option key={province.id} value={province.id}>
																{province.name_th}
															</option>
														))}
													</select>
												) : (<p>Loading provinces...</p>)}
											</div>

											<div className={city ? 'form-group col-lg-6' : 'd-none'}>
												<label htmlFor="amphure">อำเภอ</label>
												{a.length > 0 ? (
													<select className={'form-control'} name="amphure" id="amphure" value={amphure} onChange={(e) => onChangeAmphure(e.target.value)}>
														<option value="">กรุณาเลือก</option> {/* เพิ่ม option ว่าง */}
														{a.map((a) => (
															<option key={a.id} value={a.id}>
																{a.name_th}
															</option>
														))}
													</select>
												) : (<p>Loading amphures...</p>)}

											</div>

											<div className={amphure ? 'form-group col-lg-6' : 'd-none'}>
												<label htmlFor="tambon">ตำบล</label>
												{t.length > 0 ? (
													<select className={'form-control'} name="tambon" id="tambon" value={tambon} onChange={(e) => onChangeTambon(e.target.value)}>
														<option value="">กรุณาเลือก</option> {/* เพิ่ม option ว่าง */}
														{t.map((t) => (
															<option key={t.id} value={t.id}>
																{t.name_th}
															</option>
														))}
													</select>
												) : (<p>Loading tambons...</p>)}
											</div>


											<div className={tambon ? 'form-group col-lg-6' : 'd-none'}>
												<label htmlFor="zip_id">รหัสไปรษณีย์</label>
												<input type="text" value={zip_id}
													   onChange={(e) => setZipId(e.target.value)}
													   className={'form-control'} name="zip_id" id="zip_id"
													   placeholder="zip_id" required readOnly={true}/>
											</div>

											<div className={'form-group col-lg-6'}>
												<label htmlFor="email">อีเมล</label>
												<input type="email" value={email}
													   onChange={(e) => setEmail(e.target.value)} name="email"
													   id="email" placeholder="name@company.com"
													   className={'form-control'} required/>
											</div>


											<div className={'form-group col-lg-6'}>
												<label htmlFor="password">รหัสผ่าน</label>
												<input type="password" value={password}
													   onChange={(e) => setPassword(e.target.value)}
													   name="password" id="password" className={'form-control'}
													   placeholder="••••••••" required/>
											</div>

											<div className={'form-group col-lg-6 mb-3'}>
												<label htmlFor="cpassword">ยืนยันรหัสผ่าน</label>
												<input type="password" value={cpassword}
													   onChange={(e) => setCpassword(e.target.value)}
													   name="cpassword" id="cpassword" className={'form-control'}
													   placeholder="••••••••" required/>
											</div>
										</div>
									</div>


									<button type="submit" className={'btn btn-primary w-100 mb-3'}>สมัคร</button>
									<p className={'text-center'}>
										มีบัญชีอยู่แล้ว? <Link to="/">เข้าสู่ระบบ</Link>
									</p>
								</form>
							</div>
						</div>
					</div>

				</div>
			</div>
		</section>
	);
}
