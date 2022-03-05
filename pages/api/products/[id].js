
import dbConnect from '../../../lib/dbConnect'
import Product from '../../../models/Products'

export const handle = async (req,res) => {
    const {method, query: {id}, cookies}=req
    const token=cookies.token
    await dbConnect()

    switch (method){
        case 'GET':
            const product = await Product.findById((id))
            res.send(product)
            break
        case 'DELETE':
            if(!token || token !== process.env.TOKEN)
                return res.send('Not authenticated!')
            const productDeleted = await Product.deleteOne({_id: id})
            res.send('The product has been deleted successfully')
            break

        default:
            break
    }
}

export default handle
