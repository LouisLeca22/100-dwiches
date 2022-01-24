import Head from 'next/head';
import { useState } from 'react';
import Add from '../components/Add';
import AddButton from '../components/AddButton';
import Featured from '../components/Featured';
import SandwichList from '../components/SandwichList';
import styles from '../styles/Home.module.css';
import { server } from '../util/config';

export default function Home({ sandwichList, admin }) {
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>100&apos;dwiches</title>
        <meta
          name='description'
          content='Les meilleurs sandwiches de la région'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Featured />
      {admin && <AddButton setClose={setClose} />}
      <SandwichList sandwichList={sandwichList} />
      {!close && <Add setClose={setClose} />}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || '';
  let admin = false;
  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }
  let res 
  while (res?.status !== 200){
    res = await fetch(`${server}/api/products`)
    console.log(res.status)
  }

  const sandwichList = await res.json()

  return {
      props: {
        sandwichList: sandwichList,
        admin,
      }, 
    };
};
