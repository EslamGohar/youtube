import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image
            src="/img/telephone.png"
            alt="telephone-logo"
            width="32"
            height="32"
          />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW..</div>
          <div className={styles.text}>01234567893</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/" passHref>
            <li className={styles.listItem}>Homepage</li>
          </Link>
          <Link href="/products" passHref>
            <li className={styles.listItem}>Products</li>
          </Link>
          <Link href="/" passHref>
            <Image
              className={styles.listItem}
              src="/img/logo04.png"
              alt="main-logo"
              width="135px"
              height="88px"
            />
          </Link>
          <li className={styles.listItem}>Menu</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>
      <Link href={"/cart"} passHref>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image
              src="/img/cart.png"
              alt="cart-logo"
              width="30px"
              height="30px"
            />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
