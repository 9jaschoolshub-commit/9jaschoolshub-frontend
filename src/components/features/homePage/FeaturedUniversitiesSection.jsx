import { Link } from "react-router-dom";
import { useAllUniversities } from "../../../hooks/useQueries";
import Container from "../../global/Container";
import UniversityCardSkeleton from "../../global/UniversityCardSkeleton";
import UniversityCard from "../../global/UniversityCard";

const FeaturedUniversitiesSection = () => {
  const { data: universitiesResponse, isLoading } = useAllUniversities();

  return (
    <Container className="py-10 bg-gray-50">
      <div className="space-y-10">
        <div className="grid lg:grid-cols-3 gap-4 xl:gap-6">
          {isLoading
            ? [...Array(3)].map((_, i) => <UniversityCardSkeleton key={i} />)
            : universitiesResponse?.data?.doc
                ?.slice(0, 6)
                .map((university) => (
                  <UniversityCard key={university._id} {...university} />
                ))}
        </div>
        <div className="text-center">
          <Link
            to="/universities"
            className="bg-orange-400 text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-600 transition"
          >
            View All Universities
          </Link>
        </div>
      </div>
    </Container>
  );
};
export default FeaturedUniversitiesSection;
