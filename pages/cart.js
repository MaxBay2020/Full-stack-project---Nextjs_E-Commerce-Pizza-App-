import styles from "../styles/Cart.module.css";
import Image from "next/image"
import {useSelector, useDispatch} from "react-redux";
import axios from 'axios'

import {useState} from "react"

import { PayPalButton } from "react-paypal-button-v2"
import {useRouter} from "next/router";
import {reset} from "../redux/features/cartSlice";
import OrderDetail from "../components/OrderDetail";

const Cart = () => {
    const [open, setOpen]=useState(false)
    const [cash, setCash]=useState(false)

    const dispatch=useDispatch()
    const cart = useSelector(state => state.cart)

    const router = useRouter()

    const createOrder = async (data) =>{
        const response = await axios.post('http://localhost:3000/api/orders/', data)
        console.log(response.data)
        if(response.status === 200)
            router.push(`/orders/${response.data._id}`)
        dispatch(reset())
    }

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <table className={styles.table}>
                    <thead>
                    <tr className={styles.trTitle}>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Extras</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        cart.products.map((product, index) => (
                            <tr key={index} className={styles.tr}>
                                <td>
                                    <div className={styles.imgContainer}>
                                        <Image
                                            src={product.image}
                                            layout="fill"
                                            objectFit="cover"
                                            alt=""
                                        />
                                    </div>
                                </td>
                                <td>
                                    <span className={styles.name}>{product.title}</span>
                                </td>
                                <td>
                          <span className={styles.extras}>
                              {
                                  product.extras.map(extra => (
                                      <span key={extra._id}>{extra.text}, </span>
                                  ))
                              }
                          </span>
                                </td>
                                <td>
                                    <span className={styles.price}>${product.totalPrice}</span>
                                </td>
                                <td>
                                    <span className={styles.quantity}>{product.quantity}</span>
                                </td>
                                <td>
                                    <span className={styles.total}>${product.totalPrice*product.quantity}</span>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            <div className={styles.right}>
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>CART TOTAL</h2>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Discount:</b>$0.00
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Total:</b>${cart.total}
                    </div>
                    {open ?
                        (
                            <div className={styles.paymentMethods}>
                                <button className={styles.payButton}
                                    onClick={()=>setCash(true)}
                                >CASH ON DELIVERY</button>
                                <PayPalButton
                                    amount={cart.total}
                                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                    onSuccess={(details, data) => {
                                        alert("Transaction completed by " + details.payer.name.given_name);
                                        // create new order
                                        const shipping=details.purchase_units[0].shipping
                                        createOrder({
                                            customer: shipping.name.full_name,
                                            address: shipping.address.address_line_1,
                                            total: cart.total,
                                            method: 1
                                        })
                                    }}
                                    options={{
                                        clientId: 'Aa3l9oIlZQS6PULZXOa-1NZa2YaDaCnBXyB986eWmVmYlEoWZBlVaDD1ai1-rKzYLl1km2gMWPwcA859',
                                    }}
                                />
                            </div>
                        )
                        :
                        (
                            <button onClick={()=>setOpen(true)} className={styles.button}>CHECKOUT NOW!</button>
                        )
                    }

                    {cash && <OrderDetail total={cart.total} createOrder={createOrder} />}
                </div>
            </div>
        </div>
    );
};

export default Cart;
