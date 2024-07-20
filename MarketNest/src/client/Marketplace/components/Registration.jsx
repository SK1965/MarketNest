import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate()
  const formRefs = {
    firstName: useRef(null),
    lastName: useRef(null),
    email: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
    phoneNumber: useRef(null),
    address: useRef(null),
    city: useRef(null),
    state: useRef(null),
    zipCode: useRef(null),
    country: useRef(null),
    agreeToTerms: useRef(null)
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = {
      firstName: formRefs.firstName.current.value,
      lastName: formRefs.lastName.current.value,
      email: formRefs.email.current.value,
      password: formRefs.password.current.value,
      confirmPassword: formRefs.confirmPassword.current.value,
      phoneNumber: formRefs.phoneNumber.current.value,
      address: formRefs.address.current.value,
      city: formRefs.city.current.value,
      state: formRefs.state.current.value,
      zipCode: formRefs.zipCode.current.value,
      country: formRefs.country.current.value,
      agreeToTerms: formRefs.agreeToTerms.current.checked
    };
    const dbData = {
      firstname: formRefs.firstName.current.value,
      lastname: formRefs.lastName.current.value,
      email: formRefs.email.current.value,
      password: formRefs.password.current.value,
      phone: formRefs.phoneNumber.current.value,
      address: formRefs.address.current.value,
      city: formRefs.city.current.value,
      state: formRefs.state.current.value,
      zipcode: formRefs.zipCode.current.value,
      country: formRefs.country.current.value,
    };
    
    
    const newErrors = validateForm(formData);

    if (Object.keys(newErrors).length === 0) {
      try{
        const response = await axios.post("/server/marketplace/register" ,dbData)
        if (response.data.message ==="User added successfully"){
          navigate("../marketplace/login")
        }
        
      }catch(e){}
      // Reset form fields
      Object.values(formRefs).forEach(ref => {
        if (ref.current.type === 'checkbox') {
          ref.current.checked = false;
        } else {
          ref.current.value = '';
        }
      });
    } else {
      setErrors(newErrors);
    }
  };

  const validateForm = (formData) => {
    let newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms and conditions";

    return newErrors;
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-transparent rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Create Your Account</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block mb-1 font-medium">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              ref={formRefs.firstName}
              className="w-full bg-transparent  px-3 py-2 border rounded-lg focus:outline-none  focus:ring focus:border-blue-300"
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-1 font-medium">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              ref={formRefs.lastName}
              className="w-full bg-transparent px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
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
        <div>
          <label htmlFor="address" className="block mb-1 font-medium">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            ref={formRefs.address}
            className="w-full bg-transparent px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block mb-1 font-medium">City</label>
            <input
              type="text"
              id="city"
              name="city"
              ref={formRefs.city}
              className="w-full bg-transparent px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>
          <div>
            <label htmlFor="state" className="block mb-1 font-medium">State</label>
            <input
              type="text"
              id="state"
              name="state"
              ref={formRefs.state}
              className="w-full bg-transparent px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="zipCode" className="block mb-1 font-medium">ZIP Code</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              ref={formRefs.zipCode}
              className="w-full bg-transparent px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
          </div>
          <div>
            <label htmlFor="country" className="block mb-1 font-medium">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              ref={formRefs.country}
              className="w-full bg-transparent px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="agreeToTerms"
            name="agreeToTerms"
            ref={formRefs.agreeToTerms}
            className="mr-2 bg-transparent"
          />
          <label htmlFor="agreeToTerms" className="font-medium">I agree to the terms and conditions</label>
        </div>
        {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>}
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-transparent text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
