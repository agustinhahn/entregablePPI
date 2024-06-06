//configuracion para MONGODB
import CartDaoMongoDB from "../daos/mongodb/cart.dao.js"
const cartDao = new CartDaoMongoDB()


//configuracion para filesystem

// import {__dirname} from "../utils.js"
// import ProductDaoFS from "../daos/filesystem/cart.dao.js"
// const cartDao = new ProductDaoFS()

export const getCarts = async()=>{
    try {
        return await cartDao.getCarts()
    } catch (error) {
        throw new Error(error)
    }
}

export const getCartByCid = async(cid)=>{
    try {
        return await cartDao.getCartByCid(cid)
    } catch (error) {
        throw new Error(error)
    }
}

export const addCart = async(pid)=>{
    try {
        return await cartDao.addCart(pid)
    } catch (error) {
        throw new Error(error)
    }
}

export const updateCart = async(cid,pid)=>{
    try {
        return await cartDao.update(cid,pid)
    } catch (error) {
        throw new Error(error)
    }
}
export const remove = async(cid)=>{
    try {
        return await cartDao.remove(cid)
    } catch (error) {
        throw new Error(error)
    }
}