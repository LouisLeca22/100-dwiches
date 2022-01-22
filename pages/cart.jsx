import styles from '../styles/Cart.module.css';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {reset} from "../redux/cartSlice"
import { useState } from 'react';
import OrderDetails from '../components/OrderDetails';
import axios from "axios"
import { server } from '../util/config';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [cash, setCash] = useState(false)
  const router = useRouter();
  const createOrder = async (data) => {
    try {
      console.log(server)
      const res = await axios.post(`${server}/api/orders`, data);
      console.log(res)
      res.status === 201 && router.push('/orders/' + res.data._id);
      dispatch(reset())
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Produit</th>
              <th>Nom</th>
              <th>Extas</th>
              <th>Prix</th>
              <th>Quantité</th>
              <th>Total</th>
            </tr>
            {cart.products.map((product) => (
              <tr className={styles.tr} key={product._id}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.img}
                      layout='fill'
                      objectFit='cover'
                      alt=''
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
                  <span className={styles.price}>{product.price} €</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    {product.price * product.quantity} €
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Total Panier</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Sous-total:</b> {cart.total} €
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Escompte:</b>0.00 €
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>
            {cart.total} €
          </div>
          <div className={styles.paymentMethods}>
            <button onClick={() => setCash(true)}className={styles.payButton}>Commandez maintenant</button>
          </div>
        </div>
      </div>
      {(cash && cart.total !== 0) && (
        <OrderDetails total={cart.total} createOrder={createOrder}/>
      )}
    </div>
  );
};

export default Cart;
