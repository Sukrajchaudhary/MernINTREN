import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {AllUserBlogs} from "../blogSlice";
import Footer from "../../../components/Footer";
const Blog = () => {
  const blog = useSelector(AllUserBlogs);

  return (
    <>
    <div className="flex flex-wrap p-4">
      {blog?.map((blog, index) => (
        <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
          <Link to={`/blog/view/${blog._id}`}>
            <article className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
              <img
                alt=""
                src={blog.thumbnail}
                className="h-56 w-full object-cover"
              />
              <div className="p-4 sm:p-6">
                <a href="#">
                  <h3 className="text-lg font-medium text-gray-900">
                    {blog.title}
                  </h3>
                </a>
                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                  {blog.description.substring(0, 150) + "......"}
                </p>
                <a
                  href="#"
                  className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
                >
                  Find out more
                  <span
                    aria-hidden="true"
                    className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                  >
                    &rarr;
                  </span>
                </a>
              </div>
            </article>
          </Link>
        </div>
      ))}
    </div>
    <Footer></Footer>
    </>
    
  );
};

export default Blog;
