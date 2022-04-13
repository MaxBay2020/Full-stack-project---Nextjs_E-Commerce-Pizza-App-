import React from 'react';
import styles from '../styles/PizzaList.module.css'
import PizzaCard from "./PizzaCard";

const PizzaList = ({pizzaList}) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>THE BEST PIZZA IN TORONTO</h1>
            <p className={styles.desc}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Accusantium at consequatur consequuntur debitis dignissimos
                error esse fugit illo itaque modi mollitia numquam omnis perspiciatis
                praesentium provident, quibusdam sed vel veritatis
            </p>
            <div className={styles.wrapper}>
                {
                    pizzaList.map(pizza => (
                        <PizzaCard key={pizza._id} pizza={pizza} />
                    ))
                }
            </div>
        </div>
    );
};

export default PizzaList;
