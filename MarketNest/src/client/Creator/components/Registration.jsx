import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Registration = () => {
    const navigate = useNavigate();
    const formRefs = {
        username: useRef(null),
        email: useRef(null),
        password: useRef(null),
        confirmPassword: useRef(null),
        phoneNumber: useRef(null),
        agreeToTerms: useRef(null)
    };

    const [errors, setErrors] = useState({});

    const postData = async (serverData) => {
        try {
            const response = await axios.post("server/creators/register", serverData);
            console.log(response.data.message);
            return response.data;
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            username: formRefs.username.current.value,
            email: formRefs.email.current.value,
            password: formRefs.password.current.value,
            confirmPassword: formRefs.confirmPassword.current.value,
            phoneNumber: formRefs.phoneNumber.current.value,
            agreeToTerms: formRefs.agreeToTerms.current.checked
        };
        const serverData = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            phonenumber: formData.phoneNumber
        };

        const newErrors = validateForm(formData);

        if (Object.keys(newErrors).length === 0) {
            try {
                await postData(serverData);
                // Reset form fields
                Object.values(formRefs).forEach(ref => {
                    if (ref.current.type === 'checkbox') {
                        ref.current.checked = false;
                    } else {
                        ref.current.value = '';
                    }
                });
                setErrors({});
                navigate('../creators/login'); // Redirect to login page after successful registration
            } catch (error) {
                setErrors({ submit: "Registration failed. Please try again." });
            }
        } else {
            setErrors(newErrors);
        }
    };

    const validateForm = (formData) => {
        let newErrors = {};
        if (!formData.username.trim()) newErrors.username = "Username is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
        if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms and conditions";

        return newErrors;
    };

    return (
        <div className="max-w-md mx-auto mt-40 p-6 bg-transparent rounded-lg shadow-lg text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">Creators Account</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block mb-1 font-medium">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        ref={formRefs.username}
                        className="w-full bg-transparent px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    />
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                </div>
                <div>
                    <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        ref={formRefs.email}
                        className="w-full bg-transparent px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="password" className="block mb-1 font-medium">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        ref={formRefs.password}
                        className="w-full bg-transparent px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block mb-1 font-medium">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        ref={formRefs.confirmPassword}
                        className="w-full bg-transparent px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
                <div>
                    <label htmlFor="phoneNumber" className="block mb-1 font-medium">Phone Number</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        ref={formRefs.phoneNumber}
                        className="w-full bg-transparent px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="agreeToTerms"
                        name="agreeToTerms"
                        ref={formRefs.agreeToTerms}
                        className="mr-2"
                    />
                    <label htmlFor="agreeToTerms" className="font-medium">I agree to the terms and conditions for sellers</label>
                </div>
                {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>}
                {errors.submit && <p className="text-red-500 text-sm mt-1">{errors.submit}</p>}
                <div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-transparent text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Create Seller Account
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Registration;