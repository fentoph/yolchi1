export type RideStatus="SEARCHING"|"OFFERS_AVAILABLE"|"DRIVER_SELECTED"|"DRIVER_ARRIVING"|"DRIVER_ARRIVED"|"RIDE_STARTED"|"RIDE_COMPLETED"|"PAYMENT_PENDING"|"PAYMENT_SUCCESS"|"CANCELLED"|"EXPIRED";
export type OfferStatus="pending"|"accepted_by_passenger"|"rejected"|"expired"|"withdrawn";
export interface Ride{ id:string; passengerId:string; pickup:{lat:number;lng:number;address?:string}; destination:{lat:number;lng:number;address?:string}; proposedPrice:number; finalPrice?:number; status:RideStatus; selectedDriverId?:string; createdAt:string; }
export interface RideOffer{id:string;rideId:string;driverId:string;price:number;status:OfferStatus;expiresAt:string;etaMinutes?:number;}
export interface DriverLocation{driverId:string;latitude:number;longitude:number;accuracy?:number;heading?:number;speed?:number;updatedAt:string;}
