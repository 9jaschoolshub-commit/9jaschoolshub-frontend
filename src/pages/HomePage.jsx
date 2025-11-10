import Hero from '../components/Hero'
import EmpoweringSection from '../components/homePageComponents/EmpoweringSection'
import AcademicDisciplineSection from '../components/homePageComponents/AcademicDisciplineSection'
import FeaturedUniversitiesSection from '../components/homePageComponents/FeaturedUniversitiesSection'

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
