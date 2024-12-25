import React, { useState, useMemo } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as NavigationService from "react-navigation-helpers";
import axios from "axios";
import { useTheme } from "@react-navigation/native";
import createStyles from "./PetEditScreen.style";
import { PetResponseType } from "../../queries/pet/types";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { useGetPetById } from "../../queries/pet/useGetPetById";
import { useGetUserInfo } from "../../queries/auth/useGetUserInfo";
import { useGetVetOfPetByPetId } from "../../queries/pet/useGetVetOfPetByPetId";
import { useQueryClient } from "react-query";
import { API_QUERIES } from "../../queries/keys";

interface EditPetScreenProps {
    route: any;
    data: PetResponseType;
}
const EditPetScreen: React.FC<EditPetScreenProps> = ({ route }) => {
    const theme = useTheme();
    const { colors } = theme;
    const styles = useMemo(() => createStyles(theme), [theme]);
    const { idPet } = route.params;
    const { data, isFetching: isFetchingPets } = useGetPetById(idPet);
    const { data: owner } = useGetUserInfo();
    const { data: vet } = useGetVetOfPetByPetId(idPet);

    const [img, setImg] = useState(data?.img || "");
    const [petName, setPetName] = useState(data?.petName || "");
    const [petType, setPetType] = useState(data?.petType || "");
    const [sex, setSex] = useState(data?.sex || "");
    const [age, setAge] = useState(data?.age?.toString() || "");
    const [weight, setWeight] = useState(data?.weight || "");
    const [height, setHeight] = useState(data?.height || "");
    const [identification, setIdentification] = useState(data?.identification || "");
    
    const queryClient = useQueryClient();
    
    const handleSave = async () => {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
            Alert.alert("Error", "Unable to authenticate. Please log in again.");
            return;
        }
        console.log("token check" + token);
        const payload = {
            img,
            petName,
            petType,
            sex,
            age: parseInt(age, 10),
            weight,
            height,
            identification,
            idOwnerUser: owner?.idOwnerUser,
            idVetUser: vet?.idVetUser

        };
        console.log("data: " + payload.petName);

        try {
            const response = await axios.put(
                `http://10.0.2.2:8080/myvettracer/pet/${idPet}`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Response: ", response.data);
            if (response.data.code === 1000) {
                queryClient.invalidateQueries([API_QUERIES.PET, idPet]);

                Alert.alert("Success", "Pet details updated successfully!", [
                    { text: "OK", onPress: () => NavigationService.goBack() },
                ]);
            } else {
                Alert.alert("Error", "Failed to update pet details.");
            }
        } catch (error: any) {
            console.error(error);
            Alert.alert(
                "Error",
                error.response?.data?.message || "An error occurred. Please try again later."
            );
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={() => NavigationService.goBack()} style={styles.goBackButton}>
                <Icon
                    name="arrow-back-sharp"
                    type={IconType.Ionicons}
                    color='#000000'
                    size={35}
                />
            </TouchableOpacity>

            <View style={styles.imageContainer}>
                <Image source={{ uri: data?.img }} style={styles.petImage} />
            </View>

            <TextInput
                style={styles.input}
                placeholder="Pet Name"
                value={petName}
                onChangeText={setPetName}
            />

            <TextInput
                style={styles.input}
                placeholder="Pet Type"
                value={petType}
                onChangeText={setPetType}
            />

            <TextInput
                style={styles.input}
                placeholder="Sex"
                value={sex}
                onChangeText={setSex}
            />

            <TextInput
                style={styles.input}
                placeholder="Age (Months)"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
            />

            <TextInput
                style={styles.input}
                placeholder="Weight (kg)"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
            />

            <TextInput
                style={styles.input}
                placeholder="Height (cm)"
                keyboardType="numeric"
                value={height}
                onChangeText={setHeight}
            />

            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default EditPetScreen;