import {
  Book,
  BriefcaseMedical,
  Building2,
  Globe,
  Landmark,
  Palette,
  Scale,
  Sprout,
  TestTube,
} from "lucide-react";

export const coursesSectionInfo = {
  title: "Search Universities by Your Preferred Course",
  desc: "Discover Universities in Nigeria by your chosen course, location and type (Federal, State & Private)",
};

export const empowermentSectionInfo = {
  title: "Empowering Your Academic Journey",
  paragraph1:
    "Our platform brings together reliable and updated information on universities, programs, and entry requirements to help students, parents and educators make informed decisions.",
  paragraph2:
    "Whether you are exploring your options or narrowing down your choices, everything you need is in one place.",
};

export const academicDisciplineSectionInfo = {
  title: "Search Universities by Your Preferred Course",
  desc: "Discover Universities in Nigeria by your chosen course, location and type (Federal, State & Private)",
  academicDisciplines: [
    {
      faculty: "arts & humanities",
      icon: Palette,
      iconBg: "bg-blue-100",
      color: "blue-600",
      bg: "bg-blue-50",
      courses: ["English", "History", "dramatic arts"],
    },
    {
      faculty: "Law & legal studies",
      icon: Scale,
      iconBg: "bg-green-100",
      color: "green-600",
      bg: "bg-green-50",
      courses: ["law", "civil law", "islamic law"],
    },
    {
      faculty: "medicine & health",
      icon: BriefcaseMedical,
      iconBg: "bg-purple-100",
      color: "purple-600",
      bg: "bg-purple-50",
      courses: ["medicine & surgery", "nursing science", "pharmacy"],
    },
    {
      faculty: "sciences",
      icon: TestTube,
      iconBg: "bg-amber-100",
      color: "amber-600",
      bg: "bg-amber-50",
      courses: ["chemistry", "botany", "geology"],
    },
    {
      faculty: "Administration",
      icon: Landmark,
      iconBg: "bg-red-100",
      color: "red-600",
      bg: "bg-red-50",
      courses: ["accounting", "finance", "business administration"],
    },
    {
      faculty: "engineering & technology",
      icon: Building2,
      iconBg: "bg-indigo-100",
      color: "indigo-600",
      bg: "bg-indigo-50",
      courses: [
        "Mechanical Engineering",
        "Chemical Engineering",
        "Computer Science",
      ],
    },
    {
      faculty: "social sciences",
      icon: Globe,
      iconBg: "bg-teal-100",
      color: "teal-600",
      bg: "bg-teal-50",
      courses: ["psychology", "economics", "political science"],
    },
    {
      faculty: "agriculture",
      icon: Sprout,
      iconBg: "bg-emerald-100",
      color: "emerald-600",
      bg: "bg-emerald-50",
      courses: [
        "agricultural extension",
        "agricultural economics",
        "fisheries and aquaculture",
      ],
    },
    {
      faculty: "education",
      icon: Book,
      iconBg: "bg-yellow-100",
      color: "yellow-600",
      bg: "bg-yellow-50",
      courses: [
        "business education",
        "biology education",
        "physical and health education",
      ],
    },
  ],
};
