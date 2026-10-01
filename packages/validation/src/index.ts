import {z} from "zod";
export const coordinate=z.object({lat:z.number().min(-90).max(90),lng:z.number().min(-180).max(180)});
export const createRideSchema=z.object({pickup:coordinate,destination:coordinate,proposedPrice:z.number().int().positive().max(100000000),passengerCount:z.number().int().min(1).max(8),comment:z.string().trim().max(500).optional(),luggage:z.boolean().optional(),vehicleCategory:z.enum(["STANDARD","COMFORT","XL"])});
export const offerSchema=z.object({rideId:z.string().uuid(),price:z.number().int().positive().max(100000000)});
