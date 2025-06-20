import { useState } from 'react';
import { addVehicle } from '../services/api';
import styles from './AddVehicle.module.css';

const AddVehicle = () => {
  const [formData, setFormData] = useState({ name: '', capacityKg: '', tyres: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await addVehicle(formData);
      setMessage('✅ Vehicle added successfully!');
      setFormData({ name: '', capacityKg: '', tyres: '' });
    } catch (err) {
      setMessage('❌ Error: ' + (err?.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Add Vehicle</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input name="name" placeholder="Vehicle Name" value={formData.name} onChange={handleChange} required className={styles.input} />
        <input name="capacityKg" type="number" placeholder="Capacity (kg)" value={formData.capacityKg} onChange={handleChange} required className={styles.input} />
        <input name="tyres" type="number" placeholder="Tyres" value={formData.tyres} onChange={handleChange} required className={styles.input} />
        <button type="submit" className={styles.button}>Add Vehicle</button>
      </form>
      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
};

export default AddVehicle;
