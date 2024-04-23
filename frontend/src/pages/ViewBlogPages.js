import React from 'react'
import ViewBlog from "../features/Blog/components/ViewBlog"
import Main from '../components/Main'
import Footer from "../components/Footer"
const ViewBlogPages = () => {
  return (
    <div>
        <Main>
            <ViewBlog></ViewBlog>
        </Main>
        <Footer></Footer>
      
    </div>
  )
}

export default ViewBlogPages
