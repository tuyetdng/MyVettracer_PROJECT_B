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
            VET_USER,
            VET_USER + "/user_id",
            PET,
            PET + "/{pet_id}",
            PET + "/pet-vet/{user_id}", //get pets by vetID
            PET + "/pet-owner/{user_id}", //get pets by ownerID
            APPOINTMENT,
            APPOINTMENT + "/{app_id}",
            MEDICINE,
            MEDICINE + "/{mec_id}",
            VACCINE,
            VACCINE + "/{vac_id}"
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
