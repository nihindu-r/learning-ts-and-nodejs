import express from "express";
import petSchema from "../db/models/petSchema";
// TODO: implement error handling middleware.
// TODO: Add category, photoURLs and Tags to the creation operator


const petRouter = express.Router();
// Find by petID - 
petRouter.get('/:id', async (req,res) => {
    try {
        const petId = Number(req.params.id)
        // TODO: Add error handling for 400 and 404 (invalid id suppllied, pet not found)
        const pet = await petSchema.findById(petId)
        res.status(200).json(pet)
    } catch (error) {
        let unknownErrorMessage = "Unknown Error"
        if (error instanceof Error){
            res.status(500).json({message: error.message})
        } else {
            res.status(500).json({message: unknownErrorMessage})
        }
    }
})

// DELETE by petId
petRouter.delete('/:id', async (req,res) => {
    try {
        const petId = Number(req.params.id)
        // TODO: Add error handling for 400 (invalid id suppllied)
        const pet = await petSchema.findById(petId)
        if (pet === null){
            res.status(404).json({message: "Pet not found"})
        } else{
            await pet.deleteOne()
            res.status(200).json({message : "Pet deleted!", pet})
        }
        
    } catch (error) {
        let unknownErrorMessage = "Unknown Error"
        if (error instanceof Error){
            res.status(500).json({message: error.message})
        } else {
            res.status(500).json({message: unknownErrorMessage})
        }
    }
})

// TODO: Fix so that failing validation doesn't kill the app and instead returns a 405 error.
petRouter.post('/', async (req,res) => {
    const pet = new petSchema({
        _id : req.body.id,
        name: req.body.name,
        status:req.body.status
    })

    try {
        const newPet = pet.save()
        res.status(201).json(newPet)
    } catch (error) {
        let unknownErrorMessage = "Unknown Error"
        if (error instanceof Error){
            res.status(400).json({message: error.message})
        } else {
            res.status(400).json({message: unknownErrorMessage})
        }
    }

})






// async function getPet(req: Request,res: Response,next : Function){
//     try {
//         const pet = await petSchema.findById(req.params.id)
//         if (pet === null){
//             return res.status(404).json({message: "Cannot find pet"})
//         }
//     } catch (error) {
//         return res.status(500).json({message: "Server error"})
//     }
//         res.pet = pet
//         next()
// }

export default petRouter;