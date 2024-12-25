import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { ApiResponseListType, responseWrapper } from "../helpers";
import { API_QUERIES } from "../keys";
import { MedicineResponseType } from "./types";
import { medicineApi } from ".";


/**
 * Hook to fetch medice by a single pet ID.
 */
export function useGetMedicineByPet(
  idPet: number,
  options?: UseQueryOptions<
    MedicineResponseType[],
    Error
  >,
) {
  const queryClient = useQueryClient();

  const {
    data,
    error,
    isError,
    isFetching,
    refetch
  } = useQuery<MedicineResponseType[], Error>(
    [API_QUERIES.MEDICINE, idPet],
    async () => {
      const response = await responseWrapper<ApiResponseListType<MedicineResponseType>>(() =>
        medicineApi.getMedicineByPet(idPet),
      );
      return response.result || [];
    },
    {
      select: (data) => data,
      notifyOnChangeProps: ["data", "isFetching"],
      keepPreviousData: true,
      ...options,
    },
  );

  const invalidateMedicineByPet = () =>
    queryClient.invalidateQueries([API_QUERIES.MEDICINE, idPet]);

  return {
    data,
    error,
    isError,
    isFetching,
    refetch,
    invalidateMedicineByPet,
  };
}

/**
 * Hook to fetch Medicines for multiple pet IDs.
 */
export function useGetMedicinesByPets(
  petIds: number[],
  options?: UseQueryOptions<
    MedicineResponseType[],
    Error
  >,
) {
  const queryClient = useQueryClient();

  const { data, error, isError, isFetching, refetch } = useQuery<MedicineResponseType[], Error>(
    [API_QUERIES.MEDICINE, ...petIds],
    async () => {
      const Medicines = await Promise.all(
        petIds.map((idPet) =>
          responseWrapper<ApiResponseListType<MedicineResponseType>>(() =>
            medicineApi.getMedicineByPet(idPet),
          ).then((response) => response.result || []),
        ),
      );
      return Medicines.flat();
    },
    {
      enabled: petIds.length > 0,
      select: (data) => data,
      notifyOnChangeProps: ["data", "isFetching"],
      keepPreviousData: true,
      ...options,
    },
  );

  const invalidateMedicinesByPets = () =>
    queryClient.invalidateQueries([API_QUERIES.MEDICINE, ...petIds]);

  return {
    data,
    error,
    isError,
    isFetching,
    refetch,
    invalidateMedicinesByPets,
  };
}
