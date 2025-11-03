import { Link } from 'react-router-dom'
import { socialLinks } from '../../assets/data'
import SocialLink from '../global/SocialLink'

const Copyright = () => {
  return (
    <div className="md:flex items-center justify-between gap-6 border-t border-slate-300/50 py-4 border-b md:border-b-0">
      <div className="space-y-4 md:space-y-0 text-center text-sm">
        <p>© 2024 9jaschoolshub Nigeria. All rights reserved.</p>
        <div className="flex md:hidden items-center justify-center gap-4">
          {socialLinks.map((social) => (
            <SocialLink key={social.url} {...social} />
          ))}
        </div>
      </div>

      <div className="hidden md:flex space-x-6">
        <Link to="terms-of-service" className="hover:text-gray-300">
          Terms of Service
        </Link>
        <Link to="/privacy-policy" className="hover:text-gray-300">
          Privacy Policy
        </Link>
      </div>
    </div>
  )
}
export default Copyright
