import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../../styles/Product.module.css';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartSlice';
import { server } from '../../util/config';

const Product = ({ sandwich }) => {
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(sandwich.prices[0])
  const [extras, setExtras] = useState([])
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()

  const changePrice = (number) => {
    setPrice(price + number)
  }

  const handleSize = (sizeIndex) => {
    const difference = sandwich.prices[sizeIndex] - sandwich.prices[size]
    setSize(sizeIndex)
    changePrice(difference)
  }
 
  const handleChange = (e, option) => {
    const checked = e.target.checked;
    if(checked){
      changePrice(option.price)
      setExtras(prev => [...prev, option])
    } else {
      changePrice(-option.price)
      setExtras(extras.filter(extra => extra._id !== option._id))
    }
  }

  const handleClick = () => {
dispatch(addProduct({...sandwich, extras, price, quantity}))
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={sandwich.img} alt='' layout='fill' />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{sandwich.name}</h1>
        <span className={styles.price}>{price}€</span>
        <p className={styles.desc}>{sandwich.desc}</p>
        <h3>Choisissez la taille</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src='/img/size.png' alt='' layout='fill' />
            <span className={styles.number}>Petit</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src='/img/size.png' alt='' layout='fill' />
            <span className={styles.number}>Standard</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src='/img/size.png' alt='' layout='fill' />
            <span className={styles.number}>Gigantesque</span>
          </div>
        </div>
        <h3 className={styles.choose}>Ajouter des ingrédients</h3>
        <div className={styles.ingredients}>
          {sandwich.extraOptions.map((option, index) => (
            <div className={styles.option} key={index}>
              <input
                type='checkbox'
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor={option.text}>{option.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input onChange={(e) => setQuantity(e.target.value)} type='number' defaultValue={1} className={styles.quantity} />
          <button className={styles.button} onClick={handleClick}>Ajouter au panier</button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `${server}/api/products/${params.id}`
  );
  return {
    props: {
      sandwich: res.data,
    },
  };
};

export default Product;
