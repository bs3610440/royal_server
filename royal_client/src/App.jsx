import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.jsx'
import Home from './components/Home/Home.jsx'
import SignUp from './components/Auth/SignUp.jsx'
import Log from './components/Auth/LogIn.jsx'
import Blog from './components/Blog/Blogs.jsx'
import PageNotFound from './components/PNF.jsx'
import Footer from './components/Footer.jsx'
import ContactUs from './components/ContactUs.jsx'
import Otp from './components/OtpVerifcation/Otp.jsx'
import DashBoard from './components/DashBoard/HomeBashBoard.jsx'


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        {/* Public Routes  */}
        <Route path="/" element={<Home />} />
        <Route path="/create-account" element={<SignUp />} />
        <Route path="/user-login" element={<Log />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="*" element={<PageNotFound />} />

        {/* Private Routes  */}
        <Route path="/otp" element={<Otp />} />
        <Route path="/dashBoard" element={<DashBoard />} />

      </Routes>
      <Footer />
    </BrowserRouter>

  )
}
