import React from 'react';

const testimonials = [
    {
        name: 'Amit Sharma',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        feedback: 'TradyGold made gold trading so simple! The AI predictions are highly accurate.',
    },
    {
        name: 'Priya Verma',
        image: 'https://randomuser.me/api/portraits/women/45.jpg',
        feedback: 'I’ve seen great returns using TradyGold. Highly recommend it for new investors!',
    },
    {
        name: 'Rajesh Kumar',
        image: 'https://randomuser.me/api/portraits/men/65.jpg',
        feedback: 'A reliable platform with excellent insights. The prediction accuracy is remarkable.',
    },
];

const TestimonialsSection = () => {
    return (
        <section id="testimonials" className="bg-gray-900 text-white py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12">
                    What Our <span className="text-yellow-500">Users</span> Say
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-gray-800 p-8 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                            <div className="flex items-center mb-6">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-16 h-16 rounded-full border-4 border-yellow-500 mr-4"
                                />
                                <div>
                                    <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                                    <p className="text-gray-400">Verified User</p>
                                </div>
                            </div>
                            <p className="text-gray-300">“{testimonial.feedback}”</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
