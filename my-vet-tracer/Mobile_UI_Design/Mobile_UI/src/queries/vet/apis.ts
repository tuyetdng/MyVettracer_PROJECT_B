// import { VITE_BASE_URL } from "@env";
import { useHttpPrivateRequest } from "../../services/httpRequest/useHttpPrivateRequest";
import useHttpPublicRequest from "../../services/httpRequest/useHttpPublicRequest ";

const useApi = () => {
  const publicApi = useHttpPublicRequest("http://10.0.2.2:8080/myvettracer");
  const privateApi = useHttpPrivateRequest("http://10.0.2.2:8080/myvettracer");


  //Get info login user
  const getUserInfo = () => {
    return privateApi.get("/vetuser/myinfo");
  };

  //refresh token
  const getRefreshToken = () => {
    return publicApi.post("/auth/refresh");
  };
  const getListVet = () => {
    return privateApi.get("/vetuser", {});
  };

  return {
    getUserInfo,
    getRefreshToken,
    getListVet,
  };
};

export default useApi;
