import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        country: '',
        profile_picture: null,
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            profile_picture: e.target.files[0],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append('username', formData.username);
        form.append('email', formData.email);
        form.append('password', formData.password);
        form.append('country', formData.country);
        if (formData.profile_picture) {
            form.append('profile_picture', formData.profile_picture);
        }

        axios.post('http://127.0.0.1:8000/api/register/', form)
            .then(() => navigate('/'))
            .catch((err) => setError(err.response.data));
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input type="file" name="profile_picture" onChange={handleFileChange} />
                </div>
                <button type="submit">Create Account</button>
            </form>
            {error && <div style={{ color: 'red' }}>{JSON.stringify(error)}</div>}
        </div>
    );
};

export default SignupPage;
