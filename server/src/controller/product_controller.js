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