import mongoose from "mongoose"
enum OrderStatus{
    Available,
    Pending,
    Sold
};

const PetSchema = new mongoose.Schema({
    id :{
        type: Number,
        required: [true, "ID is a required field"],
        unique: [true, "ID must be unique"]
    },
    name :{
        type: String,
        required: [true, "Provide a name"],
        unique: false
    },
    photoURLs :{
        type: [String], //TODO: Fix this typing to be a mapping
        required: false,
        unique: [true, "Photo URLs must be unique"]

    },

    status :{
        type: OrderStatus,
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