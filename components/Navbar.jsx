import Image from 'next/image';
import styles from '../styles/Navbar.module.css';
import { useSelector } from 'react-redux';
import Link from 'next/link';
const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src='/img/telephone.png' alt='phone' width='32' height='32' />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>Commandez maintenant !</div>
          <div className={styles.text}>06 00 00 00 00</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href='/' passHref>
            <li className={styles.listItem}>Accueil</li>
          </Link>
          <a href='#sandwiches'>
            <li className={styles.listItem}>Sandwiches</li>
          </a>
          <a href='#sandwiches'>
            <li className={styles.listItem}>Menus</li>
          </a>
          <Image src='/img/logo.png' alt='' height='150px' width='150px' />
          <a href='#contact'>
            <li className={styles.listItem}>Emplois</li>
          </a>
          <a href='#contact'>
            <li className={styles.listItem}>Blog</li>
          </a>
          <a href='#contact'>
            <li className={styles.listItem}>Contact</li>
          </a>
        </ul>
      </div>
      <Link href='/cart' passHref>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image src='/img/cart.png' width='30px' height='30px' />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
