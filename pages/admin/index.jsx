import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../../styles/Admin.module.css';
import { server } from '../../util/config';

const Index = ({ orders, products }) => {
  const [productList, setProductList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ['en préparation', 'en route', 'livré'];

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${server}/api/products/${id}`);
      setProductList(productList.filter((product) => product._id === id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    try {
      const res = await axios.put(`${server}/api/orders/${id}`, {
        status: currentStatus + 1,
      });
      setOrderList([res.data, ...orderList.filter(order => order._id !== id)])
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Produits</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Nom</th>
              <th>Prix</th>
              <th></th>
            </tr>
            {productList.map((product) => (
              <tr className={styles.tr} key={product._id}>
                <td>
                  <Image
                    src={product.img}
                    width={60}
                    height={40}
                    objectFit='cover'
                    alt=''
                  />
                </td>
                <td>{product._id.slice(0, 5)}...</td>
                <td>{product.title}</td>
                <td>{product.prices[0]}</td>
                <td>
                  <button className={styles.button}>Modifier</button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(product._id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Commandes</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Commande</th>
              <th>Client</th>
              <th>Prix total</th>
              <th>Methode de paiement</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            {orderList.map((order) => (
              <tr className={styles.tr} key={order._id}>
                <td>{order._id.slice(0, 5)}...</td>
                <td>{order.customer}</td>
                <td>{order.total}</td>
                <td>
                  {order.method === 0 ? <span>Cash</span> : <span>Payé</span>}
                </td>
                <td>{status[order.status]}</td>
                <td>
                  <button onClick={() => handleStatus(order._id)}>
                    Etape suivante
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  if(myCookie.token !== process.env.TOKEN){
    return{
      redirect: {
        destination: "/admin/login",
        permanent: false
      }
    }
  }
  const productRes = await axios.get(`${server}/api/products`);
  const orderRes = await axios.get(`${server}/api/orders`);

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};

export default Index;
