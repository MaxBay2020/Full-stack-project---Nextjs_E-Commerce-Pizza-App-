import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import axios from 'axios'
import {useState} from "react";
import AddButton from "../components/AddButton";
import Add from "../components/Add";

export default function Home({pizzaList, admin}) {

    const [close, setClose] = useState(true);

    return (
    <div className={styles.container}>
      <Head>
        <title>Cong's Pizza Restaurant in Toronto</title>
        <meta name="keyword" content="pizza, restaurant, top pizza" />
        <meta name="description" content="10 Top pizza restaurants in Canada" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <Featured />

        {admin && <AddButton setClose={setClose} />}
        <PizzaList pizzaList={pizzaList} />
        {!close && <Add setClose={setClose}/>}
    </div>
  )
}

export const getStaticProps = async (context)=>{
    const myCookie = context.req?.cookies || ''
    let admin=false

    if(myCookie.token === process.env.TOKEN) {
        admin=true
    }

    // 这里的url必须写全
    const response=await axios.get('http://localhost:3000/api/products')
    if(response.status ===200) {
      return {
        props: {
            pizzaList: response.data,
            admin
        }
      }
    }
}
