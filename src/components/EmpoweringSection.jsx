import { empowermentSectionInfo } from '../assets/data'
import Container from './Container'
import academyJourney from '../assets/images/academy-journey.jpg'
import SectionHeading from './SectionHeading'

const EmpoweringSection = () => {
  return (
    <Container className="py-10 sm:py-12 bg-white">
      <section className="space-y-8">
        <div className="text-center">
          <SectionHeading title={empowermentSectionInfo.title} />
        </div>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="text-gray-600 space-y-2 text-base lg:text-xl">
            <p>{empowermentSectionInfo.paragraph1}</p>
            <p>{empowermentSectionInfo.paragraph2}</p>
          </div>
          <figure>
            <img
              src={academyJourney}
              alt="Students collaborating"
              className="w-full object-cover rounded-lg"
              loading="lazy"
            />
          </figure>
        </div>
      </section>
    </Container>
  )
}
export default EmpoweringSection
