import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BlogInfo, getBlogByidAsync } from "../blogSlice";
import { useDispatch, useSelector } from "react-redux";
const ViewBlog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const Blog = useSelector(BlogInfo);
  useEffect(() => {
    dispatch(getBlogByidAsync(id));
  }, [dispatch, id]);
  return (
    <div>
      <main className="mt-10 p-4">
        <div
          className="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative"
          style={{ height: "24em" }}
        >
          <div
            className="absolute left-0 bottom-0 w-full h-full z-10"
            style={{
              backgroundImage:
                "linear-gradient(180deg,transparent,rgba(0,0,0,.7))",
            }}
          />
          <img
            src={Blog.thumbnail}
            className="absolute left-0 top-0 w-full h-full z-0 object-cover justify-center items-center"
          />
          <div className="p-4 absolute bottom-0 left-0 z-20">
            <h2 className="text-4xl font-semibold text-gray-100 leading-tight">
              {Blog.title}
            </h2>
            <div className="flex mt-3">
              <p className="h-10 w-10 rounded-full border text-white font-bold flex justify-center items-center mr-2 object-cover">
                {Blog?.user?.username.charAt(0).toUpperCase()}{" "}
              </p>
              <div>
                <p className="font-bold text-green-200 text-sm">
                  {" "}
                  <span className="block text-white">Post BY</span>
                  {Blog?.user?.username}{" "}
                </p>
                <p className="font-semibold text-gray-400 text-xs">
                  {" "}
                  {Blog?.createdAt
                    ? new Date(Blog.createdAt).toLocaleString()
                    : ""}
                  {""}
                </p>
              </div>
            </div>
          </div>
        </div>




        <div className="px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
          <p className="pb-6">{Blog.description}</p>
        </div>
      </main>
    </div>
  );
};

export default ViewBlog;
