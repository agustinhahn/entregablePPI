import mongoose from "mongoose"

export const cartsCollectionName = "cart"

const cartsSchema = new mongoose.Schema({
    products: [
        {
            productId: {type: Number},
            quantity: {type: Number}
        }
    ]
})

export const CartModel = mongoose.model(
    cartsCollectionName,
    cartsSchema
)