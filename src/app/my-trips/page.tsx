"use client";

import { TripReservation } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyTrips() {
  const [reservations, setReservations] = useState<TripReservation[]>([]);

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
  }, [status]);

  return <div>oi</div>;
}
