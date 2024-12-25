import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { ApiResponseType, responseWrapper } from "../helpers";
import { PetResponseType } from "./types";
import { API_QUERIES } from "../keys";
import { petApi } from ".";

export function useGetPetById(
    pet_id: number,
  options?: UseQueryOptions<
    ApiResponseType<PetResponseType>,
    Error,
    PetResponseType
  >,
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetPetById,
  } = useQuery<
    ApiResponseType<PetResponseType>,
    Error,
    PetResponseType
  >([API_QUERIES.PET, pet_id], {
    queryFn: () => {
      return responseWrapper<ApiResponseType<PetResponseType>>(() =>
        petApi.getPetByID(pet_id),
      );
    },
    select: (data) => data?.result || {},
    notifyOnChangeProps: ["data", "isFetching"],
    enabled: !!pet_id,
    keepPreviousData: true,
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidatePetById = () =>
    queryClient.invalidateQueries([API_QUERIES.PET, pet_id]);

  return {
    data,
    error,
    isError,
    isFetching,
    onGetPetById,
    handleInvalidatePetById,
  };
}
