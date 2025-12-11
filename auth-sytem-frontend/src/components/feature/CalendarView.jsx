import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CalendarView = ({ onDateChange, initialDate = null }) => {

    const [date, setDate] = useState(initialDate);

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
        if (onDateChange) {
            onDateChange(selectedDate);
        }
    };

    return (
        <div className="">
            <DatePicker
                selected={date}
                onChange={handleDateChange}
                inline
                className='custom-datepicker'
            />
        </div>
    )
}

export default CalendarView