import styles from '../styles/OrderDetail.module.css'
import {useState} from "react";

const OrderDetail = ({total, createOrder}) => {
    const [customer, setCustomer] = useState('')
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')


    const handleClick = ()=>{
        createOrder({
            customer,
            address,
            total,
            method:0
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>You will pay $12 after delivery.</h1>
                <div className={styles.item}>
                    <label className={styles.label}>Name Surname</label>
                    <input type="text" placeholder='Jobn Doe' className={styles.input}
                        onChange={(e)=> setCustomer(e.target.value)}
                    />
                </div>

                <div className={styles.item}>
                    <label className={styles.label}>Phone Number</label>
                    <input type="text" placeholder='+1 647 994 6898' className={styles.input}
                           onChange={(e)=> setPhoneNumber(e.target.value)}
                    />
                 </div>

                <div className={styles.item}>
                    <label className={styles.label}>Address</label>
                    <textarea rows={5} placeholder='5 st. Markham, Toronto' className={styles.textarea}
                           onChange={(e)=> setAddress(e.target.value)}
                    />
                </div>

                <button className={styles.button} onClick={()=>handleClick()}>
                    Order
                </button>
            </div>
        </div>
    );
};

export default OrderDetail;
