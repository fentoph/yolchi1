import { NextRequest } from "next/server";
import { requireUser, serverDb } from "../../../../lib/auth";
export async function GET(req: NextRequest) {
  try {
    const userId = await requireUser(req), db = serverDb();
    const { data: driver } = await db.from("driver_profiles").select("id,status").eq("user_id", userId).single();
    if (!driver || driver.status !== "APPROVED") return Response.json({ error: "DRIVER_NOT_APPROVED" }, { status: 403 });
    const { data, error } = await db.from("rides").select("*").in("status", ["SEARCHING","OFFERS_AVAILABLE"]).order("created_at",{ascending:false}).limit(50);
    if (error) throw error;
    return Response.json({ rides: data ?? [] });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "REQUEST_FAILED" }, { status: 400 });
  }
}
