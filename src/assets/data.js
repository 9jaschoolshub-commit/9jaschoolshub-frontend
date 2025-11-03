import {
  Clock,
  Instagram,
  Linkedin,
  Mail,
  MapPinIcon,
  Phone,
  Twitter,
  X,
} from 'lucide-react'

export const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Universities', path: '/universities' },
  { name: 'Courses', path: '/courses' },
]

export const socialLinks = [
  {
    url: 'https://www.x.com/9jaschoolshub',
    icon: Twitter,
  },
  {
    url: 'https://www.linkedin.com/company/sqwads',
    icon: Linkedin,
  },
  {
    url: 'https://www.instagram.com/9jaschoolshub',
    icon: Instagram,
  },
]

export const footerLinks = [
  {
    heading: 'Quick Links',
    links: [
      {
        label: 'Universities',
        url: '/universities',
      },
      {
        label: 'Courses',
        url: '/courses',
      },
    ],
  },
  {
    heading: 'Information',
    links: [
      {
        label: 'Privacy Policy',
        url: '/privacy-policy',
      },
      {
        label: 'Terms of Service',
        url: '/terms-of-service',
      },
    ],
  },
]

export const contactOptions = {
  heading: 'Contact Us',
  links: [
    {
      label: 'Lagos, Nigeria.',
      icon: MapPinIcon,
    },
    {
      label: '+234 705 221 1423',
      icon: Phone,
    },
    {
      label: '9jaschoolshub@gmail.com',
      icon: Mail,
    },
    {
      label: 'Mon - Fri: 8:00 AM - 6:00 PM',
      icon: Clock,
    },
  ],
}

export const coursesSectionInfo = {
  title: 'Search Universities by Your Preferred Course',
  desc: 'Discover Universities in Nigeria by your chosen course, location and type (Federal, State & Private)',
}

export const empowermentSectionInfo = {
  title: 'Empowering Your Academic Journey',
  paragraph1:
    'Our platform brings together reliable and updated information on universities, programs, and entry requirements to help students, parents and educators make informed decisions.',
  paragraph2:
    'Whether you are exploring your options or narrowing down your choices, everything you need is in one place.',
}
