import React from 'react';

const CTASection = () => {
    return (
        <section id="cta" className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-6">
                    Ready to Start Your Gold Investment Journey?
                </h2>
                <p className="text-lg mb-8">
                    Join thousands of investors using AI-powered predictions to make smarter decisions.
                </p>

                <div className="flex justify-center space-x-6">
                    <a
                        href="/signup"
                        className="px-8 py-3 text-lg font-semibold bg-white text-yellow-600 rounded-full shadow-lg hover:bg-gray-100 transition"
                    >
                        Sign Up Now
                    </a>
                    <a
                        href="/signin"
                        className="px-8 py-3 text-lg font-semibold bg-yellow-700 rounded-full shadow-lg hover:bg-yellow-800 transition"
                    >
                        Login
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
