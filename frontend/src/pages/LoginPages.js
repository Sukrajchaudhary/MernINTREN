import React from 'react'
import Login from "../features/Auth/components/Login"
import Main from '../components/Main'
import Footer from "../components/Footer"
const LoginPages = () => {
  return (
    <div>
        <Main>
            <Login></Login>
        </Main>
        <Footer></Footer>
      
    </div>
  )
}

export default LoginPages
