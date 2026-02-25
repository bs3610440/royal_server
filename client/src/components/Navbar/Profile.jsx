import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { CgProfile, CgLogOut } from "react-icons/cg";
import { SiGmail } from "react-icons/si";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FiSettings } from "react-icons/fi";

export default function Profile({ dark, setDark }) {

    const menuLinks = [
        { name: "Your profile", href: "#", icon: CgProfile },
        { name: "Theme", href: "#", icon: dark ? MdOutlineLightMode : MdOutlineDarkMode, action: () => setDark(!dark) },
        { name: "Settings", href: "#", icon: FiSettings },
        { name: "Sign out", href: "#", icon: CgLogOut },
    ]

    return (
        <div>
            <Menu as="div" className="relative ml-3">
                <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 hover:ring-2 hover:ring-red-500/50 transition-all">
                    <img
                        alt="Profile"
                        src="https://res.cloudinary.com/ddmoaju5a/image/upload/v1766227641/students/osacrruvobbinbtnczt0.jpg"
                        className="size-10 rounded-full bg-gray-800 ring-2 ring-red-600/30 hover:ring-red-600/70 transition-all duration-300"
                    />
                </MenuButton>

                <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-3 w-56 origin-top-right rounded-xl bg-white dark:bg-zinc-900 py-2 shadow-2xl border border-gray-200 dark:border-zinc-700 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                    {/* User Info Section */}
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-zinc-700">
                        <div className='flex gap-3 items-center mb-2'>
                            <div className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20">
                                <CgProfile className="text-red-600 dark:text-red-400 text-lg" />
                            </div>
                            <div>
                                <h1 className="font-semibold text-gray-900 dark:text-white">John Doe</h1>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Premium Member</p>
                            </div>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                <SiGmail className="text-blue-600 dark:text-blue-400 text-lg" />
                            </div>
                            <div>
                                <h1 className="text-sm text-gray-700 dark:text-gray-300">john.doe@gmail.com</h1>
                            </div>
                        </div>
                    </div>

                    {/* Menu Links */}
                    {menuLinks.map((item, index) => (
                        <MenuItem key={index}>
                            {({ active }) => (
                                item.action ? (
                                    <button
                                        onClick={item.action}
                                        className={`flex items-center gap-3 w-full px-4 py-3 text-sm transition-colors ${active
                                            ? 'bg-red-50 dark:bg-zinc-800 text-red-600 dark:text-red-400'
                                            : 'text-gray-700 dark:text-gray-300'
                                            }`}
                                    >
                                        <item.icon className="text-lg" />
                                        <span className="font-medium">{item.name}</span>
                                    </button>
                                ) : (
                                    <a
                                        href={item.href}
                                        className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${active
                                            ? 'bg-red-50 dark:bg-zinc-800 text-red-600 dark:text-red-400'
                                            : 'text-gray-700 dark:text-gray-300'
                                            }`}
                                    >
                                        <item.icon className="text-lg" />
                                        <span className="font-medium">{item.name}</span>
                                    </a>
                                )
                            )}
                        </MenuItem>
                    ))}
                </MenuItems>
            </Menu>
        </div>
    )
}