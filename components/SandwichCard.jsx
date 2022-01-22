import styles from '../styles/SandwichCard.module.css';
import Image from 'next/image';
import Link from 'next/link';

const SandwichCard = ({ sandwich }) => {
  return (
    <div className={styles.container}>
      <Link href={`/product/${sandwich._id}`} passHref>
        <Image src={sandwich.img} alt='' width='700' height='500' />
      </Link>
      <h1 className={styles.title}>{sandwich.title}</h1>
      <span className={styles.price}>{sandwich.prices[0]} €</span>
      <p className={styles.desc}>{sandwich.desc}</p>
    </div>
  );
};

export default SandwichCard;
