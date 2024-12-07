import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        regularPrice: {
            type: Number,
            required: true,
        },
        discountPrice: {
            type: Number,
            required: false,
        },
        area: {
            type: Number,
            required: true,
        },
        rooms: {
            type: Number,
            required: true,
        },
        floors: {
            type: Number,
            required: true,
        },
        bathrooms: {
            type: Number,
            required: true,
        },
        bedrooms: {
            type: Number,
            required: true,
        },
        furnished: {
            type: Boolean,
            required: true,
        },
        parking: {
            type: Boolean,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        offer: {
            type: Boolean,
            required: true,
        },
        imageUrls: {
            type: Array,
            required: true,
        },
        userRef: {
            type: String,
            required: true,
        },
        project: {
            type: Boolean,
        },  
        condition: {
            type: String,
        },
        renovation: {
            type: String,
        },
        view: {
            type: String,
        },
        subway: {
            type: String,
        },
        cadastral: {
            type: String,
        },
        fireplace: {
            type: Number,
        },
        balcony: {
            type: Number,
        },
        mansard: {
            type: Number,
        },
        garage: {
            type: Number,
        },
        wetPoint: {
            type: Number,
        },  
        shower: {
            type: Number,
        },  
        airConditioner: {
            type: Number,
        },
        porch: {
            type: Number,
        },
        basement: {
            type: Number,
        },
        storageRoom: {
            type: Boolean,
        },
        builtInFurniture: {
            type: Boolean,
        },
        technic: {
            type: Boolean,
        },
        isolatedKitchen: {
            type: Boolean,
        },
        internet: {
            type: Boolean,
        },
        cableTV: {
            type: Boolean,
        },
        centralHeat: {
            type: Boolean,
        },
        hotWaterOnGas:{
            type: Boolean,
        },
        pool: {
            type: Boolean,
        },
    },
    { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;