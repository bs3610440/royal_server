import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar, Home, SignUp, Log, Blog, PageNotFound, Footer, ContactUs, Otp, DashBoard } from './AllComponents.js'


export default function App() {
  return (
    <div className='bg-white dark:from-zinc-900 h-full'>

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
          <Route path="/otp/:type/:userid" element={<Otp />} />
          <Route path="/dashBoard" element={<DashBoard />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>

  )
}
