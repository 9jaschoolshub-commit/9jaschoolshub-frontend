import { Palette, Building2, Scale, Landmark, Monitor, Globe, TestTube, ClipboardPlus } from "lucide-react"

export const disciplines = [
    {
      icon: <Palette className="w-8 h-8 text-blue-600" />,
      title: "Arts & Humanities",
      description: "English, Foreign Languages, History, Philosophy and more",
      programs: "45 programs",
      color: "bg-blue-50"
    },
    {
      icon: <Scale className="w-8 h-8 text-green-600" />,
      title: "Law & Legal studies",
      description: "International law, Legal studies and more",
      programs: "18 programs", 
      color: "bg-green-50"
    },
    {
      icon: <ClipboardPlus className="w-8 h-8 text-purple-600" />,
      title: "Medicine & Health",
      description: "Medicine, Nursing, Pharmacy, Public Health and more",
      programs: "32 programs",
      color: "bg-purple-50"
    },
    {
      icon: <TestTube className="w-8 h-8 text-yellow-600" />,
      title: "Sciences",
      description: "Biology, Chemistry, Geology, Genetics and more",
      programs: "28 programs",
      color: "bg-yellow-50"
    },
    {
      icon: <Landmark className="w-8 h-8 text-red-600" />,
      title: "Business & Economics",
      description: "Accounting, Economics, Finance, Management and more",
      programs: "35 programs",
      color: "bg-red-50"
    },
    {
      icon: <Monitor className="w-8 h-8 text-blue-600" />,
      title: "Computer Science & IT",
      description: "Computer Science, Data Science, Information Technology and more",
      programs: "24 programs",
      color: "bg-blue-50"
    },
    {
      icon: <Building2 className="w-8 h-8 text-indigo-600" />,
      title: "Engineering",
      description: "Civil, Computer, Chemical, Electrical, Mechanical Engineering and more",
      programs: "42 programs",
      color: "bg-indigo-50"
    },
    {
      icon: <Globe className="w-8 h-8 text-teal-600" />,
      title: "Social Sciences",
      description: "Psychology, Political Science, Sociology and more",
      programs: "26 programs",
      color: "bg-teal-50"
    }
  ];

  export const universities = [
    {
      name: "Adeleke University",
      location: "Ede, Osun State",
      type: "Private",
      programs: "120+",
      tuition: "₦950,000",
      image: "/api/placeholder/280/200",
      departments: ["Engineering", "Law", "Business", "+ more"]
    },
    {
      name: "University of Ibadan",
      location: "Ibadan, Oyo state",
      type: "Federal",
      programs: "120+",
      tuition: "₦250,000",
      image: "/api/placeholder/280/200",
      departments: ["Engineering", "Law", "Business", "+ more"]
    },
    {
      name: "University of Lagos",
      location: "Akoka, Lagos state",
      type: "",
      programs: "120+",
      tuition: "₦350,000",
      image: "/api/placeholder/280/200",
      departments: ["Engineering", "Law", "Business"]
    }
  ];