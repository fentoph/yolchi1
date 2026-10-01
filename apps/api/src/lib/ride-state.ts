import type {RideStatus} from "@yolchi/types";
const allowed:Record<RideStatus,RideStatus[]>={SEARCHING:["OFFERS_AVAILABLE","DRIVER_SELECTED","CANCELLED","EXPIRED"],OFFERS_AVAILABLE:["DRIVER_SELECTED","CANCELLED","EXPIRED"],DRIVER_SELECTED:["DRIVER_ARRIVING","CANCELLED"],DRIVER_ARRIVING:["DRIVER_ARRIVED","CANCELLED"],DRIVER_ARRIVED:["RIDE_STARTED","CANCELLED"],RIDE_STARTED:["RIDE_COMPLETED"],RIDE_COMPLETED:["PAYMENT_PENDING"],PAYMENT_PENDING:["PAYMENT_SUCCESS"],PAYMENT_SUCCESS:[],CANCELLED:[],EXPIRED:[]};
export function canTransition(from:RideStatus,to:RideStatus){return allowed[from]?.includes(to)??false}
export function assertTransition(from:RideStatus,to:RideStatus){if(!canTransition(from,to)) throw new Error("INVALID_RIDE_TRANSITION")}
