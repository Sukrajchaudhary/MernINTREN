import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  checkuserAsync,
  LoginUserDetails,
  LoginUserInfo,
} from "./features/Auth/authSlice";
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
  const { setisAuth, setuserInfo } = useAuthContext();
  const LoginUser = useSelector(LoginUserDetails);
  const LoginUserResponse = useSelector(LoginUserInfo);

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
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<SignuPages />} />
        <Route path="/blog/view/:id" element={<ViewBlog />} />
        <Route path="/login" element={<LoginPages />} />
        <Route
          path="/admin/home"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blog/add"
          index
          element={
            <ProtectedRoute>
              <AdminAddBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blog"
          element={
            <ProtectedRoute>
              <AdminBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blog/edit/:id"
          element={
            <ProtectedRoute>
              <EditBlogPages />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
