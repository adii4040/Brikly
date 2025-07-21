import { z } from "zod";
import { AvailablePropertyStatus, AvailablePropertyType } from "../Utils/Constants.js";

// Define reusable address schema
export const addressSchema = z.object({

});

// Define the full post schema
export const postValidation = z.object({

    title: z.string().trim().min(1, "Title is required"),

    price: z.coerce.number(),

    landmark: z.string(),
    city: z.string(),
    state: z.string(),
    pincode: z
        .coerce
        .number()
        .int("Pincode must be an integer")
        .gte(100000, "Pincode must be at least 6 digits")
        .lte(999999, "Pincode must be at most 6 digits"),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),

    bedrooms: z.coerce.number(),
    bathrooms: z.coerce.number(),

    propertyType: z.enum(AvailablePropertyType, {
        message: `Invalid property type, can only select among ${AvailablePropertyType}`
    }),

    propertyStatus: z.enum(AvailablePropertyStatus, {
        message: `Invalid property status, can only select between ${AvailablePropertyStatus}`
    })
});

export const postUpdateValidation = z.object({
    title: z.string().trim().optional().or(z.literal("")),
    
    price: z.coerce.number().optional().or(z.literal("")),
    
    landmark: z.string().optional().or(z.literal("")),
    
    city: z.string().optional().or(z.literal("")),
    
    state: z.string().optional().or(z.literal("")),
    
    pincode: z
        .coerce
        .number()
        .int("Pincode must be an integer")
        .gte(100000, "Pincode must be at least 6 digits")
        .lte(999999, "Pincode must be at most 6 digits")
        .optional().or(z.literal("")),
        
    latitude: z.coerce.number().optional().or(z.literal("")),
    
    longitude: z.coerce.number().optional().or(z.literal("")),
    
    bedrooms: z.coerce.number().optional().or(z.literal("")),
    
    bathrooms: z.coerce.number().optional().or(z.literal("")),
    
    propertyType: z.enum(AvailablePropertyType, {
        message: `Invalid property type, can only select among ${AvailablePropertyType}`
    }).optional().or(z.literal("")),
    
    propertyStatus: z.enum(AvailablePropertyStatus, {
        message: `Invalid property status, can only select between ${AvailablePropertyStatus}`
    }).optional().or(z.literal(""))
    
});
