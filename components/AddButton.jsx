import styles from "../styles/Add.module.css"

const AddButton = ({setClose}) => {
  return <div onClick={() => setClose(false)} className={styles.mainAddButton}>
    Ajouter un sandwich
  </div>;
};

export default AddButton;
