import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './MyBookings.module.css';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  // Fetch all bookings from the server
  const fetchBookings = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookings`);
    setBookings(res.data);
    setFilteredBookings(res.data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Filter bookings by selected date range
  const filterByDate = () => {
    const filtered = bookings.filter((b) => {
      const bookingTime = new Date(b.startTime).getTime();
      const start = startDate ? new Date(startDate).getTime() : null;
      const end = endDate ? new Date(endDate + 'T23:59:59').getTime() : null;

      return (!start || bookingTime >= start) && (!end || bookingTime <= end);
    });

    setFilteredBookings(filtered);
  };

  // Cancel booking by ID
  const handleCancel = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/bookings/${id}`);
    setSelectedId(null);
    fetchBookings();
  };

  // Export bookings to CSV file
  const exportToCSV = () => {
    const data = filteredBookings.map((b) => ({
      Vehicle: b.vehicleId?.name,
      From: b.fromPincode,
      To: b.toPincode,
      Time: new Date(b.startTime).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet, 'Bookings');
    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    saveAs(new Blob([buffer]), 'bookings.xlsx');
  };

  // Export bookings to PDF file
  const exportToPDF = () => {
    const doc = new jsPDF();

    autoTable(doc, {
      head: [['Vehicle', 'From', 'To', 'Time']],
      body: filteredBookings.map((b) => [
        b.vehicleId?.name,
        b.fromPincode,
        b.toPincode,
        new Date(b.startTime).toLocaleString(),
      ]),
    });

    doc.save('bookings.pdf');
  };

return (
  <div className={styles.centerWrapper}>
    <h2 className={styles.heading}>My Bookings</h2>

    <div className={styles.filterBar}>
      <div className={styles.filterInputs}>
        <input type="date" onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" onChange={(e) => setEndDate(e.target.value)} />
      </div>

      <div
  style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  <button
    onClick={filterByDate}
    style={{
      backgroundColor: '#198754',
      color: '#fff',
      padding: '0.6rem 1.2rem',
      border: 'none',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '0.95rem',
      cursor: 'pointer',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      transition: 'background-color 0.2s ease-in-out',
    }}
    onMouseEnter={(e) => (e.target.style.backgroundColor = '#157347')}
    onMouseLeave={(e) => (e.target.style.backgroundColor = '#198754')}
  >
    Filter
  </button>

  <button
    onClick={exportToCSV}
    style={{
      backgroundColor: '#ffc107',
      color: '#212529',
      padding: '0.6rem 1.2rem',
      border: 'none',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '0.95rem',
      cursor: 'pointer',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      transition: 'background-color 0.2s ease-in-out',
    }}
    onMouseEnter={(e) => (e.target.style.backgroundColor = '#e0a800')}
    onMouseLeave={(e) => (e.target.style.backgroundColor = '#ffc107')}
  >
    Export CSV
  </button>

  <button
    onClick={exportToPDF}
    style={{
      backgroundColor: '#dc3545',
      color: '#fff',
      padding: '0.6rem 1.2rem',
      border: 'none',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '0.95rem',
      cursor: 'pointer',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      transition: 'background-color 0.2s ease-in-out',
    }}
    onMouseEnter={(e) => (e.target.style.backgroundColor = '#bb2d3b')}
    onMouseLeave={(e) => (e.target.style.backgroundColor = '#dc3545')}
  >
    Export PDF
  </button>
</div>
    </div>

    {filteredBookings.length === 0 ? (
      <p style={{ textAlign: 'center' }}>No bookings found.</p>
    ) : (
      <div className={styles.bookingGrid}>
        {filteredBookings.map((b) => (
          <div className={styles.card} key={b._id}>
            <h3>{b.vehicleId?.name}</h3>
            <p><strong>From:</strong> {b.fromPincode}</p>
            <p><strong>To:</strong> {b.toPincode}</p>
            <p><strong>Time:</strong> {new Date(b.startTime).toLocaleString()}</p>
            <button onClick={() => setSelectedId(b._id)}>Cancel</button>
          </div>
        ))}
      </div>
    )}

   {selectedId && (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}
  >
    <div
      style={{
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '400px',
        boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
        textAlign: 'center',
      }}
    >
      <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
        Are you sure you want to cancel this booking?
      </p>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button
          onClick={() => handleCancel(selectedId)}
          style={{
            padding: '0.6rem 1.2rem',
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#bb2d3b')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#dc3545')}
        >
          Yes
        </button>

        <button
          onClick={() => setSelectedId(null)}
          style={{
            padding: '0.6rem 1.2rem',
            backgroundColor: '#6c757d',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#5a6268')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#6c757d')}
        >
          No
        </button>
      </div>
    </div>
  </div>
)}

  </div>
);

};

export default MyBookings;
