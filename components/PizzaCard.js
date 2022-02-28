import styles from '../styles/PizzaCard.module.css'
import Image from 'next/image'

const PizzaCard = () => {
    return (
        <div className={styles.container}>
            <Image width='500' height='500' src='/images/pizza.png' alt='pizza'/>
            <h1 className={styles.title}>FIORI DI ZUCCA</h1>
            <span className={styles.price}>$19.90</span>
            <p className={styles.desc}>
                Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Cupiditate ipsum modi
                nam perspiciatis praesentium quidem
                repellendus suscipit. Eius enim eum impedit?
           </p>
        </div>
    );
};

export default PizzaCard;
