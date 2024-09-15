import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface BookingFormValues {
    firstName: string;
    lastName: string;
    email: string;
    guests: number;
    date: string;
    time: string;
    occasion: string;
}

interface BookingFormProps {
    availableTimes: string[];
    initializeTimes: () => void;
    updateTimes: (date: Date) => void;
    submitForm: (values: BookingFormValues) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ availableTimes, initializeTimes, updateTimes, submitForm }) => {
    const initialValues: BookingFormValues = {
        firstName: '',
        lastName: '',
        email: '',
        guests: 1,
        date: '',
        time: '',
        occasion: '',
    };

    useEffect(() => {
        initializeTimes();
    }, [initializeTimes]);

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        guests: Yup.number()
            .typeError('Number of Guests must be a valid number')
            .integer('Number of Guests must be an integer')
            .min(1, 'Number of Guests must be at least 1')
            .max(10, 'Number of Guests can be maximum 10')
            .required('Number of Guests is required'),
        date: Yup.date().required('Date is required'),
        time: Yup.string().required('Time is required'),
        occasion: Yup.string().required('Occasion is required'),
    });

    const handleSubmit = (values: BookingFormValues) => {
        submitForm(values);
    };

    const renderField = (
        name: keyof BookingFormValues,
        label: string,
        type: string = 'text',
        component: 'input' | 'select' = 'input',
        options?: { value: string; label: string }[]
    ) => (
        <div className="mb-4">
            <label htmlFor={name} className="block mb-2">
                {label}
            </label>
            <Field
                as={component}
                id={name}
                name={name}
                type={type}
                className="w-full px-3 py-2 border border-gray-300 rounded"
            >
                {options && options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Field>
            <ErrorMessage name={name} component="div" className="text-red-500" />
        </div>
    );

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form className="max-w-md mx-auto">
                {renderField('firstName', 'First Name')}
                {renderField('lastName', 'Last Name')}
                {renderField('email', 'Email', 'email')}
                {renderField('guests', 'Number of Guests', 'number')}
                {renderField('date', 'Choose Date', 'date')}
                {renderField('time', 'Choose Time', 'select', 'select', availableTimes.map(time => ({ value: time, label: time })))}
                {renderField('occasion', 'Occasion', 'select', 'select', [
                    { value: '', label: 'Select Occasion' },
                    { value: 'Birthday', label: 'Birthday' },
                    { value: 'Anniversary', label: 'Anniversary' },
                ])}
                <div className="text-center">
                    <button
                        type="submit"
                        className="px-4 py-2 my-4 hover:scale-105 duration-200"
                    >
                        Make Your Reservation
                    </button>
                </div>
            </Form>
        </Formik>
    );
};

export default BookingForm;
