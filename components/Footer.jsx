import styles from "../styles/Footer.module.css"
import Image from "next/image";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/bg.jpg" objectFit="cover" layout="fill" alt="" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            100&apos;Dwiches, composez les sandwiches qui vous correspondent.
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>Trouvez nos sandwicheries</h1>
          <p className={styles.text}>
            7 Rue Caulaincourt
            <br /> Paris 18, 75018
            <br /> 06 20 20 20 20
          </p>
          <p className={styles.text}>
            10 Rue Brizard
            <br /> Bordeaux, 33000
            <br /> 06 20 20 20 20
          </p>
          <p className={styles.text}>
            12 Rue Henri Desbals
            <br /> Toulouse, 31100
            <br /> 06 20 20 20 20
          </p>
          <p className={styles.text}>
            33 Boulevard Eugène Orieux
            <br /> Nantes, 44300
            <br /> 06 20 20 20 20
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>Horaires</h1>
          <p className={styles.text}>
            DU LUNDI AU VENDREDI
            <br /> 9:00 – 22:00
          </p>
          <p className={styles.text}>
            SAMEDI - DIMANCHE
            <br /> 12:00 – 14:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;