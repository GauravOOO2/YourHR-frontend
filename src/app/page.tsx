'use client';
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import bcrypt from 'bcryptjs';
import CryptoJS from 'crypto-js';


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const router = useRouter();

 

    const handleFetch = async () => {
        const url = process.env.NEXT_PUBLIC_LOGIN_URL;
    
        if (!username || !password) {
            setErrorMessage("Username and password are required.");
            return;
        }
    
        // Hash the password before sending
        // const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    
        const body = { 
            username, 
            password  // Send hashed password
        };
    
        try {
            console.log('Sending data:', body);
    
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
    
            console.log('Response status:', response.status);
    
            if (!response.ok) {
                if (response.status === 400) {
                    setErrorMessage("Username or password is incorrect.");
                } else {
                    setErrorMessage("Network error. Please try again.");
                }
                return;
            }
    
            const data = await response.json();
            console.log('Success:', data);
    
            if (data.token) {
                localStorage.setItem('username', username);
                localStorage.setItem('authToken', data.token);
                setErrorMessage("");
                setSuccessMessage("Login successful! Redirecting...");
                setTimeout(() => {
                    router.push('/MainPage');
                }, 1000);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage("Network error. Please try again.");
        }
    };
    
    
    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Login</h1>
                <div className='flex flex-col'>
                    <input 
                        type="text" 
                        className="mb-4 border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:border-blue-500" 
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                    <input 
                        type="password" 
                        className="mb-4 border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:border-blue-500" 
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <button 
                    onClick={handleFetch} 
                    className="w-full py-3 bg-blue-500 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 transition duration-300">
                    Login
                </button>
                {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
                {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}
                <p className="text-center mt-6">
                    Don't have an account? <Link className="text-blue-500 font-semibold" href="./Signup">Signup Here</Link>
                </p>
            </div>
        </div>
    );
}
