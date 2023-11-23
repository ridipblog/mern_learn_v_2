import { useEffect, useState } from 'react';
import axios from "axios";
const Profile = () => {
    const [user, setUser] = useState('');
    const logout = async () => {
        const data = await axios.get("http://localhost:4000/logout", {
            withCredentials: true
        });
    }
    useEffect(() => {
        const getUser = async () => {
            const get_user = await axios.get("http://localhost:4000/login/success", {
                withCredentials: true
            });
            if (get_user.data.success) {
                setUser(get_user.data.user.emails[0].value);
            }
        }
        getUser();
    })
    return (
        <div>
            {
                user ? (
                    <>
                        <p>{user}</p>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    "No Data"
                )
            }

        </div >
    )
}
export default Profile;