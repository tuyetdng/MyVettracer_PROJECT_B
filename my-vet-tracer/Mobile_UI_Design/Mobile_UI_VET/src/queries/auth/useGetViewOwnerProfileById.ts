import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { ApiResponseType, responseWrapper } from "../helpers";
import { API_QUERIES } from "../keys";
import { OwnerUser } from "../../zustand/auth/types";
import { authApi } from ".";


export function viewOwnerProfileById(
    owner_id: number,
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
        refetch: onGetOwnerById,
    } = useQuery<
        ApiResponseType<OwnerUser>,
        Error,
        OwnerUser
    >([API_QUERIES.OWNERGETVET, owner_id], {
        queryFn: () => {
            return responseWrapper<ApiResponseType<OwnerUser>>(() =>
                authApi.viewOwnerProfileById(owner_id)
        );
        },
        select: (data) => data?.result || {},
        notifyOnChangeProps: ["data", "isFetching"],
        enabled: !!owner_id,
        keepPreviousData: true,
        ...options,
    });

    const queryClient = useQueryClient();

    const handleInvalidateOwnerById = () =>
        queryClient.invalidateQueries([API_QUERIES.OWNERGETVET, owner_id]);

    return {
        data,
        error,
        isError,
        isFetching,
        onGetOwnerById,
        handleInvalidateOwnerById,
    };
}
