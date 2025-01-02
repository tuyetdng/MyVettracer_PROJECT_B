import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { ApiResponseListType, responseWrapper } from "../helpers";
import { API_QUERIES } from "../keys";
import { VaccineResponseType } from "./types";
import { vaccineApi } from ".";


export function useGetVaccineByVet(
  idVet: number,
  options?: UseQueryOptions<
    VaccineResponseType[],
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
  } = useQuery<VaccineResponseType[], Error>(
    [API_QUERIES.VACCINE_VET, idVet],
    async () => {
      const response = await responseWrapper<ApiResponseListType<VaccineResponseType>>(() =>
        vaccineApi.getVaccineByVet(idVet),
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

  const invalidateVaccineByVet = () =>
    queryClient.invalidateQueries([API_QUERIES.VACCINE_VET, idVet]);

  return {
    data,
    error,
    isError,
    isFetching,
    refetch,
    invalidateVaccineByVet,
  };
}
