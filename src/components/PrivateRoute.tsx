"use client";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["auth-check"],
    queryFn: async () => {
      const res = await fetch("/api/auth-check");
      if (!res.ok) throw new Error("Unable to Authorize");
      return res.json();
    },
  });
  if (isLoading) {
    return <div className="w-full h-screen flex flex-col justify-center items-center">Loading...</div>;
  }
  if (isError) {
    return <div className="w-full h-screen flex flex-col justify-center items-center">Error: {error?.message}</div>;
  }
  if (!data.authenticated) {
    redirect("/login");
  }
  return <>{children}</>;
};

export default PrivateRoute;
