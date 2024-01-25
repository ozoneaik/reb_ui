import {useEffect, useState} from "react";
import axios from "../axios.js";
import {useAuth} from "../contexts/AuthContext.jsx";


export default function UserList() {

    const [users, setUsers] = useState({});
    const { user } = useAuth();


    useEffect(() => {
        get_user_detail().then(r => {
            console.log('helo')
        })
    }, []);

    const get_user_detail= async ()=>{
        const res = await axios.get(`/user-list`);
        try {
            if (res.status === 200){
                setUsers(res.data)
            }else{
                console.log('not success')
            }
        }catch (e){
            console.log(e)
        }

    }

    return (
        <div className={'container mt-5'}>
            <div className={'row'}>
                <div className={'col-lg-12'}>
                    <div className={'card'}>
                        <div className={'card-header'}>
                            <h6 className={'card-title'}>ผู้ใช้งานทั้งหมด</h6>
                        </div>
                        <div className={'card-body'}>
                            <div className={'row'}>
                                <div className={'col-lg-12'}>
                                    <table className={'table table-bordered'}>
                                        <thead>
                                        <tr>
                                            <th>ลำดับที่</th>
                                            <th>ชื่อ นามสกุล</th>
                                            <th>เบอร์โทร</th>
                                            <th>Email</th>
                                            <th>ที่อยู่</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {users.length > 0 ? users.map((user,index)=>(
                                            <tr>
                                                <td>{user.id}</td>
                                                <td>{user.prefix} {user.name}</td>
                                                <td>{user.tel}</td>
                                                <td>{user.email}</td>
                                                <td>บ้านเลขที่ {user.home_id} หมู่ที่ {user.mu} ตำบล {user.tambon}  อำเภอ {user.amphure} จังหวัด {user.city} รหัสไปรษณีย์ {user.zip_id}</td>

                                            </tr>
                                        )) : (
                                            <div>no data</div>
                                        )}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </div>
    )
}