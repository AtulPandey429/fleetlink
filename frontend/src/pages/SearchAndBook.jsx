import { useState } from 'react';
import { getAvailableVehicles, bookVehicle } from '../services/api';
import VehicleCard from '../components/VehicleCard';
import styles from './SearchAndBook.module.css';

const SearchAndBook = () => {
  const [formData, setFormData] = useState({
    capacityRequired: '',
    fromPincode: '',
    toPincode: '',
    startTime: '',
  });
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setMessage('');
    setResults([]);
    try {
      const { data } = await getAvailableVehicles(formData);
      setResults(data);
      if (data.length === 0) {
        setMessage('No vehicles available for the selected criteria.');
      }
    } catch (err) {
      setMessage('Error: ' + (err?.response?.data?.message || 'Unknown error'));
    }
  };

  const handleBooking = async (vehicleId) => {
    try {
      await bookVehicle({
        vehicleId,
        fromPincode: formData.fromPincode,
        toPincode: formData.toPincode,
        startTime: formData.startTime,
        customerId: 'customer-001',
      });
      setMessage('✅ Booking successful!');
      setResults([]);
    } catch (err) {
      setMessage('Booking failed: ' + (err?.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Search & Book Vehicle</h2>

      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="number"
          name="capacityRequired"
          placeholder="Capacity Required (kg)"
          value={formData.capacityRequired}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          name="fromPincode"
          placeholder="From Pincode"
          value={formData.fromPincode}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          name="toPincode"
          placeholder="To Pincode"
          value={formData.toPincode}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          type="datetime-local"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Search Availability</button>
      </form>

      {message && <p className={styles.message}>{message}</p>}

      <div className={styles.vehicleGrid}>
        {results.map(vehicle => (
          <VehicleCard
            key={vehicle._id}
            vehicle={vehicle}
            onBook={() => handleBooking(vehicle._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchAndBook;
