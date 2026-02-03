import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaCheckCircle, FaClock, FaArrowLeft, FaShieldAlt } from "react-icons/fa";
import { showSuccessToast, showErrorToast } from '../Notification/ToastNofication';

const OtpVerification = () => {
 
  const [code, setCode] = useState(new Array(4).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);

  // Refs for Input Management
  const inputRefs = useRef([]);

  // Hooks
  const navigate = useNavigate();

  // Timer Logic
  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } 
    else {
      setCanResend(true);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Auto-focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Handle Typing
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // Only allow digits

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move focus forward
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle Backspace
  const handleKeyDown = (e, index) => {
    console.log(e.key)
    if (e.key === "Backspace"  && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  
  const handlePaste = (e) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text").slice(0, 4);
    if (!/^\d+$/.test(data)) return;

    const pasteCode = data.split("");
    const newCode = [...code];
    pasteCode.forEach((char, index) => {
      if (index < 4) newCode[index] = char;
    });
    setCode(newCode);

    // Focus last filled input or the first empty one
    const nextIndex = Math.min(pasteCode.length, 3);
    inputRefs.current[nextIndex].focus();
  };

  const handleResendOTP = async () => {
    if (!canResend) return;
    
    setIsLoading(true);
    try {
      

      showSuccessToast("New OTP sent successfully!");
      
      // Reset State
      setCode(new Array(4).fill(""));
      setTimeLeft(30);
      setCanResend(false);
      inputRefs.current[0].focus();
    } catch (err) {
      showErrorToast(err.response?.data?.msg || "Failed to resend OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userOtp = code.join("");
    if (userOtp.length < 4) return;
    setIsLoading(true);

    try {
      setInterval(() => {
        showSuccessToast("Account verified successfully!");
      },2000);
      // navigate('/dashboard');
    } catch (err) {
      showErrorToast(err.response?.data?.msg || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const progress = ((30 - timeLeft) / 30) * 100;

  return (
    <div className="flex h-screen flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-blue-300 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 transition-colors duration-500">
      
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <motion.button
        whileHover={{ x: -5 }}
        onClick={() => navigate(-1)}
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
      >
        <FaArrowLeft /> <span className="font-medium">Back</span>
      </motion.button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-8 shadow-2xl w-full max-w-md rounded-3xl border border-gray-200/50 dark:border-gray-700/50 relative z-10"
      >
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <FaShieldAlt className="text-white text-3xl" />
          </div>

          <div className="space-y-2">
            <h2 className="font-bold text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Email Verification</h2>
            <p className="text-sm text-gray-500">Enter the code sent to:</p>
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full border border-blue-100">
              <FaEnvelope className="text-blue-600 text-xs" />
              <span className="font-semibold text-gray-700 dark:text-gray-200 text-xs">test</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-8">
            <div className="flex justify-center gap-3">
              {code.map((data, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={data}
                  onPaste={handlePaste}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={() => setFocusedIndex(index)}
                  className={`w-14 h-16 sm:w-16 sm:h-20 text-center text-2xl font-bold rounded-2xl border-2 transition-all duration-300 outline-none
                    ${focusedIndex === index ? "border-blue-500 ring-4 ring-blue-500/10 scale-105" : "border-gray-200 dark:border-gray-700"}
                    bg-white dark:bg-gray-900 dark:text-white`}
                />
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs font-medium px-1">
                  <span className="text-gray-500 flex items-center gap-1">
                    <FaClock className={canResend ? "text-gray-400" : "text-blue-500"} />
                    {canResend ? "Code expired" : "Expires in"}
                  </span>
                  <span className="text-blue-600">{timeLeft}s</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div initial={{ width: "0%" }} animate={{ width: `${progress}%` }} className="h-full bg-gradient-to-r from-blue-500 to-purple-600" />
                </div>
              </div>

              <button
                disabled={isLoading || code.some(d => !d)}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-blue-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? <span className="animate-spin border-2 border-white border-t-transparent rounded-full h-5 w-5" /> : <><FaCheckCircle /> Verify Account</>}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  disabled={!canResend}
                  onClick={handleResendOTP}
                  className={`text-sm font-bold transition-colors ${canResend ? "text-blue-600 hover:text-blue-700 underline" : "text-gray-400 cursor-not-allowed"}`}
                >
                  Resend Code
                </button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default OtpVerification;