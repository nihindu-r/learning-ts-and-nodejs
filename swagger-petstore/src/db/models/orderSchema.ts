import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    _id :{
        type: Number,
        // Can't specify it, _id must have these properties, can't be modified
        // required: [true, "ID is a required field"],
        // unique: [true, "ID must be unique"]
    },
    petId :{
        type: String,
        required: [true, "petId is a required field"],
        unique: [true, "petId must be unique"]
    },
    quantity :{
        type: Number,
        required: [true, "Provide a quantity"],
        unique: false
    },
    shipDate :{
        type: Date,
        required: false,
        unique: false
    },
    status :{
        type: String,
        enum: ["Placed" , "Approved" , "Delivered"],
        default : "Available",
        required: [true, "Status is a required field"],
        unique: false
    },

    complete :{
        type: Boolean,
        required: [true, "Order completion is a required field"],
        unique: false
    }
})

export default mongoose.model('Orders', OrderSchema)