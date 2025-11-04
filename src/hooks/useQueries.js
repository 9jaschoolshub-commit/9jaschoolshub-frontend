import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { universityAPI, searchProgrammes } from "../services/universityApi";

// Get all universities
export const useAllUniversities = () => {
  const getAllUniversities = async () => {
    const allUniversities = await universityAPI.getAllUniversities();
    return allUniversities;
  };
  const queryData = useQuery({
    queryKey: ["universities"],
    queryFn: getAllUniversities,
  });

  return queryData;
};

// Search programmes
export const useSearchProgrammes = (searchQuery) => {
  const getSearchProgrammes = async () => {
    const searchProgrammesResult = await searchProgrammes(searchQuery);
    return searchProgrammesResult;
  };
  const queryData = useQuery({
    queryKey: ["search-programmes"],
    queryFn: getSearchProgrammes,
  });
  return queryData;
};

// Search universities
export const useSearchUniversities = (searchQuery) => {
  const getSearchUniversities = async () => {
    const searchUniversities = await universityAPI.searchUniversities(
      searchQuery
    );
    return searchUniversities;
  };
  const queryData = useQuery({
    queryKey: ["search-universities"],
    queryFn: getSearchUniversities,
  });

  return queryData;
};

// Get university by ID or slug
export const useSingleUniversity = (id) => {
  const getSingleUniversity = async () => {
    const singleUniversity = await universityAPI.getUniversityById(id);
    return singleUniversity;
  };
  const queryData = useQuery({
    queryKey: ["single-university"],
    queryFn: getSingleUniversity,
  });

  return queryData;
};

// Create a new University
export const useCreateUniversity = () => {
  const createUniversityAction = async (data) => {
    await universityAPI.createUniversity(data);
  };

  const queryClient = useQueryClient();
  const createUniversityFunction = useMutation({
    mutationFn: createUniversityAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["universities"] });
    },
  });

  return createUniversityFunction;
};

// Delete a university
export const useDeleteUniversity = () => {
  const deleteUniversityAction = async (id) => {
    await universityAPI.deleteUniversity(id);
  };

  const queryClient = useQueryClient();
  const deleteUniversityFunction = useMutation({
    mutationFn: deleteUniversityAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["universities"] });
      queryClient.invalidateQueries({ queryKey: ["single-university"] });
    },
  });

  return deleteUniversityFunction;
};

// Update a university
export const useUpdateUniversity = () => {
  const updateUniversityAction = async ({ id, data }) => {
    await universityAPI.updateUniversity(id, data);
  };

  const queryClient = useQueryClient();
  const updateUniversityFunction = useMutation({
    mutationFn: updateUniversityAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["universities"] });
      queryClient.invalidateQueries({ queryKey: ["single-university"] });
    },
  });

  return updateUniversityFunction;
};
