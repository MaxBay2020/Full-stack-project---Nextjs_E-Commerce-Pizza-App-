
import Image from 'next/image'
import styles from '../styles/Featured.module.css'
import Head from "next/head";
import {useState} from "react";

const Featured = () => {
    const images=[
        '/images/featured1.jpeg',
        '/images/featured2.jpeg',
        '/images/featured3.jpeg',
    ]

    const [index, setIndex] =useState(0)
    const handleArrow = (direction) => {
        if(direction==='l'){
            setIndex((index!==0)?index-1:images.length-1)
        }else{
            setIndex((index===images.length-1)?0:index+1)
        }
    }




    return (
        <div className={styles.container}>
            <div className={styles.arrowContainer} style={{left: 0}} onClick={()=>handleArrow('l')}>
                <Image src='/images/arrowl.png' alt='' layout='fill' objectFit='contain'  />
            </div>
            <div className={styles.wrapper} style={{transform: `translateX(${-100*index}vw)`}}>
                {images.map((image, index) => (
                    <div key={index} className={styles.imgContainer}>
                        <Image layout='fill'  src={image} alt='' objectFit='contain'  />
                    </div>
                ))}
            </div>
            <div className={styles.arrowContainer}  style={{right: 0}} onClick={()=>handleArrow('r')}>
                <Image src='/images/arrowr.png' alt='' layout='fill' objectFit='contain'  />
            </div>
        </div>
    );
};

export default Featured;
