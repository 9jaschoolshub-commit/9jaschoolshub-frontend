import Hero from "../components/features/homepage/Hero";
import EmpoweringSection from "../components/features/homepage/EmpoweringSection";
import AcademicDisciplineSection from "../components/features/homepage/AcademicDisciplineSection";
import FeaturedUniversitiesSection from "../components/features/homePage/FeaturedUniversitiesSection";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <AcademicDisciplineSection />
      <FeaturedUniversitiesSection />
      <EmpoweringSection />
    </div>
  );
};

export default HomePage;
