import { CartModel } from "./models/cart.model.js";

export default class CartDaoMongoDB {

    async getCarts() {
        try {
            const response = await CartModel.find({})
            return response
        } catch (error) {
            throw new Error(error)
        }
    }

    async getCartByCid(cid) {
        try {
            const response = await CartModel.findById(cid)
            return response
        } catch (error) {
            throw new Error(error)
        }
    }

    async addCart(pid) {
        try {
            const response = await CartModel.create({ products: [{ productId: pid, quantity: 1 }] });
            return response
        } catch (error) {
            throw new Error(error)
        }
    }


    // async updateCart(cid,pid) {
    //     try {
    //         const responseCart = await CartModel.findById(cid)
    //         if(!responseCart){throw new Error("cart not found")}
    //         return response
    //     } catch (error) {
    //         throw new Error(error)
    //     }
    // }

    async remove(cid){
        try {
            const response = await CartModel.findByIdAndDelete(cid)
            return response
        } catch (error) {
            throw new Error(error)
        }
    }



}