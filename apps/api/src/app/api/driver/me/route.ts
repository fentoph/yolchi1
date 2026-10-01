import { NextRequest } from "next/server";
import { requireUser, serverDb } from "../../../../lib/auth";
export async function GET(req: NextRequest) {
  try {
    const userId = await requireUser(req), db = serverDb();
    const { data: driver } = await db.from("driver_profiles").select("*,vehicles(*),driver_documents(*)").eq("user_id", userId).maybeSingle();
    return Response.json({ driver: driver ?? null });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "UNAUTHORIZED" }, { status: 401 });
  }
}
