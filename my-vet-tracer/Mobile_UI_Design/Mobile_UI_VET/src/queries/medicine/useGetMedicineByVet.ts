import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { ApiResponseListType, responseWrapper } from "../helpers";
import { API_QUERIES } from "../keys";
import { MedicineResponseType } from "./types";
import { medicineApi } from ".";


export function useGetMedicineByVet(
  idVet: number,
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
    [API_QUERIES.MEDCINEBYVET, idVet],
    async () => {
      const response = await responseWrapper<ApiResponseListType<MedicineResponseType>>(() =>
        medicineApi.getMedicineByVet(idVet),
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
    queryClient.invalidateQueries([API_QUERIES.MEDCINEBYVET, idVet]);

  return {
    data,
    error,
    isError,
    isFetching,
    refetch,
    invalidateMedicineByPet,
  };
}
