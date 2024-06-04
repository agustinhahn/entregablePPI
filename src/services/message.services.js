//configuracion para MONGODB
import ProductDaoMongoDB from "../daos/mongodb/message.dao.js"
const messageDao = new ProductDaoMongoDB()

//configuracion para filesystem

// import {__dirname} from "../utils.js"
// import MessagetDaoFS from "../daos/filesystem/message.dao.js"
// const messageDao = new MessageDaoFs()

export const getAll = async()=>{
    try {
        return await messageDao.getAll()
    } catch (error) {
        throw new Error(error)
    }
}

export const create = async(obj) =>{
    try {
        return await messageDao.create(obj)
    } catch (error) {
        throw new Error(error)
    }
}
