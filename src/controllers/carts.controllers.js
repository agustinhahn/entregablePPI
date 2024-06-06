import * as services from "../services/carts.services.js"

export const getCarts = async(req,res,next)=>{
    try {
        const response = await services.getCarts()
        res.status(200).json(response)
    } catch (error) {
        console.error(error)
    }
}

export const getCartByCid = async(req,res,next)=>{
    try {
        const {cid} = req.params
        const response = await services.getCartByCid(cid)
        if(!response) res.status(404).json({msg:"cart not found"})
        else res.json(response)
    } catch (error) {
        console.error(error)
    }
}

export const addCart = async(req,res,next)=>{
    try {
        const {pid} = req.params
        const response = await services.addCart(pid)
        if(!response) res.status(404).json({msg:"cart not create"})
        else res.status(200).json(response)
    } catch (error) {
        console.error(error)
    }
}

export const updateCart = async(req,res,next)=>{
    try {
        const {cid} = req.params
        const {pid} = req.params
        const response = await services.updateCart(cid,pid);
        if(!response) res.status(404).json({msg:"cart not update"})
        else res.status(200).json(response)
        } catch (error) {
        console.error(error)
    }
}

export const remove = async(req,res,next)=>{
    try {
        const {cid} = req.params
        const response = await services.remove(cid)
        if(!response) res.status(404).json({msg:"cart not remove"})
        else res.status(200).json(response)
    } catch (error) {
        console.error(error)
    }
}