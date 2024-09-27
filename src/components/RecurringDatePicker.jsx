import React, { useState, useEffect } from 'react';
import './RecurringDatePicker.css';

const RecurringDatePicker = () => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    recurrence: 'Daily',
    every: 1
  });
  const [previewDates, setPreviewDates] = useState([]);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  
  const generateRecurringDates = () => {
    const recurrenceType = formData.recurrence;
    const every = parseInt(formData.every);
    const startDate = new Date(formData.startDate);
    const endDate = formData.endDate ? new Date(formData.endDate) : null;
    let dates = [];

    if (isNaN(startDate.getTime()) || (!isNaN(endDate) && startDate > endDate)) {
      return [];
    }

    const currentDate = new Date(startDate);
    
    while (!endDate || currentDate <= endDate) {
      dates.push(new Date(currentDate).toLocaleDateString());
      
      switch (recurrenceType) {
        case 'Daily':
          currentDate.setDate(currentDate.getDate() + every);
          break;
        case 'Weekly':
          currentDate.setDate(currentDate.getDate() + every * 7);
          break;
        case 'Monthly':
          currentDate.setMonth(currentDate.getMonth() + every);
          break;
        case 'Yearly':
          currentDate.setFullYear(currentDate.getFullYear() + every);
          break;
        default:
          break;
      }
      
      if (!endDate) break;
    }
    return dates;
  };

  useEffect(() => {
    const dates = generateRecurringDates();
    setPreviewDates(dates);
  }, [formData]);

  return (
    <div className="recurring-date-picker">
      <div className="date-picker">
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleInputChange}
          placeholder="Start Date"
        />
      </div>

      <div className="recurrence-options">
        <label htmlFor="recurrence">Recurrence:</label>
        <select
          name="recurrence"
          value={formData.recurrence}
          onChange={handleInputChange}
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>

        <label htmlFor="every">Every:</label>
        <input
          type="number"
          name="every"
          value={formData.every}
          onChange={handleInputChange}
          min="1"
        />
        <span>{formData.recurrence.toLowerCase()}</span>
      </div>

      <div className="date-range">
        <label htmlFor="endDate">End Date (optional):</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleInputChange}
          placeholder="End Date"
        />
      </div>

      <div className="preview">
        <h4>Preview:</h4>
        <ul>
          {previewDates.length > 0 ? previewDates.map((date, index) => (
            <li key={index}>{date}</li>
          )) : <li>No dates selected</li>}
        </ul>
      </div>
    </div>
  );
};

export default RecurringDatePicker;
