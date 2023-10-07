import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Axios from "./api/axios";
import OrderDetails from "../components/OrderDetails";
import { reset } from "../redux/cartSlice";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import styles from "../styles/Cart.module.css";

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);

  const [cash, setCash] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" };

  const createOrder = async (data) => {
    try {
      const res = await Axios.post("/orders", data);
      if (res.status === 201) {
        dispatch(reset());
        router.push(`/orders/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  function onApprove(actions) {
    return actions.order.capture().then(function (details) {
      const shipping = details.purchase_units[0].shipping;
      createOrder({
        customer: shipping.name.full_name,
        address: shipping.address.address_line_1,
        total: cart.total,
        method: 1,
      });
    });
  }

  const ButtonWrapper = ({ currency, showSpinner }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    // useEffect(() => {
    //   dispatch({
    //     type: "resetOptions",
    //     value: {
    //       ...options,
    //       currency: currency,
    //     },
    //   });
    // }, [currency, showSpinner, dispatch, options]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                return orderId;
              });
          }}
          onApprove={onApprove}
        />
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </tbody>
          <tbody>
            {cart.products.map((product) => (
              <tr className={styles.tr} key={product._id}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.img}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  <span className={styles.extras}>
                    {product.extras.map((extra) => (
                      <span key={extra._id}>{extra.text}, </span>
                    ))}
                  </span>
                </td>
                <td>
                  <span className={styles.price}>${product.price}</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    ${product.price * product.quantity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${cart.total}
          </div>
          {open ? (
            <div className={styles.paymentMethods}>
              <button
                className={styles.paymentButton}
                onClick={() => setCash(true)}
              >
                CASH ON DELIVERY
              </button>
              <PayPalScriptProvider
                options={{
                  clientId:
                    "AQHHetCaBY3R7anfOIZ2bFv7d1_H3frNGLwFgBPbpgRc5uySNbX3FRArI5vg3SK67YYW9vS5-LQefGa0",
                  components: "buttons",
                  currency: "USD",
                  disableFunding: "credit,card,p24",
                }}
              >
                <ButtonWrapper showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button className={styles.button} onClick={() => setOpen(true)}>
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
      {!close && cash && (
        <OrderDetails
          total={cart.total}
          createOrder={createOrder}
          setClose={setClose}
        />
      )}
    </div>
  );
};

export default Cart;
