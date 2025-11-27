import SearchBar from "../../global/SearchBar";

const UniversitySearch = ({
  searchQuery,
  onSearchChange,
  handleSearch,
  loading,
  searchResults,
  handleSelectUniversity,
}) => {
  return (
    <div className="mt-6 max-w-xl">
      <label htmlFor="searchUniversity" className="font-semibold">
        Search University by name or location
      </label>
      <div className="mt-1">
        <SearchBar
          onSubmit={handleSearch}
          value={searchQuery} // Controlled mode: value is from parent
          onChange={onSearchChange} // Controlled mode: onChange is handled by parent
          placeholder="Enter university name to search"
        />
      </div>

      {loading && (
        <div className="border border-gray-200 rounded-lg mt-2 p-3 space-y-3 animate-pulse">
          <div className="h-5 bg-gray-300 rounded w-3/4"></div>
          <div className="h-5 bg-gray-300 rounded w-1/2"></div>
          <div className="h-5 bg-gray-300 rounded w-5/6"></div>
        </div>
      )}

      {!loading && searchResults.length > 0 && (
        <ul className="border border-gray-300 rounded-lg mt-2 max-h-60 overflow-y-auto">
          {searchResults.map((uni) => (
            <li
              key={uni._id}
              onClick={() => handleSelectUniversity(uni)}
              className="p-3 cursor-pointer hover:bg-gray-100 border-b last:border-b-0"
            >
              {uni.university_name} ({uni.location})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UniversitySearch;
