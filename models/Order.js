import mongoose from 'mongoose'
const Schema = mongoose.Schema

const OrderSchema=new Schema({
    customer: {type: String, required: true},
    address: {type: String, required: true},
    total: {type: Number, required: true},
    status: {type: Number, default: 0},
    method: {type: Number, required: true}
},
    {timestamps: true})

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema)

export default Order
