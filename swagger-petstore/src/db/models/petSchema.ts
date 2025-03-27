import mongoose from "mongoose"
const PetSchema = new mongoose.Schema({
    _id :{
        type: Number,
        // Can't specify it, _id must have these properties, can't be modified
        // required: [true, "ID is a required field"],
        // unique: [true, "ID must be unique"]
    },
    name :{
        type: String,
        required: [true, "Provide a name"],
        unique: false
    },
    photoURLs :{
        type: [String], //TODO: Fix this typing to be a mapping
        required: false,
        unique: false //If these must be unique, they must also be required

    },

    status :{
        type: String,
        enum: ["Available" , "Pending" , "Sold"],
        default : "Available",
        required: [true, "Status is a required field"],
        unique: false
    },

    // tags :{
    //     type: Boolean,
    //     required: [true, "Order completion is a required field"],
    //     unique: false
    // }
})

export default mongoose.model('Pets', PetSchema)