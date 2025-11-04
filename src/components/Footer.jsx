import Logo from './Logo'
import { contactOptions, footerLinks, socialLinks } from '../assets/data'
import SocialLink from './SocialLink'
import FooterLink from './FooterLink'
import ContactOption from './ContactOption'
import Copyright from './Copyright'
import Container from './Container'
import sqwads from '../assets/images/sqwads.png'

const Footer = () => {
  return (
    <Container className="bg-blue-900 text-white py-6">
      <footer className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="md:space-y-2.5">
            <Logo />
            <p className="hidden md:block text-gray-50 text-sm max-w-xs">
              Your trusted guide to Nigerian university education. We provide
              accurate information to help you make informed decisions about
              your academic future.
            </p>
            <div className="hidden md:flex items-center gap-4">
              {socialLinks.map((social) => (
                <SocialLink key={social.url} {...social} />
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:flex-1 justify-between max-w-sm lg:max-w-md gap-4 md:mt-0.5">
            {footerLinks.map((footerLink) => (
              <FooterLink key={footerLink.heading} {...footerLink} />
            ))}

            <ContactOption {...contactOptions} />
          </div>
        </div>
        <figure>
          <img
            src={sqwads}
            alt="sqwads"
            className="w-32"
            width={230}
            height={38}
          />
        </figure>
        <Copyright />
      </footer>
    </Container>
  )
}

export default Footer
