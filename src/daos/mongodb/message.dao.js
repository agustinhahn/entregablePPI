import {MessageModel} from "./models/message.model.js"

export default class MessageDaoMongoDB{

    async getAll(){
        try {
            const response = await MessageModel.find({});
            return response;
        } catch (error) {
            throw new Error(error)
        }
    }

    async create(obj){
        try {
            const response = await MessageModel.create(obj)
            return response;
        } catch (error) {
            throw new Error(error)
        }
    }
}