import { useEffect } from "react";
import styles from "../styles/SandwichList.module.css";
import SandwichCard from "./SandwichCard";

const SandwichList = (props) => {
  let  sandwichList = props.sandwichList
  console.log(sandwichList)
  return <div className={styles.container}>
    <h1 className={styles.title}>Les sandwiches qui te ressemblent </h1>
    <p className={styles.desc}>Avec 100&apos;dwiches tu peux composer toi-même tes propres sandwiches en choisissant les ingrédients qui te correspondent. Laisse libre cours à ton imagination et élabore ton snack en choissisant parmi plus d&apos;une centaine d&apos;ingrédients</p>
    <div className={styles.wrapper}>
      { 
         sandwichList.map(sandwich => (
          <SandwichCard sandwich={sandwich} key={sandwich._id} />
        ))
      
      }
    </div>
  </div>;
};


export default SandwichList;
