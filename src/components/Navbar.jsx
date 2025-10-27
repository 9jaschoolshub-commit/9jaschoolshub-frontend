import { useState } from "react";
import { Link } from "react-router-dom" 
import logo from '../assets/logo.svg'
import {X, Menu} from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);

  // Toggle menu function
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  };

  // Menu items
    const menuItems = [
        { name: "Home", path: "/"},
        { name: "Universities", path: "/universities"},
        { name: "Courses", path: "/courses"}
    ]

  return (
    <div className={`${isOpen ? 'bg-blue-900' : 'bg-white'} transition-all duration-300 ease-in`}>
      {/* Header */}
      <header className="md:bg-blue-900 md:text-white">
        <div className="max-w-7xl flex mx-auto px-4 py-4">
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center justify-start">
            <button
            onClick={toggleMenu}
            className={`${isOpen ? 'text-white' : 'text-black'} focus:outline-none cursor-pointer transition-all duration-300 ease-in-out`}
            >
              {isOpen ? (<Menu />) : (<X />)}
            </button>
          </div>

          <nav className="flex flex-1 items-center justify-center md:justify-between">
            <div className="flex items-center justify-center space-x-2">
              <img className=""
                src={logo}
                alt="9jaschoolshub Logo"
               />
              <span className={`text-xl font-bold ${isOpen ? "text-white" : "text-blue-900"}`}>9jaschoolshub</span>
            </div>
            <div className="flex items-center justify-center space-x-4 md:space-x-10">
              {menuItems.map((item) => (
                  <div 
                  className="hidden md:flex text-lg space-x-8 hover:text-orange-500 transition-colors duration-300 ease-in-out"
                  key={item.name}>
                      <Link
                      key={item.name}
                      to={item.path}
                      >
                        {item.name}  
                      </Link>
                  </div>
              ))}
            </div>
          </nav>

        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`md:hidden pb-12 w-full transition-all duration-300 ease-in-out ${isOpen ? 'hidden' : 'block'}`}>
        <div className="flex flex-col">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-lg py-4 border-b-2 border-gray-200 first:border-t-2 hover:bg-gray-100 transition-colors duration-300 ease-in-out"
              onClick={toggleMenu} // Close menu on item click
            >
              <li className="ml-10 list-none">{item.name}</li>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Navbar
