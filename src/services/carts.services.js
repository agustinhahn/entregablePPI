//configuracion para MONGODB
import CartDaoMongoDB from "../daos/mongodb/cart.dao.js"
const cartDao = new ProductDaoMongoDB()

//configuracion para filesystem

// import {__dirname} from "../utils.js"
// import ProductDaoFS from "../daos/filesystem/cart.dao.js"
// const cartDao = new ProductDaoFS()

export const getAll = async()=>{
    try {
        return await cartDao.getAll()
    } catch (error) {
        throw new Error(error)
    }
}

export const getById = async(id)=>{
    try {
        return await cartDao.getById(id)
    } catch (error) {
        throw new Error(error)
    }
}

export const create = async(obj)=>{
    try {
        return await cartDao.create(obj)
    } catch (error) {
        throw new Error(error)
    }
}

export const update = async(id,obj)=>{
    try {
        return await cartDao.update(id,obj)
    } catch (error) {
        throw new Error(error)
    }
}
export const remove = async(id)=>{
    try {
        return await cartDao.remove(id)
    } catch (error) {
        throw new Error(error)
    }
}