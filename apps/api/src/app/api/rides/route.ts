import { NextRequest } from "next/server";
import { createRideSchema } from "@yolchi/validation";
import { requireUser, serverDb } from "../../../lib/auth";
export async function POST(req:NextRequest){
  try{
    const userId=await requireUser(req), body=createRideSchema.parse(await req.json()), d=serverDb();
    const {data:active}=await d.from("rides").select("id,status").eq("passenger_id",userId).in("status",["SEARCHING","OFFERS_AVAILABLE","DRIVER_SELECTED","DRIVER_ARRIVING","DRIVER_ARRIVED","RIDE_STARTED","PAYMENT_PENDING"]).maybeSingle();
    if(active) return Response.json({error:"ACTIVE_RIDE_EXISTS",ride:active},{status:409});
    const {data,error}=await d.from("rides").insert({passenger_id:userId,pickup_lat:body.pickup.lat,pickup_lng:body.pickup.lng,pickup_address:body.pickup.address??null,destination_lat:body.destination.lat,destination_lng:body.destination.lng,destination_address:body.destination.address??null,proposed_price:body.proposedPrice,passenger_count:body.passengerCount,comment:body.comment??null,luggage:body.luggage??false,vehicle_category:body.vehicleCategory,status:"SEARCHING"}).select().single();
    if(error) throw error;
    return Response.json({ride:data},{status:201});
  }catch(e){return Response.json({error:e instanceof Error?e.message:"BAD_REQUEST"},{status:400});}
}
export async function GET(req:NextRequest){
  try{
    const userId=await requireUser(req),d=serverDb(),{data,error}=await d.from("rides").select("*").eq("passenger_id",userId).order("created_at",{ascending:false}).limit(20);
    if(error) throw error;
    return Response.json({rides:data??[]});
  }catch(e){return Response.json({error:e instanceof Error?e.message:"UNAUTHORIZED"},{status:401});}
}
