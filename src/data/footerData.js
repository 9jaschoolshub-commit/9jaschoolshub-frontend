import {
  Clock,
  Mail,
  MapPinIcon,
  Phone,
} from "lucide-react";
import { FaXTwitter, FaInstagram } from 'react-icons/fa6'
import { FiLinkedin } from 'react-icons/fi'

export const socialLinks = [
  {
    url: "https://www.x.com/9jaschoolshub",
    icon: FaXTwitter,
  },
  {
    url: "https://www.linkedin.com/company/sqwads",
    icon: FiLinkedin,
  },
  {
    url: "https://www.instagram.com/9jaschoolshub",
    icon: FaInstagram,
  },
];

export const footerLinks = [
  {
    heading: "Quick Links",
    links: [
      {
        label: "Universities",
        url: "/universities",
      },
      {
        label: "Courses",
        url: "/courses",
      },
    ],
  },
  {
    heading: "Information",
    links: [
      {
        label: "Privacy Policy",
        url: "/privacy-policy",
      },
      {
        label: "Terms of Service",
        url: "/terms-of-service",
      },
    ],
  },
];

export const contactOptions = {
  heading: "Contact Us",
  links: [
    {
      label: "Lagos, Nigeria.",
      icon: MapPinIcon,
    },
    {
      label: "+234 705 221 1423",
      icon: Phone,
    },
    {
      label: "9jaschoolshub@gmail.com",
      icon: Mail,
    },
    {
      label: "Mon - Fri: 8:00 AM - 6:00 PM",
      icon: Clock,
    },
  ],
};
