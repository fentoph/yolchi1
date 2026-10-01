import { NextRequest } from "next/server";
import { db } from "../../../../../lib/supabase";
import { offerSchema } from "@yolchi/validation";
import { requireUser } from "../../../../../lib/auth";
export async function GET(req:NextRequest,{params}:{params:Promise<{id:string}>}){
  try{const uid=await requireUser(req),{id}=await params,d=db();const {data:ride}=await d.from("rides").select("passenger_id").eq("id",id).single();if(!ride||ride.passenger_id!==uid)return Response.json({error:"FORBIDDEN"},{status:403});const {data,error}=await d.from("ride_offers").select("*,driver_profiles(id,user_id,status)").eq("ride_id",id).order("created_at",{ascending:false});if(error)throw error;return Response.json({offers:data??[]});}catch(e){return Response.json({error:e instanceof Error?e.message:"BAD_REQUEST"},{status:400});}
}
export async function POST(req:NextRequest,{params}:{params:Promise<{id:string}>}){
  try{const driverId=await requireUser(req),{id}=await params,b=offerSchema.parse({...await req.json(),rideId:id}),d=db();const {data:driver}=await d.from("driver_profiles").select("id,status").eq("user_id",driverId).single();if(driver?.status!=="APPROVED")return Response.json({error:"DRIVER_NOT_APPROVED"},{status:403});const {data:ride}=await d.from("rides").select("id,status").eq("id",id).single();if(!ride||!["SEARCHING","OFFERS_AVAILABLE"].includes(ride.status))return Response.json({error:"RIDE_NOT_OPEN"},{status:409});const expires=new Date(Date.now()+120000).toISOString();const {data,error}=await d.from("ride_offers").insert({ride_id:id,driver_id:driver.id,price:b.price,expires_at:expires}).select().single();if(error)throw error;await d.from("rides").update({status:"OFFERS_AVAILABLE"}).eq("id",id).eq("status","SEARCHING");return Response.json({offer:data},{status:201});}catch(e){return Response.json({error:e instanceof Error?e.message:"BAD_REQUEST"},{status:400});}
}
