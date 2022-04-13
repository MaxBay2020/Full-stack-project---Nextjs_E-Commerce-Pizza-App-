import {useState} from 'react'
import styles from '../../styles/Admin.module.css'
import Image from 'next/image'
import axios from 'axios'

const Index = ({orders, products}) => {
    const [pizzaList, setPizzaList,] = useState(products);
    const [orderList, setOrderList] = useState(orders)
    const status = ['preparing', 'ont the way', 'delivered']

    const  handleDelete = async (productID)=>{
        const response = await axios.delete(`http://localhost:3000/api/products/${productID}`)
        setPizzaList(pizzaList.filter(pizza => pizza._id !== productID))
    }

    const handleStatus = async (id) => {
        const item = orderList.filter(order => order._id===id)[0]
        const currentStatus=item.status
        const response = await axios.patch(`http://localhost:3000/api/orders/${id}`, {status: currentStatus+1})
        console.log(response.data)
        setOrderList([
            response.data,
            ...orderList.filter(order => order._id !== id)
        ])

    }

    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <h1 className={styles.title}>Products</h1>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.trTitle}>
                            <th>Image</th>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                    {
                        pizzaList.map(product => (
                            <tr key={product._id} className={styles.trTitle}>
                                <td>
                                    <Image
                                        src={product.image}
                                        width={50}
                                        height={50}
                                        objectFit='cover'
                                        alt='pizza'
                                    />
                                </td>
                                <td>{product._id.slice(0,5)}...</td>
                                <td>{product.title}</td>
                                <td>{product.prices[0]}</td>
                                <td>
                                    <button className={styles.button}>Edit</button>
                                    <button className={styles.button} onClick={()=>handleDelete(product._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }

                    </tbody>
                </table>
            </div>

            <div className={styles.item}>
                <h1 className={styles.title}>Orders</h1>
                <table className={styles.table}>
                    <thead>
                    <tr className={styles.trTitle}>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        orderList.map(order => (
                            <tr key={order._id} className={styles.trTitle}>
                                <td>{order._id.slice(0,5)}...</td>
                                <td>{order.customer}</td>
                                <td>${order.total}</td>
                                <td>{order.method === 0 ? (<span>cash</span>) : (<span>paid</span>)}</td>
                                <td>{status[order.status]}</td>
                                <td>
                                    <button onClick={()=>handleStatus(order._id)}>Next stage</button>
                                </td>
                            </tr>
                        ))
                    }

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export const getStaticProps = async (context)=>{
    const myCookie=context.req?.cookies || ''

    if(myCookie.token !== process.env.TOKEN){
        return {
            redirect:{
                destination: '/admin/login',
                permanent: false
            }
        }
    }
    const productsResponse = await axios.get('http://localhost:3000/api/products')
    const ordersResponse = await axios.get('http://localhost:3000/api/orders')

    return {
        props: {
            orders: ordersResponse.data,
            products: productsResponse.data
        }
    }

}

export default Index;
