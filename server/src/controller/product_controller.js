import { Product } from '../model/producr_model.js'
import { errorhandling } from '../middleware/all_error.js'

export const create_product = async (req, res) => {
    try {
        const files = req.files
        const data = req.body

        if (data.variants) {
            try {
                let fixed = data.variants.replace(/'/g, '"')
                data.variants = JSON.parse(fixed)
                if (!Array.isArray(data.variants)) {
                    throw new Error("Variants must be array")
                }
            }
            catch (err) { errorhandling(err, res) }
        }

        data.price = Number(data.price)
        data.discount = Number(data.discount || 0)

        if (files?.poster) data.poster = files.poster[0].path
        if (files?.images) data.images = files.images.map(file => file.path)

        const DB = await Product.create(data)

        res.status(201).json({ status: true, msg: "Product created successfully", data: DB })

    }
    catch (e) { errorhandling(e, res) }
}

export const delete_product = async (req, res) => {
    try {
        const id = req.params.productId
        if (!id) return res.status(400).send({ status: false, msg: "id required !" })
        const a =  await Product.findByIdAndUpdate(id, { $set: { isDelete: true } })
        return res.status(200).send({ status: true, msg: "Product Deleted Successfully" })
    }
    catch (e) { errorhandling(e, res) }
}

export const updated_product = async (req, res) => {
    try {

    }
    catch (e) { errorhandling(e, res) }
}

export const get_all_product = async (req, res) => {
    try {

        const data = req.query
        const { limit, preview, next, search } = data;

    }
    catch (e) { errorhandling(e, res) }
}
export const view_product = async (req, res) => {
    try {

        // show product detail and review 
    }
    catch (e) { errorhandling(e, res) }
}

export const create_review = async (req, res) => {
    try {
        const data = req.body

        const { user, rating, comment, productId } = data
    }
    catch (e) { errorhandling(e, res) }
}
export const updated_review = async (req, res) => {
    try {
        const data = req.body

        const { user, rating, comment, productId } = data
    }
    catch (e) { errorhandling(e, res) }
}
export const delete_review = async (req, res) => {
    try {
        const data = req.body

        const { user, rating, comment, productId } = data
    }
    catch (e) { errorhandling(e, res) }
}