import express from "express";
import petSchema from "../db/models/petSchema";
// TODO: implement error handling middleware.
// TODO: Add category, photoURLs and Tags to the creation operator


const petRouter = express.Router();

petRouter.get('/findByStatus', async (req,res) => {
    // Insert some validation rule checking here
    try {
        const filterList : Array<{status : String}> = [];

        req.body.statusArray.forEach((statusToMatch : String ) => {
            filterList.push({status : statusToMatch})
        });

        const pets = await petSchema.find({ $or : filterList});

        if (pets === null){
            console.log("No pets found with the listed statuses")
        } else {
            res.status(200).json(pets)
        }

    } catch (error) {
        // Pet not found
        const unknownErrorMessage = "Unknown Error"
        if (error instanceof Error){
            res.status(404).json({message: error.message})
        } else {
            res.status(400).json({message: unknownErrorMessage})
        }
    }

}
)

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
        // TODO: Add error handling for 400 (invalid id supplied)
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
        const unknownErrorMessage = "Unknown Error"
        if (error instanceof Error){
            res.status(400).json({message: error.message})
        } else {
            res.status(400).json({message: unknownErrorMessage})
        }
    }

})

// TODO add error 405 handling
petRouter.put('/', async (req,res) => {
    // Insert some validation rule checking here
    try {
        let pet = await petSchema.findById(req.body.id);
        if (pet === null){
            console.log("No pet found with that ID")
        } else {
            pet.name = req.body.name;
            pet.status = req.body.status;
            await pet.save()
            res.status(200).json({message : "Successfully updated pet", updatedPet : pet})
        }

    } catch (error) {
        // Pet not found
        const unknownErrorMessage = "Unknown Error"
        if (error instanceof Error){
            res.status(404).json({message: error.message})
        } else {
            res.status(400).json({message: unknownErrorMessage})
        }
    }

}

)





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