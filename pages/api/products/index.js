import dbConnect from '../../../lib/dbConnect'
import Product from '../../../models/Products'


export const handler = async (req,res)=>{
    const {method, cookies} = req
    const token=cookies.token

    // 连接数据库
     await dbConnect()

    switch (method){
        case 'GET':
            // get all products in DB
            const products = await Product.find()
            res.send(products)
            break
        case 'POST':
            if(!token || token !== process.env.TOKEN)
                return res.send('Not authenticated!')
            // create new product to DB
            const product= req.body
            const newProduct = await Product.create(product)
            res.send(newProduct)
            break
        default:
            break
    }
}

export default handler
