import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogsAsync, AllUserBlogs } from "../blogSlice";
import Footer from "../../../components/Footer";
import Paginations from "../../../Common/Paginations";
import { usePageContext } from "../../../context/PageContext";

const Blog = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const blog = useSelector(AllUserBlogs);
  const totalBlog = blog?.total;
  const { category } = usePageContext();
  useEffect(() => {
    const filter = { category: category ? category : "" };
    const pagination = { _page: page, _limit: 8 };
    dispatch(getAllBlogsAsync({ filter, pagination }));
  }, [dispatch, category, page]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <>
      <div className="flex flex-wrap p-4">
        {blog?.blog?.map((blogItem, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
            <Link to={`/blog/view/${blogItem._id}`}>
              <article className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
                <img
                  alt=""
                  src={blogItem.thumbnail}
                  className="h-52 w-full object-cover"
                />
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    {blogItem.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-gray-500">
                    {blogItem.description.substring(0, 100) + "..."}
                  </p>
                  <Link
                    to={`/blog/view/${blogItem._id}`}
                    className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
                  >
                    Find out more
                    <span
                      aria-hidden="true"
                      className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                    >
                      &rarr;
                    </span>
                  </Link>
                </div>
              </article>
            </Link>
          </div>
        ))}
      </div>
      <Paginations
        handlePage={handlePageChange}
        page={page}
        total={totalBlog}
      />
      <Footer />
    </>
  );
};

export default Blog;
