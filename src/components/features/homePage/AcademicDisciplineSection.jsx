import { Link } from "react-router-dom";
import { academicDisciplineSectionInfo } from "../../../data/homepageData";
import AcademicDisciplineCard from "../homePage/AcademicDisciplineCard";
import Container from "../../global/Container";
import SectionHeading from "../../global/SectionHeading";

const AcademicDisciplineSection = () => {
  const { title, desc, academicDisciplines } = academicDisciplineSectionInfo;

  return (
    <Container className="py-10 bg-white">
      <section className="space-y-10">
        <div className="text-center space-y-3">
          <SectionHeading title={title} />
          <p className="text-gray-600 text-base md:text-lg">{desc}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-self-center gap-4 xl:gap-6 ">
          {academicDisciplines.map((discipline) => (
            <AcademicDisciplineCard key={discipline.faculty} {...discipline} />
          ))}
        </div>
        <div className="text-center">
          <Link
            to="/courses"
            className="bg-orange-400 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            View All Disciplines
          </Link>
        </div>
      </section>
    </Container>
  );
};
export default AcademicDisciplineSection;
