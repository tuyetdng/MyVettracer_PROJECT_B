// import { VITE_BASE_URL } from "@env";
import { useHttpPrivateRequest } from "../../services/httpRequest/useHttpPrivateRequest";
import useHttpPublicRequest from "../../services/httpRequest/useHttpPublicRequest ";

const useApi = () => {
    const publicApi = useHttpPublicRequest("http://10.0.2.2:8080/myvettracer");


    //Get all pet
    const getPetsOfOwnerUser = (user_id: number) => {
        return publicApi.get(`/pet/pet-owner/${user_id}`, {});
    };

    //Get all pet
    const getPetByID = (pet_id: number) => {
        return publicApi.get(`/pet/${pet_id}`, {});
    };

    const getVetOfPetByPetId = (pet_id: number) => {
        return publicApi.get(`/pet/pet-vetpet/${pet_id}`, {});
    };

    return {
        getPetsOfOwnerUser,
        getPetByID,
        getVetOfPetByPetId
    };
};

export default useApi;
