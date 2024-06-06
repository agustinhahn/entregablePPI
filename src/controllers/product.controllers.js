import * as services from "../services/product.services.js"

export const getAll = async(req,res,next) =>{
    try {
        const response = await services.getAll();
        const plainResponse = response.map(p => p.toObject())
        res.render('home', {response:plainResponse})
        // res.json(plainResponse)
    } catch (error) {
        next(error.message);
    }
}

export const getById = async(req,res,next)=>{
    try {
        const {id} = req.params
        const product = await services.getById(id)
        if(!product) res.status(404).json({msg:"product not found"})
        else res.json(product)
    } catch (error) {
        next(error.message)
    }
}

export const create = async(req,res,next)=>{
    try {
        const newProduct = await services.create(req.body)
        if(!newProduct) res.status(404).json({msg:"Error creating product"})
        else res.json(newProduct)
    } catch (error) {
        next(error.message)
    }
}

export const update = async(req,res,next)=>{
    try {
        const {id} = req.params
        const updateProduct = await services.update(id, req.body)
        if(!updateProduct) res.status(404).json({msg:"Error updating product"})
        else res.json(updateProduct)
    } catch (error) {
        next(error.message)
    }
}

export const remove = async(req,res,next)=>{
    try {
        const {id} = req.params
        const productDelete = await services.remove(id)
        if(!productDelete) res.status(404).json({msg:"Error deleting product"})
        else res.json(productDelete)
    } catch (error) {
        next(error.message)
    }
}