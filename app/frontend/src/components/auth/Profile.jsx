import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: ''
    });

    useEffect(() => {

        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/profile', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setUserData(response.data);
            } catch (err) {
                console.log('Error Fetching user profile data: ' + err);
                navigate('/login');
                window.location.reload();
            }
        }

        fetchUserData();
    }, []);


    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData((prevData)=>({
            ...prevData,
            [name]: value,
        }))
    }


    const handleSubmit = async(e) =>{
        e.preventDefault();
        const header = {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }};
        try {
            const response = await axios.patch('/api/profile', formData, header );
            console.log("Data update successful");
            //navigate('/profile');
            window.location.reload();
        } catch (error) {
            console.log("Data update failed: " + error)
        }
    }


    return (
        <div className="profile-container">

            {
                userData ? (
                    <div>
                        <h2>Your User name is: {userData.username}</h2>
                        <table>
                            <tr>
                                <td>First Name</td>
                                <td>{userData.first_name}</td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td>{userData.last_name}</td>
                            </tr>
                        </table>
                        <form onSubmit={handleSubmit}>
                            <h2>Update your data:</h2>
                            <input type="text" name="first_name"
                            value={formData.first_name} onChange={handleChange}
                            required placeholder="Enter new first name"/><br/>
                            <input type="text" name="last_name"
                            value={formData.last_name} onChange={handleChange}
                            required placeholder="Enter new last name"/><br/>
                            <button type="submit">Update</button>
                        </form>
                    </div>
                ) : (
                    <p>Loading user data</p>
                )
            }

        </div>
    )
}
export default Profile;