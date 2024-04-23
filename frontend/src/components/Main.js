import React from "react";
import Blog from "../features/Blog/components/Blog";
const Main = ({ children }) => {
  return <div>{children ? children : <Blog></Blog>}</div>;
};

export default Main;
