import { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaTimes
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { validationLoginSchema } from '../Validation/AllValidation';
import { LocalUrl } from '../../GlobalUrl'
import { useNavigate } from 'react-router-dom'
import { showErrorToast, showSuccessToast } from '../Notification/ToastNofication'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: validationLoginSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);

      try {
        const response = await axios.post(`${LocalUrl}user_log_in`, values)

        if (response.status == 200) {
          showSuccessToast(response?.data?.msg || 'Sucessfully log In')
          localStorage.setItem('userId', response?.data?.id)
          localStorage.setItem('userToken', response?.data?.token)
          navigate(`/`)
        }
      }
      catch (error) {
        if (error?.response?.data?.msg == 'Pls verify otp') {
          console.log(error.response.data.id)
          localStorage.setItem('email', error?.response?.data?.email)
          navigate(`/otp/user_otp_verification/${error?.response?.data?.id}`)
          showSuccessToast(error.response?.data?.msg || "server error")
        }
        else if (error?.response?.data?.msg == 'User not found!') {

          navigate(`/create-account`)
          showErrorToast(error.response?.data?.msg || "server error")
        }
        else {
          showErrorToast(error?.response?.data?.msg || 'Server error')
        }
      }
      finally {
        setIsSubmitting(false);
      }
    }
  });

  const formFields = [
    {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      icon: FaEnvelope,
      placeholder: 'Enter your registered email'
    },
    {
      id: 'password',
      label: 'Password',
      type: showPassword ? 'text' : 'password',
      icon: FaLock,
      placeholder: 'Enter your password',
      showToggle: true
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-linear-to-br from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-950 flex items-center justify-center p-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row "
        >
          {/* Left Section - Video Background */}
          <div className="lg:w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent z-10" />
            <video
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
              src="https://res.cloudinary.com/dxa0dfaes/video/upload/v1770022909/tiny_f9zsg1.mp4"
            />
          </div>

          {/* Right Section - Form */}
          <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Welcome Back
                </h1>
                <p className="text-gray-500 dark:text-gray-400">Please enter your details to sign in</p>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-5">
                {formFields.map((field) => (
                  <div key={field.id}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {field.label}
                    </label>

                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <field.icon />
                      </div>

                      <input
                        id={field.id}
                        name={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formik.values[field.id]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full pl-12 pr-12 py-3 rounded-xl border ${formik.touched[field.id] && formik.errors[field.id]
                            ? 'border-red-500 dark:border-red-500'
                            : 'border-gray-300 dark:border-zinc-700'
                          } bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all`}
                      />

                      {field.showToggle && (
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      )}
                    </div>

                    {formik.touched[field.id] && formik.errors[field.id] && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-600 dark:text-red-400"
                      >
                        {formik.errors[field.id]}
                      </motion.p>
                    )}
                  </div>
                ))}

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400 cursor-pointer">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      onChange={formik.handleChange}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    Remember me
                  </label>
                  <Link to="/forgot-password" size="sm" className="text-red-600 hover:underline font-medium">
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 px-4 rounded-xl font-semibold text-white transition-all duration-300 ${isSubmitting
                      ? 'bg-red-400 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-700 active:scale-95'
                    } shadow-lg shadow-red-600/30 hover:shadow-xl hover:shadow-red-600/40`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Signing In...
                    </span>
                  ) : (
                    'Sign In'
                  )}
                </button>

                <p className="text-center text-gray-600 dark:text-gray-400 mt-8">
                  Don't have an account?{' '}
                  <Link
                    to="/create-account"
                    className="text-red-600 dark:text-red-400 font-semibold hover:underline"
                  >
                    Create Account
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;