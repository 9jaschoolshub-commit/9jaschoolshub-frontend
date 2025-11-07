import { useAllUniversities } from '../hooks/useQueries'
import Container from './Container'
import UniversityCardSkeleton from './UniversityCardSkeleton'

const FeaturedUniversitiesSection = () => {
  const { data: universitiesResponse, isLoading } = useAllUniversities()
  return (
    <Container className="py-10 bg-gray-50">
      <div className="space-y-10">
        <div className="grid md:grid-cols-3 gap-4 xl:gap-6">
          {[...Array(3)].map((_, i) => (
            <UniversityCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </Container>
  )
}
export default FeaturedUniversitiesSection
