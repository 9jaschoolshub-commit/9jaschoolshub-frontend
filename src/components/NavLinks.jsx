import { NavLink } from 'react-router-dom'

const NavLinks = ({ path, name }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `transition-colors duration-150 ${
          isActive
            ? 'text-orange-500 hover:text-orange-500'
            : 'text-white hover:text-gray-200'
        }`
      }
    >
      {name}
    </NavLink>
  )
}
export default NavLinks
