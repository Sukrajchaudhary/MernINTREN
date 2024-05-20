import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  BlogInfo,
  updateBlogAsync,
  LoadingStatus,
  updateStatus,
} from "../features/Blog/blogSlice";
import Loading from "../Common/Loading";
import toast from "react-hot-toast";
const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(LoadingStatus);
  const isUpdate = useSelector(updateStatus);
  const blog = useSelector(BlogInfo);
  const [value, setValue] = useState({
    title: "",
    description: "",
    thumbnail: "",
  });

  useEffect(() => {
    const selectedBlog = blog.find((blog) => blog._id === id);
    if (selectedBlog) {
      const { title, description, thumbnail, category } = selectedBlog;
      setValue({
        title: title,
        description: description,
        thumbnail: thumbnail,
        category: category,
      });
    }
  }, [blog, id]);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setValue({ ...value, [e.target.name]: e.target.files[0] });
    } else {
      setValue({ ...value, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in value) {
      formData.append(key, value[key]);
    }
    await dispatch(updateBlogAsync({ id, formData }));
    navigate("/admin/blog");
    toast.success("Edit SuccessFully !");
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <section className="rounded-md">
        <div className="flex items-center justify-center bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md border p-6">
            <h2 className="text-2xl font-bold leading-tight text-black">
              Edit Your Blog
            </h2>

            <form onSubmit={handleSubmit} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="title"
                    className="text-base font-medium text-gray-900"
                  >
                    Enter Title
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Title"
                      id="title"
                      name="title"
                      onChange={handleChange}
                      value={value.title}
                    />
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
                      value={value.category}
                    ></input>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="text-base font-medium text-gray-900"
                  >
                    Enter Description
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Description"
                      id="description"
                      name="description"
                      onChange={handleChange}
                      value={value.description}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="thumbnail"
                      className="text-base font-medium text-gray-900"
                    >
                      Choose Thumbnail
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="file"
                      placeholder="Thumbnail"
                      id="thumbnail"
                      name="thumbnail"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Save Changes <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditBlog;
