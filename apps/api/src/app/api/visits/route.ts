import { NextResponse } from "next/server";
import { serverDb } from "../../../lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COOKIE_NAME = "yolchi_visitor";

function toVisitCount(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && /^\d+$/.test(value)) return Number(value);
  return null;
}

export async function GET(req: Request) {
  const hasVisitor = req.headers.get("cookie")?.includes(`${COOKIE_NAME}=`);

  try {
    const db = serverDb();

    if (!hasVisitor) {
      const { data, error } = await db.rpc("increment_site_visits");
      const visits = toVisitCount(data);

      if (!error && visits !== null) {
        const response = NextResponse.json(
          { visits },
          { headers: { "cache-control": "no-store, max-age=0" } }
        );

        response.cookies.set(COOKIE_NAME, "1", {
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24 * 365,
          path: "/",
        });

        return response;
      }
    }

    const { data, error } = await db
      .from("site_stats")
      .select("visits")
      .eq("key", "landing")
      .maybeSingle();

    const visits = error ? null : toVisitCount(data?.visits);

    return NextResponse.json(
      { visits: visits ?? 0 },
      { headers: { "cache-control": "no-store, max-age=0" } }
    );
  } catch {
    return NextResponse.json(
      { visits: 0 },
      { headers: { "cache-control": "no-store, max-age=0" } }
    );
  }
}
