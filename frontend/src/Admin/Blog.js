import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../Common/Loading";
import toast from "react-hot-toast";
import {
  getOwnBlogAsync,
  BlogInfo,
  LoadingStatus,
  deleteBlogAsync,
} from "../features/Blog/blogSlice";
import Dialougebox from "../Common/Dialougebox";
const Blog = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const blog = useSelector(BlogInfo);
  const isLoading = useSelector(LoadingStatus);
  
  useEffect(() => {
    dispatch(getOwnBlogAsync());
  }, [dispatch]);
  const handleDelete = ( id) => {
    dispatch(deleteBlogAsync(id));
    toast.success("Deleted Success Fully");
  };
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <div className="flex flex-wrap p-4">
        {blog.length > 0 ? (
          blog.map((blog, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 cursor-pointer"
            >
              <article className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
                <div className="relative">
                  <img
                    alt=""
                    src={blog.thumbnail}
                    className="h-56 w-full object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute top-0 gap-4 left-0 w-full h-full flex items-center justify-center opacity-0 transition-opacity duration-300 bg-black bg-opacity-50 hover:opacity-100">
                    {/* Edit button */}
                    <Link
                      className="bg-white text-black px-4 py-2 rounded-lg"
                      to={`/admin/blog/edit/${blog._id}`}
                    >
                      <span>
                        <Pencil color="#128b09" />
                      </span>
                    </Link>
                    <Dialougebox
                      title={`Delete ${blog?.title}`}
                      ActionMessage="Are you sure ?"
                      icon={<Trash2 color="#d31d1d" />}
                      ActionName="Delete"
                      dangerAction={(e) => handleDelete( blog._id)}
                      showModal={openModal === blog._id}
                      cancleAction={(e) => setOpenModal(-1)}
                    />
                    <span
                      onClick={(e) => setOpenModal(blog._id)}
                      className="bg-white text-black px-4 py-2 rounded-lg"
                    >
                      <Trash2 color="#128b09" />
                    </span>
                  </div>
                </div>
            
                <div className="p-4 sm:p-6">
                  <a href="#">
                    <h3 className="text-lg font-medium text-gray-900">
                      {blog?.title}
                    </h3>
                  </a>
                  <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                    {blog?.description?.substring(0, 100) + "..."}
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
            </div>
          ))
        ) : (
          <p>No blog</p>
        )}
      </div>
    </div>
  );
};

export default Blog;
