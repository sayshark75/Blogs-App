"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { blogsOptions } from "@/libs/queryClient";
import Card from "@mui/material/Card";
import Link from "next/link";
import { motion } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";
import { TextField } from "@mui/material";

const AllBlogs = () => {
  const { data, isLoading, error, isError, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(blogsOptions);

  const [search, setSearch] = useState("");
  const [articleData, setArticleData] = useState<BlogsResponseType[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(e.target.value);
  };

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (data) {
      setArticleData(data.pages);
    }
  }, [data]);

  useEffect(() => {
    const refVal = loadMoreRef.current;
    if (!refVal) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "200px",
        threshold: 1.0,
      }
    );

    observer.observe(refVal);

    return () => {
      if (refVal) {
        observer.unobserve(refVal);
      }
    };
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <section className="w-full min-h-screen ">
      <Card className="p-4">
        <TextField
          id="outlined-basic"
          className="ml-8 w-full max-w-[300px] bg-white rounded-xl"
          label="Outlined"
          variant="outlined"
          value={search}
          onChange={handleChange}
        />
      </Card>
      <article className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {articleData.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.posts.map((blog, index) => (
              <motion.div
                className="min-h-full"
                key={`blog-card-${blog.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link className="min-h-full" href={`/${blog.id}`}>
                  <Card className="relative w-full min-h-full min-w-[300px] p-4" variant="outlined">
                    <h4 className="text-xl font-bold">{blog.title}</h4>
                    <hr className="my-2" />
                    <p className="pt-2 text-gray-700">{blog.body}</p>
                    <p className="text-blue-600 text-xs absolute bottom-1 right-1">read more...</p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </React.Fragment>
        ))}

        {/* Intersection Observer Trigger */}
        {hasNextPage && <div ref={loadMoreRef} className="bg-transparent h-12 col-span-full" />}

        {/* Loading spinner/message */}
        {isFetchingNextPage && <p className="col-span-full text-center text-gray-500">Loading more...</p>}
      </article>
    </section>
  );
};

export default AllBlogs;
