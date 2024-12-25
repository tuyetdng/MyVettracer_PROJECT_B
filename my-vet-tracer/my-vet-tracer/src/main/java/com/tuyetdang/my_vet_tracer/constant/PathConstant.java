package com.tuyetdang.my_vet_tracer.constant;

public class PathConstant {
    public static final String OWNER_USER = "/owneruser";
    public static final String VET_USER = "/vetuser";
    public static final String PET = "/pet";
    public static final String APPOINTMENT = "/appointment";
    public static final String MEDICINE = "/medicine";
    public static final String VACCINE = "/vaccine";
    public static final String AUTH = "/auth";



    public static final String[] PUBLIC_AUTH_ENDPOINTS = {
            AUTH + "/token",
            AUTH + "/introspect",
            AUTH + "/logout",
            AUTH + "/refresh"
    };

    public static final String[] PUBLIC_GET_ENDPOINTS = {
            OWNER_USER,
            OWNER_USER + "/user_id",
//            VET_USER,
            VET_USER + "/user_id",
            PET,
            PET + "/{pet_id}",
            PET + "/pet-vet/{user_id}", //get pets by vetID
            PET + "/pet-owner/{user_id}", //get pets by ownerID
            PET + "/pet-ownerpet/{pet_id}", //get owner of pet by petid
            PET + "/pet-vetpet/{pet_id}", //get vet of pet by petid
            APPOINTMENT,
            APPOINTMENT + "/{app_id}",
            APPOINTMENT + "/isconfirmed/{user_id}",// by vetID
            APPOINTMENT + "/notconfirmed/{user_id}",// by vetID
            APPOINTMENT + "/pet-app/{idPet}",// by petID
            MEDICINE,
            MEDICINE + "/{mec_id}",
            MEDICINE + "/vet-med/{user_id}",// by vetID
            MEDICINE + "/pet-med/{idPet}",// by petID
            VACCINE,
            VACCINE + "/{vac_id}",
            VACCINE + "/vet-vac/{user_id}",// by vetID
            VACCINE + "/pet-vac/{idPet}",// by petID
    };

    public static final String[] PUBLIC_POST_ENDPOINTS = {
            OWNER_USER,
            VET_USER,
            PET,
            APPOINTMENT,
            MEDICINE,
            VACCINE
    };

    // Secured Endpoints
    public static final String[] SECURED_PUT_ENDPOINTS = {
            PET + "/{pet_id}",
            APPOINTMENT + "/{app_id}",
            MEDICINE + "{mec_id}",
            VACCINE + "/{vac_id}"
    };

    public static final String[] SECURED_DELETE_ENDPOINTS = {
            PET + "/{pet_id}",
            APPOINTMENT + "/{app_id}",
            MEDICINE + "/{mec_id}",
            VACCINE + "/{vac_id}"
    };

//    // Swagger & Other Public Utilities
//    public static final String[] SWAGGER_ENDPOINTS = {
//            "/swagger-ui/**",
//            "/v3/api-docs/**"
//    };

    // Combine Public Endpoints
//    public static final String[] PUBLIC_ENDPOINTS = concatArrays(PUBLIC_AUTH_ENDPOINTS, PUBLIC_GET_ENDPOINTS, PUBLIC_POST_ENDPOINTS, SWAGGER_ENDPOINTS);
//
//    // Utility to combine arrays
//    private static String[] concatArrays(String[]... arrays) {
//        return java.util.Arrays.stream(arrays).flatMap(java.util.Arrays::stream).toArray(String[]::new);
//    }
}
