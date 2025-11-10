import Hero from '../components/Hero'
import EmpoweringSection from '../components/EmpoweringSection'
import AcademicDisciplineSection from '../components/AcademicDisciplineSection'
import FeaturedUniversitiesSection from '../components/FeaturedUniversitiesSection'

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
