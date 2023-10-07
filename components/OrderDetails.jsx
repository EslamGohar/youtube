import { useState } from "react";
import styles from "../styles/OrderDetails.module.css";

const OrderDetails = ({ total, createOrder, setClose }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");

  const handleClick = () => {
    createOrder({ customer, address, total, method: 0 });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span className={styles.close} onClick={() => setClose(true)}>
          X
        </span>
        <h1 className={styles.title}>You will pay $12 after delivery.</h1>
        <div className={styles.item}>
          <label htmlFor="surname" className={styles.label}>
            Surname
          </label>
          <input
            type="text"
            id="surname"
            placeholder="John Doe"
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Phone Number</label>
          <input
            type="text"
            placeholder="+1 234 567 89"
            className={styles.input}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor="address" className={styles.label}>
            Address
          </label>
          <textarea
            type="text"
            name="address"
            id="address"
            cols={30}
            rows={10}
            className={styles.textarea}
            placeholder="Elton St. 505 NY"
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>
        <button className={styles.button} onClick={handleClick}>
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
