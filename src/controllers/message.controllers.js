import * as services from "../services/message.services.js"

export const getAll = async(req,res,next) =>{
    try {
        const response = await services.getAll();
        res.render("chat",{response})
    } catch (error) {
        next(error.message);
    }
}

export const create = async(req,res,next)=>{
    try {
        const newMessage = await services.create(req.body)
        if(!newMessage) res.status(404).json({msg:"Error creating message"})
        else res.json({newMessage})
    } catch (error) {
        next(error.message)
    }
}