import {useEffect, useState} from "react";
import axios from "../axios.js";
import {useAuth} from "../contexts/AuthContext.jsx";


export default function History() {
    const [users, setUsers] = useState({});
    const { user } = useAuth();


    useEffect(() => {
        get_user_detail().then(r => {
            console.log('helo')
        })
    }, []);

    const get_user_detail= async ()=>{
        const res = await axios.get(`/history/${user.id}`);
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
                            <h6 className={'card-title'}>ประวัติการเข้าใช้งาน</h6>
                        </div>
                        <div className={'card-body'}>
                            <div className={'row'}>
                                <div className={'col-lg-12'}>
                                    <table className={'table table-bordered'}>
                                        <thead>
                                        <tr>
                                            <th>ลำดับ</th>
                                            <th>เข้าสู่ระบบเมื่อ</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {users.length > 0 ? users.map((user,index)=>(
                                            <tr>
                                                <td>{index+1}</td>
                                                <td>{user.created_at}</td>
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