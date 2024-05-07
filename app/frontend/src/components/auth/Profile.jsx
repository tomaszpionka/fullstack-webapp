import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null)

    useEffect(() => {

        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://161.35.30.62:5500/profile', {
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
    }, [])



    return (
        <div className="profile-container">

            {
                userData ? (
                    <div>
                        <h2>Your User name is: {userData.username}</h2>
                    </div>
                ) : (
                    <p>Loading user data</p>
                )
            }

        </div>
    )
}
export default Profile;