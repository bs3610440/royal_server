import mongoose from "mongoose";
import { uploadProfileImg, multipleImgUrl } from '../image/Image.js'

const variantSchema = new mongoose.Schema({
    color: { type: String, required: true },
    size: { type: String, required: true, enum: ['S', 'M', 'L', 'XL', 'XXL'] },
    stock: { type: Number, required: true, default: 0 },
});

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String }
}, { timestamps: true });

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true, enum: ['men', 'women', 'kids'] },
    subCategory: { type: String, enum: ['Tshirt', 'Jeans', 'Hoodie'] },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    poster: { type: Object, required: true },
    images: [{ type: Object, required: true }],
    variants: [variantSchema],
    material: { type: String },
    fit: { type: String, enum: ['regular', 'slim', 'loose'] },
    gender: { type: String, enum: ['male', 'female', 'unisex'] },
    ratings: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    },
    reviews: [reviewSchema],
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false },

}, { timestamps: true });

productSchema.pre('save', async function () {
    if (this.images.length > 0) {
        console.log(this.images)
        this.images = await multipleImgUrl(this.images)
    }
    if (this.poster) {
        this.poster = await uploadProfileImg(this.poster[0].path)
    }
});

export const Product = mongoose.model("Product", productSchema);

