export const fetchUserData = async () => {
    try {
        const response = await axios.get('http://localhost:5500/profile', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUserData(response.data);
    } catch (err) {
        console.log('Error Fetching user profile data: ' + err);
        navigate('/login');
        window.location.reload();
    }
};