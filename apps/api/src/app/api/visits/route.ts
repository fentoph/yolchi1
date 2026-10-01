import { NextResponse } from "next/server";
import { serverDb } from "../../../lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const response = NextResponse.json({ visits: 0 });
  const hasVisitor = req.headers.get("cookie")?.includes("yolchi_visitor=");

  try {
    const db = serverDb();

    if (!hasVisitor) {
      const { data, error } = await db.rpc("increment_site_visits");
      if (!error && typeof data === "number") {
        response.cookies.set("yolchi_visitor", "1", {
          httpOnly: true,
          sameSite: "lax",
          secure: true,
          maxAge: 60 * 60 * 24 * 365,
          path: "/",
        });
        return NextResponse.json({ visits: data }, {
          headers: { "cache-control": "no-store" },
        });
      }
    }

    const { data } = await db
      .from("site_stats")
      .select("visits")
      .eq("key", "landing")
      .maybeSingle();

    return NextResponse.json(
      { visits: typeof data?.visits === "number" ? data.visits : 0 },
      { headers: { "cache-control": "no-store" } }
    );
  } catch {
    return response;
  }
}
