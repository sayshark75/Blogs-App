"use client";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaTags, FaThumbsDown, FaThumbsUp } from "react-icons/fa6";

const SingleBlog = ({ id }: { id: string }) => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["single-blog"],
    queryFn: async () => {
      const res = await fetch(`/api/posts/${id}`);
      if (!res.ok) throw new Error("Unable to get Blog Post");
      return (await res.json()) as BlogsType;
    },
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full min-h-screen max-w-[90%] mx-auto pt-24">
      <h3 className="text-2xl md:text-6xl text-center font-bold mb-4">{data?.title}</h3>
      <p className="max-w-[600px] mx-auto">{data?.body}</p>
      <div className="w-full mt-4 md:mt-0 flex justify-start md:justify-between items-center flex-col md:flex-row">
        <div className="flex gap-2 items-center">
          <FaTags />
          {data?.tags.join(", ")}
        </div>
        <div className="flex pt-4 justify-center gap-6 items-center">
          <Button variant="outlined" startIcon={<FaThumbsUp />}>
            Likes: {data?.reactions.likes}
          </Button>

          <Button variant="outlined" startIcon={<FaThumbsDown />}>
            Dislikes: {data?.reactions.dislikes}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
