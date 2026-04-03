import mongoose from 'mongoose';
import { uploadProfileImg } from '../image/Image.js'


const productSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    des: { type: String, required: true, trim: true },
    MainImg: { type: Object, required: true, trim: true },
    AllProductImg: { type: Array, required: true, trim: true },
    discount: { type: Number, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    subcategory: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true },
    size: { type: String, required: true, trim: true },
    stock: { type: Number, required: true, trim: true },
    rating: { type: Number, required: true, trim: true },
    numReviews: { type: Number, required: true, trim: true },

},
    { timestamps: true }
)


export const user_model = mongoose.model('product', productSchema)

