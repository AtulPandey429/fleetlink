import styles from './VehicleCard.module.css';

const VehicleCard = ({ vehicle, onBook }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{vehicle.name}</h3>
      <p><strong>Capacity:</strong> {vehicle.capacityKg} kg</p>
      <p><strong>Tyres:</strong> {vehicle.tyres}</p>
      <p><strong>Estimated Duration:</strong> {vehicle.estimatedRideDurationHours} hrs</p>
      <button onClick={onBook} className={styles.button}>
        Book Now
      </button>
    </div>
  );
};

export default VehicleCard;
