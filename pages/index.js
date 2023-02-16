import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState }  from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {

const [ data, setData ] = useState();

const apiKey = "wlOrjgHbKCCpWrLY5GQxmg9XPwErk9B1QZXWDkbs";
const url = `https://api.nasa.gov/techtransfer/patent/?q=10&engine&api_key=${apiKey}`

const getTechTransferData = async () => {
  const res = await axios.get(url);
  const info = res.data;
  console.log(info);
  setData(info);
}

useEffect(() => {
  getTechTransferData();
}, []);

  return (
    <>
      <Head>
        <title>NASA Minisite</title>
        <meta name="description" content="Nasa Minisite" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/nasa-logo.png" />
      </Head>

      <main className={styles.main}>
        <div className={styles.heading}>
          <Link href="/polychromatic">Polychromatic</Link>
        </div>

        <div className={styles.button}>
          <a href="/polychromatic"><button>See Daily Imagery of Earth</button></a>
        </div>

        <div className={styles.imgcont}>
        {data && data.results.map((tech, index) => {
          return (
            <div className={styles.img} key={index}>
            {
              tech && tech.map((t, ind) => {
                if(ind === 10) {
                  return (
                    <Image src={t} alt={t} key={ind} width={100} height={100}/>
                  )
                }
              })
            }
            </div>
          )
        })}
       </div>


      </main>
    </>
  )
}
