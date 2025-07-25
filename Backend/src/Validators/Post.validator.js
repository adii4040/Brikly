import { z } from "zod";
import { AvailablePropertyStatus, AvailablePropertyType, AvailablePetPolicy, AvailableUtilityPolicy, } from "../Utils/Constants.js";

// Define reusable address schema
export const addressSchema = z.object({

});

// Define the full post schema
export const postValidation = z.object({

    title: z.string().trim().min(1, "Title is required").max(50, "Title should not exceed more that 50 char"),

    price: z.coerce.number({ message: "Price is required!" }).refine(val => val > 0, {
        message: "Price is required!"
    }),

    landmark: z.string().trim(),
    city: z.string().trim(),
    state: z.string().trim(),
    pincode: z
        .coerce
        .number()
        .int("Pincode must be an integer")
        .gte(100000, "Pincode must be at least 6 digits")
        .lte(999999, "Pincode must be at most 6 digits"),
    latitude: z
        .coerce.number({ message: "Latitude is required" })
        .refine(val => val >= -90 && val <= 90, {
            message: "Latitude must be between -90 and 90",
        }),

    longitude: z
        .coerce.number({ message: "Longitude is required" })
        .refine(val => val >= -180 && val <= 180, {
            message: "Longitude must be between -180 and 180",
        }),

    bedrooms: z.coerce.number().refine(val => val > 0, {
        message: "Number of bedrooms are missing!"
    }),
    bathrooms: z.coerce.number().refine(val => val > 0, {
        message: "Number of bethrooms are missing!"
    }),

    propertyType: z.enum(AvailablePropertyType, {
        message: `Invalid property type, can only select among ${AvailablePropertyType}`
    }),

    propertyStatus: z.enum(AvailablePropertyStatus, {
        message: `Invalid property status, can only select between ${AvailablePropertyStatus}`
    }),


    //More post details...

    utilityPolicy: z.enum(AvailableUtilityPolicy, {
        message: `Invalid property status, can only select between ${AvailableUtilityPolicy}`
    }),

    petPolicy: z.enum(AvailablePetPolicy, {
        message: `Invalid property status, can only select between ${AvailablePetPolicy}`
    }),

    incomePolicy: z.string().trim().min(1, {message: "Income Policy is required!"}),

    size: z.coerce.number().refine(val => val > 0, {
        message: "Size of the house missing!"
    }),

    schoolDist: z.coerce.number().refine(val => val > 0, {
        message: "School distance is missing"
    }),

    hospitalDist: z.coerce.number().refine(val => val > 0, {
        message: "Hospital distance is missing"
    }),

    restaurantDist: z.coerce.number().refine(val => val > 0, {
        message: "Restaurant distance is missing"
    }),

    railwayStationDist: z.coerce.number().refine(val => val > 0, {
        message: "Railway station distance is missing"
    }),

    busStopDist: z.coerce.number().refine(val => val > 0, {
        message: "Bus stand distance is missing"
    }),

    airportDist: z.coerce.number().refine(val => val > 0, {
        message: "Airport distance is missing"
    }),

    description: z
        .string()
        .trim()
        .min(50, {
            message: "Description should be more than 50 charachters!!"
        })
        .max(300, {
            message: "Description should be not exceed 300 charachters!!"
        }),


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
    }).optional().or(z.literal("")),

    //More post details...

    description: z
        .string()
        .trim()
        .min(50, {
            message: "Description should be more than 50 charachters!!"
        })
        .max(300, {
            message: "Description should be not exceed 300 charachters!!"
        }).optional().or(z.literal("")),

    utilityPolicy: z.enum(AvailableUtilityPolicy, {
        message: `Invalid property status, can only select between ${AvailableUtilityPolicy}`
    }).optional().or(z.literal("")),

    petPolicy: z.enum(AvailablePetPolicy, {
        message: `Invalid property status, can only select between ${AvailablePetPolicy}`
    }).optional().or(z.literal("")),

    incomePolicy: z.string().trim().optional().or(z.literal("")),

    size: z.coerce.number().refine(val => val > 0, {
        message: "Size of the house missing!"
    }).optional().or(z.literal("")),

    schoolDist: z.coerce.number().refine(val => val > 0, {
        message: "School distance is missing"
    }).optional().or(z.literal("")),

    hospitalDist: z.coerce.number().refine(val => val > 0, {
        message: "Hospital distance is missing"
    }).optional().or(z.literal("")),

    restaurantDist: z.coerce.number().refine(val => val > 0, {
        message: "Restaurant distance is missing"
    }).optional().or(z.literal("")),

    railwayStationDist: z.coerce.number().refine(val => val > 0, {
        message: "Railway station distance is missing"
    }).optional().or(z.literal("")),

    busStopDist: z.coerce.number().refine(val => val > 0, {
        message: "Bus stand distance is missing"
    }).optional().or(z.literal("")),

    airportDist: z.coerce.number().refine(val => val > 0, {
        message: "Airport distance is missing"
    }).optional().or(z.literal("")),


});
