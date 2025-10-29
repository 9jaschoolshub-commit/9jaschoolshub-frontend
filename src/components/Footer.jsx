import { useState } from 'react'
import { Linkedin,  Instagram, Phone, Mail, Clock, MapPinIcon} from 'lucide-react'
import twitter from '../assets/Twitter Icon.png'
import TermsModal from './TermsModal'
import PrivacyPolicyModal from './PrivacyPolicyModal'


const Footer = () => {
    const [ showTerms, setShowTerms] = useState(false)
    const [ showPrivacy, setShowPrivacy] = useState(false)

  return (
    <div>
      {/* Terms and Privacy Modals */}
      <TermsModal isOpen={showTerms} 
      onClose={() => setShowTerms(false)} />

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal isOpen={showPrivacy}
      onClose={() => setShowPrivacy(false)} />

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="max-w-8xl mx-auto px-4">
            <div className='flex flex-col sm:flex-row justify-between mb-8'>
              <div>
                <div className="flex space-x-2 mb-4">
                    <span className="text-xl font-bold">9jaschoolshub</span>
                </div>
                <p className="hidden sm:block text-gray-50 text-sm mb-4 max-w-sm">
                    Your trusted guide to Nigerian university education. We provide accurate information to help you make informed decisions about your academic future.
                </p>
                <div className="hidden md:flex space-x-4">
                  <a href="https://www.x.com/9jaschoolshub" target="_blank" rel="noopener noreferrer">
                    <img
                      src={twitter}
                      alt='Twitter Icon' />
                  </a>
                  <a href="https://www.linkedin.com/company/sqwads" target="_blank" rel="noopener noreferrer">
                    <Linkedin className=" text-white cursor-pointer" />
                  </a>
                  <a href="https://www.instagram.com/9jaschoolshub" target="_blank" rel="noopener noreferrer">
                  <Instagram className=" text-white cursor-pointer" />
                  </a>
                </div>
              </div>   

              <div className='flex flex-col sm:flex-row gap-8'>
                <div>
                    <h3 className="font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm text-gray-50">
                        <li><a href="/universities" className="hover:text-orange-400">Universities</a></li>
                        <li><a href="/courses" className="hover:text-orange-400">Courses</a></li>
                    </ul>
                </div>

                <div className='block sm:hidden flex-col space-y-2'>
                  <h1 className='font-bold pb-2'>Infomation</h1>
                  <div 
                  className='hover:text-orange-400 cursor-pointer'
                  onClick={() => {setShowPrivacy(true)}}>
                    Privacy Policy
                  </div>
                  <button
                  className='hover:text-orange-400 cursor-pointer'
                  onClick={() => {setShowTerms(true)}}>
                    Terms of service
                  </button>
                </div>

                <div>
                <h3 className="font-bold mb-4">Contact Us</h3>
                <ul className="space-y-2 text-sm text-gray-50">
                    <div className='flex '><MapPinIcon /><li className='ml-2'>Lagos, Nigeria</li></div>
                    <div className='flex '><Phone /><li className='ml-2'> +234 700 221 4321</li></div>
                    <div className='flex '><Mail /><li className='ml-2'> 9jaSchoolsHub@gmail.com</li></div>
                    <div className='flex '><Clock /><li className='ml-2'> Mon - Fri: 8:00 AM- 6:00 PM</li></div>
                </ul>
                </div>
              </div>
                  
            </div>
            
            <div className='flex flex-col items-center justify-center md:flex-row md:justify-between space-y-8 md:space-y-0 border-t border-slate-300/50 py-5 border-b md:border-b-0'>
              <div className=''>
                <p>© 2024 9jaschoolshub Nigeria. All rights reserved.</p>
              </div> 

              <div className='hidden md:flex space-x-4'>
                <button
                className='hover:text-gray-300'
                onClick={() => {setShowTerms(true)}}>
                  Terms of service
                </button>
                <button 
                className='hover:text-gray-300'
                onClick={() => {setShowPrivacy(true)}}>
                  Privacy Policy
                </button>
              </div>
              <div className="flex md:hidden space-x-4">
                <img
                  src={twitter}
                  alt='Twitter Icon' />
                <Linkedin className=" text-white cursor-pointer" />
                <Instagram className=" text-white cursor-pointer" />
              </div>
            </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
