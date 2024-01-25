import React from 'react';
import {useAuth} from '../contexts/AuthContext';

export default function Profile() {
    const {user} = useAuth();
    return (<>
            <div className="text-6xl font-bold text-slate-600">ข้อมูลส่วงนตัว</div>
            <hr className="bg-slate-400 h-1 w-full my-4"/>
            <div className="block p-10 bg-white border border-gray-200 shadow-xl rounded-lg shadowdark:border-gray-700">
                <h5 className="my-2 text-2xl font-bold tracking-tight">
                    ชื่อ-นามสกุล: {user.prefix} {user.name}
                </h5>
				<h5 className="my-2 text-2xl font-bold tracking-tight">
					ที่อยู่: บ้านเลขที่ : {user.home_id} หมู่ : {user.mu} ตำบล : {user.tambon} อำเภอ : {user.amphure} จังหวัด : {user.city} รหัสไปรษณีย์ : {user.zip_id}
				</h5>
                <p className="font-normal text-gray-700">อีเมล: {user.email}</p>
                <p className="font-normal text-gray-700">
                    สร้างเมื่อ: {user.created_at}
                </p>
            </div>
        </>);
}
