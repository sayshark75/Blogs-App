import PrivateRoute from "@/components/PrivateRoute";
import SingleBlog from "@/components/SingleBlog";
import React from "react";

export default async function SinglePostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <PrivateRoute>
      <div>
        <SingleBlog id={id} />
      </div>
    </PrivateRoute>
  );
}
