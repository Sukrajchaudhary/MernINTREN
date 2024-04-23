import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  checkuserAsync,
  LoginUserDetails,
  LoginUserInfo,
  signupLoading,
} from "./features/Auth/authSlice";
import { getAllBlogsAsync } from "./features/Blog/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import SignuPages from "./pages/SignuPages";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import ViewBlog from "./pages/ViewBlogPages";
import LoginPages from "./pages/LoginPages";
import { useAuthContext } from "./context/AuthContext";
import Main from "./components/Main";
import AdminHome from "../src/Admin/AdminHome";
import AdminAddBlog from "./pages/AdminAddBlog";
import AdminBlog from "./pages/AdminBlog";
import EditBlogPages from "./pages/EditBlogPages";
import ProtectedRoute from "./features/Auth/components/ProtectedRoute";
function App() {
  const dispatch = useDispatch();
  const { isAuth, setisAuth, setuserInfo } = useAuthContext();
  const LoginUser = useSelector(LoginUserDetails);
  const LoginUserResponse = useSelector(LoginUserInfo);
  useEffect(() => {
    dispatch(getAllBlogsAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkuserAsync());
  }, [dispatch, LoginUserResponse]);

  useEffect(() => {
    if (LoginUser) {
      setisAuth(true);
      setuserInfo(LoginUser);
    }
  }, [dispatch, LoginUser]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<SignuPages />} />
          <Route path="/blog/view/:id" element={<ViewBlog />} />
          <Route path="/login" element={<LoginPages />} />
          <Route path="/admin/home" element={isAuth?<AdminHome />:<Main></Main>} />
          <Route path="/admin/blog/add" element={isAuth?<AdminAddBlog />:<Main></Main>} />
          <Route path="/admin/blog" element={isAuth?<AdminBlog />:<Main></Main>} />
          <Route path="/admin/blog/edit/:id" element={isAuth?<EditBlogPages />:<Main></Main>} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
