

export const getAll = async(req,res,next)=>{
    try {
        const response = await services.getAll()
        res.status(200).json(response)
    } catch (error) {
        console.error(error)
    }
}

export const getById = async(req,res,next)=>{
    try {
        const {id} = req.params
        const response = await services.getById(id)
        if(!response) res.status(404).json({msg:"cart not found"})
        else res.json(response)
    } catch (error) {
        console.error(error)
    }
}

export const create = async(req,res,next)=>{
    try {
        const response = await services.create(obj)
        if(!response) res.status(404).json({msg:"cart not create"})
        else res.status(200).json(response)
    } catch (error) {
        console.error(error)
    }
}

export const update = async(req,res,next)=>{
    try {
        const {id} = req.params
        const response = await services.update(id,req.body);
        if(!response) res.status(404).json({msg:"cart not update"})
        else res.status(200).json(response)
        } catch (error) {
        console.error(error)
    }
}

export const remove = async(req,res,next)=>{
    try {
        const {id} = req.params
        const response = await services.remove(id)
        if(!response) res.status(404).json({msg:"cart not remove"})
        else res.status(200).json(response)
    } catch (error) {
        console.error(error)
    }
}