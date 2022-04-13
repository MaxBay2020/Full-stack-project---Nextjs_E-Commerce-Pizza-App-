import dbConnect from "../../../lib/dbConnect";
import Order from "../../../models/Order"


export const handler = async (req,res) => {
    const {method, cookies} = req
    const token=cookies.token
    await dbConnect()

    switch(method){
        case 'GET':
            // get all orders
            const orders = await Order.find()
            res.send(orders)
            break
        case 'POST':
            console.log('token: ', token)
            // console.log('process.env.TOKEN: ', process.env.TOKEN)
            // if(!token || token !== process.env.TOKEN)
            //     return res.send('Not authenticated!')
            // create order
            const order=await Order.create(req.body)
            res.send(order)
            break
        default:
            break
    }

}

export default  handler
