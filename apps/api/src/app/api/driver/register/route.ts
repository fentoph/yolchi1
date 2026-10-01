import { NextRequest } from "next/server";
import { z } from "zod";
import { requireUser, serverDb } from "../../../../lib/auth";

const schema = z.object({
  birthDate: z.string().regex(/^\\d{4}-\\d{2}-\\d{2}$/),
  licenseNumber: z.string().trim().min(4).max(40),
  vehicle: z.object({
    brand: z.string().trim().min(2).max(40),
    model: z.string().trim().min(1).max(40),
    year: z.number().int().min(1990).max(new Date().getFullYear()+1),
    color: z.string().trim().min(2).max(30),
    plateNumber: z.string().trim().min(3).max(20),
    vehicleType: z.enum(["STANDARD","COMFORT","XL"])
  }),
  documents: z.object({
    license: z.string().trim().min(4).max(60),
    vehicleRegistration: z.string().trim().min(4).max(60),
    id: z.string().trim().min(4).max(60)
  })
});

export async function POST(req: NextRequest) {
  try {
    const userId = await requireUser(req);
    const body = schema.parse(await req.json());
    const db = serverDb();
    const { data: existing } = await db.from("driver_profiles").select("id,status").eq("user_id", userId).maybeSingle();
    if (existing) return Response.json({ driver: existing }, { status: 200 });

    const { data: driver, error } = await db.from("driver_profiles").insert({
      user_id: userId, status: "PENDING", birth_date: body.birthDate, license_number: body.licenseNumber
    }).select("id,status").single();
    if (error) throw error;

    const { error: vehicleError } = await db.from("vehicles").insert({
      driver_id: driver.id, brand: body.vehicle.brand, model: body.vehicle.model, year: body.vehicle.year,
      color: body.vehicle.color, plate_number: body.vehicle.plateNumber, vehicle_type: body.vehicle.vehicleType
    });
    if (vehicleError) throw vehicleError;

    const docs = [
      { driver_id: driver.id, document_type: "LICENSE", document_number: body.documents.license },
      { driver_id: driver.id, document_type: "VEHICLE_REGISTRATION", document_number: body.documents.vehicleRegistration },
      { driver_id: driver.id, document_type: "ID", document_number: body.documents.id }
    ];
    const { error: docsError } = await db.from("driver_documents").insert(docs);
    if (docsError) throw docsError;
    return Response.json({ driver }, { status: 201 });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "BAD_REQUEST" }, { status: 400 });
  }
}
