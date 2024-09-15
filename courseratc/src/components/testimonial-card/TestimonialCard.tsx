import React from 'react';
import star from '../../img/star.png'
import './TestimonialCard.css';

interface User {
    name: string;
    image: string;
}

interface TestimonialCardProps {
    user: User;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ user }) => {
    return (
        <div className="testimonial-card flex flex-col p-4">
            <div className="flex stars">
                {Array(5).fill(null).map((_, index) => (
                    <img key={index} src={star} alt="star" />
                ))}
            </div>

            <div className="testimonial-user flex items-center my-3">
                <img src={user.image} alt={user.name} className="mr-5" />
                <h2 className="font-bold text-xl">{user.name}</h2>
            </div>

            <div>
                <p className="text-justify">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
                </p>
            </div>
        </div>
    );
};

export default TestimonialCard;
