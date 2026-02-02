import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilm, FaGlobeAmericas, FaDragon, FaStar, FaSun, FaMoon, FaChevronDown } from "react-icons/fa";
import { SiNetflix, SiPrimevideo, SiAppletv } from "react-icons/si";
import { MdLocalMovies } from "react-icons/md";
import { GiTv } from "react-icons/gi";
import { HiMenuAlt3 } from "react-icons/hi";
import Profile from './Profile';
import {Link} from 'react-router-dom'
export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [login, setLogIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const MenuData = [
    { icon: FaFilm, name: "Bollywood", link: "/bollywood-movies" },
    { icon: FaGlobeAmericas, name: "Hollywood", link: "/hollywood-movies" },
    { icon: FaDragon, name: "Anime", link: "/anime-series" },
    { icon: MdLocalMovies, name: "South", link: "/south-indian-movies" },
    {
      icon: GiTv,
      name: "OTT",
      dropdown: [
        { icon: SiNetflix, name: "Netflix", link: "/watch-netflix-series-online" },
        { icon: SiPrimevideo, name: "Amazon Prime", link: "/watch-amazon-prime-series-online" },
        { icon: FaStar, name: "Jio Hotstar", link: "/watch-jio-hotstar-shows-online" },
        { icon: FaDragon, name: "Crunchyroll", link: "/watch-anime-on-crunchyroll" },
        { icon: SiAppletv, name: "Apple TV+", link: "/watch-apple-tv-plus-shows" },
        { icon: GiTv, name: "Zee5", link: "/watch-zee5-web-series-online" }
      ]
    }
  ];

  const Auth = [
    { name: 'Sign In', link: '/user-login', css: 'px-5 py-2.5 text-sm font-semibold rounded-lg hover:text-red-600 dark:hover:text-red-400 transition-colors hover:bg-gray-100 dark:hover:bg-zinc-800' },
    { name: 'Sign Up Free', link: '/create-account', css: 'px-5 py-2.5 text-sm font-semibold bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg shadow-red-600/30 dark:shadow-red-600/20 hover:shadow-xl hover:shadow-red-600/40 active:scale-95' },
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <header className="fixed w-full top-0 z-50">
      <nav className='flex items-center justify-between px-4 lg:px-8 py-4 bg-white dark:bg-zinc-950 text-black dark:text-white transition-colors duration-300 shadow-lg dark:shadow-zinc-900/50'>
        {/* Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <HiMenuAlt3 className="text-2xl" />
          </button>

          <h1 className="text-2xl font-bold tracking-tighter">
            <Link to="/" className="flex items-center gap-2 hover:text-red-600 transition-colors">
              <FaFilm className="text-red-600 text-3xl" />
              <div>
                <span>MovieHub</span>
                <span className="text-red-600">IND</span>
              </div>
            </Link>
          </h1>
        </div>

        {/* Main Navigation Menu */}
        <div className="hidden lg:flex items-center gap-8" ref={dropdownRef}>
          {MenuData.map((item, index) => (
            <div key={item.name} className="relative">
              {item.dropdown ? (
                // Dropdown Item
                <div>
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all duration-300 group"
                  >
                    <item.icon className="text-red-600 group-hover:scale-110 transition-transform text-lg" />
                    <span className="font-semibold">{item.name}</span>
                    <FaChevronDown className={`text-xs transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {activeDropdown === index && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-zinc-900 rounded-xl shadow-2xl border border-gray-200 dark:border-zinc-700 overflow-hidden z-50"
                      >
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.link}
                            className="flex items-center gap-4 px-4 py-3.5 hover:bg-red-50 dark:hover:bg-zinc-800 transition-colors border-b border-gray-100 dark:border-zinc-700 last:border-b-0 group"
                          >
                            <div className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-colors">
                              <subItem.icon className="text-red-600 dark:text-red-400 text-xl" />
                            </div>
                            <span className="font-semibold">{subItem.name}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                // Regular Menu Item
                <Link
                  to={item.link}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all duration-300 group"
                >
                  <item.icon className="text-red-600 group-hover:scale-110 transition-transform text-lg" />
                  <span className="font-semibold">{item.name}</span>
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Right Section - Toggle & Auth */}
        <div className='flex items-center gap-4'>
          {/* Dark/Light Toggle - Visible on all screens */}
          <button
            onClick={() => setDark(!dark)}
            className="p-3 rounded-full bg-gray-100 dark:bg-zinc-800 hover:ring-2 ring-red-500 transition-all outline-none group"
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={dark ? "moon" : "sun"}
                initial={{ y: -20, opacity: 0, rotate: -90 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 20, opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {dark ? (
                  <FaMoon className="text-yellow-400 group-hover:scale-110 transition-transform text-xl" />
                ) : (
                  <FaSun className="text-orange-500 group-hover:scale-110 transition-transform text-xl" />
                )}
              </motion.div>
            </AnimatePresence>
          </button>

          {/* Auth Buttons */}
          {login ? (
            <Profile dark={dark} setDark={setDark} />
          ) : (
            <div className="hidden md:flex items-center gap-3">
              {
                Auth.map(({ name, link, css }, index) => (
                  <Link to={link}>
                    <button className={css}>
                      {name}
                    </button>
                  </Link>
                ))
              }

            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-700 shadow-lg"
          >
            <div className="px-4 py-3 space-y-1">
             
              {MenuData.map((item) => (
                item.dropdown ? (
                  <div key={item.name} className="space-y-1">
                    <div className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 font-medium">
                      <item.icon className="text-red-600 text-xl" />
                      <span>{item.name}</span>
                    </div>
                    <div className="ml-8 space-y-1">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.link}
                          className="flex items-center text-white gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                          <subItem.icon className="text-red-600 text-lg" />
                          <span className="text-sm">{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.link}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-gray-700 dark:text-gray-300 font-medium"
                  >
                    <item.icon className="text-red-600 text-xl" />
                    <span>{item.name}</span>
                  </Link>
                )
              ))}

               <div className="md:hidden flex justify-center text-white items-center gap-3">
              {
                Auth.map(({ name, link, css }, index) => (
                  <Link to={link}>
                    <button className={css}>
                      {name}
                    </button>
                  </Link>
                ))
              }

            </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}