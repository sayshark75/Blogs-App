"use client";

import AllBlogs from "@/components/AllBlogs";
import PrivateRoute from "@/components/PrivateRoute";

export default function Home() {
  return (
    <PrivateRoute>
      <main className="flex flex-col pt-24 justify-center items-center w-full min-h-screen p-6">
        <AllBlogs />
      </main>
    </PrivateRoute>
  );
}
