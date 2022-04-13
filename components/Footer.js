import styles from '../styles/Footer.module.css'
import Image from 'next/image'

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <Image src='/images/bg.png' alt='backgorund-image' layout='fill'  />
            </div>
            <div className={styles.item}>
                <div className={styles.card}>
                    <h2 className={styles.motto}>
                        OH YES, WE DID. THE CONG PIZZA, WELL BAKED SLICE OF PIZZA!
                    </h2>
                </div>
                <div className={styles.card}>
                    <h1 className={styles.title}>
                        FIND OUR RESTAURANTS
                    </h1>
                    <p className={styles.text}>
                        3344 R. Don Road #304.
                        <br/> Toronto, 123456
                        <br/> (647) 994-6898
                    </p>
                    <p className={styles.text}>
                        2356 K. Laquie Rd #235.
                        <br /> Toronto, 123456
                        <br /> (647) 994-6898
                    </p>
                    <p className={styles.text}>
                        1614 E. Erwin St #104.
                        <br /> Toronto, 123456
                        <br /> (647) 994-6898
                    </p>
                    <p className={styles.text}>
                        1614 W. Caroll St #125.
                        <br /> Toronto, 123456
                        <br /> (647) 994-6898
                    </p>
                </div>
                <div className={styles.card}>
                    <h1 className={styles.title}>
                        WORKING HOURS
                    </h1>
                    <p className={styles.text}>
                        MONDAY UNTIL FRIDAY
                        <br /> 9:00 – 22:00
                    </p>
                    <p className={styles.text}>
                        SATURDAY - SUNDAY
                        <br /> 12:00 – 24:00
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
