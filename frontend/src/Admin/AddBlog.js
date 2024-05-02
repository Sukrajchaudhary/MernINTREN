import React from "react";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Common/Loading";
import toast from "react-hot-toast";
import {
  CreateBlogAsync,
  BlogInfo,
  AllUserBlogs,
  LoadingStatus,
  errorMessage,
} from "../features/Blog/blogSlice";

const AddBlog = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(LoadingStatus);
  const createdBlog = useSelector(BlogInfo);
  const error = useSelector(errorMessage);
  const [value, setValue] = useState({
    title: "",
    description: "",
    thumbnail: "",
    category:""
  });
  const handleChange = (e) => {
    if (e.target.type === "file") {
      setValue({
        ...value,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setValue({
        ...value,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in value) {
      formData.append(key, value[key]);
    }
    dispatch(CreateBlogAsync(formData));
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <section className="rounded-md">
      <div className="flex items-center justify-center bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md border p-6">
          <h2 className="text-2xl font-bold leading-tight text-black">
            Add Your Blog
          </h2>

          <form onSubmit={handleSubmit} className="mt-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Enter Title{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Title"
                    id="Title"
                    name="title"
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Enter Category{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Category"
                    id="category"
                    name="category"
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Enter Description{" "}
                </label>
                <div className="mt-2">
                  <textarea
                    className="flex  w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Description"
                    id="description"
                    name="description"
                    onChange={handleChange}
                    cols="30"
                    rows="10"
                  ></textarea>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Choose Thumbnail{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="file"
                    placeholder="thumbnail"
                    id="thumbnail"
                    name="thumbnail"
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Add <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddBlog;
