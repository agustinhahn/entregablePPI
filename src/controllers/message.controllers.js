// import * as services from "../services/message.services.js"

export const chat = async(req,res,next) =>{
    try {
        res.render('chat')
    } catch (error) {
        next(error.message);
    }
}
