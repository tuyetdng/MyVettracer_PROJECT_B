import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { ApiResponseType, responseWrapper } from "../helpers";
import { PetResponseType } from "./types";
import { API_QUERIES } from "../keys";
import { petApi } from ".";
import { OwnerUser } from "../../zustand/auth/types";


export function useGetOwnerOfPetByPetId(
    pet_id: number,
  options?: UseQueryOptions<
    ApiResponseType<OwnerUser>,
    Error,
    OwnerUser
  >,
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetOwnerOfPetByPetId,
  } = useQuery<
    ApiResponseType<OwnerUser>,
    Error,
    OwnerUser
  >([API_QUERIES.OWNERBYPET, pet_id], {
    queryFn: () => {
      return responseWrapper<ApiResponseType<OwnerUser>>(() =>
        petApi.getOwnerOfPetByPetId(pet_id),
      );
    },
    select: (data) => data?.result || {},
    notifyOnChangeProps: ["data", "isFetching"],
    enabled: !!pet_id,
    keepPreviousData: true,
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateGetOwnerOfPetByPetId = () =>
    queryClient.invalidateQueries([API_QUERIES.OWNERBYPET, pet_id]);

  return {
    data,
    error,
    isError,
    isFetching,
    onGetOwnerOfPetByPetId,
    handleInvalidateGetOwnerOfPetByPetId,
  };
}
