import Image from 'next/image'
import styles from '../../styles/Product.module.css'
import {useState} from 'react'
import axios from 'axios'
import {useDispatch} from "react-redux";
import {addProduct} from "../../redux/features/cartSlice";

const Product = ({pizza}) => {
    // const [size, setSize] = useState(0)
    const [sizePrice, setSizePrice] = useState(pizza.prices[0])
    const [totalPrice, setTotalPrice]= useState(pizza.prices[0])
    const [ingredientsPrice, setIngredientsPrice]= useState(0)

    const [extras, setExtras]=useState([])

    const [quantity, setQuantity] = useState(1)

    const  handleChange = (e, option) => {
        const checked = e.target.checked

        if(checked){
            const increment=option.price

            const newIngredientsPrice=ingredientsPrice+increment
            setIngredientsPrice(newIngredientsPrice)

            const newTotalPrice = totalPrice + increment
            setTotalPrice(newTotalPrice)
            setExtras(prev => [...prev, option])
        }else{
            const increment=option.price

            const newIngredientsPrice=ingredientsPrice-increment
            setIngredientsPrice(newIngredientsPrice)

            const newTotalPrice = totalPrice - option.price
            setTotalPrice(newTotalPrice)

            setExtras(extras.filter(extra => extra._id !== option._id))
        }
    }


    const handleSize = (sizeIndex) => {
        const sizePrice = pizza.prices[sizeIndex]
        setSizePrice(sizePrice)
        setTotalPrice(sizePrice+ingredientsPrice)
    }

    const dispatch = useDispatch()

    const addToCart = ()=>{
        dispatch(addProduct(
            {
                ...pizza,
                extras,
                totalPrice,
                quantity
            }))
    }

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.imgContainer}>
                    <Image src={pizza.image} layout='fill' alt='pizza' objectFit='contain' />
                </div>
            </div>
            <div className={styles.right}>
                <h1 className={pizza.title}>{pizza.title}</h1>
                <span className={styles.price}>${totalPrice}</span>
                <p className={styles.desc}>{pizza.desc}</p>
                <h3 className={styles.choose}>Choose the size</h3>
                <div className={styles.sizes}>
                    <div className={styles.size} onClick={()=>handleSize(0)}>
                        <Image src='/images/size.png' layout='fill' alt='small size' />
                        <span className={styles.number}>Small</span>
                    </div>
                    <div className={styles.size} onClick={()=>handleSize(1)}>
                        <Image src='/images/size.png' layout='fill' alt='medium size' />
                        <span className={styles.number}>Medium</span>
                    </div>
                    <div className={styles.size} onClick={()=>handleSize(2)}>
                        <Image src='/images/size.png' layout='fill' alt='large size' />
                        <span className={styles.number}>Large</span>
                    </div>
                </div>

                <h3 className={styles.choose}>Choose Additional Ingredients</h3>
                <div className={styles.ingredients}>
                    {
                        pizza.extraOptions.map(option => (
                            <div key={option._id} className={styles.option}>
                                <input
                                    type="checkbox"
                                    id={option.text}
                                    name={option.text}
                                    className={styles.checkbox}
                                    onChange={(e)=>handleChange(e, option)}
                                />
                                <label htmlFor={option.text}>{option.text}</label>
                            </div>
                        ))
                    }


                </div>

                <div className={styles.add}>
                    <input onChange={(e)=>setQuantity(e.target.value)} type="number" defaultValue={1} className={styles.quantity} />
                    <button className={styles.button} onClick={()=>addToCart()}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export const getStaticProps = async (context)=>{
    const {params}=context
    console.log(params.id)
    const response = await axios.get(`http://localhost:3000/api/products/${params.id}`)
    if(response.status === 200){
        return {
            props: {
                pizza: response.data
            }
        }
    }
}

export default Product;
