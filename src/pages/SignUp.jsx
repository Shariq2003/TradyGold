import React from 'react';

function SignUp() {
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <form className="space-y-4">
                <div>
                    <label className="block mb-2 font-semibold">Full Name:</label>
                    <input
                        type="text"
                        name="name"
                        className="border p-2 w-full rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 font-semibold">Email:</label>
                    <input
                        type="email"
                        name="email"
                        className="border p-2 w-full rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 font-semibold">Password:</label>
                    <input
                        type="password"
                        name="password"
                        className="border p-2 w-full rounded-md"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignUp;
