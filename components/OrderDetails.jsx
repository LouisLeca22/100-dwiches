import { useState } from 'react';
import styles from '../styles/OrderDetails.module.css';
const OrderDetails = ({ total, createOrder }) => {
  const [customer, setCustomer] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState("")
  const handleClick = () => {
    createOrder({customer, address, phone, total, method: 0})
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>
          Vous devrez payer {total} € lors de la livraison
        </h1>
        <div className={styles.item}>
          <label className={styles.label}>Nom Prénom</label>
          <input
            onChange={(e) => setCustomer(e.target.value)}
            type='text'
            placeholder='Jules César'
            className={styles.input}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Numéro de téléphone</label>
          <input
            onChange={(e) => setPhone(e.target.value)}
            type='text'
            placeholder='0620220022'
            className={styles.input}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Adresse</label>
          <input
            onChange={(e) => setAddress(e.target.value)}
            type='text'
            placeholder='12 rue de la République, 75001 Paris'
            className={styles.input}
          />
        </div>
        <button className={styles.button} onClick={handleClick}>
          Commander
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
