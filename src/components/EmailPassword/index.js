import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles.scss";

import { auth } from "./../../firebase/utils";
import { sendPasswordResetEmail } from "firebase/auth";

import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';

const EmailPassword = () => {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const config = {
            url: 'http://localhost:3000/login'
        };
        try {
            await sendPasswordResetEmail(auth, email, config);
            alert("If your email is registered, you will receive a link to reset your password.");
            navigate('/login');
        } catch (error) {
            console.error("Error:", error);
            setErrors(['Email not found']);
        }
    };

    const configAuthWrapper = {
        headline: "Recover Password"
    };

    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className='formWrap'>
                {errors.length > 0 && (
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                )}
                <form onSubmit={handleFormSubmit}>
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={handleChange}
                    />
                    <Button type="submit">Reset Password</Button>
                </form>
            </div>
        </AuthWrapper>
    );
};

export default EmailPassword;
