import React from 'react'
import logo from "/images/check_list.png"

const Navbar = () => {
  return (
    
<nav className="bg-white border-gray-200 dark:bg-gray-900 sticky top-0">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={logo} className="h-8 invert" alt="Flowbite Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Todo App</span>
    </a>
   </div>
</nav>

  )
}

export default Navbar
