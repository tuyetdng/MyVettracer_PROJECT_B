// import { VITE_BASE_URL } from "@env";
import { useHttpPrivateRequest } from "../../services/httpRequest/useHttpPrivateRequest";
import useHttpPublicRequest from "../../services/httpRequest/useHttpPublicRequest ";

const useApi = () => {
    const publicApi = useHttpPublicRequest("http://10.0.2.2:8080/myvettracer");

    //Get medicine by pet
    const getMedicineByPet = (idPet: number) => {
        return publicApi.get(`/medicine/pet-med/${idPet}`, {});
    };

    //Get medicine by vet
    const getMedicineByVet = (idVet: number) => {
        return publicApi.get(`/medicine/vet-med/${idVet}`, {});
    };



    return {
        getMedicineByPet,
        getMedicineByVet
    };
};

export default useApi;
