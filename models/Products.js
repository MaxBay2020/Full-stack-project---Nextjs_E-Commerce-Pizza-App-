import mongoose from 'mongoose'
const  Schema=mongoose.Schema

const ProductSchema=new Schema({
    title: {type: String, required: true, maxLength: 60},
    desc: {type: String, required: true, maxLength: 200},
    image: {type: String, required: true},
    prices: {type: [Number], required: true},
    extraOptions: {
        type: [
        {
            text: {type: String, required: true},
            price: {type: Number, required: true}
        }]
    }
},
    // timesStamps设置为true，会自动创建两个字段：
    // createdAt和updateAt，类型都是Date
    {timestamps: true})

// 如果mongoDB中已经有了一个叫Product的集合，那么就用这个集合，不创建新的
// 如果没有，再创建
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)

export default Product
