import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        isActive: ''
    });
    const [acc, setAcc] = useState({
        isActive: ''
    })

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


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const header = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
        try {
            const response = await axios.patch('/api/profile', formData, header);
            console.log("Data update successful");
            window.location.reload();
        } catch (error) {
            console.log("Data update failed: " + error)
        }
    }

    const changeAcc = async (e) => {
        e.preventDefault();
        const header = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
        try {
            const updatedAcc = { ...acc, isActive: userData.isActive === 0 ? 1 : 0 };
            setAcc(updatedAcc);
            const response = await axios.patch('/api/profile/activity', updatedAcc, header);
            window.location.reload();
        } catch (error) {
            console.log("Activity update failed: " + error)
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
                                <td>{userData.firstName}</td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td>{userData.lastName}</td>
                            </tr>
                            <tr>
                                <td>Account status</td>
                                <td>{userData.isActive}</td>
                            </tr>
                        </table>
                        <form onSubmit={handleSubmit}>
                            <h2>Update your data:</h2>
                            <input type="text" name="firstName"
                                value={formData.firstName} onChange={handleChange}
                                required placeholder="Enter new first name" /><br />
                            <input type="text" name="lastName"
                                value={formData.lastName} onChange={handleChange}
                                required placeholder="Enter new last name" /><br />
                            <button type="submit">Update</button>
                        </form>
                        <br />
                        <button
                            type="button"
                            style={userData.isActive === 1 ? { background: 'red' } : { background: '#4caf50' }}
                            onClick={changeAcc}>
                            {userData.isActive === 1 ? "Deactivate" : "Activate"}
                        </button>
                    </div>
                ) : (
                    <p>Loading user data</p>
                )
            }

        </div>
    )
}
export default Profile;