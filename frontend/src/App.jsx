import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import AddVehicle from './pages/AddVehicle';
import SearchAndBook from './pages/SearchAndBook';
import MyBookings from './pages/MyBookings';
import styles from './App.module.css';

function App() {
  return (
    <Router>
      <header className={styles.headerBar}>
        <div className={styles.headerLogo}>🚚 FleetLink</div>
        <nav className={styles.headerNav}>
        <NavLink
  to="/"
  end
  className={({ isActive }) => isActive ? styles.headerActive : styles.headerLink}
>
  Add Vehicle
</NavLink>

<NavLink
  to="/search"
  className={({ isActive }) => isActive ? styles.headerActive : styles.headerLink}
>
  Search & Book
</NavLink>
        <NavLink
          to="/my-bookings"
          className={({ isActive }) => isActive ? styles.headerActive : styles.headerLink}
        >
          My Bookings
        </NavLink>
        </nav>
      </header>

      <main className={styles.mainArea}>
        <Routes>
          <Route path="/" element={<AddVehicle />} />
          <Route path="/search" element={<SearchAndBook />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
