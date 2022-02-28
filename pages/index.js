import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Cong's Pizza Restaurant in Toronto</title>
        <meta name="keyword" content="pizza, restaurant, top pizza" />
        <meta name="description" content="10 Top pizza restaurants in Canada" />
        <link rel="icon" href="/favicon.ico" />
      </Head>



    </div>
  )
}
