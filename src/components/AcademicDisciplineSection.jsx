import { academicDisciplineSectionInfo } from '../assets/data'
import AcademicDisciplineCard from './AcademicDisciplineCard'
import Container from './Container'
import SectionHeading from './SectionHeading'

const AcademicDisciplineSection = () => {
  const { title, desc, academicDisciplines } = academicDisciplineSectionInfo

  return (
    <Container className="py-10 bg-white">
      <section className="space-y-10">
        <div className="text-center space-y-3">
          <SectionHeading title={title} />
          <p className="text-gray-600 text-base md:text-lg">{desc}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 justify-self-center gap-4 xl:gap-6 ">
          {academicDisciplines.map((discipline) => (
            <AcademicDisciplineCard key={discipline.faculty} {...discipline} />
          ))}
        </div>
      </section>
    </Container>
  )
}
export default AcademicDisciplineSection
