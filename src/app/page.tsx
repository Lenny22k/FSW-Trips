"use client";

import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();

  return (
    <div>
      <button onClick={() => signIn()}>login</button>
      {data?.user?.name}
      {data?.user?.image}
    </div>
  );
}
