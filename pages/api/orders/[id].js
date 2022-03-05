import dbConnect from "../../../lib/dbConnect";
import Order from "../../../models/Order"


export const handler = async (req,res) => {
    const {method, query:{id}, cookies} = req
    const token=cookies.token
    await dbConnect()

    switch(method){
        case 'GET':
            // get order by id
            const order = await Order.findOne({_id: id})
            res.send(order)
            break
        case 'PATCH':
            if(!token || token !== process.env.TOKEN)
                return res.send('Not authenticated!')
            // update specified order
            const updatedOrder = await Order.findOneAndUpdate({_id: id}, {$set: {status:req.body.status}}, {new: true})
            res.send(updatedOrder)
            break
        case 'DELETE':
            break
        default:
            break
    }

}

export default  handler
