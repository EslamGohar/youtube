import { useState } from "react";
import axios from "axios";
import Axios from "../pages/api/axios";
import styles from "../styles/Add.module.css";

const AddNewProduct = ({ setClose }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  // Handling multiple inputs with a single handler
  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  // Setting state based on previous state
  const handleExtra = () => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  // Creating new product with uploading image by Cloudinary
  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dheizt4my/image/upload",
        data
      );
      const { url } = uploadRes.data;
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
      };

      await Axios.post("/products", newProduct);
      setClose(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span className={styles.close} onClick={() => setClose(true)}>
          X
        </span>
        <h1>Add a new Pizza</h1>
        <div className={styles.item}>
          <label htmlFor="image" className={styles.label}>
            Choose an image
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <input
            type="text"
            placeholder="Enter item name"
            className={styles.input}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor="desc" className={styles.label}>
            Description
          </label>
          <textarea
            rows={4}
            type="text"
            placeholder="Describe the item..."
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <div className={styles.item}>
          <label htmlFor="prices" className={styles.label}>
            Prices
          </label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Low"
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Medium"
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="High"
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>

        <div className={styles.item}>
          <label className={styles.label}>Extra</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="text"
              placeholder="Item"
              name="text"
              onChange={handleExtraInput}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleExtraInput}
            />
            <button className={styles.extraButton} onClick={handleExtra}>
              Add
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions.map((option) => (
              <span key={option.text} className={styles.extraItem}>
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <button className={styles.addButton} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default AddNewProduct;
