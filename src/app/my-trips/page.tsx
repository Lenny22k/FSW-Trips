"use client";

import Button from "@/components/Button";
import { Prisma, TripReservation } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserReservationItem } from "./container/UserReservationItem";

export default function MyTrips() {
  const [reservations, setReservations] = useState<
    Prisma.TripReservationGetPayload<{
      include: { trip: true };
    }>[]
  >([]);

  const router = useRouter();

  const { status, data } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/");
    }

    const fetchReservation = async () => {
      const response = await fetch(
        `/api/user/${(data?.user as any)?.id}/reservations`
      );

      const res = await response.json();

      setReservations(res);
    };

    fetchReservation();
  }, [status, router, data?.user]);

  return (
    <div className="container mx-auto p-5">
      <h1 className="font-semibold text-primaryDarker text-xl ">
        Minhas Viagens
      </h1>
      {reservations.length > 0 ? (
        <div className="flex flex-col">
          {reservations?.map((reservation) => (
            <UserReservationItem
              // fetchReservations={fetchReservations}
              key={reservation.id}
              reservation={reservation}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col ">
          <p className="mt-2 font-medium text-primaryDarker">
            Você ainda não tem nenhuma reserva! =(
          </p>

          <Link href="/">
            <Button className="w-full mt-2 ">Fazer reserva</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
