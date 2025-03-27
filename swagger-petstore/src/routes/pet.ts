import express from "express";
import petSchema from "../db/models/petSchema";
// TODO: implement error handling middleware.


const petRouter = express.Router();
// Find by petID
petRouter.post('/:id', async (req,res) => {
    try {
        const petId = req.params.id

    } catch (error) {
        let unknownErrorMessage = "Unknown Error"
        if (error instanceof Error){
            res.status(500).json({message: error.message})
        } else {
            res.status(500).json({message: unknownErrorMessage})
        }
    }
})


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


export default petRouter;