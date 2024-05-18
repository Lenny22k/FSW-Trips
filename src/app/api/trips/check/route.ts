import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json();

  const reservations = await prisma.tripReservation.findMany({
    where: {
      // verifica se existe reserva entre as datas
      tripId: req.tripId,
      // o starDate da reserva tem q ser <= a data do endDate
      startDate: {
        lte: new Date(req.endDate),
      },
      // o endDate da reserva tem q ser >= a data do starDate
      endDate: {
        gte: new Date(req.startDate),
      },
    },
  });

  if (reservations.length > 0) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "TRIP_ALREADY_RESERVED",
        },
      })
    );
  }

  return new NextResponse(
    JSON.stringify({
      success: true,
    })
  );
}
