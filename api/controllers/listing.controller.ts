import { NextFunction, Request, Response } from "express";
import Listing from "../models/listing.model";
import { errorHandler } from "../utils/error";

export const createListing = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const listing = await Listing.create(req.body);

        res.status(201).json(listing);
    }
    catch (error) {
        next(error);
    }
};

export const deleteListing = async (req: Request, res: Response, next: NextFunction) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) return next(errorHandler(404, 'Listing not found!'));

    if (typeof req.user === 'string' || !('id' in req.user)) return next(errorHandler(401, 'Unauthorized account'));

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing has been deleted!');
    }
    catch (error) {
        next(error);
    }
};

export const updateListing = async (req: Request, res: Response, next: NextFunction) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) return next(errorHandler(404, 'Listing not found!'));

    
    if (typeof req.user === 'string' || !('id' in req.user)) return next(errorHandler(401, 'Unauthorized account'));

    if (req.user.id !== listing.userRef) return next(errorHandler(401, 'You can only update yourr own listings!'));

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updateListing);
    }
    catch (error) {
        next(error);
    }
};

export const getListing = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) return next(errorHandler(404, 'Listing not found!'));

        res.status(200).json(listing);
    }
    catch (error) {
        next(error);
    }
};