import React, { useState, useEffect } from 'react';
import './BookingPage.css';
import BookingForm from '../../components/booking-form/BookingForm';
import { useNavigate } from 'react-router-dom';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    guests: number;
    date: string;
    time: string;
    occasion: string;
}

const BookingPage: React.FC = () => {
    const navigate = useNavigate();
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);

    useEffect(() => {
        initializeTimes();
    }, []);

    const initializeTimes = () => {
        const today = new Date();
        const times = fetchAPI(today);
        setAvailableTimes(times);
    };

    const updateTimes = (date: Date) => {
        const times = fetchAPI(date);
        setAvailableTimes(times);
    };

    const submitForm = (formData: FormData) => {
        const isSubmitted = submitAPI(formData);
        if (isSubmitted) {
            navigate('/confirmation-page');
        }
    };

    const seededRandom = (seed: number) => {
        const m = 2 ** 35 - 31;
        const a = 185852;
        let s = seed % m;
        return () => (s = (s * a) % m) / m;
    };

    const fetchAPI = (date: Date) => {
        const result: string[] = [];
        const random = seededRandom(date.getDate());

        for (let i = 17; i <= 23; i++) {
            if (random() < 0.5) {
                result.push(`${i}:00`);
            }
            if (random() < 0.5) {
                result.push(`${i}:30`);
            }
        }
        return result;
    };

    const submitAPI = (formData: FormData) => {
        console.log('Form Submitted:', formData); // For debugging purposes
        return true;
    };

    return (
        <section className="booking-page flex flex-col">
            <h1 className="text-4xl font-bold text-center mb-5">Reserve a Table</h1>
            <BookingForm
                availableTimes={availableTimes}
                initializeTimes={initializeTimes}
                updateTimes={updateTimes}
                submitForm={submitForm}
            />
        </section>
    );
};

export default BookingPage;
