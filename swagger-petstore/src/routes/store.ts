import express from "express";
import petSchema from "../db/models/orderSchema";
import orderSchema from "../db/models/orderSchema";


const storeRouter = express.Router();

storeRouter.post('/order', async (req,res) => {
    const order = new orderSchema({
        _id : req.body.id, 
        petId : req.body.petID, 
        quantity : req.body.quantity, 
        shipDate : req.body.shipDate, 
        status : req.body.status, 
        complete : req.body.complete, 
    })

    try {
        const newOrder = order.save()
        res.status(201).json(newOrder)
    } catch (error) {
        const unknownErrorMessage = "Unknown Error"
        if (error instanceof Error){
            res.status(400).json({message: error.message})
        } else {
            res.status(400).json({message: unknownErrorMessage})
        }
    }

})

storeRouter.get('/order/:id', async (req,res) => {
    try {
        const inputpetId = Number(req.params.id)
        // TODO: Add error handling for 400 and 404 (invalid id suppllied, pet not found)
        const order = await orderSchema.find({petId : inputpetId})
        res.status(200).json(order)
    } catch (error) {
        let unknownErrorMessage = "Unknown Error"
        if (error instanceof Error){
            res.status(500).json({message: error.message})
        } else {
            res.status(500).json({message: unknownErrorMessage})
        }
    }
})

storeRouter.delete('/order/:id', async (req,res) => {
    try {
        const inputId = Number(req.params.id)
        // TODO: Add error handling for 400 and 404 (invalid id suppllied, pet not found)
        const order = await orderSchema.findById(inputId)
        if (order === null){
            res.status(404).json({message: "Pet not found"})
        } else{
            await order.deleteOne()
            res.status(200).json({message : "Pet deleted!", order})
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


export default storeRouter; 