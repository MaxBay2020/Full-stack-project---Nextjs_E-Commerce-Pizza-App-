import styles from '../styles/PizzaCard.module.css'
import Image from 'next/image'
import Link from 'next/link'

const PizzaCard = ({pizza}) => {
    const {title, prices, desc, image, extraOptions, _id}=pizza
    return (
        <div className={styles.container}>
            <Link href={`/products/${_id}`}>
                <Image width='500' height='500' src={image} alt='pizza'/>
            </Link>
            <h1 className={styles.title}>{title}</h1>
            <span className={styles.price}>${prices[0]}</span>
            <p className={styles.desc}>{desc}</p>
        </div>
    );
};

export default PizzaCard;
