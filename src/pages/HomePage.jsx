import Hero from "../components/features/home/Hero";
import EmpoweringSection from "../components/features/home/EmpoweringSection";
import AcademicDisciplineSection from "../components/features/home/AcademicDisciplineSection";
import FeaturedUniversitiesSection from "../components/features/home/FeaturedUniversitiesSection";

const HomePage = () => {``
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
