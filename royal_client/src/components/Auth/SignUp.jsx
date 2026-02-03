import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import {
  FaUser,
  FaEnvelope,
  FaVenusMars,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaTimes,
  FaFilm
} from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { validationSignSchema } from '../Validation/AllValidation'
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      gender: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false
    },
    validationSchema: validationSignSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      setSubmitError('');

      try {



      }
      catch (error) {

      }
      finally {
        setIsSubmitting(false);
      }
    }
  });

  const formFields = [
    {
      id: 'name',
      label: 'Full Name',
      type: 'text',
      icon: FaUser,
      placeholder: 'Enter your full name'
    },
    {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      icon: FaEnvelope,
      placeholder: 'Enter your email'
    },
    {
      id: 'gender',
      label: 'Gender',
      type: 'select',
      icon: FaVenusMars,
      options: [
        { value: '', label: 'Select Gender' },
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' }
      ]
    },
    {
      id: 'password',
      label: 'Password',
      type: showPassword ? 'text' : 'password',
      icon: FaLock,
      placeholder: 'Create a strong password',
      showToggle: true
    },
    {
      id: 'confirmPassword',
      label: 'Confirm Password',
      type: showConfirmPassword ? 'text' : 'password',
      icon: FaLock,
      placeholder: 'Re-enter your password',
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
              className="w-full h-195 object-cover"
              src="https://res.cloudinary.com/dxa0dfaes/video/upload/v1770022909/tiny_f9zsg1.mp4"
            />


          </div>

          {/* Right Section - Form */}
          <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Create Your Account
                </h1>

              </div>

              {/* Success Message */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <FaCheckCircle className="text-green-600 dark:text-green-400 text-xl" />
                      <div>
                        <h3 className="font-semibold text-green-800 dark:text-green-300">
                          Account Created Successfully!
                        </h3>
                        <p className="text-green-700 dark:text-green-400 text-sm">
                          Redirecting to login page...
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Message */}
              <AnimatePresence>
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <FaTimes className="text-red-600 dark:text-red-400 text-xl" />
                      <div>
                        <h3 className="font-semibold text-red-800 dark:text-red-300">
                          Registration Failed
                        </h3>
                        <p className="text-red-700 dark:text-red-400 text-sm">
                          {submitError}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

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

                      {field.type === 'select' ? (
                        <select
                          id={field.id}
                          name={field.id}
                          value={formik.values[field.id]}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`w-full pl-12 pr-4 py-3 rounded-xl border ${formik.touched[field.id] && formik.errors[field.id]
                              ? 'border-red-500 dark:border-red-500'
                              : 'border-gray-300 dark:border-zinc-700'
                            } bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all`}
                        >
                          {field.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="relative">
                          <input
                            id={field.id}
                            name={field.id}
                            type={field.type}
                            value={formik.values[field.id]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder={field.placeholder}
                            className={`w-full pl-12 pr-12 py-3 rounded-xl border ${formik.touched[field.id] && formik.errors[field.id]
                                ? 'border-red-500 dark:border-red-500'
                                : 'border-gray-300 dark:border-zinc-700'
                              } bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all`}
                          />

                          {field.showToggle && (
                            <button
                              type="button"
                              onClick={() =>
                                field.id === 'password'
                                  ? setShowPassword(!showPassword)
                                  : setShowConfirmPassword(!showConfirmPassword)
                              }
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                              {field.id === 'password' ?
                                (showPassword ? <FaEyeSlash /> : <FaEye />) :
                                (showConfirmPassword ? <FaEyeSlash /> : <FaEye />)
                              }
                            </button>
                          )}
                        </div>
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



                {/* Submit Button */}
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
                      Creating Account...
                    </span>
                  ) : (
                    'Create Account'
                  )}
                </button>





                {/* Login Link */}
                <p className="text-center text-gray-600 dark:text-gray-400 mt-8">
                  Already have an account?{' '}
                  <Link
                    to="/user-login"
                    className="text-red-600 dark:text-red-400 font-semibold hover:underline"
                  >
                    Sign In
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

export default SignUp;